import { Component } from 'react';
import { Input } from 'antd';

import Loader from '../loader';
import Error from '../error';

class SearchResultMovies extends Component {
  render() {
    const { loading, fetchError, onInput, searchString } = this.props;
    return (
      <>
        <Input
          placeholder="Type to search"
          style={{ marginBottom: '20px' }}
          onInput={onInput}
          value={searchString}
        />
        {loading && <Loader />}
        {!loading && fetchError && <Error />}
      </>
    );
  }
}

export default SearchResultMovies;
