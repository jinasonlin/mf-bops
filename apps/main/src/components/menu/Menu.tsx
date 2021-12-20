import React, { PureComponent, Children, ReactElement, ReactText, cloneElement } from 'react';
import { classnames } from '../../utils';

const prefixCls = 'frame-layout-sider-menu';

interface PropsIF {
  pefixCls?: string;
  menus?: object[];
  indent?: number;
  title?: string;
  onToggle: (collapsed: boolean) => void;
  onOpenChange: (openKeys: string[]) => void;
  openKeys: ReactText[];
  selectedKeys: ReactText[];
  hasMainMenu?: boolean;
  collapsed: boolean;
}

const initialState = {
  // collapsed: false,
  openKeys: [] as ReactText[],
  selectedKeys: [] as ReactText[],
};
type StateIF = Readonly<typeof initialState>;

export default class Menu extends PureComponent<PropsIF, StateIF> {
  readonly state: StateIF = initialState;

  static defaultProps = {
    prefixCls,
    indent: 24,
    onToggle: () => {},
    openKeys: [],
    selectedKeys: [],
  };

  constructor(props: PropsIF) {
    super(props);
    const { openKeys, selectedKeys } = props;

    this.state = {
      ...initialState,
      openKeys: openKeys || [],
      selectedKeys: selectedKeys || [],
    };
  }

  componentDidMount() {
    const status = localStorage.menuStatus;
    if (status === 'fold') {
      this.handleMenuFold();
    } else if (status === 'expand') {
      this.handleMenuExpand();
    }
  }

  componentWillReceiveProps(nextProps: PropsIF) {
    const { openKeys, selectedKeys } = this.state;
    if (nextProps.openKeys !== openKeys || nextProps.selectedKeys !== selectedKeys) {
      this.setState({
        openKeys: nextProps.openKeys || [],
        selectedKeys: nextProps.selectedKeys || [],
      });
    }
  }

  private toggleOpenKeys = (subMenuKey: ReactText) => {
    // const { onOpenChange } = this.props;
    const { openKeys } = this.state;
    const newOpenKeys = [...openKeys];

    const index = newOpenKeys.indexOf(subMenuKey);
    if (index > -1) {
      newOpenKeys.splice(index, 1);
    } else {
      newOpenKeys.push(subMenuKey);
    }

    // if (onOpenChange) {
    //   onOpenChange(openKeys as string[]);
    // }
    this.setState({
      openKeys: newOpenKeys,
    });
  };

  private toggleSelectedKeys = (itemKey: ReactText) => {
    const { selectedKeys } = this.state;
    let newSelectedKeys = [...selectedKeys];

    const index = newSelectedKeys.indexOf(itemKey);
    if (index === -1) {
      newSelectedKeys = [itemKey];
      this.setState({
        selectedKeys: newSelectedKeys,
      });
    }
  };

  private handleMenuFold = () => {
    this.props.onToggle(true);
  };

  private handleMenuExpand = () => {
    this.props.onToggle(false);
  };

  private renderChildren() {
    const { toggleOpenKeys, toggleSelectedKeys } = this;
    const { children, indent } = this.props;
    const { openKeys, selectedKeys } = this.state;

    return Children.map(children as ReactElement[], (child, index) => {
      if (child) {
        const p = {
          indent,
          prefixCls,
          openKeys,
          selectedKeys,
          toggleOpenKeys,
          toggleSelectedKeys,
          subMenuKey: `0-${index}` as ReactText,
          itemKey: `0-${index}` as ReactText,
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
    const { title, hasMainMenu, collapsed } = this.props;

    const cls = classnames(prefixCls, {
      [`${prefixCls}-collapsed`]: collapsed,
    });
    return (
      <div className={cls} role="menu">
        {hasMainMenu && title && <h2>{title}</h2>}
        <ul>{this.renderChildren()}</ul>
        <span className={`${prefixCls}-fold`} onClick={this.handleMenuFold} />
        <span className={`${prefixCls}-expand`} onClick={this.handleMenuExpand} />
      </div>
    );
  }
}
