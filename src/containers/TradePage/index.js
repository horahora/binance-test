
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { tradeWebsocketMessage } from '../../actions'
import { Column, Table } from 'react-virtualized'
import styles from './TradePage.module.css'
// import from '../../act'


type Props = {
  match: *,
  symbolTrade: *,
  dispatch: *
}

class TradePage extends Component<Props> {
  ws: *

  componentDidMount() {
    const { dispatch, match } = this.props
    const { symbol } = match.params

    this.ws = new WebSocket(`wss://stream.binance.cloud:9443/stream?streams=${symbol.toLowerCase()}@depth10`)
    this.ws.onmessage = (e) => {
      if (typeof e.data === 'string') {
        dispatch(tradeWebsocketMessage(JSON.parse(e.data).data))
      }
    }
  }

  componentWillUnmount() {
    this.ws.close()
  }

  render() {
    const { symbol } = this.props.match.params
    const { symbolTrade } = this.props
    if (!symbolTrade.asks) return null

    symbolTrade.asks = symbolTrade.asks.map(v => {
      return [
        v[0],
        Number(v[1]).toFixed(1),
        (v[0]*v[1]).toFixed(6),
        v[2]
      ]
    }).reverse()

    symbolTrade.bids = symbolTrade.bids.map(v => {
      return [
        v[0],
        Number(v[1]).toFixed(1),
        (v[0]*v[1]).toFixed(6),
        v[2]
      ]
    }).reverse()

    // console.log(symbolTrade);
    return (
      <div>
        <h1>{symbol}</h1>
        <h2>Asks</h2>
        <Table
          width={1000}
          height={400}
          headerHeight={20}
          rowHeight={30}
          rowCount={symbolTrade.asks.length}
          rowGetter={({ index }) => symbolTrade.asks[index]}
          className={styles.table_asks}
        >
          <Column
            label='Price'
            dataKey='0'
            width={400}
          />
          <Column
            label='Amount'
            dataKey='1'
            width={400}
          />
          <Column
            label='Total'
            dataKey='2'
            width={400}
          />
        </Table>

        <h2>Bids</h2>
        <Table
          width={1000}
          height={400}
          headerHeight={20}
          rowHeight={30}
          rowCount={symbolTrade.bids.length}
          rowGetter={({ index }) => symbolTrade.bids[index]}
          className={styles.table_bids}
        >
          <Column
            label='Price'
            dataKey='0'
            width={400}
          />
          <Column
            label='Amount'
            dataKey='1'
            width={400}
          />
          <Column
            label='Total'
            dataKey='2'
            width={400}
          />
        </Table>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { symbolTrade } = state
  return {
    symbolTrade
  }
}

export default connect(mapStateToProps)(TradePage)
