import React, { PureComponent, ReactNode } from 'react';
import { Menu, SubMenu, Item } from '../menu';
import { SubMenuIF, NavMenuIF, getSiderMenuKeys, escapeRegExp } from '../../utils';

export type MenuItemRender = (menu?: SubMenuIF) => ReactNode;

interface PropsIF {
  pathname: string;
  onToggle: (collapsed: boolean) => void;
  menus: SubMenuIF[];
  navMenu: Partial<NavMenuIF>;
  hasMainMenu?: boolean;
  menuItemRender?: MenuItemRender;
  collapsed: boolean;
}

interface StateIF {
  openKeys?: string[];
  selectedKeys: string[];
}

interface SiderManuKeysIF {
  mainKeys: string[];
  openKeys: string[];
  selectedKeys: string[];
  selectedMaps: Partial<SubMenuIF>[];
}

class SiderMenu extends PureComponent<PropsIF, StateIF> {
  // static contextTypes = {
  //   router: PropTypes.object, // eslint-disable-line
  // };

  siderMenuKeys: SiderManuKeysIF = {
    mainKeys: [],
    openKeys: [],
    selectedKeys: [],
    selectedMaps: [],
  };

  readonly state: StateIF = {
    openKeys: [],
    selectedKeys: [],
  };

  componentDidMount() {
    this.setSiderMenukeys();
  }

  componentWillReceiveProps(nextProps: PropsIF) {
    const { pathname, menus } = this.props;
    if (nextProps.pathname !== pathname) {
      this.setSelectedKeys(nextProps, true);
    }
    if (nextProps.menus !== menus) {
      this.setSiderMenukeys(nextProps);
    }
  }

  getMenuItem(menu: SubMenuIF) {
    const {
      navMenu: { to },
      menuItemRender,
    } = this.props;
    let corssModule = false;
    if (to && !menu.to.startsWith(to)) {
      corssModule = true;
    }

    return (
      <Item key={menu.to} icon={menu.icon} title={menu.name}>
        {!corssModule && menuItemRender ? menuItemRender(menu) : <a href={menu.to}>{menu.name}</a>}
      </Item>
    );
  }

  getSubMenu(menu: SubMenuIF) {
    const { to, name, icon } = menu;
    return (
      <SubMenu key={to} icon={icon} title={name}>
        {menu.menus!.map(item => {
          if (!item.hasSubMenu) {
            return this.getMenuItem(item);
          }
          return this.getSubMenu(item);
        })}
      </SubMenu>
    );
  }

  getMenus() {
    const { menus } = this.props;

    return menus.map(item => {
      if (!item.hasSubMenu) {
        return this.getMenuItem(item);
      }
      return this.getSubMenu(item);
    });
  }

  setSelectedKeys(nextProps?: PropsIF, open?: boolean) {
    const state: StateIF = {
      selectedKeys: [],
    };
    const { openKeys, selectedKeys, selectedMaps } = this.siderMenuKeys;
    const { pathname } = nextProps || this.props;

    if (!pathname) {
      return;
    }

    for (let i = 0; i < selectedKeys.length; i += 1) {
      const re = new RegExp(`^${escapeRegExp(selectedKeys[i])}(\\?|\\/|\\b)`);
      if (re.test(pathname)) {
        state.selectedKeys.push(selectedKeys[i]);
        break;
      }
    }

    const CurrentMenuInfo = selectedMaps.find(item => pathname.startsWith(item.to!)) || {};
    window.CurrentMenuInfo = CurrentMenuInfo;
    window._XFLOW_ && window._XFLOW_.setExtendsInfo({
      menu: CurrentMenuInfo.name,
    });

    if (open) {
      state.openKeys = [];
      for (let i = 0; i < openKeys.length; i += 1) {
        if ((pathname.startsWith(openKeys[i]) && openKeys[i]) || CurrentMenuInfo.parentUrl === openKeys[i]) {
          state.openKeys.push(openKeys[i]);
        }
      }
    }

    this.setState({ ...state });
  }

  setSiderMenukeys(nextProps?: PropsIF) {
    const { menus } = nextProps || this.props;

    this.siderMenuKeys = getSiderMenuKeys(menus);
    this.setSelectedKeys(nextProps, true);
  }

  handleOpenChange = (openKeys: string[]) => {
    const latestOpenKey = openKeys.find(key => !this.state.openKeys!.includes(key));
    const menuSwitch = openKeys.filter(openKey => this.siderMenuKeys.mainKeys.includes(openKey)).length > 1;
    this.setState({
      openKeys: menuSwitch ? [latestOpenKey as string] : [...openKeys],
    });
  };

  render() {
    const { onToggle, navMenu, hasMainMenu, collapsed } = this.props;
    const { openKeys, selectedKeys } = this.state;

    return (
      <Menu
        onToggle={onToggle}
        onOpenChange={this.handleOpenChange}
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        title={navMenu.name}
        hasMainMenu={hasMainMenu}
        collapsed={collapsed}
      >
        {this.getMenus()}
      </Menu>
    );
  }
}

export default SiderMenu;
