import React from 'react';
import './P1.css';

const P1 = props => {
  const {
    scale = 100,
    tranY = 100,
    rotate = 0,
    p1Opacity = 1,
    onP1Clicked = () => {},
  } = props;
  console.log(rotate)
  return (
    <div className="background-1">
      <div className="wrapper">
        <img
          src={require('./../asset/image/p1.png')}
          className="p1"
          style={{
            transform: `scale(${scale / 100}, ${scale / 100})`,
            opacity: p1Opacity
          }}
        />
        <img
          className="hammer"
          src={require('../asset/image/hammer.png')}
          onClick={onP1Clicked}
          style={{
            transform: `translateY(${100 - tranY}%) rotate(${rotate}deg)`
          }}
        />
      </div>
    </div>
    // <img
    //   src={require('./../asset/image/p1.png')}
    //   className="p1"
    //   style={{
    //     transform: `scale(${scale / 100}, ${scale / 100})`
    //   }}
    //   onClick={onP1Clicked}
    // />
  )
}

export default P1;