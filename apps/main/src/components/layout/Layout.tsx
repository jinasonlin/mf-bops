import React from 'react';
import { classnames } from '../../utils';

interface PropsIF {
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}

export const prefix = 'frame-layout';

export const Layout: React.FC<PropsIF> = ({ className, children, id, style }) => {
  const cls = classnames(prefix, {
    [className!]: !!className,
  });
  return <div className={cls} id={id} style={style}>{children}</div>;
};

const genSubComponent: (cls: string) => React.SFC<PropsIF> = (cls) => {
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
