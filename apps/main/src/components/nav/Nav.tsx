import React, { memo, useCallback, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { NavMenuIF } from '../../utils';
import Icon from '../../components/icon';

const prefix = 'frame-layout-sider';

interface PropsIF {
  menus: NavMenuIF[];
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

function Nav(props: PropsIF) {
  const { menus } = props;
  const [isShowNavTxt, setIsShowNavTxt] = useState(false);

  return (
    <div
      className={`${prefix}-nav ${isShowNavTxt ? 'nav-hoverd' : ''}`}
      onMouseEnter={() => setIsShowNavTxt(true)}
      onMouseLeave={() => setIsShowNavTxt(false)}
    >
      <ul>
        {menus.map(({ to, name, icon }) => {
          return (
            <NavLink key={to} to={to} className="nav-link" activeClassName="active">
              <Icon type={icon || Icons[name]} />
              <h2>{name}</h2>
            </NavLink>
          );
        })}
      </ul>
    </div>
  );
}

export default memo(Nav);
