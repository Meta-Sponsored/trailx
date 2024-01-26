import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const MyCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div style={{ margin: '32px 0' }}>
      <Slider {...settings}>
        <div>
          <img src="News & Updates 1.png" alt="News_Updates" />
        </div>
        <div>
          <img src="path_to_image2.jpg" alt="Image 2" />
        </div>
      </Slider>
    </div>
  );
};

export default MyCarousel;
