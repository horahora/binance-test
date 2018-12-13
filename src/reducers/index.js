import { combineReducers } from 'redux'

import tickers from './tickers'
import tickersWebSocketOn from './tickersWebSocketOn'
import sortBy from './sortBy'
import sortDirection from './sortDirection'
import symbolTrade from './symbolTrade'

export default combineReducers({
  tickers,
  tickersWebSocketOn,
  sortBy,
  sortDirection,
  symbolTrade
})
