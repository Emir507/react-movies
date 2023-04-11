import { Component } from 'react';
import { Alert } from 'antd';
import './style.css';

class Alerts extends Component {
  render() {
    const { alerts } = this.props;
    return (
      <div className="alerts">
        {alerts.map((alert) => (
          <Alert key={alert.id} message={alert.text} type={alert.type} />
        ))}
      </div>
    );
  }
}
export default Alerts;
