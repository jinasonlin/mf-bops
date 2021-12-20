import React, { Component } from 'react';
import { classnames } from '../../utils';
import Icon from '../icon';

interface PropsIF {
  visible: boolean;
  onToggleSetting: (isSettingVisible: boolean) => void;
}

const prefixCls = 'frame-layout-setting';

export default class SettingPanel extends Component<PropsIF> {
  state = {
    currentBackground: '#f0f2f5',
  };

  reference?: HTMLDivElement;

  static setContentBgColor(color: string) {
    const content = document.getElementById('frame-content');
    if (content) {
      content.style.backgroundColor = color;
    }
  }

  componentDidMount() {
    const color = localStorage.bopsBgColor;
    if (color) {
      SettingPanel.setContentBgColor(color);
      this.setState({
        currentBackground: color,
      });
    }
    this.handleClickOutSide();
  }

  handleClickOutSide = () => {
    const { reference } = this;
    document.addEventListener('click', (e) => {
      const { visible, onToggleSetting } = this.props;
      const target = e.target as Node;
      if (reference && !reference.contains(target)) {
        if (visible) {
          onToggleSetting(false);
        }
      }
    }, true);
  };

  handleMouseEnterBG = (color: string) => {
    const { currentBackground } = this.state;

    if (color !== currentBackground) {
      SettingPanel.setContentBgColor(color);
    }
  };

  handleMouseLeaveBG = (color: string) => {
    const { currentBackground } = this.state;

    if (color !== currentBackground) {
      SettingPanel.setContentBgColor(currentBackground);
    }
  };

  handleClickBG = (color: string) => {
    this.handleMouseEnterBG(color);

    this.setState({
      currentBackground: color,
    });
    localStorage.bopsBgColor = color;
  };

  renderBackgrounds() {
    const { currentBackground } = this.state;
    const colors = ['#fafafa', '#f0f2f5', '#f2f2f2'];
    return (
      <section>
        <h3>背景色</h3>
        <div>
          {
            colors.map((color) => {
              const cls = classnames(`${prefixCls}-background`, {
                [`${prefixCls}-background-selected`]: color === currentBackground,
              });
              return (
                <div
                  style={{ backgroundColor: color }}
                  className={cls}
                  key={color}
                  onClick={() => this.handleClickBG(color)}
                />
              );
            })
          }
        </div>
      </section>
    );
  }

  render() {
    const { visible, onToggleSetting } = this.props;

    const cls = classnames(prefixCls, {
      [`${prefixCls}-show`]: visible,
    });

    return (
      <div className={cls} ref={(reference) => { this.reference = reference!; }}>
        <h2>
          个性化配置
          <Icon type="close" onClick={() => onToggleSetting(false)} />
        </h2>
        {this.renderBackgrounds()}
      </div>
    );
  }
}
