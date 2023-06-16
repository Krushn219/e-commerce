import React, { useEffect, useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faHome,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { addressDelete, getSingleUser, getUserSelect, userUpdate } from "../../Utils/APIs";
import { filterAddresses } from "../../Utils/Data";

const Information = () => {
  const navigate = useNavigate();
  const [address, setaddress] = useState([]);
  const [values, setvalues] = useState({
    selectedAddress: "",
    gender: "",
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
    receiveOffersFromOurPartner: false,
    signUpForOurNewsletter: false,
  });
  useEffect(() => {
    getUserSingle()
  }, []);

  const handleUpdate = async (id) => {
    navigate(`/update-address/${id}`);
  };

  const onChangeHandler = (e) => {
    setvalues({
      ...values,
      [e?.target?.name]: e?.target?.value,
    });
  }

  const updateValues = (obj) => {
    setvalues({ ...values, ...obj });
  }

  const AddressIdHandle = (id) => {
    setvalues({ ...values, selectedAddress: id })
  }

  const handleRemove = async (id) => {
    if (window.confirm("Are you sure you want to delete this user")) {
      try {
        await addressDelete(id);
        toast.success("Address Deleted");
      } catch (error) {
        toast.error("error while deleting Address");
      } finally {
        getUserSingle();
      }
    }
  };

  const userUpdates = async () => {
    try {
      const res = await userUpdate({
        firstname: values.firstName,
        lastname: values.lastName,
        selectedAddress: values.selectedAddress,
        email: values.email,
        birthday: values.birthDate,
        gender: values.gender,
        receiveOffersFromOurPartner: values.receiveOffersFromOurPartner,
        SignUpForOurNewsletter: values.signUpForOurNewsletter
      })
      let response;
      if (!!values.selectedAddress) {
        response = await getUserSelects(values.selectedAddress)
      }
      if (res.status === 200 && response.status === 200) {
        toast.info("user is updated");
      } else {
        toast.error("user is not updated");
      }
    } catch (e) {
      toast.error(e)
    }
  }

  const getUserSingle = async () => {
    try {
      const res = await getSingleUser()
      const { firstname, lastname, email, gender, selectedAddress, birthday, SignUpForOurNewsletter, receiveOffersFromOurPartner } = res.data.user
      if (res.status === 200) {
        updateValues({
          firstName: firstname,
          lastName: lastname,
          email: email,
          gender: gender,
          birthDate: birthday,
          receiveOffersFromOurPartner: receiveOffersFromOurPartner,
          signUpForOurNewsletter: SignUpForOurNewsletter,
          selectedAddress: selectedAddress[0],
        })
        setaddress(filterAddresses(res.data.user.address))
      }
    } catch (error) {
      toast.error(error)
    }
  }

  const getUserSelects = async (id) => {
    try {
      return await getUserSelect(id);
    } catch (error) {
      toast.error(error)
    }
  }

  return (
    <div className="Information-wrapper">
      <div className="container">
        <div className="pt-3">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/my-account">My Account</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Information
              </li>
            </ol>
          </nav>
        </div>
        <div className="Information-item">
          <div className="checkout-info3 main-continue1">
            <form>
              <div className="social-title">
                <label>Social title</label>
                <div className="d-flex align-items-center">
                  <div className="pe-3">
                    <input
                      className="form-check-input me-2"
                      type="radio"
                      id="male"
                      name="gender"
                      checked={values.gender === "male"}
                      onChange={(e) => e.target.checked && updateValues({ gender: "male" })}
                    />
                    <label className="form-check-label me-2" htmlFor="male">Male</label>
                  </div>
                  <div>
                    <input
                      className="form-check-input me-2"
                      onChange={(e) => e.target.checked && updateValues({ gender: "female" })}
                      type="radio"
                      checked={values.gender === "female"}
                      name="gender"
                      id="female"
                    />
                    <label className="form-check-label" htmlFor="female">Female</label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <div className="social-title user-name px-3">
                    <label>First Name</label>
                    <input
                      type="text"
                      value={values.firstName}
                      name="firstName"
                      onChange={onChangeHandler}
                    />
                    <p>
                      Only letters and the dot (.) character, followed by a space,
                      are allowed.
                    </p>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="social-title user-name px-3">
                    <label>Last Name</label>
                    <input
                      type="text"
                      value={values.lastName}
                      name="lastName"
                      onChange={onChangeHandler}
                    />
                    <p>
                      Only letters and the dot (.) character, followed by a space,
                      are allowed.
                    </p>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="social-title user-name px-3">
                    <label>Email</label>
                    <input
                      type="email"
                      className="mb-2"
                      value={values.email}
                      name="email"
                      onChange={onChangeHandler}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="social-title user-name px-3">
                    <label>Birth Date</label>
                    <input
                      type="Date"
                      value={values.birthDate}
                      name="birthDate"
                      onChange={onChangeHandler}
                    />
                    <p>Optional</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="social-title user-name mt-4">
                  <label>Address </label>
                </div>
                {address.length ? (
                  address.map((item) => {
                    return (
                      <div key={item.id} className='form-inputmain'>
                        <input
                          className="form-check-input me-2"
                          type="radio"
                          name="selectedAddress"
                          checked={item.id === values.selectedAddress}
                          onChange={() => AddressIdHandle(item.id)}
                        />
                        <div className="address-list">
                          {item.address}
                          <br />
                          {item.addressComplement}
                          <br />
                          {item.city}
                          <br />
                          {item.country}
                          <br />
                          {item.state}
                          <br />
                          {item.postcode}
                          <br />
                          <div className="update-btns">
                            <button
                              type="button"
                              className="update-btn"
                              onClick={() => handleUpdate(item.id)}
                            >
                              <FontAwesomeIcon icon={faPen} className="me-2" />
                              <span>Update</span>
                            </button>

                            <button
                              type="button"
                              className="delete-btn"
                              onClick={() => handleRemove(item.id)}
                            >
                              <FontAwesomeIcon
                                icon={faTrash}
                                className="me-2"
                              />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="address-not-available">
                    <p>No Addresses are Available. Add a New Address</p>
                  </div>
                )}
                <Link to="/new-address">
                  <button className="back-account ms-0 mt-3">
                    + create new address{" "}
                  </button>
                </Link>
              </div>
              <div className="social-title d-flex align-items-center">
                <div className="pe-3">
                  <input
                    type="checkbox"
                    className="form-check-input me-2"
                    checked={values.receiveOffersFromOurPartner}
                    name="receiveOffersFromOurPartner"
                    onChange={(e) => updateValues({ receiveOffersFromOurPartner: e.target.checked })}
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
                    className="form-check-input me-2"
                    checked={values.signUpForOurNewsletter}
                    name="signUpForOurNewsletter"
                    onChange={(e) => updateValues({ signUpForOurNewsletter: e.target.checked })}
                  />
                </div>
                <div>
                  <p>Sign up for our newsletter</p>
                </div>
              </div>
              <div className="pt-2">
                <em className="unsubscribe">
                  You may unsubscribe at any moment. For that purpose, please
                  find our contact info in the legal notice.
                </em>
              </div>
            </form>

            <div className="form-continue-btn">
              <button type="button" onClick={userUpdates}>Register</button>
            </div>
          </div>
        </div>
        <Link to="/my-account">
          <button className="back-account">
            <FontAwesomeIcon icon={faAngleLeft} className="me-2" />
            <span>Back to Your Account</span>
          </button>
        </Link>
        <Link to="/">
          <button className="back-account main-home-svg">
            <FontAwesomeIcon icon={faHome} className="me-2" />
            <span>Home</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Information;
