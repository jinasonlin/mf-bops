import React, { useState } from 'react';
import { Drawer, Button } from 'antd';

import 'antd/dist/antd.css';

const App: React.FC = () => {
  console.log('app3 react', React.version);

  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        这个组件来自 app3（react 18 | parcel），点它试试效果
      </Button>
      <Drawer title="Basic Drawer" placement="right" onClose={onClose} visible={visible}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default App;