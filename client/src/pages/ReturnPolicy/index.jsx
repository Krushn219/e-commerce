import React from "react";
import "./style.css";
import { Link, useParams } from "react-router-dom";
import returnpolicy from "../../assets/Images/returnpolicy.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { getProducts, OrderReturn, postReview } from "../../Utils/APIs";
import { useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import RatingInput from "../../Components/RatingInput";
import { filterProducts } from "../../Utils/Data";
import { productDescription } from '../Products/utils'
import OrderReturns from "../../Components/OrderReturns";

function WriteReviewModal(props) {
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
      } else {
        toast.error("Internal Server Error")
      }
    } else {
      toast.error("Please fill the description field")
    }
  }

  return (
    <Modal
      {...props}
      size="lg"
      className="mt-4"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Return Policy
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="return-modal">
          <p>Reviews are public and include your account and device info</p>
          <p>
            Everyone can see your Google Account name and photo associated with
            your review. Past edits are visible to users unless you delete your
            review.
          </p>
          <div className="returnpolicy-star mt-3 mb-4">
            <RatingInput data={data} onRatingChange={onRatingChange} />
          </div>
          <textarea
            type="text"
            placeholder='Describe Your Experience'
            value={description}
            onChange={(e) => setdescription(e.target.value)}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => ok()}>Ok</Button>
      </Modal.Footer>
    </Modal>
  );
}

const ReturnPolicy = () => {
  const { id } = useParams()
  
  const { descriptionImg, descriptionImg1 } = productDescription;
  const [modalShow, setModalShow] = useState(false);
  const [orderreturn, setorderreturn] = useState([])
  const [product, setproduct] = useState({});
  const [lastImage, setlastImage] = useState(descriptionImg)
  const [lastSecondImage, setlastSecondImage] = useState(descriptionImg1)

  const [data, setdata] = useState({
    rating: 0,
    tempRating: null
  })

  const onRatingChange = (value) => {
    setdata(value)
  }

  useEffect(() => {
    OrderReturnAPI()
    getProductAPI()
  }, [])

  const getProductAPI = async () => {
    try {
      const res = await getProducts();
      let arr = filterProducts(res?.data?.productlist || []);
      const product = arr.filter((element) => element.id === id)[0]
      if (product.image.length > 2) {
        setlastImage(product.image[product.image.length - 1])
        setlastSecondImage(product.image[product.image.length - 2])
      }
      setproduct(product);
    } catch (error) {
      toast(error);
    }
  };

  const OrderReturnAPI = async () => {
    try {
      const res = await OrderReturn();
      setorderreturn(res.data.returnOrder)
    } catch (error) {
      toast(error)
    }
  }

  return (
    <>
      <WriteReviewModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
        getProductAPI={getProductAPI}
      />
      <div className="return-policy-wrapper terms-condition-use-wrapper">
        <div className="container">
          <div className="pt-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Return Policy
                </li>
              </ol>
            </nav>
          </div>
          <div className="terms-condition-use-main-wrapper">
            <div className="terms-codition-use-wrapper2">
              <div className="text-center terms-of-use-img">
                <img src={returnpolicy} alt="img" className="img-fluid" />
              </div>
              <div className="terms-title mb-4">
                <h4>Return Policy</h4>
              </div>
              {orderreturn?.length ? orderreturn?.map((element) => {
                return <div key={element.id}>
                  {element?.cartdetails[0]?.length && element?.cartdetails[0]?.map((item) => {
                    return <div key={item.id}>
                      <OrderReturns item={item} />
                    </div>
                  })}
                </div>
              }) : <p>not return orders yet</p>}

              <p className="mt-2">
                Want a free 14 min sample? Listen anytime, even offline.
              </p>

              <div className="about-this-product">
                <h5 className="mt-4">
                  About This Product{" "}
                  <FontAwesomeIcon icon={faArrowRight} className="ps-1" />
                </h5>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Tempore illum sequi aliquid laboriosam, deleniti accusamus
                  voluptatem reprehenderit rerum quos sint? Ducimus ratione
                  doloremque, illo perspiciatis quos omnis nobis perferendis
                  exercitationem pariatur temporibus architecto debitis porro
                  quaerat facere fugit non numquam dolorem cupiditate eius?
                  Vero, quod. Rem rerum fuga nam accusantium.
                </p>
              </div>
              <div className="about-this-product">
                <h5 className="mt-4">
                  About the author
                  <FontAwesomeIcon icon={faArrowRight} className="ps-2" />
                </h5>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Fuga, repellat dolores. Quibusdam aperiam incidunt praesentium
                  hic, harum assumenda? Tenetur tempora deleniti non
                  consequuntur veniam? Architecto dolore cupiditate explicabo
                  unde culpa!
                </p>
              </div>
              <div className="about-this-product">
                <h5 className="mt-4">Rate this Product</h5>
                <p>Tell us what you think.</p>
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <div className="returnpolicy-star">
                    <RatingInput data={data} onRatingChange={onRatingChange} />
                  </div>
                  <button
                    className="write-review-btn"
                    onClick={() => setModalShow(true)}
                  >
                    Write Review
                  </button>
                </div>
              </div>
              <div className="about-this-product">
                <h5 className="mt-5">Listening information</h5>
                <h6 className="mt-3">Smartphones and tablets :</h6>
                <p>
                  Install the Google Play Books app for Android and iPad/iPhone.
                  It syncs automatically with your account and allows you to
                  read online or offline wherever you are.
                </p>
                <h6 className="mt-3">Laptops and computers :</h6>
                <p>
                  You can read books purchased on Google Play using your
                  computer's web browser.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReturnPolicy;
