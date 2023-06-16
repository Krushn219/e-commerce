import React, { useEffect, useState } from "react";
import "./style.css";
import Sidebanner2 from "../../assets/Images/Sidebanner2.png";
import { support } from "../../pages/Home/utils";
import BestSeller from "../BestSeller";
import FeaturedProduct from "../FeaturedProduct";
import ShippingWrapperSingle from "../ShippingWrapperSingle";
import { getProducts } from "../../Utils/APIs";
import { toast } from "react-toastify";

const Sidebar = ({ bestsellerProducts, featuredProducts }) => {
  const [filterBrand, setfilterBrand] = useState([])

  useEffect(() => {
    getAllProducts()
  }, [])

  const getAllProducts = async () => {
    try {
      const res = await getProducts();
      const temp = [...new Set(res?.data?.productlist.filter((p) => p.brand !== undefined).map((p) => p.brand))]
      setfilterBrand(temp || []);
    } catch (error) {
      toast(error)
    }
  }

  return (
    <div className="main-sidebar3">
      <div className="bestseller">
        <BestSeller bestsellerProducts={bestsellerProducts} />
      </div>
      <div className="shipping-wrapper">
        {support.length &&
          support.map((item, i) => {
            return <ShippingWrapperSingle key={i} item={item} />;
          })}
      </div>
      <div className="sidebanner-main">
        <img alt="png" src={Sidebanner2} className="img-fluid" />
      </div>
      <FeaturedProduct featuredProducts={featuredProducts} />
      <div className="sidebar-brand">
        <h4>BRANDS</h4>
        <div className="sidebar-brands-title">
          {filterBrand?.length ? filterBrand?.map((item) => {
            return <p key={item} className='filter-brandm'>{item}</p>
          }) : <p>no brands yet</p>}
        </div>
      </div>
      <div className="sidebar-suppliers">
        <h4>SUPPLIERS</h4>
        <div className="sidebar-suppliers-title">
          <p>Alcami</p>
          <p>Altel</p>
          <p>Frontline Inc.</p>
          <p>Kofax Inc.</p>
          <p>Logmein Inc</p>
          <p>One Plus</p>
          <p>ZUK Mobile</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
