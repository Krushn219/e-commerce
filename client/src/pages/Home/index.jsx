import HomePageBanner from "../../Components/HomePageBanner";
import "./style.css";
import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import Singlebanner from "../../assets/Images/Single banner.png";
import Twobanner1 from "../../assets/Images/Two banner 1.png";
import Twobanner2 from "../../assets/Images/Two banner 2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { getBanner, getCategories, getMainCategories, getProducts, getTestimonials } from "../../Utils/APIs";
import { toast } from "react-toastify";
import { filterMainCategories, filterProducts } from "../../Utils/Data";
import { productsSliderParams, ShopcategorySlider, support, testimonialSliderParams } from "./utils";
import TrendingProductSingle from "../../Components/TrendingProductSingle";
import OurTestimonialsSingle from "../../Components/OurTestimonials";
import SidebarAccordion from "../../Components/SidebarAccordion";
import Sidebar from "../../Components/Sidebar";
import Blogs from "../../Components/Blogs";
// import Swiper from 'react-slider-swiper';
// import Carousel from "react-multi-carousel";
// import AliceCarousel from 'react-alice-carousel'
import "react-multi-carousel/lib/styles.css";
// import AwesomeSlider from 'react-awesome-slider';
// import 'react-awesome-slider/dist/styles.css';
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from "react-responsive-carousel";
// import InfiniteCarousel from 'react-leaf-carousel';
import 'react-alice-carousel/lib/alice-carousel.css'
import Brand from "../../Components/Brand";
import { Triangle } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// const responsive = {
//   desktop: {
//     breakpoint: { max: 3000, min: 1024 },
//     items: 4,
//     slidesToSlide: 4
//   },
//   tablet: {
//     breakpoint: { max: 1024, min: 991 },
//     items: 3,
//     slidesToSlide: 3
//   },
//   mintablet: {
//     breakpoint: { max: 991, min: 464 },
//     items: 2,
//     slidesToSlide: 2
//   },
//   mobile: {
//     breakpoint: { max: 464, min: 0 },
//     items: 1,
//     slidesToSlide: 1
//   }
// };

// const responsive = {
//   0: { items: 1 },
//   568: { items: 2 },
//   1024: { items: 3 },
// };

// const params = {
//   pagination: '.swiper-pagination',
//   paginationClickable: true,
//   nextButton: '.swiper-button-next',
//   prevButton: '.swiper-button-prev',
//   spaceBetween: 30,
//   slidesPerView: 4,
//   runCallbacksOnInit: true,
//   onInit: (swiper) => {
//     this.swiper = swiper
//   }
// }

