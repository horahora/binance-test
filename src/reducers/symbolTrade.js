import { TRADE_WEBSOCKET_MESSAGE } from '../constants/ActionTypes'

function symbolTrade(state = {}, action) {
  switch (action.type) {
    case TRADE_WEBSOCKET_MESSAGE:
      return action.symbolTrade
    default:
      return state
  }
}

export default symbolTrade
