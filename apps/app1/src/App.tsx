import singleSpaReact from 'single-spa-react';
import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import 'antd/dist/antd.css';

const Avatar = lazy(() => import('./components/avatar'));
const Button = lazy(() => import('./components/button'));
const Form = lazy(() => import('./components/form'));
const Table = lazy(() => import('./components/table'));
const Column = lazy(() => import('./components/Column'));
const Pie = lazy(() => import('./components/Pie'));

const App = () => {
  console.log('app1 react', React.version);

  return (
    <Suspense fallback={null}>
      <Router>
        <Switch>
          <Route path="/one/avatar">
            <Avatar />
          </Route>
          <Route path="/one/button">
            <Button />
          </Route>
          <Route path="/one/form">
            <Form />
          </Route>
          <Route path="/one/table">
            <Table />
          </Route>
          <Route path="/one/column">
            <Column />
          </Route>
          <Route path="/one/pie">
            <Pie />
          </Route>
        </Switch>
      </Router>
    </Suspense>
  );
};

export default App;

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: App,
});

export const bootstrap = reactLifecycles.bootstrap;
export const mount = reactLifecycles.mount;
export const unmount = reactLifecycles.unmount;