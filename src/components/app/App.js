import React from 'react';
import { Row, Col, Spin, Alert, Input, Pagination, ConfigProvider } from 'antd';
import 'antd/dist/reset.css';
import { debounce } from 'lodash';

import './App.css';
import Movie from '../movie-item';
import Error from '../error';

class App extends React.Component {
  state = {
    users: [],
    movies: [],
    genres: [],
    loading: false,
    fetchError: false,
    alerts: [],
    searchString: 'return',
    currentPage: 1,
    totalPages: 0,
    noResultsFound: false,
  };

  componentDidMount() {
    this.fetchMovies().catch((err) => {
      this.setState({
        loading: false,
        fetchError: true,
      });
      this.addAlert(err.message, 'error');
    });
    this.fetchGenres();
  }

  async fetchMovies(searchString = 'return') {
    const { currentPage } = this.state;
    this.setState({
      loading: true,
    });
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=1330d97b1fc8cf61cfc0d7240d769521&query=${searchString}&page=${currentPage}`,
    );
    const data = await res.json();

    this.setState({
      movies: data.results,
      loading: false,
      totalPages: data.total_pages,
      noResultsFound: data.results.length ? false : true,
    });
  }

  async fetchGenres() {
    const res = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=1330d97b1fc8cf61cfc0d7240d769521`,
    );
    const data = await res.json();
    this.setState({
      genres: data.genres,
    });
  }

  search = debounce(
    (searchString) => searchString && this.fetchMovies(searchString),
    500,
  );

  onInput = (e) => {
    this.setState(
      {
        searchString: e.target.value,
        currentPage: 1,
      },
      () => this.search(e.target.value),
    );
  };

  addAlert(text, type) {
    this.setState({
      alerts: [{ id: 1, type, text }],
    });

    this.setState({
      alerts: [],
    });
  }

  onPageChange = (page) => {
    this.setState(
      {
        currentPage: page,
      },
      () => this.fetchMovies(this.state.searchString),
    );
  };

  render() {
    const {
      movies,
      loading,
      fetchError,
      alerts,
      searchString,
      currentPage,
      totalPages,
      noResultsFound,
      genres,
    } = this.state;

    const spinStyles = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    };
    const alertStyles = {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: '300px',
      zIndex: 10,
    };

    const spinElement = (
      <div style={spinStyles}>
        <Spin size="large" />
      </div>
    );
    const mainElement = (
      <>
        {noResultsFound && 'no found'}
        <Row
          justify={'center'}
          gutter={[30, 30]}
          style={{ marginBottom: '20px' }}
        >
          {movies.map((item) => (
            <Col lg={10} key={item.id}>
              <Movie {...item} genres={genres} />
            </Col>
          ))}
        </Row>
        {!noResultsFound && (
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
            <Pagination
              current={currentPage}
              onChange={this.onPageChange}
              total={totalPages}
              showTotal={(total) => `Total ${total} items`}
            />
          </ConfigProvider>
        )}
      </>
    );
    const errorElement = <Error />;
    const alertElements = alerts.map((alert) => (
      <Alert key={alert.id} message={alert.text} type={alert.type} />
    ));

    return (
      <div className="App">
        <div style={alertStyles}>{alertElements}</div>
        <Input
          placeholder="Type to search"
          style={{ marginBottom: '20px' }}
          onInput={this.onInput}
          value={searchString}
        />
        {!loading && !fetchError && mainElement}
        {loading && spinElement}
        {!loading && fetchError && errorElement}
      </div>
    );
  }
}

export default App;
