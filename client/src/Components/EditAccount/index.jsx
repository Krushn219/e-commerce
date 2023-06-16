import React from "react";
import "./style.css";
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  addressDelete,
  Changepassword,
  getSingleUser,
  userUpdate,
} from "../../Utils/APIs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { filterAddresses } from "../../Utils/Data";
import avatar from "../../assets/Images/avatar.jpg";

const EditAccount = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hiddenFileInput = useRef(null);
  const [file, setfile] = useState();
  const [address, setaddress] = useState([]);
  const { register: register, handleSubmit } = useForm();
  const [values, setvalues] = useState({
    selectedAddress: "",
    gender: "",
    firstname: "",
    image: "",
    lastname: "",
    email: "",
    birthday: "",
    receiveOffersFromOurPartners: false,
    signUpForOurNewsletter: false,
  });
  const [changePass, setchangePass] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });

  const userUpdates = async () => {
    try {
      const fdata = new FormData();
      fdata.append(
        "image",
        await fetch(file)
          .then((r) => r.blob())
          .then(
            (blobFile) =>
              new File([blobFile], "fileName", { type: blobFile.type })
          )
      );
      fdata.append("firstname", values.firstname);
      fdata.append("lastname", values.lastname);
      fdata.append("email", values.email);
      fdata.append("birthday", values.birthday);
      fdata.append("gender", values.gender);
      fdata.append(
        "receiveOffersFromOurPartners",
        values.receiveOffersFromOurPartners
      );
      fdata.append("signUpForOurNewsletter", values.signUpForOurNewsletter);
      fdata.append("selectedAddress", values.selectedAddress);
      const res = await userUpdate(fdata);
      if (res.status === 200) {
        toast.info("user is updated");
      } else {
        toast.error("user is not updated");
      }
    } catch (e) {
      toast.error(e);
    }
  };

  const updateValues = (obj) => {
    setvalues({ ...values, ...obj });
  };

  useEffect(() => {
    getUserSingle();
  }, []);

  const handleClick = (event) => {
    hiddenFileInput.current.click(event.target.value);
  };

  const handleChange = async (e) => {
    setfile(URL.createObjectURL(e.target.files[0]));
  };

  const getUserSingle = async () => {
    try {
      const res = await getSingleUser();
      if (res.status === 200) {
        const {
          firstname,
          lastname,
          email,
          image,
          gender,
          birthday,
          receiveOffersFromOurPartner,
          SignUpForOurNewsletter,
          selectedAddress,
          password,
        } = res.data.user;
        updateValues({
          firstname: firstname,
          lastname: lastname,
          email: email,
          image: image,
          gender: gender,
          birthday: birthday,
          receiveOffersFromOurPartners: receiveOffersFromOurPartner,
          signUpForOurNewsletter: SignUpForOurNewsletter,
          selectedAddress: selectedAddress[0],
          password: password,
        });
        setaddress(filterAddresses(res.data.user.address));
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const AddressIdHandle = (id) => {
    setvalues({ ...values, selectedAddress: id });
  };

  const handleUpdatedb = async (id) => {
    navigate(`/update-addressdb/${id}`);
  };

  const handleUpdate = async (id) => {
    navigate(`/update-address/${id}`);
  };

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

  const onChangeHandle = (e) => {
    setchangePass((value) => ({
      ...value,
      [e?.target?.name]: e?.target?.value,
    }));
  };

  const changePasswordAPI = async () => {
    if (
      validation(changePass.current, changePass.confirm, changePass.newPassword)
    ) {
      try {
        const res = await Changepassword(changePass);
        if (res.status === 200) {
          toast.success("change password successfully");
        } else {
          toast.error("error while change password");
        }
      } catch (error) {
        toast.error("error while change password");
      }
    }
  };

  const validation = (current, newPassword, confirm) => {
    if (!current && !newPassword && confirm) {
      toast.error("Require all the fields");
    }

    if (!current) {
      toast.error("Please enter current password");
      return false;
    }

    if (!newPassword) {
      toast.error("Please enter newPassword");
      return false;
    }

    if (!confirm) {
      toast.error("Please enter Confirmpassword");
      return false;
    }

    if (newPassword !== confirm) {
      toast.error("password does not match..");
      return false;
    }

    return true;
  };

  const handleInputField = (e) => {
    setchangePass({
      ...changePass,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="edit-accout-wrapper">
      <div className="edit-account-title">
        <h2>Edit Account Details</h2>
      </div>
      <div className="social-title">
        <label>Gender *</label>
        <div className="d-flex align-items-center">
          <div className="pe-3">
            <input
              className="form-check-input me-2"
              type="radio"
              id="male"
              name="gender"
              checked={values.gender === "male"}
              onChange={(e) =>
                e?.target?.checked && updateValues({ gender: "male" })
              }
            />
            <label className="form-check-label me-2" htmlFor="male">
              Male
            </label>
          </div>
          <div>
            <input
              className="form-check-input me-2"
              onChange={(e) =>
                e?.target?.checked && updateValues({ gender: "female" })
              }
              type="radio"
              checked={values.gender === "female"}
              name="gender"
              id="female"
            />
            <label className="form-check-label" htmlFor="female">
              Female
            </label>
          </div>
        </div>
      </div>
      <div className="edit-account-info email-subscription">
        <label htmlFor="">First name *</label>
        <input
          placeholder="enter your first name"
          type="text"
          value={values.firstname}
          name="firstname"
          onChange={onChangeHandle}
        />
      </div>
      <div className="edit-account-info email-subscription">
        <label htmlFor="">Last name *</label>
        <input
          type="text"
          placeholder="enter your last name"
          value={values.lastname}
          name="lastname"
          onChange={onChangeHandle}
        />
      </div>
      <div className="edit-account-info email-subscription">
        <label htmlFor="">Email address *</label>
        <input
          type="email"
          className="mb-3"
          value={values.email}
          name="email"
          onChange={onChangeHandle}
          placeholder="enter your Email address"
        />
      </div>
      <div className="col-lg-6">
        <div className="edit-account-info email-subscription">
          <label>Birth Date *</label>
          <input
            type="date"
            value={values.birthday}
            name="birthday"
            onChange={onChangeHandle}
          />
          <p className="pt-2">Optional</p>
        </div>
      </div>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: "none" }}
      />
      <div
        className="edit-account-info email-subscription"
        onClick={handleClick}
      >
        <label htmlFor="">Upload profile image *</label>
        <div className="profile-img">
          {console.log("file", file)}
          <img
            src={file ? file : avatar}
            onChange={onChangeHandle}
            alt="img"
            name="image"
          />
        </div>
      </div>
      <div>
        <div className="social-title user-name mt-4">
          <label>Address * </label>
        </div>
        {address.length ? (
          address.map((item) => {
            return (
              <div key={item.id} className="form-inputmain">
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
                    {location.pathname !== "/edit-account" && (
                      <button
                        type="button"
                        className="update-btn"
                        onClick={() => handleUpdatedb(item.id)}
                      >
                        <FontAwesomeIcon icon={faPen} className="me-2" />
                        <span>Update</span>
                      </button>
                    )}
                    {location.pathname === "/edit-account" && (
                      <button
                        type="button"
                        className="update-btn"
                        onClick={() => handleUpdate(item.id)}
                      >
                        <FontAwesomeIcon icon={faPen} className="me-2" />
                        <span>Update</span>
                      </button>
                    )}
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => handleRemove(item.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} className="me-2" />
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
        {location.pathname !== "/edit-account-details" && (
          <Link to="/new-address">
            <button className="back-account ms-0 mt-3">
              + create new address{" "}
            </button>
          </Link>
        )}
        {location.pathname === "/edit-account-details" && (
          <Link to="/newaddress-db">
            <button className="back-account ms-0 mt-3">
              + create new address{" "}
            </button>
          </Link>
        )}
      </div>
      <form onSubmit={handleSubmit(userUpdates)}>
        <h3 className="change-password pt-2">Change Password *</h3>
        <div className="edit-account-info email-subscription">
          <label htmlFor="">
            Current Password (leave blank to leave unchanged)
          </label>
          <input
            type="password"
            placeholder="current password"
            value={changePass.current}
            onChange={handleInputField}
            name="current"
          />
        </div>
        <div className="edit-account-info email-subscription">
          <label htmlFor="">
            New Password (leave blank to leave unchanged)
          </label>
          <input
            type="password"
            placeholder="new password"
            value={changePass.newPassword}
            onChange={handleInputField}
            name="newPassword"
          />
        </div>
        <div className="edit-account-info email-subscription">
          <label htmlFor="">Confirm New Password</label>
          <input
            type="password"
            placeholder="confirm password is equal by new password which u set"
            value={changePass.confirm}
            onChange={handleInputField}
            name="confirm"
          />
        </div>
      </form>
      <button className="export-btn ms-0 mt-4 me-3" onClick={changePasswordAPI}>
        Change Password
      </button>
      <button className="export-btn ms-0 mt-4" onClick={userUpdates}>
        Save Changes
      </button>
    </div>
  );
};

export default EditAccount;
