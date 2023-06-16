import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faHome,
  faTrash,
  faCircleMinus,
  faPlay,
  faArrowCircleDown,
} from "@fortawesome/free-solid-svg-icons";
import WishlistProducts from "../../Components/WishlistProducts";
import { toast } from "react-toastify";
import { deleteWishList, getWishlist, postWishlist } from "../../Utils/APIs";
import { ISOTodate } from "../../Utils/utilFunctions";
import { useEffect } from "react";
import { filterWishlist } from "../../Utils/Data";

const Wishlist = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [name, setname] = useState("");
  const [quantities, setquantities] = useState("");
  const [viewed, setviewed] = useState("");
  const [show, setshow] = useState(false);
  const [isshow, setisshow] = useState(true);
  const [view, setview] = useState(false);
  const [wishlist, setwishlist] = useState([]);

  useEffect(() => {
    getWishListAPI();
  }, []);

  const viewItems = () => {
    setview(!view);
  };

  const showProducts = () => {
    setshow(!show);
  };

  const viewProductList = () => {
    setisshow(!isshow);
  };

  const getWishListAPI = async () => {
    try {
      const res = await getWishlist();
      if (res.status === 200) {
        const { Default, createdAt, name, quantities, viewed, product } =
          res.data.userWishlist;
        setwishlist({
          default: Default,
          createdAt: createdAt,
          name: name,
          quantity: quantities,
          views: viewed,
          product: product,
        });
        setwishlist(filterWishlist(res.data.userWishlist));
      } else {
        toast.error("Internal server error");
      }
    } catch (e) {
      toast.error(e);
    }
  };

  const postWishList = async (id) => {
    try {
      if (name) {
        const res = await postWishlist({
          name: name,
          quantities: quantities,
          viewed: viewed,
          Default: false,
          product: id,
        });
        if (res.status === 201) {
          getWishListAPI();
          toast.info("successfully");
        }
      } else {
        toast.error("Enter WishList Name");
      }
    } catch (e) {
      toast.error(e);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteWishList(id);
      if (res.status === 200) {
        getWishListAPI();
        toast.info("Delete successfully");
      } else {
        toast.error("WishList is not Deleted");
      }
    } catch (e) {
      toast.error(e);
    }
  };

  const goToWishlistRiffered = () => {
    navigate(`/wishlist-reffered/${id}`)
  }

  return (
    <div className="wishlist-wrapper">
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
                My Wishlist
              </li>
            </ol>
          </nav>
        </div>
        <div className="wishlist-details">
          <div className="main-wishlist-wrapper">
            <div className="main-wishlist">
              <div>
                <h2>New Wishlist</h2>
              </div>
              <div className="wishlist-input mt-4">
                <label>Name</label>
                <input
                  type="text"
                  value={name}
                  name="name"
                  onChange={(e) => setname(e.target.value)}
                />
              </div>
              <div className="wishlist-input mt-3">
                <label>Viewed</label>
                <input
                  type="text"
                  value={viewed}
                  name="viewed"
                  onChange={(e) => setviewed(e.target.value)}
                />
              </div>
              <div className="wishlist-input mt-3">
                <label>Quantities</label>
                <input
                  type="text"
                  value={quantities}
                  name="quantities"
                  onChange={(e) => setquantities(e.target.value)}
                />
              </div>
              <button
                className="back-account ms-0 mt-4"
                onClick={() => postWishList()}
              >
                save
              </button>
            </div>
            <div className="table-responsive mx-3">
              {wishlist?.length ? (
                <table className="table table-bordered wishlist-table">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Qty.</th>
                      <th scope="col">Viewed</th>
                      <th scope="col">Created</th>
                      <th scope="col">Direct Link</th>
                      <th scope="col">Default</th>
                      <th scope="col">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wishlist?.length ? (
                      wishlist.map((item) => {
                        return (
                          <tr key={item.id}>
                            <td>{item.name} </td>
                            <td>{item.quantity} </td>
                            <td>{item.views} </td>
                            <td>{ISOTodate(item.createdAt)} </td>
                            <td className="view-name" onClick={() => viewItems(item.id)}>
                              {" "}
                              view{" "}
                            </td>
                            <td>
                              <input
                                value={item.Default}
                                type="checkbox"
                                checked={item.id}
                                onChange={item.id}
                              />{" "}
                            </td>
                            <td className="main-del-icon">
                              <FontAwesomeIcon
                                icon={faTrash}
                                onClick={() => handleDelete(item.id)}
                              />
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <div>No WishList</div>
                    )}
                  </tbody>
                </table>
              ) : (
                <p>No wishlist present</p>
              )}
            </div>
            {view && (
              <div className="wishlist-product-wrapper p-3 pt-1">
                <div>
                  <FontAwesomeIcon
                    icon={faCircleMinus}
                    onClick={viewProductList}
                  />
                </div>

                {isshow && (
                  <div>
                    <div
                      className="d-flex align-items-center hide-products"
                      onClick={showProducts}
                    >
                      {show ? <FontAwesomeIcon icon={faArrowCircleDown} /> : <FontAwesomeIcon icon={faPlay} />}
                      <p>{show ? "Hide Products" : "Show Products"}</p>
                    </div>

                    <div className="permlink">
                      <label>Permalink:</label>
                      <input
                        type="text"
                        placeholder="https://themevolty.com/presta/v1_electron_1/en/module/tvcmswishlist/view?token=44D5CC591E3664E1"
                        readOnly="readonly"
                      />
                    </div>
                    <button className="back-account ms-0 mb-2 mt-1" onClick={goToWishlistRiffered}>
                      <span>Send this wishlist</span>
                    </button>
                    {show && (
                      <div className="row">
                        {wishlist.length ? (
                          wishlist.map((element) => {
                            const item = element?.directlink[0]?.product
                            return (
                              <div key={element.id} className="col-lg-3 col-md-3 col-sm-6">
                                <WishlistProducts item={item} element={element} />
                              </div>);
                          })
                        ) : (
                          <p>No Products Yet</p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            <Link to="/my-account">
              <button className="back-account mt-4">
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
      </div>
    </div>
  );
};

export default Wishlist;
