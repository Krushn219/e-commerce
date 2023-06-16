import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Country from "../../pages/Json/country.json";
import City from "../../pages/Json/city.json";
import State from "../../pages/Json/state.json";
import { toast } from "react-toastify";
import { addressUpdate, getSingleUser } from "../../Utils/APIs";

const UpdateAddressDb = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [updatedAddress, setupdatedAddress] = useState({
    address: "",
    addressComplement: "",
    city: "",
    state: "",
    postcode: "",
    country: "",
  });

  useEffect(() => {
    getAddressToUpdate();
  }, []);

  const getAddressToUpdate = async () => {
    const res = await getSingleUser()
    if (res.status === 200) {
      const { address } = res.data.user;
      address.forEach((element) => {
        if (id === element._id) {
          setupdatedAddress({
            address: element.address,
            addressComplement: element.addressComplement,
            city: element.city,
            state: element.state,
            postcode: element.postcode,
            country: element.country,
          });
        }
      });
    }
  };

  const onChangeHandler = (e) => {
    if (e.target.name === "country") {
      if (!e.target.value) {
        setupdatedAddress({
          ...updatedAddress,
          country: e.target.value,
          state: "",
          city: "",
        });
      } else {
        setupdatedAddress({ ...updatedAddress, country: e.target.value });
      }
    } else if (e.target.name === "state") {
      if (!e.target.value) {
        setupdatedAddress({
          ...updatedAddress,
          state: e.target.value,
          city: "",
        });
      } else {
        setupdatedAddress({ ...updatedAddress, state: e.target.value });
      }
    } else {
      setupdatedAddress({
        ...updatedAddress,
        [e?.target?.name]: e?.target?.value,
      });
    }
  };

  const formUpdate = async () => {
    try {
      const res = await addressUpdate(id, updatedAddress);
      if (res.status === 200) {
        navigate(`/edit-account-details`);
        toast.info("Address updated");
      } else {
        toast.error("Address is not updated");
      }
    } catch (e) {
      toast(e);
    }
  };


  return (
    <div className="new-address-wrapper">
      <div className="container">
        <div className="pt-3">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/edit-account-details">Edit Account</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Update Your Address
              </li>
            </ol>
          </nav>
        </div>
        <div className="new-address-main-wrapper">
          <div className="new-address-wrapper2">
            <form>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="social-title user-name me-3">
                    <label>Address</label>
                    <input
                      value={updatedAddress?.address}
                      type="text"
                      name="address"
                      onChange={onChangeHandler}
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="social-title user-name">
                    <label>Address Complement</label>
                    <input
                      type="text"
                      value={updatedAddress.addressComplement}
                      name="addressComplement"
                      required={false}
                      onChange={onChangeHandler}
                    />
                    <p>Optional</p>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="social-title user-name city-checkout me-3">
                    <label>Country</label>
                    <select
                      value={updatedAddress.country}
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
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="social-title user-name city-checkout">
                    <label>State</label>
                    <select
                      value={updatedAddress.state}
                      onChange={onChangeHandler}
                      required={false}
                      name="state"
                      disabled={!!!updatedAddress.country}
                    >
                      <option value={""}>-- Select State --</option>
                      {State?.map((item, i) => {
                        if (item?.countryCode === updatedAddress.country) {
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
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="social-title user-name city-checkout me-3">
                    <label>City</label>
                    <select
                      value={updatedAddress.city}
                      onChange={onChangeHandler}
                      required={false}
                      disabled={!!!updatedAddress.state}
                      name="city"
                    >
                      <option value={""}>-- Select city --</option>
                      {City.map((item, i) => {
                        if (
                          item?.countryCode === updatedAddress.country &&
                          item?.stateCode === updatedAddress.state
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
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="social-title user-name1 city-checkout postal-code">
                    <label>Postal Code</label>
                    <input
                      type="number"
                      name="postcode"
                      onChange={onChangeHandler}
                      value={updatedAddress.postcode}
                    />
                  </div>
                </div>
              </div>
            </form>
            <button
              type="button"
              className="back-account text-end mb-1 ms-0 mt-3"
              onClick={formUpdate}
            >
              save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateAddressDb;
