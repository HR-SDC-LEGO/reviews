/* eslint-disable react/jsx-no-bind */
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Reviews from './ReviewsView.jsx';
import Overall from './Overall.jsx';
import Pagination from './Pagination.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalReviews: 0,
      overall: {},
      reviews: [],
      reviewPerPage: 5
    };
  }

  getRequest(number) {
    axios.get(`/api/products/3?page=${number}`)
      .then((response) => {
        // handle success
        // console.log(response.data)
        this.setState({
          totalReviews: response.data[0],
          reviews: response.data.slice(1)
        });
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .then(() => {
        // always executed
        this.getOverallRequest();
      });
  }

  getOverallRequest() {
    axios.get('/api/products/overall/3')
      .then((response) => {
        // handle success
        this.setState({
          overall: response.data[0]
        });
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .then(() => {
        // always executed
      });
  }

  paginate(pageNumber) {
    // this.getOverallRequest();
    this.getRequest(pageNumber);
  }

  componentDidMount() {
    this.getRequest();
  }

  render() {
    // console.log(this.state.reviews)
    const { overall, totalReviews, reviews, reviewPerPage } = this.state;
    return (
      <div>
        <Overall overall={overall} totalReviews={totalReviews} />
        <Reviews reviews={reviews} />
        <Pagination reviewPerPage={reviewPerPage} totalReviews={totalReviews} paginate={this.paginate.bind(this)} />
      </div>
    );
  }
}

export default App;