import React from "react";

function MainBlog({ item }) {
  const { image, title, description } = item;
  return (
    <div className="row align-items-center blog-inner">
      <div className="col-md-6 col-sm-12">
        <div className="blogs-img">
          <img src={image} alt="img" className="img-fluid" />
        </div>
      </div>
      <div className="col-md-6 col-sm-12">
        <div className="blogs-content ps-4">
          <h4>{title}</h4>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default MainBlog;
