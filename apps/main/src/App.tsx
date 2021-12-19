import React from 'react';
import { Layout } from 'antd';
import App1 from 'app1/App';

import 'antd/dist/antd.css';
import './App.css';

const { Header, Footer, Content } = Layout;

export default () => {
  console.log('main react', React.version);

  return (
    <Layout>
      <Header>Header</Header>
      <Content><App1 /></Content>
      <Footer>Footer</Footer>
    </Layout>
  )
}
