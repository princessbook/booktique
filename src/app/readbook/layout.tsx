import React from 'react';
import Slider from 'react-slick';

const ReadBookLayout = ({ children }: { children: React.ReactNode }) => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };
  return (
    // <Slider {...settings}>
    <div className='h-full '>{children}</div>
    // {/* </Slider> */}
  );
};

export default ReadBookLayout;
