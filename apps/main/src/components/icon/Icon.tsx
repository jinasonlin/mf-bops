import React, { PureComponent } from 'react';

export interface IconProps {
  type: string;
  onClick?: (e: React.SyntheticEvent<any>) => void;
}

const customCache = new Set();

export default class Icon extends PureComponent<IconProps> {
  componentDidMount() {
    this.loadSymbol('//at.alicdn.com/t/font_1211865_p90xcf6wu9.js');
  }

  loadSymbol = (scriptUrl: string) => {
    if (
      typeof document !== 'undefined'
      && typeof window !== 'undefined'
      && typeof document.createElement === 'function'
      && typeof scriptUrl === 'string'
      && scriptUrl.length
      && !customCache.has(scriptUrl)
    ) {
      const script = document.createElement('script');
      script.setAttribute('src', scriptUrl);
      script.setAttribute('data-namespace', scriptUrl);
      customCache.add(scriptUrl);
      document.body.appendChild(script);
    }
  };

  render() {
    const { type, onClick } = this.props;
    return (
      <svg className="frame-icon" aria-hidden="true" onClick={onClick}>
        <use xlinkHref={`#icon-${type}`} />
      </svg>
    );
  }
}
