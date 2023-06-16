import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Country from "../../pages/Json/country.json";
import City from "../../pages/Json/city.json";
import State from "../../pages/Json/state.json";
import { toast } from "react-toastify";
import { postAddress } from "../../Utils/APIs";

const NewAddressDb = () => {
  const navigate = useNavigate()
  const [value, setvalue] = useState({
    address: "",
    addressComplement: "",
    city: "",
    state: "",
    postcode: "",
    country: "",
  });

  const onChangeHandler = (e) => {
    if (e.target.name === "country") {
      if (!e.target.value) {
        setvalue({
          ...value,
          country: e.target.value,
          state: "",
          city: "",
        });
      } else {
        setvalue({ ...value, country: e.target.value });
      }
    } else if (e.target.name === "state") {
      if (!e.target.value) {
        setvalue({
          ...value,
          state: e.target.value,
          city: "",
        });
      } else {
        setvalue({ ...value, state: e.target.value });
      }
    } else {
      setvalue({
        ...value,
        [e?.target?.name]: e?.target?.value,
      });
    }
  };

  const formData = async () => {
    try {
      const res = await postAddress({ ...value })
      if (res.status === 201) {
        navigate("/edit-account-details")
        toast.info("New Address added")
      }
      else {
        toast.error("Address not added")
      }
    } catch (e) {
      toast(e)
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
                New Address
              </li>
            </ol>
          </nav>
        </div>
        <div className="new-address-main-wrapper">
          <div className="new-address-wrapper2">
            <form>
              <div className="row">
                <div className="col-lg-6 col-md-12">
                  <div className="social-title user-name px-2">
                    <label>Address</label>
                    <input
                      value={value.address}
                      type="text"
                      name="address"
                      onChange={onChangeHandler}
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-12">
                  <div className="social-title user-name px-2">
                    <label>Address Complement</label>
                    <input
                      type="text"
                      value={value.addressComplement}
                      name="addressComplement"
                      required={false}
                      onChange={onChangeHandler}
                    />
                    <p>Optional</p>
                  </div>
                </div>
                <div className="col-lg-6 col-md-12">
                  <div className="social-title user-name city-checkout px-2">
                    <label>Country</label>
                    <select
                      value={value.country}
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
                <div className="col-lg-6 col-md-12">
                  <div className="social-title user-name city-checkout px-2">
                    <label>State</label>
                    <select
                      value={value.state}
                      onChange={onChangeHandler}
                      required={false}
                      name="state"
                      disabled={!!!value.country}
                    >
                      <option value={""}>-- Select State --</option>
                      {State?.map((item, i) => {
                        if (item?.countryCode === value.country) {
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
                <div className="col-lg-6 col-md-12">
                  <div className="social-title user-name city-checkout px-2">
                    <label>City</label>
                    <select
                      value={value.city}
                      onChange={onChangeHandler}
                      required={false}
                      disabled={!!!value.state}
                      name="city"
                    >
                      <option value={""}>-- Select city --</option>
                      {City.map((item, i) => {
                        if (
                          item?.countryCode === value.country &&
                          item?.stateCode === value.state
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
                <div className="col-lg-6 col-md-12">
                  <div className="social-title user-name1 city-checkout postal-code px-2">
                    <label>Postal Code</label>
                    <input
                      type="number"
                      name="postcode"
                      onChange={onChangeHandler}
                      value={value.postcode}
                    />
                  </div>
                </div>
              </div>
            </form>
            <button type="button" className="back-account text-end mb-1 ms-0 main-save" onClick={formData}>save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewAddressDb;
