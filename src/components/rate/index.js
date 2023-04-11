import { Component } from 'react';
import { ConfigProvider, Rate as AntdRate } from 'antd';

class Rate extends Component {
  render() {
    const { rating, onRateChange } = this.props;
    return (
      <ConfigProvider
        theme={{
          token: {
            marginXS: 5,
          },
        }}
      >
        <AntdRate count={10} allowHalf value={rating} onChange={onRateChange} />
      </ConfigProvider>
    );
  }
}
export default Rate;
