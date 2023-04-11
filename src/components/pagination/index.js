import { Component } from 'react';
import { ConfigProvider, Pagination as AntdPagination } from 'antd';

class Pagination extends Component {
  render() {
    const { currentPage, onPageChange, totalPages } = this.props;
    return (
      <ConfigProvider
        theme={{
          token: {
            colorText: '#595959',
            colorBgContainer: '#1890FF',
            colorBorder: '#1890FF',
            colorPrimary: 'white',
            controlItemBgActiveDisabled: '#595959',
          },
        }}
      >
        <AntdPagination
          current={currentPage}
          onChange={onPageChange}
          total={totalPages}
          showTotal={(total) => `Total ${total} items`}
        />
      </ConfigProvider>
    );
  }
}

export default Pagination;
