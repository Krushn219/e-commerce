import React from "react";

const OurTestimonialsSingle = ({ item }) => {
  const { image, content, name } = item;
  return (
    <div>
      <div className="testimonial-item mg-right">
        <div className="testimonial-img">
          <img alt="png" src={image} className="img-fluid" />
        </div>
        <div className="testimonial-content">
          <p>{content}</p>
          <h4>{name}</h4>
        </div>
      </div>
    </div>
  );
}

export default OurTestimonialsSingle;