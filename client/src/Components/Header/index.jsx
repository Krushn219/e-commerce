import React, { useEffect, useState } from "react";
import "./style.css";
import Png from "../../assets/Images/Icon 1.png";
import Callheadericon from "../../assets/Images/CallHeaderIcon.png";
import shippingHeader from "../../assets/Images/shippingHeader.png";
import Logo from "../../assets/Images/Logo.png";
import HeaderUser from "../../assets/Images/HeaderUser.png";
import HeaderCart from "../../assets/Images/HeaderCart.png";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faClose,
  faMagnifyingGlass,
  faAngleLeft,
  faMicrophoneAlt
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  COMPLETE,
  LOGOUT_REQUEST,
  NOT_ACTIVE,
  SET_LOGOUT_REQUEST_STATUS,
} from "../../store/actions/types";
import { useDetectClickOutside } from "react-detect-click-outside";
import { getUserWithCart } from "../../Utils/APIs";
import ViewModalSignIn from "../ViewModalSignIn";
import ViewModalsmLogin from "../ViewModalsmLogin";
import SpeechRecognition, {
  useSpeechRecognition
} from "react-speech-recognition";

const Header = ({ setsearch, search, cartUpdated, handleModalBackdrop }) => {
  const { email } = useParams()
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { isAuthenticated, logoutRequestStatus } = useSelector(
    (state) => state.auth
  );

  const [isActive, setisActive] = useState(false);
  const [isActivem, setisActivem] = useState(false);
  const [show, setshow] = useState(false);
  const [isshow, setisshow] = useState(false);
  const [isshowmore, setisshowmore] = useState(false);
  const [isshowmorem, setisshowmorem] = useState(false);
  const [cartItems, setcartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [ModalLoginShow, setModalLoginShow] = useState(false)
  const [topbarCollaps, setTopbarCollaps] = useState(false);
  // const [vendorstore, setvendorstore] = useState(false)
  // const [vendorid, setvendorid] = useState("")

  const headerSearchClose = () => {
    if (show) {
      setshow(false);
    }
  };

  const closeCartModal = () => {
    if (isshowmore) {
      setisshowmore(false);
    }
  };

  const closeCartModalm = () => {
    if (isshowmorem) {
      setisshowmorem(false)
    }
  }

  const closeMenu = () => {
    if (isActivem) {
      setisActivem(false);
    }
  };

  // const userRef = useDetectClickOutside({ onTriggered: headerUserClose });
  const searchRef = useDetectClickOutside({ onTriggered: headerSearchClose });
  const cartRef = useDetectClickOutside({ onTriggered: closeCartModal });
  const cartRefm = useDetectClickOutside({ onTriggered: closeCartModalm });

  // useEffect(() => {
  //   GetUserAPI()
  //   GetVendorAPI()
  // }, []);

  useEffect(() => {
    getUserCart();
  }, [cartUpdated])

  useEffect(() => {
    if (isshowmore || isshowmorem) {
      handleModalBackdrop(true);
    } else if (!isshowmore || isshowmorem) {
      handleModalBackdrop(false);
    }
  }, [isshowmore || isshowmorem]);

  useEffect(() => {
    if (isAuthenticated) {
      setModalShow(false);
    }
  }, [location]);

  useEffect(() => {
    let total = 0;
    cartItems?.forEach((item) => {
      total += item.productId.withDiscount * item.quantity;
    });
    setTotal(total);
  }, [cartItems]);

  useEffect(() => {
    if (logoutRequestStatus === COMPLETE) {
      toast.info("Logout successfully");
      navigate(`/`)
      dispatch({ type: SET_LOGOUT_REQUEST_STATUS, payload: NOT_ACTIVE });
    }
  }, [logoutRequestStatus]);

  const getUserCart = async () => {
    try {
      const res = await getUserWithCart();
      setcartItems(res?.data?.user[0]?.products);
    } catch (e) {
      toast.error(e);
    }
  };

  const toggleHandler = () => {
    setisActivem(!isActivem);
  };

  const headerUser = () => {
    setisshow(!isshow);
  };

  const btnmodal = () => {
    if (isAuthenticated) {
      setisshowmorem(true)
      setisshowmore(true);
    } else {
      // toast.error("You have to login first to access cart...!!");
      setModalShow(true)
      if (modalShow) {
        setModalLoginShow(true)
      } else {
        setModalLoginShow(false)
      }
    }
  };

  const btnmodalm = () => {
    if (isAuthenticated) {
      setisshowmore(true);
    } else {
      // toast.error("You have to login first to access cart...!!");
      setModalLoginShow(true)
    }
  }

  // const VendorStore = () => {
  //   setvendorstore(!vendorstore)
  // }

  const goToAccount = () => {
    setisshow(false);
    navigate(`/my-account`);
  };

  const logout = () => {
    setisshow(false);
    dispatch({ type: LOGOUT_REQUEST });
  };

  const closeModal = () => setModalShow(false);

  const closeModalLogin = () => setModalLoginShow(false)

  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    setsearch(transcript)
  }, [transcript])

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  // const voiceSearch = () => {
  //   if(listening){
  //     SpeechRecognition.stopListening()
  //   }
  //   SpeechRecognition.startListening()
  // }


  return (
    <>
      {location.pathname !== "/my-account" && location.pathname !== "/forgotPassword" && location.pathname !== `/reset-password/${email}` && location.pathname !== "/checkout" && <ViewModalSignIn show={modalShow} onHide={closeModal} />}
      {location.pathname !== "/my-account" && location.pathname !== "/forgotPassword" && location.pathname !== `/reset-password/${email}` && location.pathname !== "/checkout" && <ViewModalsmLogin show={ModalLoginShow} onHide={closeModalLogin} />}
      <header className="header-wrapper">
        <div key="1" className={`header-topbar${topbarCollaps ? ' collaps' : ' expand'}`}>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-6">
                <div className="shipping-header">
                  <img src={shippingHeader} className="" alt="png" width='22px' />
                  <p>Free exress international delivery + Easy return</p>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="d-flex align-items-center justify-content-end call-infomain">
                  <div className="call-info">
                    <img src={Callheadericon} alt="png" width='22px' />
                    <a href="tel:+(055) 888 8888">Phone:+(055) 888 8888</a>
                  </div>
                  <div className="emailsubscription">
                    <img src={Png} alt="png" width='22px' />
                    <p>info@prestashopdemo.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`heder-topbar-collaps${topbarCollaps ? ' collaps' : ''}`} onClick={() => setTopbarCollaps(!topbarCollaps)} >
            <FontAwesomeIcon icon={faAngleLeft} />
          </div>
        </div>
        <div className="main-header">
          <div className="container">
            {/* max size header top */}
            <nav className="navbar-expand-lg navbar-light main-header-navbarm">
              <div className="row align-items-center main-header-vlog">
                <div className="col-lg-4 col-md-4 col-xl-4 col-sm-12">
                  <div className="header-logo">
                    <Link to="/">
                      <img src={Logo} alt="png" className="img-fluid" />
                    </Link>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-xl-4 col-sm-12">
                  <div
                    className="header-search-icon"
                    ref={searchRef}
                  >
                    <div className="form-group has-search">
                      <div className="header-search-div">
                        <form className="form-header-search">
                          <div className="header-main-search-icon">
                            <div>
                              <input
                                type="search"
                                className="form-control click-text"
                                placeholder="ex : watch, laptop, Elecrtronic, hp, lenovo..."
                                onChange={(e) => {
                                  setsearch(e?.target?.value);
                                }}
                                value={search}
                              />
                            </div>
                            <div className="search-svg">
                              <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </div>
                            <div className={`microphone-svg${listening ? ' on' : ' off'}`} onMouseDown={SpeechRecognition.startListening} onMouseUp={SpeechRecognition.stopListening}>
                              <FontAwesomeIcon icon={faMicrophoneAlt} />
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-xl-4 col-sm-12">
                  <div className="order-lg-1 d-flex align-items-center megamenu-main justify-content-end">
                    <div
                      className="collapse navbar-collapse navbar-main menu"
                      id="navbarSupportedContent"
                    ></div>
                    <button
                      className="navbar-toggler order-lg-1"
                      onClick={toggleHandler}
                      type="button"
                    >
                      <FontAwesomeIcon icon={faBars} className="bars" />
                    </button>
                    <div className="d-flex align-items-center">
                      <div className="header-icon header-usermain">
                        <div className="nav-item">
                          <img
                            src={HeaderUser}
                            onClick={headerUser}
                            alt="png"
                            className="img-fluid"
                          />
                        </div>
                        {!modalShow && !ModalLoginShow &&
                          <div
                            className={
                              isshow
                                ? "sign-header click-user active"
                                : "sign-header click-user"
                            }
                          >
                            {!isAuthenticated ? (
                              <ul>
                                <li key="sign-in" className="nav-item sign-in-lg-btn">
                                  <p className="cursor-pointer" onClick={() => setModalShow(true)}>
                                    Sign In
                                  </p>
                                </li>
                                <li key="sign-up" className="nav-item sign-in-sm-btn">
                                  <p className="cursor-pointer" onClick={() => setModalShow(true)}>
                                    Sign In
                                  </p>
                                </li>
                              </ul>
                            ) : (
                              <ul>
                                {location.pathname !== "/my-account" && (
                                  <li key="my-account" className="nav-item">
                                    <p
                                      className="cursor-pointer"
                                      onClick={goToAccount}
                                    >
                                      My Account
                                    </p>
                                  </li>
                                )}
                                {location.pathname !== "/edit-account-details" && <li key="sign-out" className="nav-item">
                                  <p className="cursor-pointer" onClick={() => { logout(); setModalShow(true); }}>
                                    Log Out
                                  </p>
                                </li>}
                              </ul>
                            )}
                          </div>
                        }
                      </div>
                      <div className="header-icon header-cart" ref={cartRefm}>
                        <li className="bell-like bell-more">
                          <img
                            src={HeaderCart}
                            alt="png"
                            onClick={btnmodal}
                            className="img-fluid"
                            data-toggle="modal"
                            data-target="#myModal2"
                          />
                          <span className="bullhorn">{cartItems?.length || 0}</span>
                        </li>
                        {/* Modal */}
                        <div className={isshowmorem ? "modal-cart click-cart active" : "modal-cart click-cart"}>
                          <div key="main">
                            <div className="close-title-count">
                              <div key="head">
                                <h5>SHOPPING CART</h5>
                              </div>
                              <div key="icon">
                                <FontAwesomeIcon
                                  icon={faClose}
                                  onClick={() => closeCartModalm()}
                                />
                              </div>
                            </div>
                            <div className="modal-cart-body">
                              {cartItems?.length ? (
                                cartItems.map((item) => {
                                  return (
                                    <div className="d-flex align-items-center modal-item-cart" key={item.id}>
                                      <div className="modal-cart-img">
                                        <img
                                          src={item.productId.image[0]}
                                          className="img-fluid"
                                          alt="img"
                                        />
                                      </div>
                                      <div className="modal-cart-info">
                                        <h4>{item.productId.title}</h4>
                                        <p>Qty: {item.quantity}</p>
                                        <span className="main-price-cart">
                                          ${item.productId.withDiscount}
                                        </span>
                                        <del className="cartwith-discount-price">
                                          ${item.productId.originalPrice}
                                        </del>
                                      </div>
                                    </div>
                                  );
                                })
                              ) : (
                                <p className="ps-4">Cart is Empty</p>
                              )}
                            </div>
                            <div className="sub-total-cart">
                              <div className="d-flex align-item-center justify-content-between cart-main-subtotal main-total">
                                <p>Sub Total</p>
                                <span>${total}</span>
                              </div>
                              <div className="d-flex align-item-center justify-content-between cart-main-subtotal">
                                <p>Shipping</p>
                                <span>{total === 0 ? '0' : '$7.00'}</span>
                              </div>
                              <div className="d-flex align-item-center justify-content-between cart-main-subtotal">
                                <p>Total (tax excl.)</p>
                                <span>${total === 0 ? total : total + 7.0}</span>
                              </div>
                              <div className="mt-4 modal-main-btns">
                                <Link to="/cart">
                                  <button
                                    variant="secondary"
                                    className="cart-modal-btn"
                                    onClick={closeCartModalm}
                                  >
                                    view cart
                                  </button>
                                </Link>
                                <Link to="/checkout">
                                  <button
                                    variant="primary"
                                    className="checkout-modal-btn"
                                    onClick={closeCartModalm}
                                  >
                                    checkout
                                  </button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
            {/* mobile view header top */}
            <nav className={isActive ? "navbar-expand-lg navbar-light main-header-sm-navbar active" : "navbar-expand-lg navbar-light main-header-sm-navbar"}>
              <div className="row align-items-center main-header-vlog">
                <div className="col-md-1 col-sm-1 col-xs-1 col-xxs-1">
                  <button
                    className="navbar-toggler order-lg-1"
                    onClick={toggleHandler}
                    type="button"
                  >
                    <FontAwesomeIcon icon={faBars} className="bars" />
                  </button>
                </div>
                <div className="col-md-8 col-sm-8 col-xs-8 col-xxs-8">
                  <div className="header-logo">
                    <Link to="/">
                      <img src={Logo} alt="png" className="img-fluid" />
                    </Link>
                  </div>
                </div>
                <div className="col-md-3 col-sm-3 col-xs-3 col-xxs-3">
                  <div className="order-lg-1 d-flex align-items-center megamenu-main justify-content-end">
                    <div
                      className="collapse navbar-collapse navbar-main menu"
                      id="navbarSupportedContent"
                    ></div>

                    <div className="d-flex align-items-center">
                      <div className="header-icon header-usermain">
                        <div className="nav-item">
                          <img
                            src={HeaderUser}
                            onClick={headerUser}
                            alt="png"
                            className="img-fluid"
                          />
                        </div>
                        {!modalShow && !ModalLoginShow &&
                          <div
                            className={
                              isshow
                                ? "sign-header click-user active"
                                : "sign-header click-user"
                            }
                          >
                            {!isAuthenticated ? (
                              <ul>
                                <li key="sign-in" className="nav-item sign-in-lg-btn">
                                  <p className="cursor-pointer" onClick={() => setModalShow(true)}>
                                    Sign In
                                  </p>
                                </li>
                                <li key="sign-up" className="nav-item sign-in-sm-btn">
                                  <p className="cursor-pointer" onClick={() => setModalLoginShow(true)}>
                                    Sign In
                                  </p>
                                </li>
                              </ul>
                            ) : (
                              <ul>
                                {location.pathname !== "/my-account" && (
                                  <li key="my-account" className="nav-item">
                                    <p
                                      className="cursor-pointer"
                                      onClick={goToAccount}
                                    >
                                      My Account
                                    </p>
                                  </li>
                                )}
                                <li key="sign-out" className="nav-item">
                                  <p className="cursor-pointer" onClick={() => { logout(); setModalLoginShow(true) }}>
                                    Log Out
                                  </p>
                                </li>
                              </ul>
                            )}
                          </div>
                        }
                      </div>
                      <div className="header-icon header-cart" ref={cartRef}>
                        <li className="bell-like bell-more">
                          <img
                            src={HeaderCart}
                            alt="png"
                            onClick={btnmodalm}
                            className="img-fluid"
                            data-toggle="modal"
                            data-target="#myModal2"
                          />
                          <span className="bullhorn">{cartItems?.length || 0}</span>
                        </li>
                        {/* Modal */}
                        <form>
                          <div
                            className={
                              isshowmore
                                ? "modal-cart click-cart active"
                                : "modal-cart click-cart"
                            }
                          >
                            <div key="main">
                              <div className="close-title-count">
                                <div key="head">
                                  <h5>SHOPPING CART</h5>
                                </div>
                                <div key="icon">
                                  <FontAwesomeIcon
                                    icon={faClose}
                                    onClick={() => closeCartModal()}
                                  />
                                </div>
                              </div>
                              <div className="modal-cart-body">
                                {cartItems?.length ? (
                                  cartItems.map((item) => {
                                    return (
                                      <div className="d-flex align-items-center modal-item-cart" key={item.id}>
                                        <div className="modal-cart-img">
                                          <img
                                            src={item.productId.image[0]}
                                            className="img-fluid"
                                            alt="img"
                                          />
                                        </div>
                                        <div className="modal-cart-info">
                                          <h4>{item.productId.title}</h4>
                                          <p>Qty: {item.quantity}</p>
                                          <span className="main-price-cart">
                                            ${item.productId.withDiscount}
                                          </span>
                                          <del className="cartwith-discount-price">
                                            ${item.productId.originalPrice}
                                          </del>
                                        </div>
                                      </div>
                                    );
                                  })
                                ) : (
                                  <p className="ps-4">Cart is Empty</p>
                                )}
                              </div>
                              <div className="sub-total-cart">
                                <div className="d-flex align-item-center justify-content-between cart-main-subtotal main-total">
                                  <p>Sub Total</p>
                                  <span>${total}</span>
                                </div>
                                <div className="d-flex align-item-center justify-content-between cart-main-subtotal">
                                  <p>Shipping</p>
                                  <span>{total === 0 ? '0' : '$7.00'}</span>
                                </div>
                                <div className="d-flex align-item-center justify-content-between cart-main-subtotal">
                                  <p>Total (tax excl.)</p>
                                  <span>${total === 0 ? total : total + 7.0}</span>
                                </div>
                                <div className="mt-4 modal-main-btns">
                                  <Link to="/cart">
                                    <button
                                      variant="secondary"
                                      className="cart-modal-btn"
                                      onClick={closeCartModal}
                                    >
                                      view cart
                                    </button>
                                  </Link>
                                  <Link to="/checkout">
                                    <button
                                      variant="primary"
                                      className="checkout-modal-btn"
                                      onClick={closeCartModal}
                                    >
                                      checkout
                                    </button>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
            <div
              className="header-search-icon header-search-sm pt-0"
              ref={searchRef}
            >
              <div className="form-group has-search">
                {/* <img
                      src={Headersearch}
                      onClick={headerSearch}
                      alt="img"
                      className="img-fluid"
                    /> */}
                <div className="header-search-div">
                  <form className="form-header-search">
                    <div className="header-main-search-icon">
                      <div>
                        <input
                          type="search"
                          className="form-control click-text"
                          placeholder="ex : watch, laptop, Elecrtronic, hp, lenovo..."
                          onChange={(e) => {
                            setsearch(e?.target?.value);
                          }}
                          value={search}
                        />
                      </div>
                      <div className="search-svg">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                      </div>
                      <div className={`microphone-svg${listening ? ' on' : ' off'}`} onMouseDown={SpeechRecognition.startListening} onMouseUp={SpeechRecognition.stopListening}>
                        <FontAwesomeIcon icon={faMicrophoneAlt} />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {/* sm over */}
          </div>
        </div>
        <div className="header-menu text-center">
          <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light header-menumain-inner">
              <div className="container-fluid justify-content-center">
                <div
                  className={
                    isActivem
                      ? "collapse navbar-collapse navbar-main menu active"
                      : "collapse navbar-collapse navbar-main menu"
                  }
                  id="navbarSupportedContent"
                >
                  {isActivem && <div className="header-menu-close">
                    <FontAwesomeIcon
                      icon={faClose}
                      onClick={() => closeMenu()}
                    />
                  </div>}
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <Link className="nav-link active" to="/">
                        Home
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/about-us">
                        About Us
                      </Link>
                    </li>
                    {/* {vendorid ? <li className="nav-item position-relative" onClick={VendorStore}>
                    <span className="nav-link">
                      Vendor
                    </span>
                    <div className={vendorstore ? "vendor active" : "vendor"}>
                      <ul>
                        <li className="pb-2"><Link to='/storelist'>Store Listing</Link></li>
                        <li><Link to='/vendor/:id'>Vendor Store</Link></li>
                      </ul>
                    </div>
                  </li> : "" } */}
                    <li className="nav-item">
                      <Link to="/categories">
                        <div className="nav-link pointer">Categories</div>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/blogs" className="nav-link">
                        Blog
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/contact-us" className="nav-link pe-0">
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
