import { TOGGLE_TICKERS_WEBSOCKET, } from '../constants/ActionTypes'

function tickersWebSocketOn(state = true, action) {
  switch (action.type) {
    case TOGGLE_TICKERS_WEBSOCKET:
      return action.active
    default:
      return state
  }
}

export default tickersWebSocketOn
