import React, { useEffect, useState, useRef } from "react";
import "./style.css";
import "react-tabs/style/react-tabs.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ProductReviews from "./ProductReviews";
import ProductDetail from "./ProductDetail";
import ProductMainPage from "./ProductMainpage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faClose } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import { productDescription, settings } from "./utils";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { toast } from "react-toastify";
import { getProducts, postReview } from "../../Utils/APIs";
import { filterProducts } from "../../Utils/Data";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import RatingInput from "../../Components/RatingInput";
import TrendingProductSingle from "../../Components/TrendingProductSingle";


const WriteReviewModal = (props) => {

  const [data, setdata] = useState({
    rating: 0,
    tempRating: null
  })
  const [description, setdescription] = useState("")

  const onRatingChange = (value) => {
    setdata(value)
  }

  const ok = async () => {
    if (description !== "") {
      const res = await postReview({
        productId: props.product.id,
        reviewTitle: props.product.title,
        reviewDescription: description,
        rating: data.rating + 1,
      })
      if (res.status === 201 || res.status === 200) {
        props.getProductAPI()
        props.onHide()
        setdescription('')
      } else {
        toast.error("Internal Server Error")
      }
    } else {
      toast.error("Please fill the description field")
    }
  }

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      className='mt-4 main-review-modal'
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <h4 className="mb-0">Write Your Review</h4>
            </div>
            <div>
              <FontAwesomeIcon style={{ cursor: "pointer" }} icon={faClose} onClick={() => props.onHide()} />
            </div>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='return-modal'>
          <p>Reviews are public and include your account and device info</p>
          <p>Everyone can see your Google Account name and photo associated with your review. Past edits are visible to users unless you delete your review.</p>
          <div className='returnpolicy-star mt-3 mb-4'>
            <RatingInput data={data} onRatingChange={onRatingChange} />
          </div>
          <textarea type="text" placeholder='Describe Your Experience' value={description} onChange={(e) => setdescription(e.target.value)} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => ok()}>Ok</Button>
      </Modal.Footer>
    </Modal>
  );
}

const Products = () => {

  const { id } = useParams();
  const { inTheBox, Feature, descriptionImg, descriptionImg1, performance } = productDescription;
  const [modalShow, setModalShow] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [sameProducts, setsameProducts] = useState([]);
  const [product, setproduct] = useState({});
  const [lastImage, setlastImage] = useState(descriptionImg)
  const [lastSecondImage, setlastSecondImage] = useState(descriptionImg1)
  const [isLoading, setisLoading] = useState(true)

  const productpageslider = useRef();

  const next = () => {
    productpageslider?.current?.slickNext();
  };

  const previous = () => {
    productpageslider?.current?.slickPrev();
  };

  useEffect(() => {
    getSameProductAPI();
    getProductAPI();
  }, [id]);

  const getProductAPI = async () => {
    try {
      setisLoading(true)
      const res = await getProducts();
      let arr = filterProducts(res?.data?.productlist || []);
      const product = arr.filter((element) => element.id === id)[0]
      if (product.image.length > 2) {
        setlastImage(product.image[product.image.length - 1])
        setlastSecondImage(product.image[product.image.length - 2])
      }
      setproduct(product);
      setisLoading(false)
    } catch (error) {
      toast(error);
    }
  };

  const getSameProductAPI = async () => {
    try {
      setsameProducts([]);
      const res = await getProducts();
      setsameProducts(filterProducts(res?.data?.productlist || []));
    } catch (error) {
      toast(error);
    }
  };

  const openWriteReviewModal = () => {
    setModalShow(true)
  }


  return (
    <>
      <WriteReviewModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
        getProductAPI={getProductAPI}
      />
      <div className="product-page-wrapper">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Products
              </li>
            </ol>
          </nav>
          <ProductMainPage product={product} isLoading={isLoading} openWriteReviewModal={openWriteReviewModal} />
          <div className="product-next-wrapper">
            <Tabs
              selectedIndex={tabIndex}
              onSelect={(index) => setTabIndex(index)}
            >
              <TabList className="product-main-btn">
                <Tab>
                  <button>Description</button>
                </Tab>
                <Tab>
                  <button className="detail-btn"> Product Details </button>
                </Tab>
                <Tab>
                  <button className="review-btn">Reviews</button>
                </Tab>
              </TabList>

              <TabPanel>
                <div className="product-disc-wrapper">
                  <div className="product-disc-main-title mt-main">
                    <h4>In The Box</h4>
                    <p>{product?.description?.inTheBox[0]?.content || inTheBox}</p>
                  </div>
                  <div className="template-disc">
                    <h4> Template Features</h4>
                    <ul>
                      {
                        product?.description?.templatefeature?.length ? product?.description.templatefeature.map((item, i) => {
                          return <li key={i}>{item.content}</li>;
                        }) : Feature.map((item, i) => {
                          return <li key={i}>{item}</li>;
                        })
                      }
                    </ul>
                  </div>
                  <div className="award-performance-main">
                    <div className="award-performance">
                      <h2>Award Winning Performance</h2>
                      <p>
                        {product?.description?.performance[0]?.content || performance}
                        {" "}
                      </p>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <ProductDetail product={product} />
              </TabPanel>

              <TabPanel>
                <div className="product-disc-wrapper">
                  <div>
                    <button className="product-cart-btn" onClick={() => openWriteReviewModal()}>
                      Write your review
                    </button>
                  </div>
                  <div className="row">
                    {product?.reviews?.length ?
                      product.reviews.map((item, i) => {
                        return <ProductReviews key={i} item={item} />;
                      }) : <p className="p-3">No reviews found</p>}
                  </div>
                </div>
              </TabPanel>
            </Tabs>
          </div>
          {/* product-main-disc end  */}
          <div className="other-products">
            <div className="product-title">
              <div>
                <h4>{sameProducts.length} OTHER PRODUCTS IN THE SAME CATEGORY:</h4>
              </div>
              <div className="product-sub-title">
                <div className="product-left-btn" onClick={previous}>
                  <FontAwesomeIcon icon={faAngleLeft} />
                </div>
                <div className="product-next-btn" onClick={next}>
                  <FontAwesomeIcon icon={faAngleRight} />
                </div>
              </div>
            </div>
            <Slider ref={productpageslider} {...settings(sameProducts.length)}>
              {sameProducts.length && sameProducts.map((item) => {
                return <TrendingProductSingle item={item} key={item.id} />;
              })}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
