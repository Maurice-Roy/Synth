import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import synthReducer from './synthReducer'
import thunk from 'redux-thunk'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { ActionCableProvider } from 'react-actioncable-provider'
import { BrowserRouter as Router } from 'react-router-dom'

let store = createStore(synthReducer, applyMiddleware(thunk))

const API_WS_ROOT = `ws://192.168.4.168:3000/cable`

ReactDOM.render(
  <Router>
    <ActionCableProvider url={API_WS_ROOT}>
      <Provider store={store}>
        <App />
      </Provider>
    </ActionCableProvider>
  </Router>,
  document.getElementById('root'));
registerServiceWorker();
