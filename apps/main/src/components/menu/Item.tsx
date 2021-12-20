import React, { PureComponent, ReactText, CSSProperties, MouseEvent } from 'react';
import { classnames, noop } from '../../utils';
import Icon from '../icon';

interface PropsIF {
  prefixCls?: string;
  indent: number;
  level: number;
  selected?: boolean;
  selectedKeys: ReactText[];
  toggleSelectedKeys: (itemKey: ReactText) => void;
  itemKey?: ReactText;
  title?: string;
  icon?: string;
}

export default class Item extends PureComponent<PropsIF> {
  static defaultProps = {
    indent: 8,
    level: 1,
    selectedKeys: [],
    toggleSelectedKeys: noop,
  };

  private handleClickItem = (e: MouseEvent<HTMLLIElement>) => {
    e.stopPropagation();
    const { itemKey, toggleSelectedKeys } = this.props;
    if (itemKey) {
      toggleSelectedKeys(itemKey);
    }
  };

  render() {
    const { prefixCls, level, indent, selected, children, itemKey, selectedKeys, title, icon } = this.props;

    const cls = classnames({
      [`${prefixCls}-item`]: true,
      active: !!itemKey && selectedKeys.indexOf(itemKey) > -1,
      selected: !!selected,
    });
    const style: CSSProperties = {};
    style.paddingLeft = level * indent;

    return (
      <li
        className={cls}
        role="menuitem"
        title={title}
        style={style}
        onClick={this.handleClickItem}
      >
        <div
          className={`${prefixCls}-item-title`}
        >
          {level === 1 && icon && <Icon type={icon} />}
          {children}
        </div>
      </li>
    );
  }
}
