import singleSpaReact from 'single-spa-react';
import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const AutoComplete = lazy(() => import('./components/AutoComplete'));
const Form = lazy(() => import('./components/Form'));
const Modal = lazy(() => import('app1/components/Modal'));

const App = () => {
  console.log('app2 react', React.version);

  return (
    <Suspense fallback={null}>
      <Router>
        <Switch>
          <Route path="/two/auto-complete">
            <AutoComplete />
          </Route>
          <Route path="/two/form">
            <Form />
            <Modal />
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