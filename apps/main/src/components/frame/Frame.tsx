import React, { Component, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { Content, Header, Layout, Sider } from '../layout';
import Nav from '../nav';
import Setting from '../setting';
import Icon from '../icon';
import {
  classnames,
  getNavMenu,
  getNavMenuIndex,
  getNavMenuKeys,
  getSiderMenu,
  MenuIF,
  NavMenuIF,
  SubMenuIF,
} from '../../utils';

import defaultLogo from '../../assets/logo.svg';
import SiderMenu from './SiderMenu';

interface BopsFrameProps {
  container: HTMLElement;
  systemName?: string; // 系统名称
  hasMainMenu?: boolean; // 是否显示一级菜单
  hasSubMenu?: boolean; // 是否显示二级菜单
  hasSetting?: boolean; // 是否显示个性化设置
  menus: MenuIF[]; // 可以传菜单数据
  userName?: string;
  loginName?: string;
  loginUrl?: string;
  logoutUrl?: string;
  logo?: ReactNode;
  className?: string;
}

interface BopsFrameStates {
  collapsed: boolean;
  navMenu: Partial<NavMenuIF>;
  navMenus: NavMenuIF[];
  siderMenus: SubMenuIF[];
  loginName?: string;
  userName?: string;
  globalControlVisible: boolean;
  isSettingVisible: boolean;
}
const prefix = 'frame-layout';
const header = `${prefix}-header`;

export default class Frame extends Component<BopsFrameProps, BopsFrameStates> {
  static init(opts: BopsFrameProps) {
    let { container } = opts;

    if (!container) {
      container = document.createElement('div');
      document.body.insertBefore(container, document.body.firstChild);
    }
    ReactDOM.render(<Frame {...opts} />, container);
  }

  static defaultProps: BopsFrameProps = {
    container: document.body,
    hasMainMenu: true,
    hasSubMenu: true,
    hasSetting: true,
    menus: [],
    loginUrl: '/nsso',
    logoutUrl: '/nsso/logout',
    systemName: '健康险运营系统',
  };

  constructor(props: BopsFrameProps) {
    super(props);
    this.state = {
      collapsed: false,
      globalControlVisible: false,
      navMenu: {},
      navMenus: [],
      siderMenus: [],
      isSettingVisible: false,
    };
  }

  componentDidMount() {
    this.setMenus();

    window.addEventListener('popstate', this.setMenus);
    window.addEventListener('hashchange', this.setMenus);
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.setMenus);
    window.removeEventListener('hashchange', this.setMenus);
  }

  private setMenus = () => {
    const { hasMainMenu, menus, loginName, userName } = this.props;
    const {
      location: { pathname },
    } = window;

    const { navMenus, subMenus } = getNavMenu(menus!);
    const navMenuKeys = getNavMenuKeys(navMenus);
    const navMenuIndex = getNavMenuIndex(navMenuKeys, pathname);
    const hasNav = navMenuIndex !== undefined;

    this.setState({
      loginName,
      userName,
      navMenus,
      navMenu: hasNav ? navMenus[navMenuIndex!] : {},
      siderMenus:
        hasNav || !hasMainMenu
          ? this.getSiderMenu(subMenus, navMenuIndex!)
          : [],
    });
  };

  private getSiderMenu = (subMenus: MenuIF[][], index: number) => {
    const { hasMainMenu } = this.props;

    if (!hasMainMenu) {
      return getSiderMenu(subMenus)[0];
    }
    return getSiderMenu(subMenus)[index];
  };

  private handleMenuToggle = (collapsed: boolean) => {
    this.setState({
      collapsed,
    });
    if (collapsed) {
      localStorage.menuStatus = 'fold';
    } else {
      localStorage.menuStatus = 'expand';
    }
  };

  private showGlobalControl = () => {
    this.setState({
      globalControlVisible: true,
    });
  };

  private hideGlobalControl = () => {
    this.setState({
      globalControlVisible: false,
    });
  };

  private toggleSettingPanel = (isSettingVisible: boolean) => {
    this.setState({
      isSettingVisible,
    });
  };

  render() {
    const {
      children,
      hasMainMenu,
      hasSubMenu,
      hasSetting,
      systemName,
      loginUrl,
      logoutUrl,
      logo,
      className = '',
    } = this.props;
    const {
      collapsed,
      globalControlVisible,
      siderMenus,
      navMenus,
      navMenu,
      loginName,
      userName,
      isSettingVisible,
    } = this.state;

    const cls = classnames({
      [`${prefix}-sider-without-mainmenu`]: !hasMainMenu,
      [`${prefix}-sider-with-menu`]: !collapsed && hasSubMenu,
      [`${prefix}-sider-collapsed`]: collapsed,
    });
    let {
      location: { pathname },
    } = window;
    const {
      location: { hash },
    } = window;
    if (hash) {
      pathname = `${pathname}${hash}`;
    }

    return (
      <Router>
      <Layout className="frame">
        <Layout row>
          <div
            style={{
              display: 'flex',
              width: collapsed ? 57 : 277,
              flex: collapsed ? '0 0 57' : '0 0 277px',
              minWidth: collapsed ? 57 : 277,
              maxWidth: collapsed ? 57 : 277,
              overflow: 'hidden',
              transition: 'all 0.2s',
            }}
          />
          <Sider className={cls}>
            <div className={`${prefix}-sider-logo`}>
              <a href="/">
                {logo || <img src={defaultLogo} alt="logo" />}
                {!collapsed && <h1>{systemName}</h1>}
              </a>
            </div>
            {hasMainMenu && (
              <Nav menus={navMenus} />
            )}
            {hasSubMenu && (
                <SiderMenu
                  pathname={pathname}
                  onToggle={this.handleMenuToggle}
                  menus={siderMenus}
                  navMenu={navMenu}
                  hasMainMenu={hasMainMenu}
                  collapsed={collapsed}
                />
            )}
          </Sider>
          <div className="frame-layout-content">
            <header
              style={{ height: 56, lineHeight: 56, background: 'transparent' }}
            />
            <Header
              style={{
                width: collapsed ? 'calc(100% - 56px)' : 'calc(100% - 277px)',
              }}
            >
              <div className={`${header}-actions`}>
                {hasSetting && (
                  <Icon
                    type="shezhi1"
                    onClick={() => this.toggleSettingPanel(true)}
                  />
                )}
                <div className={`${header}-user`}>
                  {/* eslint-disable-next-line multiline-ternary */}
                  {userName ? (
                    <div
                      onMouseEnter={this.showGlobalControl}
                      onMouseLeave={this.hideGlobalControl}
                    >
                      <span className={`${header}-user-avatar`}>
                        {loginName ? loginName[0].toUpperCase() : 'U'}
                      </span>
                      <span className={`${header}-user-name`}>{userName}</span>
                      <ul
                        className={classnames({
                          visible: globalControlVisible,
                        })}
                      >
                        <li>
                          <Icon type="tuichu" />
                          <a href={logoutUrl}>退出</a>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <a
                      href={`${loginUrl}?returnURL=${encodeURIComponent(
                        window.location.href,
                      )}`}
                    >
                      登录
                    </a>
                  )}
                </div>
              </div>
            </Header>
            {/* eslint-disable-next-line multiline-ternary */}
            {children ? (
              <Content id="frame-content" className={className}>
                {children}
              </Content>
            ) : (
              <div id="frame-content" className={className} />
            )}
          </div>
        </Layout>
        {hasSetting && (
          <Setting
            visible={isSettingVisible}
            onToggleSetting={this.toggleSettingPanel}
          />
        )}
      </Layout>
      </Router>
    );
  }
}
