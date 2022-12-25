import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// redux
import store from './store/store';
import { Provider } from 'react-redux'; 

// semantic ui
import 'semantic-ui-css/semantic.min.css'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);