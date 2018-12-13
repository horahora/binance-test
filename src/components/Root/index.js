import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import HomePage from '../../containers/HomePage'
import TradePage from '../../containers/TradePage'

function Root(props) {
  return (
    <Provider store={props.store}>
      <Router>
        <div className="container">
          <Route exact path="/" component={HomePage} />
          <Route path="/trade/:symbol" component={TradePage} />
        </div>
      </Router>
    </Provider>
  )
}

export default Root
