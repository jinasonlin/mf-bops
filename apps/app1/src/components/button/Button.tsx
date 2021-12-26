import React from 'react';
import { Button, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

export default () => {
  return (
    <div className='app1-button-demo'>
      <div>
        <Button type="primary">Primary Button</Button>
        <Button>Default Button</Button>
        <Button type="dashed">Dashed Button</Button>
        <br />
        <Button type="text">Text Button</Button>
        <Button type="link">Link Button</Button>
      </div>
      <div>
        <Tooltip title="search">
          <Button type="primary" shape="circle" icon={<SearchOutlined />} />
        </Tooltip>
        <Button type="primary" shape="circle">
          A
        </Button>
        <Button type="primary" icon={<SearchOutlined />}>
          Search
        </Button>
        <Tooltip title="search">
          <Button shape="circle" icon={<SearchOutlined />} />
        </Tooltip>
        <Button icon={<SearchOutlined />}>Search</Button>
        <br />
        <Tooltip title="search">
          <Button shape="circle" icon={<SearchOutlined />} />
        </Tooltip>
        <Button icon={<SearchOutlined />}>Search</Button>
        <Tooltip title="search">
          <Button type="dashed" shape="circle" icon={<SearchOutlined />} />
        </Tooltip>
        <Button type="dashed" icon={<SearchOutlined />}>
          Search
        </Button>
        <Button icon={<SearchOutlined />} href="https://www.google.com" />
        <br />
        <br />
        <Tooltip title="search">
          <Button type="primary" shape="circle" icon={<SearchOutlined />} size="large" />
        </Tooltip>
        <Button type="primary" shape="circle" size="large">
          A
        </Button>
        <Button type="primary" icon={<SearchOutlined />} size="large">
          Search
        </Button>
        <Tooltip title="search">
          <Button shape="circle" icon={<SearchOutlined />} size="large" />
        </Tooltip>
        <Button icon={<SearchOutlined />} size="large">
          Search
        </Button>
        <br />
        <Tooltip title="search">
          <Button shape="circle" icon={<SearchOutlined />} size="large" />
        </Tooltip>
        <Button icon={<SearchOutlined />} size="large">
          Search
        </Button>
        <Tooltip title="search">
          <Button type="dashed" shape="circle" icon={<SearchOutlined />} size="large" />
        </Tooltip>
        <Button type="dashed" icon={<SearchOutlined />} size="large">
          Search
        </Button>
        <Button icon={<SearchOutlined />} size="large" href="https://www.google.com" />
      </div>
    </div>
  );
};
