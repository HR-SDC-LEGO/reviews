import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import OverallReview from './OverallReview.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: []
    };
  }

  getRequest() {
    axios.get('/api/products/1')
      .then((response) => {
        // handle success
        // console.log(response.data);
        this.setState({
          reviews: response.data
        });
      })
      .catch((error)=> {
        // handle error
        console.log(error);
      })
      .then(() => {
        // always executed
      });
  }

  componentDidMount() {
    this.getRequest();
  }

  render() {
    return (
      <div>
        <h1>Customer Reviews</h1>
        {/* <OverallReview reviews = {this.state.reviews} /> */}
      </div>
    );
  }
}

export default App;