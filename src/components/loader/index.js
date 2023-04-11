import { Component } from 'react';
import { Spin } from 'antd';
import './style.css';

class Loader extends Component {
  render() {
    return (
      <div className="spin">
        <Spin size="large" />
      </div>
    );
  }
}

export default Loader;
