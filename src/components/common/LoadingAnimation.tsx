import React from 'react';
import Lottie from 'react-lottie-player';
import lottie from '../../../public/animation.json';

const LoadingAnimation = () => {
  return <Lottie loop animationData={lottie} play />;
};

export default LoadingAnimation;
