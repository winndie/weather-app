import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './Home';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store';
import { Framework7Parameters } from 'framework7/types';
import {App} from 'framework7-react';

const f7params = {
  name: 'Weather App',
  theme: 'md',
  statusbar: {
    iosOverlaysWebView: true,
    androidOverlaysWebView: false,
  },

} as Framework7Parameters;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <Home/>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
