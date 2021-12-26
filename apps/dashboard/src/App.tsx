import React, { Suspense, lazy, useState, createElement } from 'react';
import singleSpaReact from 'single-spa-react';
import Parcel from 'single-spa-react/parcel';
import GridLayout, { WidthProvider, Responsive } from 'react-grid-layout';
import ReactDOM from 'react-dom';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './style.css';

const App1Form = lazy(() => import('app1/components/Form'));
const App1Table = lazy(() => import('app1/components/Table'));
const App1Column = lazy(() => import('app1/components/Column'));
const App1Pie = lazy(() => import('app1/components/Pie'));
const App1Rose = lazy(() => import('app1/components/Rose'));
const App2Form = lazy(() => import('app2/components/Form'));
const App2Table = lazy(() => import('app2/components/Table'));
const App3Parcel = () => (
  <Parcel
    config={() =>
      import('app3/AppParcelConfig').then((_) => {
        return _.default;
      })
    }
  />
);

const ResponsiveGridLayout = WidthProvider(GridLayout);

const componentMap = {
  'app1:form': App1Form,
  'app1:table': App1Table,
  'app1:column': App1Column,
  'app1:pie': App1Pie,
  'app1:rose': App1Rose,
  'app2:form': App2Form,
  'app2:table': App2Table,
  'app3:parcel': App3Parcel,
};

const componentLayout = [
  {
    w: 6,
    h: 11,
    x: 0,
    y: 23,
    i: 'app1:form',
    static: false,
  },
  {
    w: 12,
    h: 8,
    x: 0,
    y: 7,
    i: 'app1:table',
    minW: 2,
    minH: 2,
    static: false,
  },
  {
    w: 7,
    h: 7,
    x: 5,
    y: 0,
    i: 'app1:column',
    minW: 2,
    minH: 2,
    static: false,
  },
  {
    w: 5,
    h: 7,
    x: 0,
    y: 0,
    i: 'app1:pie',
    minW: 2,
    minH: 2,
    static: false,
  },
  {
    w: 6,
    h: 9,
    x: 6,
    y: 34,
    i: 'app1:rose',
    static: false,
  },
  {
    w: 6,
    h: 11,
    x: 6,
    y: 23,
    i: 'app2:form',
    static: false,
  },
  {
    w: 12,
    h: 8,
    x: 0,
    y: 15,
    i: 'app2:table',
    minW: 2,
    minH: 2,
    static: false,
  },
  {
    w: 6,
    h: 3,
    x: 0,
    y: 34,
    i: 'app3:parcel',
    static: false,
  },
];

type componentKey = keyof typeof componentMap;
const componentKeys = Object.keys(componentMap) as componentKey[];

const App = () => {
  console.log('dashboard react', React.version);

  const [isDraggable, setIsDraggable] = useState(false);
  const [isResizable, setIsResizable] = useState(false);

  return (
    <Suspense fallback={null}>
      <div className="labels">
        <span>设置:</span>
        <label>
          <span>拖拽</span>
          <input
            name="isDraggable"
            type="checkbox"
            onChange={(e) => setIsDraggable(e.target.checked)}
          />
        </label>
        <label>
          <span>缩放</span>
          <input
            name="isResizable"
            type="checkbox"
            onChange={(e) => setIsResizable(e.target.checked)}
          />
        </label>
      </div>
      <ResponsiveGridLayout
        className="layout"
        layout={componentLayout}
        cols={12}
        rowHeight={30}
        onLayoutChange={console.log}
        isDraggable={isDraggable}
        isResizable={isResizable}
      >
        {componentKeys.map((key) => (
          <div key={key} className="">
            <span className="hint">{key}</span>
            {createElement(componentMap[key])}
          </div>
        ))}
      </ResponsiveGridLayout>
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
