// @flow

import React, { Component } from 'react'
import { Column, Table } from 'react-virtualized'
import styles from './TickerTable.module.css'

type Props = {
  tickers: Array<*>,
  history: *,
  sortBy: string,
  sortDirection: string,
  sort: () => mixed,
  handleTickerClick: () => mixed
}

class TickerTable extends Component<Props> {

  get sortedTicker(): Array<*> {
    const { sortBy, sortDirection } = this.props
    return this.props.tickers.sort((a, b) => {
      let aValue = a[sortBy]
      let bValue = b[sortBy]
      if (sortBy !== 's') {
        aValue = parseFloat(aValue)
        bValue = parseFloat(bValue)
      }
      if (aValue < bValue) {
        return sortDirection === 'DESC' ? 1 : -1
      } else if (aValue > bValue) {
        return sortDirection === 'DESC' ? -1 : 1
      } else {
        return 0
      }
    })
  }

  componentDidMount() {
    console.log(this.sortedTicker);
  }

  render() {
    const { sortBy, sortDirection, sort, handleTickerClick } = this.props

    return (
      <Table
        width={1200}
        height={600}
        headerHeight={30}
        rowHeight={30}
        estimatedRowSize={30}
        rowStyle={{borderBottom:"1px solid #f0f0f0",color: "#333", cursor: "pointer", width: "1198px"}}
        headerClassName={styles.ticker_table_header}
        rowClassName={styles.ticker_table_row}
        rowCount={this.sortedTicker.length}
        rowGetter={({ index }) => this.sortedTicker[index]}
        sortBy={sortBy}
        sortDirection={sortDirection}
        sort={sort}
        onRowClick={handleTickerClick}
        className={'ReactVirtualized__Table__sortableHeaderColumn'}
      >
        <Column
          label="Pair"
          dataKey="s"
          width={400}
        />
        <Column
          label="Last Price"
          dataKey="c"
          width={400}
        />
        <Column
          label="24h High"
          dataKey="h"
          width={400}
          headerStyle={{textAlign: 'right'}}
          style={{textAlign: 'right'}}
        />
        <Column
          label="24h Low"
          dataKey="l"
          width={400}
          headerStyle={{textAlign: 'right'}}
          style={{textAlign: 'right'}}
        />
        <Column
          label="24h Volume"
          dataKey="q"
          width={400}
          headerStyle={{textAlign: 'right'}}
          style={{textAlign: 'right'}}
        />
      </Table>
    )
  }
}

export default TickerTable
