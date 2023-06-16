import React from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { blogDate } from "../../Utils/utilFunctions";


function BlogSingle({ item }) {
  const { id, image, title, description, createdAt } = item;
  const navigate = useNavigate()
  const handleClick = () =>{
    navigate(`/blogs/${id}`)
  }
  return (
    <div>
      <div className="blog-item">
        <div className="blog-img">
          <img
            src={image}
            className="img-fluid"
            alt="png"
            onClick={() => handleClick()}
          />
          <div className="date">{blogDate(createdAt)}</div>
        </div>
        <div className="blog-content" onClick={() => handleClick()}>
          <h4>{title}</h4>
          <p>{description}</p>
          <Link to={`/blogs/${id}`} >Read More</Link>
        </div>
      </div>
    </div>
  );
}

export default BlogSingle;
