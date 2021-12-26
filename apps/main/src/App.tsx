import { registerApplication, start } from 'single-spa';
import React, { useEffect, useRef } from 'react';
import Frame from './components/frame';

import './App.css';

const memus = [
  {
    menuName: 'app1',
    menuCode: '1',
    url: '/one',
    order: '0',
    icon: 'document',
    childrenMenuViewList: [
      {
        menuName: 'avatar',
        menuCode: '1.1',
        url: '/one/avatar',
        order: '0',
      },
      {
        menuName: 'button',
        menuCode: '1.2',
        url: '/one/button',
        order: '0',
      },
      {
        menuName: 'form',
        menuCode: '1.3',
        url: '/one/form',
        order: '0',
      },
      {
        menuName: 'table',
        menuCode: '1.4',
        url: '/one/table',
        order: '0',
      },
      {
        menuName: 'parcel (app2)',
        menuCode: '2.5',
        url: '/two/parcel',
        order: '0',
      },
    ],
  },
  {
    menuName: 'app2',
    menuCode: '2',
    url: '/two',
    order: '0',
    icon: 'goods',
    childrenMenuViewList: [
      {
        menuName: 'avatar',
        menuCode: '2.1',
        url: '/two/avatar',
        order: '0',
      },
      {
        menuName: 'button',
        menuCode: '2.2',
        url: '/two/button',
        order: '0',
      },
      {
        menuName: 'form',
        menuCode: '2.3',
        url: '/two/form',
        order: '0',
      },
      {
        menuName: 'table',
        menuCode: '2.4',
        url: '/two/table',
        order: '0',
      },
      {
        menuName: 'parcel',
        menuCode: '2.5',
        url: '/two/parcel',
        order: '0',
      },
    ],
  },
];

const pathPrefix = (prefix: string) => {
  return function(location: any) {
    return location.pathname.startsWith(`${prefix}`);
  }
}

export default () => {
  console.log('main react', React.version);

  const dom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerApplication('app1', () => import ('app1/App'), pathPrefix('/one'), { domElement: dom.current })
    registerApplication('app2', () => import ('app2/App'), pathPrefix('/two'), { domElement: dom.current })

    start();
  }, []);

  return (
    <Frame userName="linqun" menus={memus}>
      <div className="main-container" ref={dom} />
    </Frame>
  );
};
