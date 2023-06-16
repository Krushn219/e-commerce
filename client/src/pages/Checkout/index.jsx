import React, { useEffect, useState, useRef } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import Country from "../Json/country.json";
import City from "../Json/city.json";
import State from "../Json/state.json";
import {
  addressUpdate,
  getSingleUser,
  getUserWithCart,
  paymentSuccess,
  postnewOrder,
  userUpdate,
} from "../../Utils/APIs";
import { toast } from "react-toastify";
import { filterAddresses } from "../../Utils/Data";

const Checkout = () => {
  const navigate = useNavigate()
  const hiddenFileInput = useRef(null);
  const [showDetail, setshowDetail] = useState(false);
  const [cartItems, setcartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [file, setfile] = useState()
  const [toggleCheckout, settoggleCheckout] = useState([
    true,
    false,
    false,
    false,
  ]);
  const [userid, setuserid] = useState({})

  const [values, setvalues] = useState({
    selectedAddress: "",
    gender: "",
    firstname: "",
    lastname: "",
    image: "",
    email: "",
    birthday: "",
    receiveOffersFromOurPartners: false,
    signUpForOurNewsletter: false,
  });

  const [checkout, setcheckout] = useState({
    address: "",
    addressComplement: "",
    city: "",
    state: "",
    postcode: "",
    country: "",
  });

  const [shippingNote, setshippingNote] = useState("")

  const [Payment, setPayment] = useState({
    payment: "",
    isAgree: false
  })

  useEffect(() => {
    getUserSingle();
    getUserCart();
    usersingleid()
  }, []);

  useEffect(() => {
    let total = 0;
    cartItems.forEach((item) => {
      total = total + item.productId.withDiscount * item.quantity;
    });
    setTotal(total);
  }, [cartItems]);

  const ShowDetails = () => {
    setshowDetail(!showDetail);
  };

  const handleCheckoutSelfToggle = (i) => {
    let temp = [];
    toggleCheckout.forEach((item, index) => {
      if (index === i) {
        temp[index] = !item;
      } else {
        temp[index] = item;
      }
    });
    settoggleCheckout(temp);
  };

  const handleCheckoutToggle = (i) => {
    let temp = [...toggleCheckout];
    temp[i] = false;
    temp[i + 1] = true;
    settoggleCheckout(temp);
  };

  const onChangeHandler = (e) => {
    if (e.target.name === "country") {
      if (!e.target.value) {
        setcheckout({
          ...checkout,
          country: e.target.value,
          state: "",
          city: "",
        });
      } else {
        setcheckout({ ...checkout, country: e.target.value });
      }
    } else if (e.target.name === "state") {
      if (!e.target.value) {
        setcheckout({
          ...checkout,
          state: e.target.value,
          city: "",
        });
      } else {
        setcheckout({ ...checkout, state: e.target.value });
      }
    } else {
      setcheckout({
        ...checkout,
        [e?.target?.name]: e?.target?.value,
      });
    }
  };

  const onChangeHandle = (e) => {
    setvalues((value) => ({
      ...value,
      [e?.target?.name]: e?.target?.value,
    }));
  };

  const onchangePayment = (obj) => {
    setPayment({ ...Payment, ...obj })
  }

  const updateValues = (obj) => {
    setvalues({ ...values, ...obj });
  };

  const paymentvalues = (obj) => {
    setPayment({ ...Payment, ...obj });
  };

  const userUpdates = async () => {
    try {
      const fdata = new FormData();
      fdata.append('image', await fetch(file).then(r => r.blob()).then(blobFile => new File([blobFile], 'fileName', { type: blobFile.type })));
      fdata.append('firstname', values.firstname);
      fdata.append('lastname', values.lastname);
      fdata.append('email', values.email);
      fdata.append('birthday', values.birthday);
      fdata.append('gender', values.gender);
      fdata.append('receiveOffersFromOurPartners', values.receiveOffersFromOurPartners);
      fdata.append('signUpForOurNewsletter', values.signUpForOurNewsletter);
      fdata.append('selectedAddress', values.selectedAddress);
      const res = await userUpdate(fdata);
      if (res.status === 200) {
        toast.info("user is updated");
      } else {
        toast.error("user is not updated");
      }
      setvalues(res)
    } catch (e) {
      toast.error(e);
      toast.error("user is not updated");
    }
  };

  const getUserSingle = async () => {
    try {
      const res = await getSingleUser();
      if (res.status === 200) {
        const { firstname, lastname, email, gender, birthday, receiveOffersFromOurPartner, SignUpForOurNewsletter, selectedAddress, image } = res.data.user
        updateValues({
          firstname: firstname,
          lastname: lastname,
          email: email,
          gender: gender,
          birthday: birthday,
          image: image,
          receiveOffersFromOurPartners: receiveOffersFromOurPartner,
          signUpForOurNewsletter: SignUpForOurNewsletter,
          selectedAddress: selectedAddress[0],
        });
        filterAddresses(res.data.user.address).forEach((add) => {
          if (res.data.user.address[0]._id === add.id) {
            setcheckout({
              address: add.address,
              addressComplement: add.addressComplement,
              city: add.city,
              state: add.state,
              postcode: add.postcode,
              country: add.country,
            })
          }
        })
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const usersingleid = async () => {
    try {
      const res = await getSingleUser();
      setuserid(res.data.user.address[0])
    } catch (error) {
      toast(error)
    }
  }

  const handleClick = (event) => {
    hiddenFileInput.current.click(event.target.value);
  };

  const handleChange = async (e) => {
    setfile(URL.createObjectURL(e.target.files[0]));
  }

  const AddressUpdated = async (id) => {
    try {
      const res = await addressUpdate(id, checkout)
      if (res.status === 200) {
        toast.info("Address updated is successfully")
      } else {
        toast.error("Address is not updated");
      }
    } catch (e) {
      toast.error(e);
    }
  };

  const getUserCart = async (id) => {
    try {
      const res = await getUserWithCart(id)
      if (res.status === 200) {
        setcartItems(res?.data?.user[0].products);
      } else {
        toast.error("user is not valid")
      }
    } catch (e) {
      toast.error(e);
    }
  };

  const postUserPayment = async () => {
    try {
      if (Payment.isAgree) {
        const res = await postnewOrder({
          totalPrice: total,
          shippingMethod: "my carrier",
          shippingNote: shippingNote,
          Payment: "cash on delivery"
        })
        const { amount, id, currency } = res.data.order;
        const options = {
          key: process.env.REACT_APP_RAZORPAY_KEY_ID,
          amount: amount,
          currency: currency,
          description: "Test Transaction",
          order_id: id,
          handler: async function (response) {
            console.log("🚀 ~ file: index.jsx:280 ~ response", response)
            const data = {
              orderCreationId: id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            };
            const res = await paymentSuccess(data)
            if (res.data.msg === "success") {
              navigate(`/my-account`)
            }
            toast.success("Payment done");
          },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } else {
        toast.error("Agree to please click")
      }
    } catch (e) {
      toast.error(e?.message || "error occured")
    }
  }

  return (
    <div className="checkout-wrapper">
      <div className="container">
        <div className="pt-3">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Checkout
              </li>
            </ol>
          </nav>
        </div>
        <div className="main-div-checkout pb-5">
          <div className="row pb-5">
            <div className="col-lg-8 col-md-8 col-sm-12 pe-4 checkout-main">
              <div className="checkout-main-info">
                <div
                  className="checkout-title"
                  onClick={() => handleCheckoutSelfToggle(0)}
                >
                  <span>1.</span>
                  <p>Personal Information</p>
                </div>
                <div
                  className={
                    toggleCheckout[0]
                      ? "checkout-info3 main-continue1"
                      : "checkout-info3 main-continue1 active"
                  }
                >
                  <div className="checkout-info">
                    <p className="pe-2">Order as a guest</p>|
                    <p className="ps-2">Sign In</p>
                  </div>
                  <form>
                    <div className="social-title">
                      <label>Social title</label>
                      <div className="d-flex align-items-center">
                        <div className="pe-3">
                          <input
                            className="form-check-input me-2"
                            type="radio"
                            name="gender"
                            id="male"
                            checked={values.gender === "male"}
                            onChange={(e) => e?.target?.checked && updateValues({ gender: "male" })}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="male"
                          >
                            Male
                          </label>
                        </div>
                        <div>
                          <input
                            className="form-check-input me-2"
                            onChange={(e) => e?.target?.checked && updateValues({ gender: "female" })}
                            type="radio"
                            id="female"
                            checked={values.gender === "female"}
                            name="gender"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="female"
                          >
                            Female
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="social-title user-name user-main">
                          <label>First Name</label>
                          <input
                            type="text"
                            value={values.firstname}
                            name="firstname"
                            onChange={(onChangeHandle)}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="social-title user-name user-main">
                          <label>Last Name</label>
                          <input
                            type="text"
                            value={values.lastname}
                            name="lastname"
                            onChange={onChangeHandle}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="social-title user-name user-main">
                          <label>Email</label>
                          <input
                            type="email"
                            className="mb-3"
                            value={values.email}
                            name="email"
                            onChange={onChangeHandle}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="social-title user-name user-main">
                          <label>Birth Date</label>
                          <input
                            type="Date"
                            value={values.birthday}
                            name="birthday"
                            onChange={onChangeHandle}
                          />
                          <p>Optional</p>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <input
                          type="file"
                          ref={hiddenFileInput}
                          onChange={handleChange}
                          style={{ display: 'none' }}
                        />
                        <div className="social-title user-name user-main" onClick={handleClick}>
                          <label>Image</label>
                          <img src={file ? file : values.image} onChange={onChangeHandle} name="image" className="checkout-profile-img" alt="img" />
                        </div>
                      </div>
                    </div>
                    <div className="social-title d-flex align-items-center">
                      <div className="pe-3">
                        <input
                          type="checkbox"
                          checked={values.receiveOffersFromOurPartners}
                          name="receiveOffersFromOurPartners"
                          onChange={(e) =>
                            updateValues({
                              receiveOffersFromOurPartners: e.target.checked,
                            })
                          }
                        />
                      </div>
                      <div>
                        <p>Receive offers from our partners</p>
                      </div>
                    </div>
                    <div className="social-title d-flex align-items-center">
                      <div className="pe-3">
                        <input
                          type="checkbox"
                          checked={values.signUpForOurNewsletter}
                          name="signUpForOurNewsletter"
                          onChange={(e) =>
                            updateValues({
                              signUpForOurNewsletter: e.target.checked,
                            })
                          }
                        />
                      </div>
                      <div>
                        <p>Sign up for our newsletter</p>
                      </div>
                    </div>
                    <div className="pt-2">
                      <em className="unsubscribe">
                        You may unsubscribe at any moment. For that purpose,
                        please find our contact info in the legal notice.
                      </em>
                    </div>
                  </form>
                  <div className="form-continue-btn">
                    <button onClick={userUpdates}>Continue</button>
                  </div>
                </div>
                <div>
                  <div
                    className="checkout-title2"
                    onClick={() => handleCheckoutSelfToggle(1)}
                  >
                    <span className="pe-3">2.</span>
                    <p>Addresses</p>
                  </div>
                  <div
                    className={
                      toggleCheckout[1]
                        ? "checkout-info2 active"
                        : "checkout-info2"
                    }
                  >
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="social-title user-name user-main">
                          <label>Address Line 1</label>
                          <input
                            type="text"
                            value={checkout.address || ''}
                            name="address"
                            onChange={onChangeHandler}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="social-title user-name user-main">
                          <label>Address Line 2</label>
                          <input
                            type="text"
                            value={checkout.addressComplement || ''}
                            name="addressComplement"
                            required={false}
                            onChange={onChangeHandler}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-4">
                        <div className="social-title user-name user-main">
                          <label>Country</label>
                          <select
                            value={checkout.country || ''}
                            onChange={onChangeHandler}
                            required={false}
                            name="country"
                          >
                            <option value={""}>-- Select country --</option>
                            {Country?.map((item, i) => {
                              return (
                                <option key={i} value={item.isoCode}>
                                  {item.name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="social-title user-name user-main">
                          <label>State</label>
                          <select
                            value={checkout.state || ''}
                            onChange={onChangeHandler}
                            required={false}
                            name="state"
                            disabled={!!!checkout.country}
                          >
                            <option value={""}>-- Select State --</option>
                            {State?.map((item, i) => {
                              if (item?.countryCode === checkout.country) {
                                return (
                                  <option key={i} value={item.isoCode}>
                                    {item.name}
                                  </option>
                                );
                              }
                              return false;
                            })}
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="social-title user-name user-main">
                          <label>City</label>
                          <select
                            value={checkout.city || ''}
                            onChange={onChangeHandler}
                            required={false}
                            disabled={!!!checkout.state}
                            name="city"
                          >
                            <option value={""}>-- Select city --</option>
                            {City.map((item, i) => {
                              if (
                                item?.countryCode === checkout.country &&
                                item?.stateCode === checkout.state
                              ) {
                                return (
                                  <option key={i} value={item.name}>
                                    {item.name}
                                  </option>
                                );
                              }
                              return false;
                            })}
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="social-title user-name1 user-main">
                          <label>Postal Code</label>
                          <input
                            type="number"
                            name="postcode"
                            className="ps-3"
                            onChange={onChangeHandler}
                            value={checkout.postcode || ''}
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      className="form-continue-btn"
                      onClick={() => handleCheckoutToggle(1)}
                    >
                      <button type="button" onClick={() => AddressUpdated(userid._id)}>
                        Continue
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <div
                    className="checkout-title2"
                    onClick={() => handleCheckoutSelfToggle(2)}
                  >
                    <span className="pe-3">3.</span>
                    <p>Shipping Method</p>
                  </div>
                  <div
                    className={
                      toggleCheckout[2]
                        ? "shipping-checkout active"
                        : "shipping-checkout"
                    }
                  >
                    {cartItems.length ? (
                      cartItems.map((element) => {
                        return (
                          <div className="row align-items-center text-center me-shipping-bottom p-3" key={element.id}>
                            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6">
                              <div className="text-center">
                                <img src={element?.productId?.image[0]} alt="img" className="img-fluid" />
                              </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6">
                              <p>{element?.productId?.title}</p>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6">
                              <p className="py-2">Delivery Next Day!</p>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6">
                              <p>$ {element?.productId?.withDiscount + 7} tax excl.</p>
                            </div>
                          </div>
                        )
                      })
                    ) : (
                      <p className="ps-4 mb-3">cart is empty</p>
                    )}
                    <div className="checkout-info3">
                      <p className="pb-2">
                        If you would like to add a comment about your order,
                        please write it in the field below.
                      </p>
                      <textarea
                        type="text"
                        cols="30"
                        rows="5"
                        className="comment-textarea"
                        value={shippingNote}
                        onChange={(e) => setshippingNote(e.target.value)}
                      />
                    </div>
                    <div
                      className="form-continue-btn pe-4"
                      onClick={() => handleCheckoutToggle(2)}
                    >
                      <button>Continue</button>
                    </div>
                  </div>
                </div>

                <div>
                  <div
                    className="checkout-title2"
                    onClick={() => handleCheckoutSelfToggle(3)}>
                    <span className="pe-3">4.</span>
                    <p>Payment</p>
                  </div>
                  <div
                    className={
                      toggleCheckout[3]
                        ? "checkout-info3 payment-main active"
                        : "checkout-info3 payment-main"
                    }
                  >
                    {/* <div className="row mb-4">
                      <div className="col-lg-6">
                        <div className="social-title user-name user-main">
                          <label>Credit Card Number</label>
                          <input
                            type="number"
                            placeholder="Enter Credit card number"
                          // value={checkout.address}
                          // name="address"
                          // onChange={onChangeHandler}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="social-title user-name user-main">
                          <label>Billing Zip</label>
                          <input
                            type="number"
                            placeholder="Enter Billing Zip Code"
                          // value={checkout.address}
                          // name="address"
                          // onChange={onChangeHandler}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="social-title user-name user-main">
                          <label>CVC</label>
                          <input
                            type="number"
                            placeholder="Enter your cvc number"
                          // value={checkout.address}
                          // name="address"
                          // onChange={onChangeHandler}
                          />
                        </div>
                      </div>
                    </div> */}
                    <div className="payment-info">
                      <input type="radio"
                        name="payment"
                        checked={Payment.payment == 'Pay by Check'}
                        onChange={() => onchangePayment({ payment: "Pay by Check" })}
                        className="me-3"
                      />
                      <span>Pay by Check</span>
                    </div>
                    <div className="payment-info">
                      <input type="radio"
                        name="payment"
                        checked={Payment.payment == "Pay by Bank wire"}
                        onChange={() => onchangePayment({ payment: "Pay by Bank wire" })}
                        className="me-3"
                      />
                      <span>Pay by Bank wire</span>
                    </div>
                    <div className="payment-info">
                      <input type="checkbox"
                        className="me-3"
                        checked={Payment.isAgree}
                        name="isAgree"
                        onChange={(e) => paymentvalues({ isAgree: e.target.checked })} />
                      <span>
                        I agree to the terms of service and will adhere to them
                        unconditionally.
                      </span>
                    </div>
                    <div className="order-obligation-btn mb-4 mt-3">
                      <button type="button" onClick={postUserPayment}>Order with an obligation to pay</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="cart-checkout">
                <div className="cart-shipping">
                  <p>{cartItems.length} Item</p>
                  <p className="detail-show" onClick={ShowDetails}>
                    Show Details
                  </p>
                </div>
                <div
                  className={
                    showDetail
                      ? "checkout-show-product active"
                      : "checkout-show-product"
                  }
                >
                  {cartItems.length ? (
                    cartItems.map((item) => {
                      return (
                        <div
                          key={item.id}
                          className="d-flex align-items-center modal-item-cart"
                        >
                          <div className="modal-cart-img">
                            <img
                              src={item.productId?.image[0]}
                              className="img-fluid"
                              alt="img"
                            />
                          </div>
                          <div className="modal-cart-info">
                            <h4>{item.productId.title}</h4>
                            <p>Qty: {item.quantity}</p>
                            <span className="main-price-cart">${item.productId.withDiscount}</span>
                            <del class="cartwith-discount-price">${item.productId.originalPrice}</del>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="ps-4">Cart is Empty</p>
                  )}
                </div>

                <div className="d-flex align-item-center justify-content-between cart-shipping">
                  <p>Subtotal</p>
                  <span>${total}</span>
                </div>
                <div className="d-flex align-item-center justify-content-between cart-shipping">
                  <p>Shipping</p>
                  <span>{total === 0 ? "0" : '$7.00'}</span>
                </div>
                <div className="d-flex align-item-center justify-content-between cart-shipping tax-border">
                  <p>Total (tax excl.)</p>
                  <span>${total === 0 ? total : total + 7.0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
