import React from 'react'
import "./style.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { toast } from "react-toastify";
import { useState } from 'react';
import { useEffect } from 'react';
import { AddProduct, getallGroup, getallSubcategory, getCategories, getMainCategory, getSingleUser, getVendorIdByProduct } from '../../Utils/APIs';
import { Link, useNavigate } from 'react-router-dom';

const AddNewProduct = () => {
  const navigate = useNavigate()
  const [maincategory, setmaincategory] = useState([]);
  const [category, setcategory] = useState([]);
  const [subcategory, setsubcategory] = useState([]);
  const [group, setgroup] = useState([]);
  const [vendorproduct, setvendorproduct] = useState()
  const [image, setimage] = useState([])
  const [imageURLs, setImageURLs] = useState([])
  const [value, setvalue] = useState({
    title: '',
    image: [],
    withDiscount: '',
    originalPrice: '',
    countInStock: '',
    attributes: '',
    maincategory: '',
    category: '',
    subcategories: '',
    ratings: '',
    group: '',
    content: '',
    numOfReviews: '',
    size: '',
    brand: '',
    isTrending: true,
    isFeatured: true,
    isSpecial: true,
    isAvailable: true,
  });

  useEffect(() => {
    MaincategoryAPI();
    CategoryAPI();
    SubCategoryAPI();
    GroupAPI();
  }, []);

  const getData = async () => {
    try {
      const res = await getSingleUser();
      if (res.data.user.vendor) {
        const res2 = await getVendorIdByProduct(res.data.user.vendor);
        setvendorproduct(res2.data.vendors);
      } else {
        setvendorproduct([]);
      }
    } catch (error) {
      toast(error);
    }
  }
  // if (value.originalPrice < value.withDiscount) {
  //   toast.error("originalPrice should be greater than withDiscount");
  // }
  const AddNewProductAPI = async () => {
    validate()
    try {
      const fdata = new FormData();
      fdata.append('title', value.title);
      if (image.length > 0) {
        for (let i = 0; i < image.length; i++) {
          fdata.append("image", image[i])
        }
      }
      fdata.append('withDiscount', value.withDiscount);
      fdata.append('originalPrice', value.originalPrice);
      fdata.append('countInStock', value.countInStock);
      fdata.append('attributes', value.attributes);
      fdata.append('maincategory', value.maincategory);
      fdata.append('category', value.category);
      fdata.append('subcategories', value.subcategories);
      fdata.append('numOfReviews', value.numOfReviews);
      fdata.append('group', value.group);
      fdata.append('ratings', value.ratings);
      fdata.append('size', value.size);
      fdata.append('brand', value.brand);
      fdata.append('isTrending', value.isTrending);
      fdata.append('isFeatured', value.isFeatured);
      fdata.append('isSpecial', value.isSpecial);
      fdata.append('content', value.content)
      fdata.append('isAvailable', value.isAvailable);
      const res = await AddProduct(fdata);
      if (res.status === 201) {
        toast.info("New Product added successfully");
        navigate(`/vendor-products`)
      } else {
        toast.error("Product not added");
      }
      setvalue(fdata);
    } catch (e) {
      toast.error("internal server error");
    }
    getData();
  };

  const onImageUpload = () => {
    let input = document.createElement('input');
    input.type = 'file';
    input.setAttribute("multiple", "multiple");
    input.onchange = _ => {
      let files = Array.from(input.files);
      setimage(files)
    };
    input.click();
  }

  useEffect(() => {
    if (image.length < 1) return;
    const newimageurls = [];
    image.forEach(image => newimageurls.push(URL.createObjectURL(image)));
    setImageURLs(newimageurls)
  }, [image])

  const validate = () => {
    const { title, image, withDiscount, originalPrice, countInStock, attributes, maincategory, category, subcategories, ratings, group, content, numOfReviews, isAvailable, size, brand } = value
    if (!title) {
      toast.error("Please enter title")
      return false
    }

    if (!image) {
      toast.error("provide an image")
      return false
    }

    if (!withDiscount) {
      toast.error("Please enter withDiscount")
      return false;
    }

    if (withDiscount > originalPrice) {
      toast.error("originalPrice should be greater than withDiscount")
      return false
    }

    if (!originalPrice) {
      toast.error("Please enter originalPrice")
      return false;
    }

    if (!countInStock) {
      toast.error("Please enter countInStock")
      return false;
    }

    if (!attributes) {
      toast.error("Please enter attributes")
      return false
    }

    if (!maincategory) {
      toast.error("please select maincategory")
      return false
    }

    if (!category) {
      toast.error("Please select category")
      return false;
    }

    if (!subcategories) {
      toast.error("Please select subcategories")
      return false;
    }

    if (!group) {
      toast.error("Please select group")
      return false;
    }

    if (!ratings) {
      toast.error("Please enter ratings")
      return false;
    }

    if (!size) {
      toast.error("Please enter size")
      return false
    }

    if (!brand) {
      toast.error("please select brand")
      return false
    }

    if (!numOfReviews) {
      toast.error("Please enter numOfReviews")
      return false;
    }

    if (!isAvailable) {
      toast.error("Please enter isAvailable")
      return false;
    }

    if (!content) {
      toast.error("Please enter content")
      return false;
    }

    return true;
  };

  const onChangeHandler = (e) => {
    setvalue((value) => ({
      ...value,
      [e.target.name]: e.target.value,
    }));
  };

  const MaincategoryAPI = async () => {
    try {
      const res = await getMainCategory();
      setmaincategory(res.data.mainCategories || []);
    } catch (error) {
      toast(error);
    }
  };

  const CategoryAPI = async () => {
    try {
      const res = await getCategories();
      setcategory(res.data.categories || []);
    } catch (error) {
      toast(error);
    }
  };

  const SubCategoryAPI = async () => {
    try {
      const res = await getallSubcategory();
      setsubcategory(res.data.subCategories || []);
    } catch (error) {
      toast(error);
    }
  };

  const GroupAPI = async () => {
    try {
      const res = await getallGroup();
      setgroup(res.data.groups || []);
    } catch (error) {
      toast(error);
    }
  };

  return (
    <div className="product-list-wrapper new-productlist pb-5">
      <div className='container'>
        <div>
          <div className="py-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Add New Product
                </li>
              </ol>
            </nav>
          </div>
          <div className='text-end'>
            <button className='add-new-pro' onClick={() => AddNewProductAPI()}>New Product</button>
          </div>
          <div className="edit-product-main mt-4">
            <div className="productlist-sidebar main-pro-list edit-pro-list mt-0">
              <div className="edit-pro-info">
                <div className="edit-pro-input mb-2">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    placeholder="Type here"
                    name="title"
                    className="form-control"
                    onChange={onChangeHandler}
                    value={value?.title}
                  />
                </div>
              </div>
              <div className="edit-pro-info">
                <div className="row">
                  <div className="col-6">
                    <div className="edit-pro-input pb-0 px-3">
                      <label htmlFor="price">Price</label>
                      <input
                        type="number"
                        name="withDiscount"
                        onChange={onChangeHandler}
                        value={value?.withDiscount}
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="edit-pro-input pb-0 px-3">
                      <label htmlFor="oldprice">Original price</label>
                      <input
                        type="number"
                        name="originalPrice"
                        onChange={onChangeHandler}
                        value={value?.originalPrice}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="productlist-sidebar main-pro-list edit-pro-list">
              <div className="edit-pro-info">
                <h4>Inventory</h4>
                <div className="edit-pro-input pb-0">
                  <label htmlFor="quantity">Stock quantity</label>
                  <input
                    type="number"
                    id="quantity"
                    placeholder='products in the stock for ex."2"'
                    name="countInStock"
                    onChange={onChangeHandler}
                    value={value?.countInStock}
                  />
                </div>
              </div>
            </div>
            <div className="productlist-sidebar main-pro-list main-product-info">
              <div>
                <div className="row m-0">
                  <div className="col-lg-4">
                    <label>Images</label>
                  </div>
                  <div className="col-lg-8">
                    <div className="product-all-img">
                      <button onClick={onImageUpload} className='add-new-pro mt-2'>Image Upload</button>
                      {image.length > 0 ? imageURLs.map(imgSrc => <img src={imgSrc} alt='img' />) : (
                        <p>please select any 5 images</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row m-0 mt-4">
                  <div className="col-lg-4">
                    <label>Color</label>
                  </div>
                  <div className="col-lg-8">
                    <div className="pro-main-category product-all-img">
                      <input
                        type="text"
                        placeholder="add color"
                        name="attributes"
                        onChange={onChangeHandler}
                        value={value?.attributes}
                      />
                    </div>
                  </div>
                </div>
                <div className="row m-0 mt-4">
                  <div className="col-lg-4">
                    <label>isAvailable</label>
                  </div>
                  <div className="col-lg-8">
                    <div className="pro-main-category product-all-img">
                      <input
                        type="text"
                        placeholder="add color"
                        name="isAvailable"
                        onChange={onChangeHandler}
                        value={value?.isAvailable}
                      />
                    </div>
                  </div>
                </div>
                <div className="row m-0 mt-4">
                  <div className="col-lg-4">
                    <label>Main Category</label>
                  </div>
                  <div className="col-lg-8">
                    <div className="pro-main-category">
                      <select
                        className="form-select maincategory-select"
                        name="maincategory"
                        onChange={onChangeHandler}
                      >
                        <option>select maincategory</option>
                        {maincategory?.length > 0 ? (
                          maincategory?.map((element, i) => {
                            return (
                              <option key={i} value={element._id}>{element?.name}</option>
                            );
                          })
                        ) : (
                          <p>no maincategory</p>
                        )}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row m-0 mt-4">
                  <div className="col-lg-4">
                    <label>Category</label>
                  </div>
                  <div className="col-lg-8">
                    <div className="pro-main-category">
                      <select
                        className="form-select maincategory-select"
                        name='category'
                        onChange={onChangeHandler}
                      >
                        <option>select category</option>
                        {category?.length > 0 ? (
                          category?.map((element) => {
                            return (
                              <option key={element.id} value={element._id}>{element?.name}</option>
                            );
                          })
                        ) : (
                          <p>no category</p>
                        )}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row m-0 mt-4">
                  <div className="col-lg-4">
                    <label>Sub Category</label>
                  </div>
                  <div className="col-lg-8">
                    <div className="pro-main-category">
                      <select
                        className="form-select maincategory-select"
                        name='subcategories'
                        onChange={onChangeHandler}
                      >
                        <option>select subcategory</option>
                        {subcategory && subcategory.length > 0 ? (
                          subcategory.map((element) => {
                            return (
                              <option value={element._id} key={element.id}>{element?.name}</option>
                            );
                          })
                        ) : (
                          <p>no subcategory</p>
                        )}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row m-0 mt-4">
                  <div className="col-lg-4">
                    <label>Group</label>
                  </div>
                  <div className="col-lg-8">
                    <div className="pro-main-category">
                      <select
                        className="form-select maincategory-select"
                        name='group'
                        onChange={onChangeHandler}
                      >
                        <option>select group</option>
                        {group && group.length > 0 ? (
                          group.map((element) => {
                            return (
                              <option key={element.id} value={element._id}>{element?.name}</option>
                            );
                          })
                        ) : (
                          <p>no category</p>
                        )}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row m-0 mt-4">
                  <div className="col-lg-4">
                    <label>Ratings</label>
                  </div>
                  <div className="col-lg-8">
                    <div className="pro-main-category">
                      <input
                        type="text"
                        name='ratings'
                        value={value.ratings}
                        onChange={onChangeHandler}
                      />
                    </div>
                  </div>
                </div>
                <div className="row m-0 mt-4">
                  <div className="col-lg-4">
                    <label>Size</label>
                  </div>
                  <div className="col-lg-8">
                    <div className="pro-main-category">
                      <input
                        type="text"
                        name='size'
                        value={value.size}
                        onChange={onChangeHandler}
                      />
                    </div>
                  </div>
                </div>
                <div className="row m-0 mt-4">
                  <div className="col-lg-4">
                    <label>Brand</label>
                  </div>
                  <div className="col-lg-8">
                    <div className="pro-main-category">
                      <input
                        type="text"
                        name='brand'
                        value={value.brand}
                        onChange={onChangeHandler}
                      />
                    </div>
                  </div>
                </div>
                <div className="row m-0 mt-4">
                  <div className="col-lg-4">
                    <label>Number of Reviews</label>
                  </div>
                  <div className="col-lg-8">
                    <div className="pro-main-category">
                      <input
                        type="text"
                        name='numOfReviews'
                        value={value.numOfReviews}
                        onChange={onChangeHandler}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="desc-title">
                    <h4>Discription</h4>
                  </div>
                  <div className="row m-0 mt-4">
                    <div className="col-lg-4">
                      <label>In The Box</label>
                    </div>
                    <div className="col-lg-8">
                      <div className="pro-main-category pro-templatefeature">
                        <input
                          type="text"
                          name='content'
                          placeholder='write your review by this product'
                          value={value.content}
                          onChange={onChangeHandler}
                        />
                      </div>
                    </div>
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

export default AddNewProduct