import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers'
import Root from './components/Root'
import rootSaga from './sagas'
import './styles/index.css'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware)
  )
)

sagaMiddleware.run(rootSaga)

render(
  <Root store={store} />,
  document.getElementById('root')
)
