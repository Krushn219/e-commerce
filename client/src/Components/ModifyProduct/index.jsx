import React, { useEffect, useState } from 'react'
import './style.css'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getallGroup, getallSubcategory, getCategories, getMainCategory, getSingleProduct, ProductUpdate } from '../../Utils/APIs';

const ModifyProduct = () => {
  const navigate = useNavigate()
  const { editproduct } = useParams()
  const [maincategory, setmaincategory] = useState([]);
  const [category, setcategory] = useState([]);
  const [subcategory, setsubcategory] = useState([]);
  const [group, setgroup] = useState([]);
  const [image, setimage] = useState([])
  const [imageURLs, setImageURLs] = useState([])
  const [values, setvalues] = useState({
    title: '',
    image: [],
    withDiscount: '',
    originalPrice: '',
    countInStock: '',
    attributes: '',
    maincategory: '',
    category: '',
    subcategories: '',
    group: '',
    ratings: '',
    size: '',
    brand: '',
    productDetails: '',
    content: '',
    isAvailable: true,
  });

  useEffect(() => {
    getProductSingle()
    MaincategoryAPI()
    CategoryAPI()
    SubCategoryAPI()
    GroupAPI()
  }, [])

  const getProductSingle = async () => {
    try {
      const res = await getSingleProduct(editproduct);
      if (res.status === 200) {
        const { title, image, withDiscount, originalPrice, countInStock, attributes, maincategory, category, subcategories, group, productDetails, ratings, isAvailable, content, size, brand } = res.data.product
        updateValues({
          title: title,
          image: image,
          withDiscount: withDiscount,
          originalPrice: originalPrice,
          countInStock: countInStock,
          attributes: attributes,
          maincategory: maincategory?._id,
          category: category?._id,
          subcategories: subcategories?._id,
          group: group?._id,
          size: size,
          brand: brand,
          productDetails: productDetails,
          ratings: ratings,
          content: content,
          isAvailable: isAvailable
        });
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const ProductUpdateAPI = async () => {
    validate()
    try {
      const fdata = new FormData();
      if (image.length > 0) {
        for (let i = 0; i < image.length; i++) {
          fdata.append("image", image[i])
        }
      }
      fdata.append('title', values.title);
      fdata.append('withDiscount', values.withDiscount);
      fdata.append('originalPrice', values.originalPrice);
      fdata.append('countInStock', values.countInStock);
      fdata.append('attributes', values.attributes);
      fdata.append('maincategory', values.maincategory);
      fdata.append('category', values.category);
      fdata.append('subcategories', values.subcategories);
      fdata.append('group', values.group);
      fdata.append('productDetails', values.productDetails);
      fdata.append('ratings', values.ratings);
      fdata.append('size', values.size)
      fdata.append('brand', values.brand)
      fdata.append('content', values.content);
      fdata.append('isAvailable', values.isAvailable);
      const res = await ProductUpdate(editproduct, fdata);
      if (res.status === 200) {
        navigate(`/vendor-products`);
        toast.success("product updated successfully");
      } else {
        toast.error("product is not updated");
      }
      setvalues(res)
    } catch (e) {
      toast(e);
    }
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
    const { title, image, maincategory, category, subcategories, group, withDiscount, originalPrice } = values
    if (!title) {
      toast.error("Please enter title")
      return false
    }

    if (!image) {
      toast.error("provide an image")
      return false
    }

    if (!maincategory) {
      toast.error("please enter maincategory")
      return false;
    }

    if (!category) {
      toast.error("please enter category")
      return false;
    }

    if (!subcategories) {
      toast.error("please enter subcategories")
      return false;
    }

    if (!group) {
      toast.error("please enter group")
      return false;
    }

    if (!withDiscount) {
      toast.error("please enter withDiscount")
      return false;
    }

    if (!originalPrice) {
      toast.error("please enter originalPrice")
      return false;
    }

    return true;
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

  const updateValues = (obj) => {
    setvalues({ ...values, ...obj });
  };

  const onChangeHandle = (e) => {
    setvalues((value) => ({
      ...value,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="product-list-wrapper">
      <div className="container">
        <div className='d-flex align-items-center justify-content-between product-list-wrappermain px-0'>
          <div className="pt-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">Edit Product</li>
              </ol>
            </nav>
          </div>
          <div className='import-btn'>
            <button className='add-new-pro' onClick={ProductUpdateAPI}>Save</button>
          </div>
        </div>
        <div className='edit-product-main mt-4'>
          <div className="productlist-sidebar main-pro-list edit-pro-list mt-0">
            <div className="edit-pro-info">
              <div className='edit-pro-input mb-2 ms-0'>
                <label htmlFor='title'>Title</label>
                <input
                  type="text"
                  value={values.title}
                  name="title"
                  onChange={(e) => setvalues({ ...values, title: e.target.value })}
                />
              </div>
            </div>
            <div className="edit-pro-info">
              <div className="row">
                <div className="col-6">
                  <div className='edit-pro-input pb-0'>
                    <label htmlFor='price'>Price</label>
                    <input
                      type="number"
                      name="withDiscount"
                      id='price'
                      value={values.withDiscount}
                      onChange={(e) => setvalues({ ...values, withDiscount: e.target.value })} />
                  </div>
                </div>
                <div className="col-6">
                  <div className='edit-pro-input pb-0'>
                    <label htmlFor='oldprice'>Original price</label>
                    <input
                      type="number"
                      id='oldprice'
                      name="originalPrice"
                      value={values.originalPrice}
                      onChange={(e) => setvalues({ ...values, originalPrice: e.target.value })} />
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
                  name='countInStock'
                  value={values.countInStock}
                  onChange={(e) => setvalues({ ...values, countInStock: e.target.value })}
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
                    <div className='product-all-img p-0 border-0'>
                      {values.image &&
                        values.image ? values.image.map((item) => {
                          return <>
                            <img
                              key={item.id}
                              src={item}
                              alt="img"
                              name='image'
                              onChange={onChangeHandle} />
                          </>
                        }) : <p>no product yet</p>}
                    </div>
                    <div className='import-btn mt-2'>
                      <button onClick={onImageUpload} className='add-new-pro'>Image Upload</button>
                      {!values.image ?
                        image.length > 0 ? imageURLs.map(imgSrc => <img src={imgSrc} alt='img' key={imgSrc} />) : (
                          <p className='py-2'>please select any 5 images upload if u change</p>
                        ) : <p className='py-2'>please select any 5 images upload if u change</p>}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-lg-4">
                  <label>Main Category</label>
                </div>
                <div className="col-lg-8">
                  <div className='pro-main-category'>
                    <select
                      className="form-select maincategory-select"
                      name="maincategory"
                      value={values.maincategory}
                      onChange={onChangeHandle}
                    >
                      <option>select maincategory</option>
                      {maincategory?.length > 0 ?
                        maincategory.map((element, i) => {
                          return <option key={element.id} value={element._id}>{element.name}</option>
                        }
                        ) : <p>no maincategory yet</p>}
                    </select>
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-lg-4">
                  <label>Category</label>
                </div>
                <div className="col-lg-8">
                  <div className='pro-main-category'>
                    <select
                      className="form-select maincategory-select"
                      name='category'
                      value={values.category}
                      onChange={onChangeHandle}
                    >
                      <option>select category</option>
                      {category?.length > 0 ?
                        category.map((element, i) => {
                          return <option key={i} value={element._id}>{element?.name}</option>
                        }
                        ) : <p>no category yet</p>}
                    </select>
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-lg-4">
                  <label>Product Type</label>
                </div>
                <div className="col-lg-8">
                  <div className='pro-main-category'>
                    <select
                      className="form-select maincategory-select"
                      name='subcategories'
                      value={values.subcategories}
                      onChange={onChangeHandle}
                    >
                      <option>select subcategory</option>
                      {subcategory?.length > 0 ?
                        subcategory.map((element) => {
                          return <option key={element.id} value={element._id}>{element.name}</option>
                        }
                        ) : <p>no subcategory yet</p>}
                    </select>
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-lg-4">
                  <label>Group</label>
                </div>
                <div className="col-lg-8">
                  <div className='pro-main-category'>
                    <select
                      className="form-select maincategory-select"
                      name='group'
                      value={values.group}
                      onChange={onChangeHandle}
                    >
                      <option>select group</option>
                      {group?.length > 0 ?
                        group.map((element) => {
                          return <option key={element.id} value={element._id}>{element.name}</option>
                        }
                        ) : <p>no group yet</p>}
                    </select>
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
                      name='ratings'
                      value={values.ratings}
                      onChange={(e) => setvalues({ ...values, ratings: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-lg-4">
                  <label>Size</label>
                </div>
                <div className="col-lg-8">
                  <div className='pro-main-category'>
                    <input
                      type="text"
                      name='size'
                      value={values.size}
                      onChange={(e) => setvalues({ ...values, size: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-lg-4">
                  <label>Brand</label>
                </div>
                <div className="col-lg-8">
                  <div className='pro-main-category'>
                    <input
                      type="text"
                      name='brand'
                      value={values.brand}
                      onChange={(e) => setvalues({ ...values, brand: e.target.value })}
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
                      name='attributes'
                      value={values.attributes}
                      onChange={(e) => setvalues({ ...values, attributes: e.target.value })}
                    />
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

export default ModifyProduct