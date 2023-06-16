import React from "react";
import "./style.css";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "../../Components/Sidebar";
import SidebarAccordion from "../../Components/SidebarAccordion";
import { getProducts, UserSingle } from "../../Utils/APIs";
import { filterProducts } from "../../Utils/Data";
import WishlistLocalProducts from "../../Components/WishlistLocalProducts";

const WishlistReffered = () => {
  const [productlistmain, setproductlistmain] = useState([]);
  const [viewwishlist, setviewwishlist] = useState([])
  const [featuredProducts, setfeaturedProducts] = useState([]);
  const [bestsellerProducts, setbestsellerProducts] = useState([]);
  const [User, setUser] = useState()

  useEffect(() => {
    FeaturedProductsAPI()
    bestSellerProductsAPI()
    UserSingleAPI()
    // WishlistAllAPI()
    SingleproductAPI()
  }, []);

  const FeaturedProductsAPI = async () => {
    try {
      setfeaturedProducts([]);
      const res = await getProducts("isfeatured=true");
      setfeaturedProducts(filterProducts(res?.data?.productlist || []));
    } catch (error) {
      toast(error);
    }
  };

  const UserSingleAPI = async () => {
    try {
      const res = await UserSingle();
      setUser(res.data.user);
    } catch (error) {
      toast(error);
    }
  };

  // const WishlistAllAPI = async () => {
  //   try {
  //     const res = await getWishlistAll();
  //     setproductlistmain(res.data.wishlistDetail);
  //   } catch (error) {
  //     toast(error);
  //   }
  // };

  const bestSellerProductsAPI = async () => {
    try {
      setbestsellerProducts([]);
      const res = await getProducts("isbestseller=true");
      setbestsellerProducts(filterProducts(res?.data?.productlist || []));
    } catch (error) {
      toast(error);
    }
  };

  const changeWishlistQuantity = (e) => {
    setproductlistmain(e?.target?.value);
  };

  const handleViewWishlistDelete = async (id) => {
    try {
      const localProducts = JSON.parse(localStorage.getItem('wishlist'))
      localProducts.forEach((p) => {
        if (p.id === id) {
          const temp = localProducts.filter((p) => p.id !== id);
          localStorage.setItem("wishlist", JSON.stringify(temp));
          toast.info("deleted successfully")
        }
      })
    } catch (error) {
      toast(error);
    }
    SingleproductAPI()
  }

  // const handleDelete = async (id) => {
  //   try {
  //     const res = await deleteWishList(id);
  //     if (res.status === 200) {
  //       WishlistAllAPI();
  //       toast.info("Delete successfully");
  //     } else {
  //       toast.error("WishList is not Deleted");
  //     }
  //   } catch (e) {
  //     toast.error(e);
  //   }
  // };

  const SingleproductAPI = async () => {
    try {
      const localProducts = JSON.parse(localStorage.getItem('wishlist'))
      if (localProducts.length) {
        setviewwishlist(localProducts || [])
      } else {
        setviewwishlist([])
      }
    } catch (error) {
      toast(error);
    }
  };

  return (
    <>
      <div className="wishlist-reffered-wrapper">
        <div className="container pb-5">
          <div className="pt-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">
                    Home
                  </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Wishlist Reffrered
                </li>
              </ol>
            </nav>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-12 col-sm-12">
              <div className="mainsidebar-category-wrapper">
                <Sidebar featuredProducts={featuredProducts} bestsellerProducts={bestsellerProducts} />
              </div>
            </div>
            <div className="shop-accordion order-main2 mt-0 mb-4">
              <SidebarAccordion featuredProducts={featuredProducts} bestsellerProducts={bestsellerProducts} />
            </div>
            <div className="col-lg-9 col-md-12 col-sm-12">
              <div className="wishlist-reffered-info">
                <div>
                  <h4>Wishlist</h4>
                  <p className="other-wishlist">
                    Other wishlists of {User?.firstname} {User?.lastname}: <span>{User?.firstname}</span>
                  </p>
                </div>
                <div className="row">
                  {/* {productlistmain.length ? (
                    productlistmain.map((element) => {
                      const item = element.directlink[0].product
                      return (
                        <WishlistProductall element={element} addToCart={addToCart} handleDelete={handleDelete} changeWishlistQuantity={changeWishlistQuantity} />
                      );
                    })
                  ) : (
                    <p>No Products Yet</p>
                  )} */}
                  {viewwishlist.length ? (
                    viewwishlist.map((element) => {
                      return (
                        <WishlistLocalProducts key={element.id} element={element} handleViewWishlistDelete={handleViewWishlistDelete} changeWishlistQuantity={changeWishlistQuantity} />
                      );
                    })
                  ) : (
                    <p>No Products Yet</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WishlistReffered;
