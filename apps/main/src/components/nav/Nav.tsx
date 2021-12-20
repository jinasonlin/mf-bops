import React, { memo, useCallback, useMemo, useState } from 'react';
import { NavMenuIF, classnames } from '../../utils';
import Icon from '../../components/icon';

const prefix = 'frame-layout-sider';

interface PropsIF {
  menus: NavMenuIF[];
  pathname: string;
  routerLink: any;
  handleMenuToggle: (e: boolean) => void;
}

const Icons: {
  [key: string]: string;
} = {
  产品说明书: 'document',
  续保管理平台: 'renew',
  意健险: 'accident',
  健康险个险: 'personal',
  雇主责任险: 'employer',
  运营后台管理: 'support',
  公共功能: 'common',
  询报价: 'quote',
  数据风控: 'datarisk',
  商品中心: 'goods',
  个险前置服务系统: 'support',
  个险续保运营系统: 'renew',
  个险前置核心系统: 'personal',
  健康管理: 'healthManage',
};

const appsConfig: any[] = [];

function Nav(props: PropsIF) {
  const { menus, pathname, routerLink: RouterLink, handleMenuToggle } = props;
  const [isShowNavTxt, setIsShowNavTxt] = useState(false);

  const calcMenus = useMemo(() => {
    return menus.map((menu: any) => {
      if (appsConfig.find(app => app.activeRule === menu.to)) {
        menu.isMfeModule = true;
      }
      return menu;
    });
  }, [menus]);

  const handleClickNavItem = useCallback(() => {
    handleMenuToggle(false);
    setIsShowNavTxt(false);
  }, [handleMenuToggle]);

  return (
    <div
      className={`${prefix}-nav ${isShowNavTxt ? 'nav-hoverd' : ''}`}
      onMouseEnter={() => setIsShowNavTxt(true)}
      onMouseLeave={() => setIsShowNavTxt(false)}
    >
      <ul>
        {calcMenus.map(({ to, name, icon, isMfeModule }) => {
          const cls = classnames({
            active: pathname.startsWith(to),
          });
          return (
            <li key={to} className={cls} onClick={handleClickNavItem}>
              {// eslint-disable-next-line multiline-ternary
              isMfeModule && RouterLink ? (
                <RouterLink to={to}>
                  <Icon type={icon || Icons[name]} />
                  <h2>{name}</h2>
                </RouterLink>
              ) : (
                <a href={to}>
                  <Icon type={icon || Icons[name]} />
                  <h2>{name}</h2>
                </a>
                // eslint-disable-next-line
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default memo(Nav);
