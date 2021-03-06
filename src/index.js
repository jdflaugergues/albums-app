import React from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from './register-service-worker';
import configureStore from './configure-store';
import App from './containers/app';

import './index.css';

// Initialization of the redux store
const store = configureStore();

// Render the application
ReactDOM.render(
  <App store={store}/>,
  document.querySelector('#root')
);

registerServiceWorker();
