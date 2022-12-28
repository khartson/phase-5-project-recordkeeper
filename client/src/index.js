import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// redux
import store from './store/store';
import { Provider } from 'react-redux'; 

// react-router
import { BrowserRouter } from 'react-router-dom';

// semantic ui
import 'semantic-ui-css/semantic.min.css'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);