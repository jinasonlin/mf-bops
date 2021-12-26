import React from 'react';
import { Button } from '@douyinfe/semi-ui';

export default () => (
  <div className="app2-button-demo">
    <Button>主要按钮</Button>
    <Button type="secondary">次要按钮</Button>
    <Button type="tertiary">第三按钮</Button>
    <Button type="warning">警告按钮</Button>
    <Button type="danger">危险按钮</Button>
  </div>
);
