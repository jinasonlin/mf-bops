import { registerApplication, start } from 'single-spa';
import React, { useEffect, createRef } from 'react';
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
        menuName: 'breadcrumb',
        menuCode: '1.2',
        url: '/one/breadcrumb',
        order: '0',
      },
      {
        menuName: 'modal',
        menuCode: '1.3',
        url: '/one/modal',
        order: '0',
      },
      {
        menuName: 'steps',
        menuCode: '1.4',
        url: '/one/steps',
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
        menuName: 'auto-complete',
        menuCode: '1.1',
        url: '/two/auto-complete',
        order: '0',
      },
      {
        menuName: 'form',
        menuCode: '1.2',
        url: '/two/form',
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

  const dom = createRef<HTMLDivElement>();

  useEffect(() => {
    registerApplication('app1', () => import ('app1/App'), pathPrefix('/one'), { domElement: dom.current })
    registerApplication('app2', () => import ('app2/App'), pathPrefix('/two'), { domElement: dom.current })

    start();
  }, []);

  return (
    <Frame userName="linqun" menus={memus}>
      <div ref={dom} />
    </Frame>
  );
};
