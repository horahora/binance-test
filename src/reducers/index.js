import { combineReducers } from 'redux'

import tickers from './tickers'
import tickersWebSocketOn from './tickersWebSocketOn'
import sortBy from './sortBy'
import sortDirection from './sortDirection'
import symbolTrade from './symbolTrade'

const rootReducer = combineReducers({
  tickers,
  tickersWebSocketOn,
  sortBy,
  sortDirection,
  symbolTrade
})

export default rootReducer
