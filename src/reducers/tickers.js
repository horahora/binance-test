import { TICKERS_WEBSOCKET_MESSAGE } from '../constants/ActionTypes'

function tickers(state = {}, action) {
  switch (action.type) {
    case TICKERS_WEBSOCKET_MESSAGE:
      return {
        ...state,
        ...action.tickers
      }
    default:
      return state
  }
}

export default tickers
