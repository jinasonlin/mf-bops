import React, { Suspense, lazy } from 'react';
import singleSpaReact from 'single-spa-react';
import Parcel from 'single-spa-react/parcel';
import GridLayout from 'react-grid-layout';
import ReactDOM from 'react-dom';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './style.css';

const App1Form = lazy(() => import('app1/components/Form'));
const App1Table = lazy(() => import('app1/components/Table'));
const App1Column = lazy(() => import('app1/components/Column'));
const App1Pie = lazy(() => import('app1/components/Pie'));
const App2Form = lazy(() => import('app2/components/Form'));
const App2Table = lazy(() => import('app2/components/Table'));

const App = () => {
  console.log('dashboard react', React.version);

  // layout is an array of objects, see the demo for more complete usage
  const layout = [
    { i: 'app1:form', x: 0, y: 0, w: 1, h: 2 },
    { i: 'app1:table', x: 1, y: 0, w: 3, h: 4, minW: 2, minH: 2 },
    { i: 'app1:column', x: 4, y: 0, w: 2, h: 4, minW: 2, minH: 2 },
    { i: 'app1:pie', x: 4, y: 0, w: 2, h: 4, minW: 2, minH: 2 },
    { i: 'app2:form', x: 0, y: 0, w: 1, h: 2 },
    { i: 'app2:table', x: 1, y: 0, w: 3, h: 4, minW: 2, minH: 2 },
  ];
  return (
    <GridLayout
      className="layout"
      layout={layout}
      cols={12}
      rowHeight={30}
      width={1200}
    >
      <div key="app1:form" className=''><Suspense fallback={null}><App1Form /></Suspense></div>
      <div key="app1:table" className=''><Suspense fallback={null}><App1Table /></Suspense></div>
      <div key="app1:column" className=''><Suspense fallback={null}><App1Column /></Suspense></div>
      <div key="app1:pie" className=''><Suspense fallback={null}><App1Pie /></Suspense></div>
      <div key="app2:form" className=''><Suspense fallback={null}><App2Form /></Suspense></div>
      <div key="app2:table" className=''><Suspense fallback={null}><App2Table /></Suspense></div>
      <div key="app3:parcel" className=''>
        <Parcel
          config={() =>
            import('app3/AppParcelConfig').then((_) => {
              return _.default;
            })
          }
        />
      </div>
    </GridLayout>
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
