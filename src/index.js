import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker.js';
import firebase from './services/Firebase.js';

const enableAuth = false;

const appLoaded = () => {
  document.getElementById('loader').style.display = 'none';
}

const init = () => {
  ReactDOM.render(<App />, document.getElementById('root'), appLoaded);
  registerServiceWorker();
};

if(enableAuth) {
  firebase.auth(init, appLoaded);
} else {
  init();
}