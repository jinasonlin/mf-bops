import React, { PureComponent, Children, ReactElement, cloneElement, ReactText, CSSProperties } from 'react';

interface PropsIF {
  prefixCls?: string;
  level: number;
  title: string;
  indent: number;
  itemKey?: ReactText;
  openKeys: ReactText[];
  selectedKeys: ReactText[];
  toggleOpenKeys?: (subMenuKey: ReactText) => void;
  toggleSelectedKeys?: (itemKey: ReactText) => void;
}

export default class ItemGroup extends PureComponent<PropsIF> {
  static defaultProps = {
    title: '',
    level: 1,
    indent: 16,
    openKeys: [],
    selectedKeys: [],
  };

  genChildKey(index: number) {
    const { itemKey } = this.props;

    return `${itemKey}-${index}`;
  }

  renderChildren() {
    const {
      prefixCls, level, indent, children,
      toggleOpenKeys, toggleSelectedKeys, selectedKeys, openKeys,
    } = this.props;

    return Children.map(children as ReactElement[], (child, index) => {
      if (child) {
        const p: Partial<PropsIF> & { subMenuKey?: ReactText} = {
          indent,
          prefixCls,
          level,
          openKeys,
          selectedKeys,
          toggleOpenKeys,
          toggleSelectedKeys,
        };
        if (child.key) {
          p.subMenuKey = p.itemKey = child.key;
        } else {
          p.subMenuKey = p.itemKey = this.genChildKey(index);
        }
        return cloneElement(child, p);
      }
      return child;
    });
  }

  render() {
    const { prefixCls, title, level, indent } = this.props;

    const style: CSSProperties = {
      // eslint-disable-next-line no-mixed-operators
      paddingLeft: level * indent / 3 * 2,
    };
    return (
      <li className={`${prefixCls}-item-group`}>
        <h3 style={style}>{title}</h3>
        <ul>{this.renderChildren()}</ul>
      </li>
    );
  }
}
