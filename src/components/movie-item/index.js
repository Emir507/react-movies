import { Component } from 'react';
import { format, parseISO } from 'date-fns';
import { Card, Col, Row, Tag, ConfigProvider } from 'antd';
import Rate from '../rate';
import './movie-item.css';

import RatingCircle from '../rating-circle';
import GenresTags from '../genres-tags';

const placeholderImage =
  'https://images.pexels.com/photos/13733057/pexels-photo-13733057.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load';

class Movie extends Component {
  render() {
    const {
      title,
      release_date,
      genre_ids,
      overview,
      poster_path,
      rating,
      id: itemId,
    } = this.props.item;
    const { onRatingChange } = this.props;

    const imageUrl = poster_path
      ? 'https://image.tmdb.org/t/p/w500' + poster_path
      : placeholderImage;
    let date;

    try {
      date = format(parseISO(release_date), 'LLLL d, Y');
    } catch {
      date = 'unknown';
    }

    return (
      <Card style={{ borderRadius: 0 }} bodyStyle={{ padding: 0 }}>
        <Row>
          <Col xs={11}>
            <div className="poster">
              <img src={imageUrl} />
            </div>
          </Col>
          <Col xs={13}>
            <div className="text-content">
              <RatingCircle rating={rating} />

              <span style={{ marginBottom: '5px' }}>{title}</span>
              <span style={{ marginBottom: '5px' }}>{date}</span>
              {genre_ids.length ? <GenresTags genre_ids={genre_ids} /> : null}
              <p>{overview}</p>

              <Rate
                rating={rating}
                onRateChange={(val) => {
                  onRatingChange(val, itemId);
                }}
              />
            </div>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default Movie;
