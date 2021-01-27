import React from 'react';

class displayParagraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidingParagraph: '60px',
      displayParagraph: 'Read more'
    };
  }

  hiddenParagraph() {
    if (this.state.hidingParagraph === '60px') {
      this.setState({
        hidingParagraph: 'auto',
        displayParagraph: 'Show Less'
      });
    } else if (this.state.hidingParagraph === 'auto') {
      this.setState({
        hidingParagraph: '60px',
        displayParagraph: 'Read more'
      });
    }
  }

  render() {
    return (
      <div className='paragraph'>
        <p className='paragraph-content' style={{ height: this.state.hidingParagraph }}>
          {this.props.content}
        </p>
        <div>
          <button className='paragraph-button' type='button' onClick={() => { this.hiddenParagraph(); }}>{this.state.displayParagraph}</button>
        </div>
      </div>
    );
  }
}
export default displayParagraph;