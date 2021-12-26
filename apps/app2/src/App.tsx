import singleSpaReact from 'single-spa-react';
import Parcel from 'single-spa-react/parcel';
import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


const Avatar = lazy(() => import('./components/avatar'));
const Button = lazy(() => import('./components/button'));
const Form = lazy(() => import('./components/form'));
const Table = lazy(() => import('./components/table'));

const App = () => {
  console.log('app2 react', React.version);

  return (
    <Suspense fallback={null}>
      <Router>
        <Switch>
          <Route path="/two/avatar">
            <Avatar />
          </Route>
          <Route path="/two/button">
            <Button />
          </Route>
          <Route path="/two/form">
            <Form />
          </Route>
          <Route path="/two/table">
            <Table />
          </Route>
          <Route path="/two/parcel">
            <Parcel
              config={() =>
                import('app3/AppParcelConfig').then((_) => {
                  return _.default;
                })
              }
            />
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
