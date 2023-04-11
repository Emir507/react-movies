import { Component } from 'react';
import { Tag } from 'antd';

import GenresContext from '../genres-context/GenresContext';

class GenresTags extends Component {
  static contextType = GenresContext;
  render() {
    const genres = this.context;
    const { genre_ids } = this.props;
    return (
      <div className="genres__container">
        {genre_ids.map((genre) => (
          <div
            key={genre}
            style={{
              padding: '5px',
            }}
          >
            <Tag style={{ margin: 0 }}>
              {genres.find((item) => item.id === genre) &&
                genres.find((item) => item.id === genre).name}
            </Tag>
          </div>
        ))}
      </div>
    );
  }
}

export default GenresTags;
