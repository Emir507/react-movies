import { Component } from 'react';
import { format, parseISO } from 'date-fns';
import {
  // Button,
  Card,
  Col,
  Row,
  Tag,
} from 'antd';
class Movie extends Component {
  render() {
    const { title, release_date, genre_ids, overview, poster_path } =
      this.props;
    const imageStyles = { width: '100%' };
    const placeholderImage =
      'https://images.pexels.com/photos/13733057/pexels-photo-13733057.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load';
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
            <div>
              <img style={imageStyles} src={imageUrl} />
            </div>
          </Col>
          <Col xs={13}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '12px',
                textAlign: 'left',
              }}
            >
              <span>{title}</span>
              <span>{date}</span>
              <div style={{ display: 'flex' }}>
                {genre_ids.map((genre) => (
                  <Tag key={genre}>{genre}</Tag>
                ))}
              </div>
              <p>{overview}</p>
            </div>
          </Col>
        </Row>
      </Card>
    );
  }
}
// function Movie() {
//   const imageUrl =
//     'https://images.pexels.com/photos/13733057/pexels-photo-13733057.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load';
//   const imageStyles = { width: '100%' };
//   return (
//     <Card style={{ borderRadius: 0 }} bodyStyle={{ padding: 0 }}>
//       <Row>
//         <Col xs={11}>
//           <div>
//             <img style={imageStyles} src={imageUrl} />
//           </div>
//         </Col>
//         <Col xs={13}>
//           <div
//             style={{
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'flex-start',
//               padding: '12px',
//             }}
//           >
//             <span className="text">the way back</span>
//             <span>date</span>
//             <span>genres</span>
//             <p>description</p>
//           </div>
//         </Col>
//       </Row>
//     </Card>
//   );
// }

export default Movie;
