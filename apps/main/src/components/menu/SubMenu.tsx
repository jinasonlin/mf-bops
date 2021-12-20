import React, { PureComponent, Children, ReactText, SyntheticEvent, ReactElement, cloneElement, CSSProperties } from 'react';
import { classnames, SubMenuIF } from '../../utils';
import Icon from '../../components/icon';

interface PropsIF {
  prefixCls?: string;
  title: string;
  level: number;
  indent: number;
  openKeys: ReactText[];
  selectedKeys: ReactText[];
  toggleOpenKeys?: (subMenuKey: ReactText) => void;
  toggleSelectedKeys?: (itemKey: ReactText) => void;
  subMenuKey?: ReactText;
  icon?: string;
}

export default class SubMenu extends PureComponent<PropsIF> {
  static defaultProps = {
    title: '',
    level: 1,
    indent: 8,
    openKeys: [],
    selectedKeys: [],
  };

  subTitle?: HTMLDivElement;

  sub?: HTMLUListElement;

  componentDidMount() {
    const { openKeys } = this.props;
    if (openKeys.length > 0) {
      this.setSubHeight({ lastOpenKeys: openKeys });
    }
  }

  componentDidUpdate(prevProps: PropsIF) {
    const { openKeys } = this.props;
    const { openKeys: lastOpenKeys } = prevProps;

    if (openKeys !== lastOpenKeys) {
      this.setSubHeight({ lastOpenKeys });
    }
  }

  getSubHeight() {
    if (!this.sub) {
      return;
    }
    const childs = Array.from(this.sub.children);

    const height = (childs as HTMLLIElement[]).reduce((res, next) => {
      res += next.offsetHeight;
      return res;
    }, 0);

    return height;
  }

  setSubHeight({ lastOpenKeys }: { lastOpenKeys: ReactText[] }) {
    if (!this.sub) {
      return;
    }
    const { subMenuKey, openKeys } = this.props;

    const keyIndex = openKeys.indexOf(subMenuKey!);
    const keysLength = openKeys.length;

    if (keyIndex > -1) {
      if ((keysLength > 1 && keyIndex < keysLength - 1) || keysLength < lastOpenKeys.length) {
        // 如果不是最后一级子菜单，或者嵌套的子菜单被收起，当前子菜单高度自适应
        this.sub.style.height = 'auto';
      } else {
        // 否则，设置具体的高度产生过渡动画
        const height = this.getSubHeight();
        this.sub.style.height = `${height}px`;
      }
    } else if (lastOpenKeys.indexOf(subMenuKey!) > -1) {
      // 如果上一次展开则收起
      const height = this.getSubHeight();
      this.sub.style.height = `${height}px`;

      setTimeout(() => {
        this.sub!.style.height = '0';
      }, 0);
    }
  }

  handleClickSubMenu = (e: SyntheticEvent) => {
    e.stopPropagation();
    const { subMenuKey, toggleOpenKeys } = this.props;

    if (toggleOpenKeys) {
      toggleOpenKeys(subMenuKey!);
    }
  };

  hasChildSelected() {
    const { selectedKeys, children } = this.props;

    let hasSelected = false;

    Children.forEach(children as ReactElement[], (child) => {
      if (child && selectedKeys.indexOf(child.key!) > -1) {
        hasSelected = true;
      }
    });

    return hasSelected;
  }

  renderChildren() {
    const {
      children,
      level,
      indent,
      prefixCls,
      openKeys,
      selectedKeys,
      subMenuKey,
      toggleOpenKeys,
      toggleSelectedKeys,
    } = this.props;

    return Children.map(children as ReactElement[], (child, index) => {
      if (child) {
        const p = {
          indent,
          prefixCls,
          level: level + 1,
          openKeys,
          selectedKeys,
          toggleOpenKeys,
          toggleSelectedKeys,
          subMenuKey: `${subMenuKey}-${index}` as ReactText,
          itemKey: `${subMenuKey}-${index}` as ReactText,
        };
        if (child.key || child.key === '') {
          p.subMenuKey = p.itemKey = child.key;
        }

        return cloneElement(child, p);
      }

      return child;
    });
  }

  render() {
    const { title, level, indent, prefixCls, subMenuKey, openKeys, icon } = this.props;
    const { pathname } = window.location;

    const { CurrentMenuInfo } = window;

    const subMenuStyle: CSSProperties = {};
    if (level > 1) {
      // 一级菜单不缩进
      subMenuStyle.paddingLeft = level * indent;
    }
    const cls = classnames(`${prefixCls}-submenu`, {
      [`${prefixCls}-submenu-level-${level}`]: !!level,
      open: openKeys.indexOf(subMenuKey!) > -1,
      active: (pathname.startsWith(subMenuKey as string) && subMenuKey) || (CurrentMenuInfo as Partial<SubMenuIF>)!.parentUrl === subMenuKey,
    });

    return (
      <li className={cls}>
        <div
          ref={(subTitle) => {
            this.subTitle = subTitle as HTMLDivElement;
          }}
          title={title}
          onClick={this.handleClickSubMenu}
          style={subMenuStyle}
          className={`${prefixCls}-submenu-title`}
        >
          {level === 1 && icon && <Icon type={icon} />}
          {title}
          <i className={`${prefixCls}-submenu-arrow`} />
        </div>
        <ul
          ref={(sub) => {
            this.sub = sub as HTMLUListElement;
          }}
          className={`${prefixCls}-submenu-sub`}
        >
          {this.renderChildren()}
        </ul>
      </li>
    );
  }
}
