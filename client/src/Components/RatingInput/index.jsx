import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons'
import React from "react";
import "./style.css"
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Rating = ({ data, onRatingChange }) => {

  const rate = (rating) => {
    onRatingChange({ ...data, rating: rating, tempRating: rating })
  }

  const starOver = (rating) => {
    onRatingChange({ ...data, rating: rating, tempRating: data.rating })
  }

  const starOut = () => {
    onRatingChange({ ...data, rating: data.rating })
  }
  
  return (
    <div className="star-icon-input">
      {[ ...Array(5)].map((number, i) => (<FontAwesomeIcon 
        key={i} 
        icon={data.rating >= i && data.rating != null ? faStar : faStarRegular}
        onClick={() => rate(i)}
        onMouseOver={() => starOver(i)}
        onMouseOut={() => starOut()}
      ></FontAwesomeIcon>)
      )}
    </div>
  );
};

export default Rating;