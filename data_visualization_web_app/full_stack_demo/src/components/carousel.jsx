import React from 'react';
import { Carousel, IconButton } from "@material-tailwind/react";

const MyCarousel = () => {
  return (
    <div className="m-8 d-flex justify-content-center align-items-center" style={{ maxWidth: '544px', maxHeight: '272px' }}>
      <Carousel
        className="rounded-xl"
        prevArrow={({ handlePrev }) => (
          <IconButton
            variant="text"
            color="white"
            size="lg"
            onClick={handlePrev}
            className="!absolute top-2/4 left-4 -translate-y-2/4"
            style={{ position: 'absolute', top: '50%', left: '19px', transform: 'translateY(-50%)' }}
          >
            <img 
              src="Button Left.svg" 
              alt="Previous" 
              className="h-6 w-6"
            />
          </IconButton>
        )}
        nextArrow={({ handleNext }) => (
          <IconButton
            variant="text"
            color="white"
            size="lg"
            onClick={handleNext}
            className="!absolute top-2/4 !right-4 -translate-y-2/4"
            style={{ position: 'absolute', top: '50%', right: '19px', transform: 'translateY(-50%)' }}
          >
            <img 
              src="Button Right.svg" 
              alt="Next" 
              className="h-6 w-6"
            />
          </IconButton>
        )}
      >
        <img
          src="News & Updates 1.png"
          alt="News_Updates"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          className="w-full h-auto object-cover rounded-lg"
        />
        <img
          src="News & Updates 2.png"
          alt="Image 2"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          className="w-full h-auto object-cover rounded-lg"
        />
        <img
          src="News & Updates 3.png"
          alt="Image 3"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          className="w-full h-auto object-cover rounded-lg"
        />
      </Carousel>
    </div>
  );
};

export default MyCarousel;