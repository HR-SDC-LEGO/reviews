/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import axios from 'axios';

class LikeDislike extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      like: false,
      dislike: false,
      helpful_yes: '',
      helpful_no: '',
      id: ''
    };
  }

  putRequest(data) {
    axios.put('/api/reviews/3', data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  likeClick(event) {
    event.preventDefault();
    const updateData = {
      id: event.target.name,
      likeOrDislike: event.target.value,
      option: event.target.placeholder
    };

    if (updateData.option === 'helpful_yes') {
      if (this.state.like === false && this.state.dislike === false) {
        updateData.likeOrDislike = Number(updateData.likeOrDislike) + 1;
        this.setState({
          like: true,
          helpful_yes: `${updateData.likeOrDislike}`
        });
        this.putRequest(updateData);
      } else if (this.state.like === true && this.state.dislike === false) {
        updateData.likeOrDislike = Number(updateData.likeOrDislike) - 1;
        this.setState({
          like: false,
          helpful_yes: `${updateData.likeOrDislike}`
        });
        this.putRequest(updateData);
      }
    } else if (updateData.option === 'helpful_no') {
      if (this.state.dislike === false && this.state.like === false) {
        updateData.likeOrDislike = Number(updateData.likeOrDislike) + 1;
        this.setState({
          dislike: true,
          helpful_no: `${updateData.likeOrDislike}`
        });
        this.putRequest(updateData);
      } else if (this.state.dislike === true && this.state.like === false) {
        updateData.likeOrDislike = Number(updateData.likeOrDislike) - 1;
        this.setState({
          dislike: false,
          helpful_no: `${updateData.likeOrDislike}`
        });
        this.putRequest(updateData);
      }
    }
  }

  componentDidMount(props) {
    this.setState({
      helpful_yes: this.props.helpful_yes,
      helpful_no: this.props.helpful_no,
      id: this.props.id
    });
  }

  render(props) {
    // console.log(this.props)
    return (
      <div className='btn-liked-dislike'>
        <form onClick={this.likeClick.bind(this)}>👍
          <input className='liked-dislike' type='submit' value={this.state.helpful_yes} name={this.state.id} placeholder='helpful_yes' />
        </form>
        <form onClick={this.likeClick.bind(this)}>👎
          <input type='submit' className='liked-dislike' value={this.state.helpful_no} name={this.state.id} placeholder='helpful_no' />
        </form>
      </div>
    );
  }
}

export default LikeDislike;