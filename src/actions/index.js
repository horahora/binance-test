import * as types from '../constants/ActionTypes'

export function tickersWebsocketOpen() {
  return {
    type: types.TICKERS_WEBSOCKET_OPEN,
  }
}

export function tickersWebsocketClose() {
  return {
    type: types.TICKERS_WEBSOCKET_CLOSE,
  }
}

export function tickersWebsocketMessage(tickers) {
  return {
    type: types.TICKERS_WEBSOCKET_MESSAGE,
    tickers
  }
}

export function toggleTickersWebsocket(active) {
  return {
    type: types.TOGGLE_TICKERS_WEBSOCKET,
    active
  }
}

export function triggerSort(sortBy, sortDirection) {
  return {
    type: types.TRIGGER_SORT,
    sortBy,
    sortDirection
  }
}

export function tradeWebsocketOpen() {
  return {
    type: types.TRADE_WEBSOCKET_OPEN,
  }
}

export function tradeWebsocketClose() {
  return {
    type: types.TRADE_WEBSOCKET_CLOSE,
  }
}

export function tradeWebsocketMessage(symbolTrade) {
  return {
    type: types.TRADE_WEBSOCKET_MESSAGE,
    symbolTrade
  }
}
