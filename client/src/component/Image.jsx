/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useEffect } from 'react';

const Image = (props) => {
  // console.log(props.img)
  const [displayImg, setDisplay] = useState('none');
  const [srcImg, setSrc] = useState('');

  const popUpStyle = {
    display: displayImg,
    src: srcImg
  };

  const popUpImg = (e) => {
    // console.log(popUpStyle);
    setDisplay('block');
    setSrc(e.target.src);
  };

  const closeImg = () => {
    // console.log('close');
    setDisplay('none');
  };
  return (
      <div className='img'>
        <span className='image-size'>
          <img src={props.img} alt="user's upload" style={{ height: '60px', width: '60px' }} onClick={(e) => { popUpImg(e); }} />
        </span>
        <span id='myModal' className='modal' style={{ display: displayImg }}>
          <span className='close' onClick={(e) => { closeImg(); }}>&times;</span>
          <img className='modal-content' id='img01' src={srcImg} />
        </span>
      </div>
  );
};

export default Image;