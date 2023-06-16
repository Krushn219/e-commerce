import React, { useEffect, useState } from 'react'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getSingleProduct } from '../../Utils/APIs';

const ViewProduct = () => {
  const { productinfo } = useParams()
  const [list, setlist] = useState({})

  useEffect(() => {
    ViewProductAPI(productinfo)
  }, [productinfo])

  const ViewProductAPI = async (productinfo) => {
    try {
      const res = await getSingleProduct(productinfo);
      setlist(res.data.product);
    } catch (error) {
      toast(error);
    }
  }

  return (
    <div className="product-list-wrapper">
      <div className="container">
        <div className='d-flex align-items-center justify-content-center product-list-wrappermain px-0'>
          <div className="pt-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/vendor-products">Products</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">View Product</li>
              </ol>
            </nav>
          </div>
        </div>
        <div className='edit-product-main mt-4'>
          <div className="productlist-sidebar main-pro-list edit-pro-list mt-0">
            <div className="edit-pro-info">
              <div className='edit-pro-input m-0'>
                <label htmlFor='title'>Title</label>
                <input type="text" id='title' value={list.title} onChange={(e) => setlist({ ...list, title: e.target.value })} />
              </div>
            </div>
            <div className="edit-pro-info">
              <div className="row">
                <div className="col-6">
                  <div className='edit-pro-input pb-0'>
                    <label htmlFor='price'>Price</label>
                    <input
                      type="number"
                      id='price'
                      value={list.withDiscount}
                      onChange={(e) => setlist({ ...list, withDiscount: e.target.value })} />
                  </div>
                </div>
                <div className="col-6">
                  <div className='edit-pro-input pb-0'>
                    <label htmlFor='oldprice'>Original price</label>
                    <input
                      type="number"
                      id='oldprice'
                      value={list.originalPrice}
                      onChange={(e) => setlist({ ...list, originalPrice: e.target.value })} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="productlist-sidebar main-pro-list edit-pro-list">
            <div className="edit-pro-info">
              <h4 className='mb-4'>Inventory</h4>
              <div className="edit-pro-input pb-0">
                <label htmlFor="quantity">Stock quantity</label>
                <input
                  type="number"
                  id='quantity'
                  value={list.countInStock}
                  onChange={(e) => setlist({ ...list, countInStock: e.target.value })}
                />
              </div>
            </div>
          </div>
          <div className='productlist-sidebar main-pro-list main-product-info'>
            <div>
              <div className="row">
                <div className="col-lg-4">
                  <label>Images</label>
                </div>
                <div className="col-lg-8">
                  <div className='product-all-img'>
                    {list.image ? list.image.map((item) => {
                      return <>
                        <img src={item} alt="img" key={item.id} />
                      </>
                    }) : <p>no product yet</p>}
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-lg-4">
                  <label>Main Category</label>
                </div>
                <div className="col-lg-8">
                  <div className='pro-main-category'>
                    <input
                      type="text"
                      placeholder='main category'
                      value={list.maincategory && list.maincategory.name}
                      onChange={(e) => setlist({ ...list, maincategory: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-lg-4">
                  <label>Category</label>
                </div>
                <div className="col-lg-8">
                  <div className='pro-main-category'>
                    <input
                      type="text"
                      placeholder='category'
                      value={list.category && list.category.name}
                      onChange={(e) => setlist({ ...list, category: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-lg-4">
                  <label>Product Type</label>
                </div>
                <div className="col-lg-8">
                  <div className='pro-main-category'>
                    <input
                      type="text"
                      placeholder='product'
                      value={list.subcategories && list.subcategories.name}
                      onChange={(e) => setlist({ ...list, subcategories: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-lg-4">
                  <label>Group</label>
                </div>
                <div className="col-lg-8">
                  <div className='pro-main-category'>
                    <input
                      type="text"
                      placeholder='product'
                      value={list.group && list.group.name}
                      onChange={(e) => setlist({ ...list, group: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-lg-4">
                  <label>Ratings</label>
                </div>
                <div className="col-lg-8">
                  <div className='pro-main-category'>
                    <input
                      type="text"
                      value={list.ratings}
                      onChange={(e) => setlist({ ...list, ratings: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-lg-4">
                  <label>Number of Reviews</label>
                </div>
                <div className="col-lg-8">
                  <div className='pro-main-category'>
                    <input
                      type="text"
                      value={list.numOfReviews}
                      onChange={(e) => setlist({ ...list, numOfReviews: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-lg-4">
                  <label>Attributes</label>
                </div>
                <div className="col-lg-8">
                  <div className='pro-main-category'>
                    <input
                      type="text"
                      value={list.attributes}
                      onChange={(e) => setlist({ ...list, attributes: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-lg-4">
                  <label>Created Date</label>
                </div>
                <div className="col-lg-8">
                  <div className='pro-main-category'>
                    <input
                      type="text"
                      value={list.createdAt}
                      onChange={(e) => setlist({ ...list, createdAt: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-lg-4">
                  <label>Update Date</label>
                </div>
                <div className="col-lg-8">
                  <div className='pro-main-category'>
                    <input
                      type="text"
                      value={list.updatedAt || "no updated product"}
                      onChange={(e) => setlist({ ...list, updatedAt: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <div className='discription-main-view'>
                <div className="desc-title">
                  <h4>productDetails</h4>
                </div>
                <div className="row mt-4">
                  <div className="col-lg-4">
                    <label>productDetails</label>
                  </div>
                  <div className="col-lg-8">
                    <div className='pro-main-category pro-templatefeature'>
                      {list.productDetails && list.productDetails.length ? list.productDetails[0].feature.length && list.productDetails[0].feature.map((item) => {
                        return <>
                          {item.featurevalueId && item.featurevalueId.map((element) => {
                            return <>
                              <input
                                type="text"
                                value={element.name || "no updated product"}
                                onChange={(e) => setlist({ ...list, updatedAt: e.target.value })}
                              />
                            </>
                          })}
                        </>
                      }) : <p className='pro-details'>not productdetails yet</p>}
                    </div>
                  </div>
                </div>
              </div>
              <div className='discription-main-view'>
                <div className="desc-title">
                  <h4>Discription</h4>
                </div>
                <div className="row mt-4">
                  <div className="col-lg-4">
                    <label>In The Box</label>
                  </div>
                  <div className="col-lg-8">
                    <div className='pro-main-category pro-templatefeature'>
                      {list.description && list.description.inTheBox && list.description.inTheBox.map((item) => {
                        return <input
                          key={item.id}
                          type="text"
                          value={item.content}
                          onChange={(e) => setlist({ ...list, content: e.target.value })}
                        />
                      })}
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-lg-4">
                    <label>Templatefeature</label>
                  </div>
                  <div className="col-lg-8">
                    <div className='pro-main-category pro-templatefeature'>
                      {list.description && list.description.templatefeature && list.description.templatefeature.map((item) => {
                        return <input
                          key={item.id}
                          type="text"
                          className='mb-3'
                          value={item.content}
                          onChange={(e) => setlist({ ...list, content: e.target.value })}
                        />
                      })}
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-lg-4">
                    <label>Performance</label>
                  </div>
                  <div className="col-lg-8">
                    <div className='pro-main-category pro-templatefeature'>
                      {list.description && list.description.performance && list.description.performance.map((item) => {
                        return <input
                          key={item.id}
                          type="text"
                          value={item.content}
                          onChange={(e) => setlist({ ...list, content: e.target.value })}
                        />
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-lg-4">
                  <div className="desc-title">
                    <h4 className='mt-0'>Reviews</h4>
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className='product-reviews'>
                    {list.reviews && list.reviews.length ? list.reviews.map((item) => {
                      return <div key={item.id}>
                        <p>Username : {item.user.firstname} {item.user.lastname}</p>
                        <p>reviewTitle : {item.reviewTitle}</p>
                        <p>reviewDescription : {item.reviewDescription}</p>
                        <p>rating : {item.rating}</p>
                        <p className='mb-0'>createdAt : {item.createdAt}</p>
                      </div>
                    }) : <p>no reviews yet</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewProduct