import { registerApplication, start } from 'single-spa';
import React, { useEffect, createRef } from 'react';
// import { Layout } from 'antd';
import Frame from './components/frame';
// import App1 from 'app1/App';

import './App.css';

// const { Content } = Layout;

const memus = [
  {
    menuName: '一级菜单1',
    menuCode: '1',
    url: '/one',
    order: '0',
    icon: 'document',
    childrenMenuViewList: [
      {
        menuName: '二级菜单 avatar',
        menuCode: '1.1',
        url: '/one/avatar',
        order: '0',
      },
      {
        menuName: '二级菜单 breadcrumb',
        menuCode: '1.2',
        url: '/one/breadcrumb',
        order: '0',
      },
      {
        menuName: '二级菜单 modal',
        menuCode: '1.3',
        url: '/one/modal',
        order: '0',
      },
      {
        menuName: '二级菜单 steps',
        menuCode: '1.4',
        url: '/one/steps',
        order: '0',
      },
    ],
  },
  {
    menuName: '一级菜单2',
    menuCode: '2',
    url: '/two',
    order: '0',
    icon: 'goods',
    childrenMenuViewList: [
      {
        menuName: '二级菜单1',
        menuCode: '1.1',
        url: '/two/one',
        order: '0',
      },
      {
        menuName: '二级菜单2',
        menuCode: '1.2',
        url: '/two/two',
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

    start();
  }, []);

  return (
    <Frame userName="linqun" menus={memus}>
      <div ref={dom} />
      {/* <Layout>
        <Content>
          <App1 />
        </Content>
      </Layout> */}
    </Frame>
  );
};
