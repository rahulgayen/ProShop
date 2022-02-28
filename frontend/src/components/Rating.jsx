import React from "react";

const Rating = ({ value, text }) => {
  let ratingArray = [];
  let val = value;
  for (let i = 0; i < 5; i++) {
    if (val - 1 >= 0) ratingArray.push(1);
    else if (val - 1 === -0.5) ratingArray.push(0.5);
    else ratingArray.push(0);
    val--;
  }
  /* console.log(value, ratingArray); */
  return (
    <>
      <span>
        {ratingArray.map((el, index) => {
          if (el === 1) return <i key={index} className="text-light fa-solid fa-star"></i>;
          else if (el === 0.5) return <i key={index} className="text-light fa-solid fa-star-half-stroke"></i>;
          else return <i key={index} className="text-light fa-regular fa-star"></i>;
        })}
      </span>
      <span className="ms-1">{text && text}</span>
    </>
  );
};

export default Rating;
