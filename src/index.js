import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Profile from './Profile';
import Payment from './Payment';
import BookingHistory from './BookingHistory';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'

const store = createStore(rootReducer)

const routing = (
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/profile" component={Profile} />
        <Route path="/payment" component={Payment} />
        <Route path="/history" component={BookingHistory} />
      </div>
    </Router>
  )

ReactDOM.render(<Provider store={store}>
  {routing}
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
