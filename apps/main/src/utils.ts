export const classnames: (...args: any[]) => string = (...args) => {
  const classes: any[] = [];

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg) continue; // eslint-disable-line

    const argType = typeof arg;

    if (argType === 'string' || argType === 'number') {
      classes.push(arg);
    } else if (Array.isArray(arg) && arg.length) {
      const inner = classnames(...arg);
      if (inner) {
        classes.push(inner);
      }
    } else if (argType === 'object') {
      Object.keys(arg).forEach((key) => {
        if (arg[key]) {
          classes.push(key);
        }
      });
    }
  }

  return classes.join(' ');
};

export const noop = () => {};

export interface MenuIF {
  menuName: string;
  menuCode: string;
  url: string;
  order: string;
  icon?: string;
  childrenMenuViewList?: MenuIF[];
}

export interface NavMenuIF {
  to: string;
  name: string;
  icon?: string;
}

export interface SubMenuIF extends NavMenuIF {
  hasSubMenu: boolean;
  code: string;
  menus?: SubMenuIF[];
  parentUrl?: string;
}

export const getNavMenu = (menus: MenuIF[]) => {
  const navMenus: NavMenuIF[] = [];
  const subMenus: MenuIF[][] = [];

  if (!menus) return { navMenus, subMenus };

  menus
    .sort((a, b) => Number(a.order) - Number(b.order))
    .forEach((item) => {
      navMenus.push({
        to: item.url,
        name: item.menuName,
        icon: item.icon,
      });
      subMenus.push(item.childrenMenuViewList!);
    });
  return { navMenus, subMenus };
};

export const getNavMenuKeys = (menus: NavMenuIF[]) => {
  const keys: string[] = [];

  menus.forEach((item) => {
    keys.push(item.to);
  });

  return keys;
};

export const getNavMenuIndex = (keys: string[], pathname: string) => {
  let index;

  for (let i = 0; i < keys.length; i += 1) {
    if (keys[i].startsWith(pathname) || pathname.startsWith(keys[i])) {
      index = i;
      break;
    }
  }

  return index;
};

export const getSubMenu = (menus: MenuIF[]) => {
  const subMenus: SubMenuIF[] = [];
  menus
    .sort((a, b) => Number(a.order) - Number(b.order))
    .forEach((item) => {
      const _item: SubMenuIF = {
        hasSubMenu: false,
        to: item.url,
        name: item.menuName,
        icon: item.icon,
        code: item.menuCode,
      };
      if (item.childrenMenuViewList && item.childrenMenuViewList.length) {
        _item.hasSubMenu = true;
        _item.menus = getSubMenu(item.childrenMenuViewList);
      }
      subMenus.push(_item);
    });
  return subMenus;
};

export const getSiderMenu = (menus: MenuIF[][]) => {
  const siderMenus: SubMenuIF[][] = [];
  menus.forEach((item) => {
    if (Array.isArray(item)) {
      siderMenus.push(getSubMenu(item));
    } else {
      siderMenus.push([]);
    }
  });
  return siderMenus;
};

export const getSiderMenuKeys = (menus: SubMenuIF[], parentUrl?: string) => {
  /**
   * @param {Array} mainKeys        顶层菜单项键值
   * @param {Array} openKeys        可折叠菜单项键值
   * @param {Array} selectedKeys    可选中菜单项键值
   * @param {Array} selectedMaps    可选中菜单项数据
   */
  const mainKeys: string[] = [];
  let openKeys: string[] = [];
  let selectedKeys: string[] = [];
  let selectedMaps: Partial<SubMenuIF>[] = [];

  menus.forEach((item) => {
    if (!item.hasSubMenu) {
      selectedKeys.push(item.to);
      selectedMaps.push({
        to: item.to,
        name: item.name,
        code: item.code,
        parentUrl,
      });
    } else {
      mainKeys.push(item.to);
      openKeys.push(item.to);
      const { openKeys: _openKeys, selectedKeys: _selectedKeys, selectedMaps: _selectedMaps } = getSiderMenuKeys(item.menus!, item.to);
      openKeys = [...openKeys, ..._openKeys];
      selectedKeys = [...selectedKeys, ..._selectedKeys];
      selectedMaps = [...selectedMaps, ..._selectedMaps];
    }
  });

  return { mainKeys, openKeys, selectedKeys, selectedMaps };
};

export const reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
export const escapeRegExp = (str: string) => {
  return str.replace(reRegExpChar, '\\$&');
};
