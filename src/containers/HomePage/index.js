
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { tickersWebsocketOpen, tickersWebsocketMessage, tickersWebsocketClose, toggleTickersWebsocket, pingRequested } from '../../actions'
import { normalize, schema } from 'normalizr'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import ConnectTickerTable from '../ConnectTickerTable'
import Switch from 'react-switch'
import styles from './HomePage.module.css'


// import { Link } from 'react-router-dom';

type Props = {
  history: *
}


class HomePage extends Component<Props> {
  ws: *

  handleToggleWebSocket = (checked: boolean) => {
    const { dispatch } = this.props

    if (checked) {
      this.startWebSocket()
    } else {
      this.ws.close()
    }
    dispatch(toggleTickersWebsocket(checked))
  }

  startWebSocket() {
    const { dispatch } = this.props

    this.ws = new WebSocket('wss://stream.binance.cloud:9443/stream?streams=!miniTicker@arr@3000ms')
    this.ws.onopen = (e) => {
      console.log('Connection open ...')
      dispatch(tickersWebsocketOpen())
    }

    this.ws.onmessage = (e) => {
      if (typeof e.data === 'string') {
        const { data } = JSON.parse(e.data)
        const ticker = new schema.Entity('tickers', {}, { idAttribute: 's' })
        const tickerList = [ticker]
        const normalizedData = normalize(data, tickerList)
        dispatch(tickersWebsocketMessage(normalizedData.entities.tickers))
      }
    }

    this.ws.onclose = (e) => {
      console.log('Connection closed.')
      dispatch(tickersWebsocketClose())
    }
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(pingRequested())

    this.startWebSocket()
  }

  componentWillUnmount() {
    this.ws.close()
  }

  handleTickerClick = (e: *) => {
    console.log('click', e)
    this.props.history.push(`/trade/${e.rowData.s}`)
  }


  render() {
    const { bnbTickers, btcTickers, ethTickers, usdtTickers, tickersWebSocketOn, history } = this.props

    return (
      <div>
        <div className={styles.switch_wrapper}>
          <label>WebSocket切换</label>
          <Switch checked={tickersWebSocketOn} onChange={this.handleToggleWebSocket} uncheckedIcon={false} checkedIcon={false} />
        </div>
        <Tabs>
          <TabList>
            <Tab>BNB Markets</Tab>
            <Tab>BTC Markets</Tab>
            <Tab>ETH Markets</Tab>
            <Tab>USDT Markets</Tab>
          </TabList>
          <TabPanel>
            <ConnectTickerTable tickers={bnbTickers} history={history} />
          </TabPanel>
          <TabPanel>
            <ConnectTickerTable tickers={btcTickers} history={history} />
          </TabPanel>
          <TabPanel>
            <ConnectTickerTable tickers={ethTickers} history={history} />
          </TabPanel>
          <TabPanel>
            <ConnectTickerTable tickers={usdtTickers} history={history} />
          </TabPanel>
        </Tabs>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { tickers, tickersWebSocketOn } = state
  const tickersArray = Object.values(tickers)
  return {
    bnbTickers: tickersArray.filter(v => /bnb$/i.test(v.s)),
    btcTickers: tickersArray.filter(v => /btc$/i.test(v.s)),
    ethTickers: tickersArray.filter(v => /eth$/i.test(v.s)),
    usdtTickers: tickersArray.filter(v => /bnb$/i.test(v.s)),
    tickersWebSocketOn
  }
}

export default connect(mapStateToProps)(HomePage)
