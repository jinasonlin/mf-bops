import React from 'react';
import { classnames } from '../../utils';

interface PropsIF {
  row?: boolean;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}

export const prefix = 'frame-layout';

export const Layout: React.FC<PropsIF> = ({ row, className, children, id, style }) => {
  const cls = classnames(prefix, {
    [className!]: !!className,
    row: !!row,
  });
  return <div className={cls} id={id} style={style}>{children}</div>;
};

const genSubComponent: (cls: string) => React.FC<PropsIF> = (cls) => {
  return ({ children, className, id, style }) => {
    return (
      <Layout className={classnames(cls, { [className!]: !!className })} id={id} style={style}>
        {children}
      </Layout>
    );
  };
};

export const Header = genSubComponent(`${prefix}-header`);
export const Content = genSubComponent(`${prefix}-content`);
export const Footer = genSubComponent(`${prefix}-footer`);
export const Sider = genSubComponent(`${prefix}-sider`);
