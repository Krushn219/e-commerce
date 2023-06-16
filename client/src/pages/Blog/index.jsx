import "./style.css";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MainBlog from "./MainBlog";
import { getSingleBlog } from "../../Utils/APIs";
import { toast } from "react-toastify";
import Blogs from "../../Components/Blogs";

const Blog = () => {
  const { id } = useParams();
  const [blog, setblog] = useState([]);

  useEffect(() => {
    SingleblogAPI();
  }, [id]);

  const SingleblogAPI = async () => {
    try {
      setblog([]);
      const res = await getSingleBlog(id);
      setblog(res?.data?.blog || []);
    } catch (error) {
      toast(error);
    }
  };

  return (
    <div className="blogs-wrapper">
      <div className="container">
        <div className="pt-3">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Blogs
              </li>
            </ol>
          </nav>
        </div>
        <div className="blogs-item">
          <MainBlog item={blog} />
          <div className="blog-wrapper mt-5 main-blog-wrapper">
            <div className="row  blog-item1 blogs-item1main">
              <Blogs />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
