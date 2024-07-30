import React, { useRef, useState } from "react";
import Carousel from "./Carousel";

const CarouselController = () => {
  const carouselRef = useRef();
  const [slideIndex, setSlideIndex] = useState();
  const handleNext = () => {
    carouselRef.current.next();
  };

  const handlePrev = () => {
    carouselRef.current.prev();
  };

  const handleGoToSlide = (index) => {
    carouselRef.current.goToSlide(index);
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value);
    setSlideIndex(value);
    handleGoToSlide(value);
  };

  const handleChangeColor = () => {
    carouselRef.current.changeSlideColor();
  };

  return (
    <div className="flex flex-col items-center p-6 justify-center    ">
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-700 transition duration-300 mx-2"
          onClick={handlePrev}
        >
          Previous
        </button>
        <Carousel ref={carouselRef} />
        <button
          className="bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-700 transition duration-300 mx-2"
          onClick={handleNext}
        >
          Next
        </button>
      </div>

      <div className="mt-6 space-y-2">
        <input
          type="number"
          placeholder="Slide Index"
          value={slideIndex}
          onChange={handleInputChange}
          className="ml-4 border rounded-lg py-2 px-3"
        />
        <button
          className="bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-700 transition duration-300"
          onClick={handleChangeColor}
        >
          Change color
        </button>
      </div>
    </div>
  );
};

export default CarouselController;
