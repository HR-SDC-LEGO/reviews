/* eslint-disable react/jsx-no-bind */
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Reviews from './ReviewsView.jsx';
import Overall from './Overall.jsx';
import Pagination from './Pagination.jsx';
import SortData from './SortData.jsx';
import TopBar from './TopBar.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalReviews: 0,
      overall: {},
      reviews: [],
      reviewPerPage: 5,
      hiding: '0px'
    };
  }

  getRequest(number, sort) {
    // console.log(number)
    axios.get(`/api/products/2?page=${number}&sort=${sort}`)
    // axios.get(`/api/products/${window.location.pathname.slice(-2, -1)}?page=${number}&sort=${sort}`)
    // axios.get(`/api${window.location.pathname}?page=${number}&sort=${sort}`)
      .then((response) => {
        // handle success
        // console.log(window.location.pathname);
        // console.log(window.location.pathname.slice(-2, -1))
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
    axios.get('/api/products/overall/2')
    // axios.get(`/api/products/overall/${window.location.pathname.slice(-2, -1)}`)
      .then((response) => {
        // handle success
        // console.log(response)
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

  hiddenContent() {
    if (this.state.hiding === '0px') {
      this.setState({ hiding: 'auto' });
    } else if (this.state.hiding === 'auto') {
      this.setState({ hiding: '0px' });
    }
  }

  paginate(pageNumber) {
    // this.getOverallRequest();
    this.getRequest(pageNumber);
  }

  handleSortData(e) {
    // this.getRequest();
    this.getRequest(1, e);
  }

  componentDidMount() {
    this.getRequest();
  }

  render() {
    // console.log(this.state.reviews)
    const { overall, totalReviews, reviews, reviewPerPage, hiding } = this.state;
    if (!totalReviews || !overall) {
      return 'loading...';
    }
    return (
      <div className='container'>
        <TopBar totalReviews={totalReviews} hiddenContent={this.hiddenContent.bind(this)} />
        <div className='wrapper' style={{ height: hiding }}>
          <div className='style_wrapper'>
            <Overall overall={overall} />
            <SortData sortData={this.handleSortData.bind(this)} />
            <Reviews reviews={reviews} />
            <Pagination reviewPerPage={reviewPerPage} totalReviews={totalReviews} paginate={this.paginate.bind(this)} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;