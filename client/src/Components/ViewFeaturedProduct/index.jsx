import React, { useEffect, useState } from 'react'
import './style.css'
import { toast } from 'react-toastify';
import { getProducts } from '../../Utils/APIs';
import { filterProducts } from '../../Utils/Data';
import TrendingProductSingle from '../TrendingProductSingle';
import { Link } from 'react-router-dom';
import { Triangle } from 'react-loader-spinner';

const ViewFeaturedProduct = () => {
  const [featuredProducts, setfeaturedProducts] = useState([])
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    FeaturedProductsAPI()
  }, [])

  const FeaturedProductsAPI = async () => {
    try {
      setfeaturedProducts([]);
      const res = await getProducts("isfeatured=true&limit=100");
      setfeaturedProducts(filterProducts(res?.data?.productlist || []));
      setisLoading(false);
    } catch (error) {
      toast(error);
    }
  };

  return (
    <>
      <div className="view-featured-product-wrapper">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb pt-3 mb-0">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">Featured Products</li>
            </ol>
          </nav>
          <div className="row pb-4">
            {featuredProducts?.length && !isLoading ? featuredProducts?.map((item, i) => {
              return <div className='col-xlg-5 col-lg-3 col-md-main-featured col-sm-12' key={i}>
                <TrendingProductSingle item={item} />
              </div>
            }) :
              isLoading &&
              <div style={{ display: "flex", justifyContent: "center", margin: "50px 0" }}>
                <Triangle color="var(--theme-color)" />
              </div>}
          </div>
        </div>
      </div>
    </>
  )
}

export default ViewFeaturedProduct