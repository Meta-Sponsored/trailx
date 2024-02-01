import React from 'react';
import { Carousel } from "@material-tailwind/react";

const MyCarousel = () => {
  return (
    <div className="m-8">
      <Carousel>
        <img
          src="News & Updates 1.png"
          alt="News_Updates"
          className="w-full h-auto object-cover rounded-lg"
        />
        <img
          src="News & Updates 2.png"
          alt="Image 2"
          className="w-full h-auto object-cover rounded-lg"
        />
        <img
          src="News & Updates 3.png"
          alt="Image 3"
          className="w-full h-auto object-cover rounded-lg"
        />
      </Carousel>
    </div>
  );
};

export default MyCarousel;