const Home = ({ search }) => {
  const { isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate()
  const [productlist, setProductlist] = useState([]);
  const [trendingProducts, settrendingProducts] = useState([]);
  const [specialProducts, setspecialProducts] = useState([]);
  const [Testimonials, setTestimonials] = useState([]);
  const [categories, setcategories] = useState({});
  const [mainCategories, setmainCategories] = useState([]);
  const [banner, setbanner] = useState();
  const [bannersingle, setbannersingle] = useState();
  const [featuredProducts, setfeaturedProducts] = useState([]);
  const [bestsellerProducts, setbestsellerProducts] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  // const [current, setCurrent] = useState(0);
  // const trendingProductslength = trendingProducts.length;

  useEffect(() => {
    productAPI();
    trendingProductsAPI();
    testimonialAPI();
    specialProductsAPI();
    BannerAPI();
    BannersingleAPI();
    FeaturedProductsAPI();
    bestSellerProductsAPI();
    mainCategoriesAPI()
  }, []);

  // const nextSlide = () => {
  //   setCurrent(current === trendingProductslength - 1 ? 0 : current + 1);
  // };

  // const prevSlide = () => {
  //   setCurrent(current === 0 ? trendingProductslength - 1 : current - 1);
  // };

  // if (!Array.isArray(trendingProducts) || trendingProducts.trendingProductslength <= 0) {
  //   return null;
  // }

  const productAPI = async () => {
    try {
      setProductlist([]);
      const res = await getProducts();
      setProductlist(filterProducts(res?.data?.productlist || []));
    } catch (error) {
      toast(error);
    }
    setisLoading(false);
  };

  const trendingProductsAPI = async () => {
    try {
      settrendingProducts([]);
      const res = await getProducts("istrending=true&limit=100");
      settrendingProducts(filterProducts(res?.data?.productlist || []));
    } catch (error) {
      toast(error);
    }
    setisLoading(false);
  };

  const specialProductsAPI = async () => {
    try {
      setspecialProducts([]);
      const res = await getProducts("isspecial=true&limit=100");
      setspecialProducts(filterProducts(res?.data?.productlist || []));
    } catch (error) {
      toast(error);
    }
    setisLoading(false);
  };

  const FeaturedProductsAPI = async () => {
    try {
      setfeaturedProducts([]);
      const res = await getProducts("isfeatured=true&limit=100");
      setfeaturedProducts(filterProducts(res?.data?.productlist || []));
    } catch (error) {
      toast(error);
    }
    setisLoading(false);
  };

  const bestSellerProductsAPI = async () => {
    try {
      setbestsellerProducts([]);
      const res = await getProducts("isbestseller=true");
      setbestsellerProducts(filterProducts(res?.data?.productlist || []));
    } catch (error) {
      toast(error);
    }
    setisLoading(false);
  };

  const testimonialAPI = async () => {
    try {
      setTestimonials([]);
      const resp = await getTestimonials();
      setTestimonials(resp?.data?.Testimonials || []);
    } catch (error) {
      toast(error);
    }
    setisLoading(false);
  };

  const BannerAPI = async () => {
    try {
      setbanner([]);
      const resp = await getBanner();
      setbanner(resp?.data?.banners || []);
    } catch (error) {
      toast(error);
    }
    setisLoading(false);
  };

  const BannersingleAPI = async () => {
    try {
      setbannersingle([]);
      const resp = await getBanner();
      setbannersingle(resp?.data?.banners[2] || []);
    } catch (error) {
      toast(error);
    }
    setisLoading(false);
  };

  const mainCategoriesAPI = async () => {
    const res = await getMainCategories();
    if (res.status === 200) {
      let temporaryMainCategories = filterMainCategories(
        res.data.mainCategories
      );
      setmainCategories(temporaryMainCategories);
      setcategories([]);
      const RES = await getCategories();
      if (RES.status === 200) {
        setcategories({});
        let temp = {};
        temporaryMainCategories.forEach((mainCategory) => {
          temp[mainCategory.mainCategoryName] = [];
        });
        Object.keys(temp).forEach((item) => {
          RES.data.categories.forEach((category) => {
            if (item === category?.maincategory?.name) {
              temp[item] = [
                ...temp[item],
                {
                  id: category._id,
                  name: category.name,
                  subCategories: category.subCategories,
                },
              ];
            }
          });
        });
        setcategories(temp);
      } else {
        toast.error("Internal server error");
      }
    } else {
      toast.error("Internal server error");
    }
  };

  useEffect(() => {
    let temp = {};
    mainCategories.forEach((mainCategory) => {
      temp[mainCategory.mainCategoryName] = [];
    });
    for (let key in categories) {
      for (let i = 0; i < categories[key].length; i++) {
        temp[key].push(false);
      }
    }
  }, [categories]);

  // trending products
  const trendingProductsSlider = useRef();

  const next2 = () => {
    // trendingProductsSlider.querySelector('.slick-next').click()
    trendingProductsSlider?.current?.slickNext();
  };
  const previous2 = () => {
    // trendingProductsSlider?.current.querySelector('.slick-prev').click()
    trendingProductsSlider?.current?.slickPrev();
  };

  // special products
  const specialProductsSlider = useRef();

  const next = () => {
    specialProductsSlider?.current?.slickNext();
  };
  const previous = () => {
    specialProductsSlider?.current?.slickPrev();
  };

  // testimonial
  const testimonialSlider = useRef();

  const next3 = () => {
    testimonialSlider?.current?.slickNext();
  };
  const previous3 = () => {
    testimonialSlider?.current?.slickPrev();
  };

  // Shop by Category
  const shopbycatSlider = useRef();

  const next4 = () => {
    shopbycatSlider?.current?.slickNext();
  };
  const previous4 = () => {
    shopbycatSlider?.current?.slickPrev();
  };

  const goToCatgeory = (mainCategoryName, categoryid) => {
    mainCategories.forEach((cat) => {
      if (cat.mainCategoryName === mainCategoryName) {
        navigate(`/category/${cat.id}/${categoryid}`);
        return;
      }
    });
  };

  const goToShop = () => {
    if (isAuthenticated === true) {
      navigate(`/checkout`)
    } else {
      toast.error("Please login to access this resourse")
    }
  }

  // const handleOnDragStart = (e) => e.preventDefault()

  return (
    <div>
      <HomePageBanner banner={banner} bannersingle={bannersingle} isLoading={isLoading} goToShop={goToShop} />
      <section className="shop-sidebar-wrapper">
        <div className="container">
          <div className="shop-sidebar-inner-wrapper">
            <div className="row">
              <div className="col-lg-3 col-md-12 col-sm-12 order-main2 main-sidebar-wrapper">
                <Sidebar featuredProducts={featuredProducts} bestsellerProducts={bestsellerProducts} />
              </div>

              <div className="shop-accordion order-main2">
                <SidebarAccordion featuredProducts={featuredProducts} bestsellerProducts={bestsellerProducts} support={support} />
              </div>

              <div className="col-lg-9 col-md-12 col-sm-12 order-main1 main-sidebar2-wrapper">
                <div className="tabproduct-wrapper">
                  <div className="product-title">
                    <div>
                      <h4>TRENDING PRODUCTS</h4>
                    </div>
                    <div className="product-sub-title">
                      {/* <p className="cursor-pointer" onClick={() => featuredProductAPI()}>Featured </p> <span> |</span>
                      <p className="cursor-pointer">Latest </p> <span> |</span>
                      <p className="cursor-pointer">Best Seller</p> */}
                      <div className="next-btns">
                        <div className="product-left-btn" onClick={() => previous2()}>
                          <FontAwesomeIcon icon={faAngleLeft} />
                        </div>
                        <div className="product-next-btn" onClick={() => next2()}>
                          <FontAwesomeIcon icon={faAngleRight} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="sub-tabproduct-wrapper">
                    <div className="row">
                      {/* <AliceCarousel mouseTrackingEnabled draggable>
                        {trendingProducts.length ? (
                          trendingProducts
                            .filter(
                              (item) =>
                                item.title.toLowerCase().includes(search) ||
                                item?.category?.name.toLowerCase().includes(search)
                            )
                            .map((item, i) => {
                              return (
                                <TrendingProductSingle key={i} item={item} onDragStart={handleOnDragStart} />
                              );
                            })
                        ) : (
                          <p className="ps-3">No product yet</p>
                        )}
                      </AliceCarousel> */}
                      {/* <Carousel
                        swipeable
                        draggable
                        showDots
                        responsive={responsive}
                        // ssr={true} // means to render carousel on server-side.
                        infinite={true}
                        // autoPlay={this.props.deviceType !== "mobile" ? true : false}
                        // autoPlaySpeed={1000}
                        // keyBoardControl={true}
                        customTransition="all .5"
                        transitionDuration={800}
                        containerClass="carousel-container"
                        removeArrowOnDeviceType={["tablet", "mobile"]}
                        // deviceType={this.props.deviceType}
                        dotListClass="custom-dot-list-style"
                        itemClass="carousel-item-padding-40-px"
                      >
                        {trendingProducts.length ? (
                          trendingProducts
                            .filter(
                              (item) =>
                                item.title.toLowerCase().includes(search) ||
                                item?.category?.name.toLowerCase().includes(search)
                            )
                            .map((item, i) => {
                              return (
                                <TrendingProductSingle key={i} item={item} />
                              );
                            })
                        ) : (
                          <p className="ps-3">No product yet</p>
                        )}
                      </Carousel> */}
                      {
                        !isLoading ? (
                          <Slider
                            ref={trendingProductsSlider}
                            {...productsSliderParams(trendingProducts.length)}
                            className={trendingProducts.length === 0 ? "NoData" : " "}
                          >
                            {trendingProducts.length && !isLoading ? (
                              trendingProducts
                                .filter(
                                  (item) =>
                                    item.title.toLowerCase().includes(search) ||
                                    item?.category?.name.toLowerCase().includes(search)
                                )
                                .map((item, i) => {
                                  return (
                                    <TrendingProductSingle key={i} item={item} />
                                  );
                                })
                            ) : (
                              !isLoading && <p className="ps-3 text-center my-5">No product yet</p>
                            )}
                          </Slider>) :
                          <div style={{ display: "flex", justifyContent: "center", margin: "50px 0" }}>
                            <Triangle color="var(--theme-color)" />
                          </div>
                      }
                      {/* <Slider
                        ref={trendingProductsSlider}
                        {...productsSliderParams(trendingProducts.length)}
                      >
                        {trendingProducts.length && !isLoading ? (
                          trendingProducts
                            .filter(
                              (item) =>
                                item.title.toLowerCase().includes(search) ||
                                item?.category?.name.toLowerCase().includes(search)
                            )
                            .map((item, i) => {
                              return (
                                <TrendingProductSingle key={i} item={item} />
                              );
                            })
                        ) : (
                          !isLoading && <p className="ps-3">No product yet</p>
                        )}
                      </Slider> */}
                      {isLoading && (
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <Triangle color="var(--theme-color)" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="multibanner-wrapper">
                  <div className="multibanner-img">
                    <img src={Singlebanner} alt="png" className="img-fluid" />
                    <div className="multibanner-content">
                      <p>FLAUNT YOUR BEST</p>
                      <button className="shop-main-btn" onClick={goToShop}>Shop Now</button>
                    </div>
                  </div>
                  <div className="row m-left m-0">
                    <div className="col-lg-6 col-md-6 col-sm-12 p-0">
                      <div className="multibanner-img1">
                        <img src={Twobanner1} alt="png" className="img-fluid" />
                        <div className="multibanner-content1">
                          <p>New Arrivals</p>
                          <span>Get. Set. Turbo</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 p-0">
                      <div className="multibanner-img2 multibanner-pro">
                        <img src={Twobanner2} alt="png" className="img-fluid" />
                        <div className="multibanner-content1">
                          <p>Seamless Studio Sound</p>
                          <span>Black Friday</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="tabproduct-wrapper special-product">
                  <div className="product-title">
                    <div>
                      <h4>Special Products</h4>
                    </div>
                    <div className="product-sub-title">
                      <div className="product-left-btn" onClick={() => previous()}>
                        <FontAwesomeIcon icon={faAngleLeft} />
                      </div>
                      <div className="product-next-btn" onClick={() => next()}>
                        <FontAwesomeIcon icon={faAngleRight} />
                      </div>
                    </div>
                  </div>
                  <div className="sub-tabproduct-wrapper">
                    <div className="row">
                      {
                        !isLoading ? (
                          <Slider
                            ref={specialProductsSlider}
                            {...productsSliderParams(productlist.length)}
                            className={trendingProducts.length === 0 ? "NoData" : " "}
                          >
                            {specialProducts.length ? (
                              specialProducts
                                .filter(
                                  (item) =>
                                    item.title.toLowerCase().includes(search) ||
                                    item?.category?.name?.toLowerCase()?.includes(search)
                                )
                                .map((item, i) => {
                                  return (
                                    <TrendingProductSingle key={i} item={item} />
                                  );
                                })
                            ) : <p className="ps-3 text-center my-5">No product yet</p>
                            }
                          </Slider>
                        ) :
                          <div style={{ display: "flex", justifyContent: "center", margin: "50px 0" }}>
                            <Triangle color="var(--theme-color)" />
                          </div>
                      }
                      {isLoading && (
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <Triangle color="var(--theme-color)" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="shopby-category-wrapper">
                  <div className="product-title">
                    <div>
                      <h4>SHOP BY CATEGORY</h4>
                    </div>
                    <div className="product-sub-title">
                      <div className="product-left-btn" onClick={() => previous4()}>
                        <FontAwesomeIcon icon={faAngleLeft} />
                      </div>
                      <div className="product-next-btn" onClick={() => next4()}>
                        <FontAwesomeIcon icon={faAngleRight} />
                      </div>
                    </div>
                  </div>
                  <div className="shop-by-category-wrappermain">
                    <div className="row m-left">
                      {
                        !isLoading ? (
                          <Slider
                            ref={shopbycatSlider}
                            {...ShopcategorySlider(categories.length)}
                          >
                            {Object.keys(categories || {}).map((categoryName) => {
                              return <div className="category-shop-item pe-3" key={categoryName}>
                                <div className="category-ingo-byshop">
                                  <img src={mainCategories.filter((m) => m.mainCategoryName === categoryName)[0].image} alt="img" className="img-fluid" />
                                  <h4>{categoryName}</h4>
                                  <div className="h-100">
                                    <div className="row">
                                      {categories[categoryName]?.length && (
                                        categories[categoryName].map((item, i) => {
                                          return <div key={item.id} className="category-shopby-title text-start">
                                            <p onClick={() => goToCatgeory(categoryName, item?.id)}><FontAwesomeIcon icon={faAngleRight} className='me-2' />{item.name}</p>
                                          </div>
                                        })
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            })}
                          </Slider>
                        ) :
                          <div style={{ display: "flex", justifyContent: "center", margin: "50px 0" }}>
                            <Triangle color="var(--theme-color)" />
                          </div>
                      }
                      {/* {
                        isLoading && (
                          <div
                            style={{ display: "flex", justifyContent: "center" }}
                          >
                            <Triangle color="var(--theme-color)" />
                          </div>
                        )
                      } */}
                    </div>
                  </div>
                </div>

                <div className="testimonials-wrapper">
                  <div className="product-title">
                    <div>
                      <h4>Our Testimonials</h4>
                    </div>
                    <div className="product-sub-title">
                      <div className="product-left-btn" onClick={() => previous3()}>
                        <FontAwesomeIcon icon={faAngleLeft} />
                      </div>
                      <div className="product-next-btn" onClick={() => next3()}>
                        <FontAwesomeIcon icon={faAngleRight} />
                      </div>
                    </div>
                  </div>
                  <div className="row m-left">
                    {
                      !isLoading ? (
                        <Slider
                          ref={testimonialSlider}
                          {...testimonialSliderParams(Testimonials.length)}
                          className={trendingProducts.length === 0 ? "NoData" : " "}
                        >
                          {Testimonials.length ?
                            Testimonials.map((item, i) => {
                              return <OurTestimonialsSingle key={i} item={item} />;
                            }) : <p className="ps-3 text-center my-5">No reviews yet</p>}
                        </Slider>) :
                        <div style={{ display: "flex", justifyContent: "center", margin: "50px 0" }}>
                          <Triangle color="var(--theme-color)" />
                        </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Blogs />
      <Brand />
    </div>
  );
};

export default Home;
