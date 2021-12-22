import singleSpaReact from 'single-spa-react';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const ParcelConfig = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: App,
});

export default ParcelConfig;
