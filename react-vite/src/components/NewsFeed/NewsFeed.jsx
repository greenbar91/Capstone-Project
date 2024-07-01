import { useEffect, useRef, useState } from "react";
import "./NewsFeed.css"
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

function NewsFeed(){
    const images = [
        'https://i.imgur.com/iGnlL9w.png',
        'https://i.imgur.com/LsJ8rNY.png',
        'https://i.imgur.com/rS0x9JW.png',
      ];


      const [currentIndex, setCurrentIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const slideTimeoutRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      slideToNextImage();
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const slideToNextImage = () => {
    if (isSliding) return;
    setIsSliding(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    resetSliding();
  };

  const slideToPrevImage = () => {
    if (isSliding) return;
    setIsSliding(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    resetSliding();
  };

  const resetSliding = () => {
    if (slideTimeoutRef.current) {
      clearTimeout(slideTimeoutRef.current);
    }
    slideTimeoutRef.current = setTimeout(() => {
      setIsSliding(false);
    }, 800);
  };

  return (
    <div className="background-switcher">
      <div
        className="image-container"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="background-image"
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
      </div>
      <IoIosArrowBack className="arrow left-arrow" onClick={slideToPrevImage}/>
      <IoIosArrowForward className="arrow right-arrow" onClick={slideToNextImage}/>
    </div>
  );
}

export default NewsFeed
