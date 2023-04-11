import { Component } from 'react';
import { Row, Col } from 'antd';
import Movie from '../movie-item';

class RatedMovies extends Component {
  render() {
    const { rated: ratedMovies } = this.props;
    return (
      <Row gutter={[30, 30]} justify={!ratedMovies.length && 'center'}>
        {ratedMovies.length ? (
          ratedMovies.map((item) => (
            <Col lg={10} key={item.id}>
              <Movie item={item} />
            </Col>
          ))
        ) : (
          <Col span={4}>no rated movies yet</Col>
        )}
      </Row>
    );
  }
}

export default RatedMovies;
