import React, {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";

const Carousel = forwardRef((props, ref) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideColors, setSlideColors] = useState([
    "blue",
    "gray",
    "red",
    "green",
    "yellow",
    "orange",
    "purple",
    "pink",
  ]);

  const next = () => {
    setCurrentSlide((prev) => (prev + 1) % slideColors.length);
  };

  const prev = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + slideColors.length) % slideColors.length
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index % slideColors.length);
  };

  const changeSlideColor = () => {
    setSlideColors((prevColors) => {
      const newColors = [...prevColors];
      const randomColor =
        slideColors[Math.floor(Math.random() * slideColors.length)];
      newColors[currentSlide] = randomColor;
      return newColors;
    });
  };

  useImperativeHandle(
    ref,
    () => ({
      next,
      prev,
      goToSlide,
      changeSlideColor,
    }),
    []
  );

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {slideColors.map((color, index) => (
        <div
          key={index}
          style={{
            width: "200px",
            height: "200px",
            backgroundColor: color,
            display: index === currentSlide ? "block" : "none",
          }}
        >
          Slide {index}
        </div>
      ))}
    </div>
  );
});

export default Carousel;
