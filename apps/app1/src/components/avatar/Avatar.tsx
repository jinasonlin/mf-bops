import React from 'react';
import { Avatar, Image } from 'antd';
import { UserOutlined } from '@ant-design/icons';

export default () => {
  return (
    <div className="app1-avatar-demo">
      <div>
        <Avatar size={64} icon={<UserOutlined />} />
        <Avatar size="large" icon={<UserOutlined />} />
        <Avatar icon={<UserOutlined />} />
        <Avatar size="small" icon={<UserOutlined />} />
      </div>
      <div>
        <Avatar icon={<UserOutlined />} />
        <Avatar>U</Avatar>
        <Avatar size={40}>USER</Avatar>
        <Avatar src="https://joeschmoe.io/api/v1/random" />
        <Avatar src={<Image src="https://joeschmoe.io/api/v1/random" style={{ width: 32 }} />} />
        <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>U</Avatar>
        <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
      </div>
    </div>
  );
};
