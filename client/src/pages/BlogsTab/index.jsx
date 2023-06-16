import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { getBlogs } from '../../Utils/APIs'
import { filterBlogs } from '../../Utils/Data'
import { toast } from 'react-toastify'
import { blogDate } from '../../Utils/utilFunctions';
import { Triangle } from 'react-loader-spinner';


const BlogsTab = () => {

  const navigate = useNavigate()
  const [blogs, setblogs] = useState([]);
  const [isLoading, setisLoading] = useState(true)

  useEffect(() => {
    BlogsAPI();
  }, []);

  const BlogsAPI = async () => {
    try {
      setblogs([]);
      const res = await getBlogs();
      setblogs(filterBlogs(res?.data?.blogs) || []);
    } catch (error) {
      toast.error(error);
    }
    setisLoading(false)
  };

  const handleClick = (id) => {
    navigate(`/blogs/${id}`)
  }

  return (
    <div className='container pt-5'>
      <div className='row'>
        {
          !isLoading ? (
            blogs.length ? blogs.map((element) => {
              return <div key={element.id} className="col-lg-4 col-sm-6 col-12">
                <div className="blog-item blog-tab-wrapper">
                  <div className="blog-img">
                    <img
                      src={element.image}
                      className="img-fluid"
                      alt="png"
                      onClick={() => handleClick(element.id)}
                    />
                    <div className="date">{blogDate(element.createdAt)}</div>
                  </div>
                  <div className="blog-content">
                    <h4>{element.title}</h4>
                    <p>{element.description}</p>
                    <Link to={`/blogs/${element.id}`}>Read More</Link>
                  </div>
                </div>
              </div>
            }) : <p style={{ textAlign: "center", margin: "50px 0" }}>No Blogs Yet</p>
          ) :
            <div className='d-flex justify-content-center' style={{ margin: "100px 0" }}>
              <Triangle color="var(--theme-color)" />
            </div>
        }
      </div>
      {/* {isLoading && (
        <div
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Triangle color="var(--theme-color)" />
        </div>
      )} */}
    </div>
  );
}

export default BlogsTab