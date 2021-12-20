import React from 'react';
import { Layout } from 'antd';
import Frame from './components/frame';
import App1 from 'app1/App';

import './App.css';

const { Content } = Layout;

const memus = [
  {
    menuName: '一级菜单1',
    menuCode: '1',
    url: '/one',
    order: '0',
    icon: 'healthManage',
    childrenMenuViewList: [
      {
        menuName: '二级菜单1',
        menuCode: '1.1',
        url: '/one/one',
        order: '0',
      },
      {
        menuName: '二级菜单2',
        menuCode: '1.2',
        url: '/one/two',
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

export default () => {
  console.log('main react', React.version);

  return (
    <Frame userName="linqun" menus={memus}>
      <Layout>
        <Content>
          <App1 />
        </Content>
      </Layout>
    </Frame>
  );
};
