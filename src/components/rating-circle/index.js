import { Component } from 'react';
import './style.css';

class RatingCircle extends Component {
  render() {
    const { rating } = this.props;
    const ratingBorderColor =
      rating < 3
        ? '#E90000'
        : rating >= 3 && rating < 5
        ? '#E97E00'
        : rating >= 5 && rating < 7
        ? '#E9D100'
        : '#66E900';

    return (
      <div className="rating" style={{ borderColor: ratingBorderColor }}>
        {rating}
      </div>
    );
  }
}
export default RatingCircle;
