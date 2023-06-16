import React, { useEffect, useState } from "react";
import "./style.css";
import pro1 from "../../assets/Images/Products/1.jpg";
import pro2 from "../../assets/Images/Products/5.jpg";
import { Link, useNavigate } from "react-router-dom";
import { getProducts } from "../../Utils/APIs";
import { filterProducts } from "../../Utils/Data";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus } from "@fortawesome/free-solid-svg-icons";
import SidebarAccordion from "../../Components/SidebarAccordion";
import Sidebar from "../../Components/Sidebar";

const Compare = ({ support }) => {
  const [productCompare, setproductCompare] = useState([]);
  const [featuredProducts, setfeaturedProducts] = useState([]);
  const [bestsellerProducts, setbestsellerProducts] = useState([]);
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/products/${id}`);
  };

  useEffect(() => {
    SingleproductAPI();
    FeaturedProductsAPI()
    bestSellerProductsAPI()
  }, []);

  const FeaturedProductsAPI = async () => {
    try {
      setfeaturedProducts([]);
      const res = await getProducts("isfeatured=true");
      setfeaturedProducts(filterProducts(res?.data?.productlist || []));
    } catch (error) {
      toast(error);
    }
  };

  const bestSellerProductsAPI = async () => {
    try {
      setbestsellerProducts([]);
      const res = await getProducts("isbestseller=true");
      setbestsellerProducts(filterProducts(res?.data?.productlist || []));
    } catch (error) {
      toast(error);
    }
  };

  const SingleproductAPI = async () => {
    try {
      const localProducts = JSON.parse(localStorage.getItem('products'))
      if (localProducts.length) {
        setproductCompare(localProducts || [])
      } else {
        setproductCompare([])
      }
    } catch (error) {
      toast(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const localProducts = JSON.parse(localStorage.getItem('products'))
      localProducts.forEach((p) => {
        if (p.id === id) {
          const temp = localProducts.filter((p) => p.id !== id);
          localStorage.setItem("products", JSON.stringify(temp));
          toast.info("deleted successfully")
        }
      })
    } catch (error) {
      toast(error);
    }
    SingleproductAPI()
  }

  return (
    <div className="compare-wrapper">
      <div className="container">
        <div className="py-3">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Product Compare
              </li>
            </ol>
          </nav>
          <div className="row">
            <div className="col-lg-3 col-md-12 col-sm-12">
              <div className="mainsidebar-category-wrapper">
                <Sidebar featuredProducts={featuredProducts} bestsellerProducts={bestsellerProducts} />
              </div>
            </div>

            <div className="shop-accordion order-main2 mt-0 mb-4">
              <SidebarAccordion featuredProducts={featuredProducts} bestsellerProducts={bestsellerProducts} support={support} />
            </div>

            <div className="col-lg-9 col-md-12 col-sm-12">
              <div className="page-content card card-block">
                <div className="products_block table-responsive">
                  <table className="table table-bordered active product-comparision">
                    <tbody>
                      <tr>
                        <td className="product-compare-title-main">
                          <span>Features</span>
                        </td>
                        {productCompare?.length ? (
                          productCompare?.map((element) => {
                            return <td
                              key={element._id}
                              className="product-compare-info-main w-22"
                            >
                              <div className="remove">
                                <FontAwesomeIcon icon={faCircleMinus} onClick={() => handleDelete(element.id)} />
                              </div>
                              <div className="category-spaecialtrend">
                                <div className="main-category-spacialimg">
                                  <div className="category-sider-img">
                                    <div
                                      className="selling-main-img-box"
                                      onClick={() => handleClick(element.id)}
                                    >
                                      <img
                                        src={element?.image ? element?.image[0] : pro1}
                                        className="img-fluid selling-img1"
                                        alt="jpg"
                                      />
                                      <img
                                        src={element?.image ? element?.image[1] : pro2}
                                        alt="img"
                                        className="selling-img2 img-fluid"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="compare-pro-info"
                                  onClick={() => handleClick()}
                                >
                                  <h4>{element.title}</h4>
                                  <div className="d-flex align-items-center">
                                    <div>
                                      <span>${element.withDiscount}</span>
                                    </div>
                                    <div>
                                      <del>${element.originalPrice}</del>
                                    </div>
                                  </div>
                                  <p>{element?.description?.performance[0]?.content}</p>
                                </div>
                              </div>
                            </td>
                          })
                        ) : (
                          <p>No Product Found</p>
                        )}
                      </tr>
                      <tr>
                        <td className="compare-composition">Composition</td>
                        {productCompare?.length &&
                          productCompare.map((item) => {
                            return (
                              <td key={item.id} className="compare-composition">
                                {item?.description?.templatefeature?.length ? item?.description?.templatefeature?.map((element) => {
                                  return <>
                                    {element.content || "not added Composition"}
                                  </>
                                }) : <p>Not added composition</p>}
                              </td>
                            );
                          })}
                      </tr>

                      <tr>
                        <td className="compare-composition">Color</td>
                        {productCompare?.length &&
                          productCompare.map((item) => {
                            return (
                              <td key={item.id}>
                                {item?.description?.inTheBox?.length ? item?.description?.inTheBox?.map((element) => {
                                  return (
                                    <div key={element.id} className='inthebox-desc'>
                                      {element?.content || "not added color"}
                                    </div>
                                  )
                                }) : <p>not added color</p>}
                              </td>
                            );
                          })}
                      </tr>
                      <tr>
                        <td className="compare-composition">Attributes</td>
                        {productCompare?.length &&
                          productCompare.map((item) => {
                            return (
                              <td key={item.id} className="basic-compare">
                                {item.attributes || "not added attributes"}
                              </td>
                            );
                          })}
                      </tr>
                      <tr>
                        <td className="compare-composition">CountInStock</td>
                        {productCompare?.length &&
                          productCompare.map((item) => {
                            return (
                              <td key={item.id} className="basic-compare">
                                {item.inStock || 0}
                              </td>
                            );
                          })}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compare;
