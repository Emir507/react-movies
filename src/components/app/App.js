import React from 'react';
import { Row, Col, Input, Tabs } from 'antd';
import 'antd/dist/reset.css';
import { debounce } from 'lodash';

import './App.css';
import GenresContext from '../genres-context/GenresContext';

import Movie from '../movie-item';
import Error from '../error';
import Alerts from '../alerts';
import Loader from '../loader';
import Pagination from '../pagination';
import RatedMovies from '../rated-movies';
import SearchResultMovies from '../search-result-movies';

class App extends React.Component {
  state = {
    users: [],
    movies: [],
    rated: [],
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
    this.fetchMovies(this.state.searchString).catch((err) => {
      this.setState({
        loading: false,
        fetchError: true,
      });
      this.addAlert(err.message, 'error');
    });
    this.fetchGenres();
  }

  async fetchMovies(searchString) {
    const { currentPage } = this.state;
    this.setState({
      loading: true,
    });
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=1330d97b1fc8cf61cfc0d7240d769521&query=${searchString}&page=${currentPage}`,
    );
    const data = await res.json();
    data.results.forEach((element) => {
      element.rating = 0;
    });
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
    setTimeout(() => {
      this.setState({
        alerts: [],
      });
    }, 2000);
  }

  onPageChange = (page) => {
    this.setState(
      {
        currentPage: page,
      },
      () => this.fetchMovies(this.state.searchString),
    );
  };

  onRatingChange = (val, id) => {
    const movies = [...this.state.movies];
    const movie = movies.find((movie) => movie.id === id);
    movie.rating = val;
    this.setState({
      movies: movies,
    });
    if (this.state.rated.find((movie) => movie.id === id)) return;
    this.setState({
      rated: [movie, ...this.state.rated],
    });
  };

  render() {
    const {
      movies,
      rated,
      loading,
      fetchError,
      alerts,
      searchString,
      currentPage,
      totalPages,
      noResultsFound,
      genres,
    } = this.state;

    // components
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
              <Movie item={item} onRatingChange={this.onRatingChange} />
            </Col>
          ))}
        </Row>
        {!noResultsFound && (
          <Pagination
            currentPage={currentPage}
            onPageChange={this.onPageChange}
            totalPages={totalPages}
          />
        )}
      </>
    );
    const searchTabContent = (
      <>
        <SearchResultMovies
          searchString={searchString}
          onInput={this.onInput}
          loading={loading}
          fetchError={fetchError}
        />
        {!loading && !fetchError && mainElement}
      </>
    );
    // tabs items
    const items = [
      {
        key: '1',
        label: `Search`,
        children: searchTabContent,
      },
      {
        key: '2',
        label: `Rated`,
        children: <RatedMovies rated={rated} />,
      },
    ];
    return (
      <div className="App">
        <GenresContext.Provider value={genres}>
          <Tabs defaultActiveKey="1" items={items} />
          <Alerts alerts={alerts} />
        </GenresContext.Provider>
      </div>
    );
  }
}

export default App;
