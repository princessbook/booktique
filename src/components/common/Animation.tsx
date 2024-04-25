import React from 'react';
import Lottie from 'react-lottie-player';
import lottie from '../../../public/animation.json';
const Animation = () => {
  return <Lottie loop animationData={lottie} play />;
};

export default Animation;
