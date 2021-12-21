import singleSpaReact from 'single-spa-react';
import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const Avatar = lazy(() => import('./components/Avatar'));
const Breadcrumb = lazy(() => import('./components/Breadcrumb'));
const Modal = lazy(() => import('./components/Modal'));
const Steps = lazy(() => import('./components/Steps'));

const App = () => {
  console.log('app1 react', React.version);

  return (
    <Suspense fallback={null}>
      <Router>
        <Switch>
          <Route path="/one/avatar">
            <Avatar />
          </Route>
          <Route path="/one/breadcrumb">
            <Breadcrumb />
          </Route>
          <Route path="/one/modal">
            <Modal />
          </Route>
          <Route path="/one/steps">
            <Steps />
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