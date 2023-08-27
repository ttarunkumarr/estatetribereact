import React, { useRef, useEffect } from 'react';
import Flickity from 'flickity';

import 'flickity/css/flickity.css'; // Import Flickity CSS

const FlickityCarousel = ({ children }) => {
  const flickityRef = useRef(null);

  useEffect(() => {
    flickityRef.current = new Flickity('.carousel', {
      // Flickity options
      // You can configure various options here
      // For example: contain: true, prevNextButtons: true, etc.
      contain: true, // Adjust to your needs
      prevNextButtons: true, // Add previous and next buttons
      autoPlay:1500,// Enable autoplay
      wrapAround: true,
    });

    return () => {
      // Clean up Flickity instance when component unmounts
      flickityRef.current.destroy();
    };
  }, []);

  return (
    <div className="carousel">
      {children}
    </div>
  );
};

export default FlickityCarousel;
