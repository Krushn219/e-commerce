import React, { useEffect, useState, useRef } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import SubCategorySingle from "./SubCategorySingle";
import "react-tabs/style/react-tabs.css";
import { toast } from "react-toastify";
import {
  getCategories,
  getMainCategories,
  getProducts,
} from "../../Utils/APIs";
import { filterMainCategories, filterProducts } from "../../Utils/Data";
import Slider from "react-slick";
import { subCategorySliderParams } from "./utils";
import Sidebar from "../../Components/Sidebar";
import SidebarAccordion from "../../Components/SidebarAccordion";
import CategoryPanel from "../../Components/CategoryPanel";
import { Triangle } from "react-loader-spinner";

const Categories = ({ support }) => {
  const navigate = useNavigate();
  const [categories, setcategories] = useState({});
  const [toggleCategory, settoggleCategory] = useState({});
  const subcategorySlider = useRef(null);
  // const [activeColor, setactiveColor] = useState([]);
  // const [isshowmain, setisshowmain] = useState(false);
  const [mainCategories, setmainCategories] = useState([]);
  const [featuredProducts, setfeaturedProducts] = useState([]);
  const [bestsellerProducts, setbestsellerProducts] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    mainCategoriesAPI();
    FeaturedProductsAPI();
    bestSellerProductsAPI();
  }, []);

  const mainCategoriesAPI = async () => {
    const res = await getMainCategories();
    setisLoading(true);
    if (res.status === 200) {
      let temporaryMainCategories = filterMainCategories(
        res.data.mainCategories
      );
      setmainCategories(temporaryMainCategories);
      setcategories([]);
      const RES = await getCategories();
      if (RES.status === 200) {
        setcategories({});
        let temp = {};
        temporaryMainCategories.forEach((mainCategory) => {
          temp[mainCategory.mainCategoryName] = [];
        });
        Object.keys(temp).forEach((item) => {
          RES.data.categories.forEach((category) => {
            if (item === category?.maincategory?.name) {
              temp[item] = [
                ...temp[item],
                {
                  id: category._id,
                  name: category.name,
                  subCategories: category.subCategories,
                },
              ];
            }
          });
        });
        setcategories(temp);
        setisLoading(false);
      } else {
        toast.error("Internal server error");
      }
    } else {
      toast.error("Internal server error");
    }
  };

  useEffect(() => {
    let temp = {};
    mainCategories.forEach((mainCategory) => {
      temp[mainCategory.mainCategoryName] = [];
    });
    for (let key in categories) {
      for (let i = 0; i < categories[key].length; i++) {
        temp[key].push(false);
      }
    }
    settoggleCategory(temp);
  }, [categories]);

  const FeaturedProductsAPI = async () => {
    try {
      setfeaturedProducts([]);
      const res = await getProducts("isfeatured=true");
      setfeaturedProducts(filterProducts(res?.data?.productlist || []));
    } catch (error) {
      toast(error);
    }
  };

  const bestSellerProductsAPI = async () => {
    try {
      setbestsellerProducts([]);
      const res = await getProducts("isbestseller=true");
      setbestsellerProducts(filterProducts(res?.data?.productlist || []));
    } catch (error) {
      toast(error);
    }
  };

  // const filterColor = (id) => {
  //   if (activeColor.length && activeColor.includes(id)) {
  //     const temp = activeColor.filter((element) => element !== id);
  //     setactiveColor(temp);
  //   } else {
  //     setactiveColor([...activeColor, id]);
  //   }
  // };

  // const Filter = () => {
  //   setisshowmain(!isshowmain);
  // };

  // const handleclickImg = (id) => {
  //   navigate(`/subcategory/${id}`);
  // };

  const goToMainCategory = (MainCategoryName) => {
    mainCategories.forEach((cat) => {
      if (cat.mainCategoryName === MainCategoryName) {
        navigate(`/category/${cat.id}`);
        return;
      }
    });
  };

  const goToSpecificCategory = (mainCategoryName, categoryid) => {
    mainCategories.forEach((cat) => {
      if (cat.mainCategoryName === mainCategoryName) {
        navigate(`/category/${cat.id}/${categoryid}`);
        return;
      }
    });
  };

  const handleCategoryVisibility = (mainCategory, i) => {
    let arr = [...toggleCategory[mainCategory]];
    arr.forEach((item, index) => {
      if (index === i) {
        arr[index] = !item;
      } else {
        arr[index] = item;
      }
    });
    settoggleCategory({ ...toggleCategory, [mainCategory]: arr });
  };

  const goToSubcategory = (mainCategoryName, categoryid, subcategoryid) => {
    mainCategories.forEach((cat) => {
      if (cat.mainCategoryName === mainCategoryName) {
        navigate(`/category/${cat.id}/${categoryid}/${subcategoryid}`);
        return;
      }
    });
  };

  return (
    <div className="category-main-wrapper">
      <div className="container">
        <div className="py-3">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Categories
              </li>
            </ol>
          </nav>
          <div className="row">
            <div className="col-lg-3 col-md-12 col-sm-12">
              <div className="mainsidebar-category-wrapper">
                <CategoryPanel
                  isLoading={isLoading}
                  categories={categories}
                  mainCategories={mainCategories}
                  toggleCategory={toggleCategory}
                  handleCategoryVisibility={handleCategoryVisibility}
                  goToSubcategory={goToSubcategory}
                />
                <Sidebar featuredProducts={featuredProducts} bestsellerProducts={bestsellerProducts} />
              </div>
            </div>

            <div className="shop-accordion order-main2 mt-0 mb-4">
              <SidebarAccordion featuredProducts={featuredProducts} bestsellerProducts={bestsellerProducts} support={support} />
            </div>
            <div className="col-lg-9 col-md-12 col-sm-12">
              <div className="subcategory-wrapper">
                {!isLoading ? (Object.keys(categories || {}).map((categoryName) => {
                  return (
                    <div key={categoryName} className="subcategory">
                      <div className="mainCategory-info">
                        <h4
                          className="maincategory-name"
                          onClick={() => goToMainCategory(categoryName)}
                        >
                          {categoryName}
                        </h4>
                        <div className="maincategory-slider">
                          {categories[categoryName]?.length ? (
                            categories[categoryName].map((item, i) => {
                              return (
                                <div key={item.id}>
                                  <div key={i}>
                                    <h4>{item.categoryName}</h4>
                                  </div>
                                  <div className="row categories-slider-border">
                                    <h4
                                      className="subcategory-title"
                                      onClick={() =>
                                        goToSpecificCategory(
                                          categoryName,
                                          item.id
                                        )
                                      }
                                    >
                                      {item.name}
                                    </h4>
                                    <Slider
                                      ref={subcategorySlider}
                                      {...subCategorySliderParams(
                                        item.subCategories?.length
                                      )}
                                    >
                                      {item.subCategories?.length ? (
                                        item.subCategories?.map(
                                          (element, i) => {
                                            return (
                                              <div key={element.id} className='subcategory-slider'>
                                                <div className="subcat-main-slide">
                                                  <SubCategorySingle
                                                    key={i}
                                                    element={element}
                                                    categoryid={item.id}
                                                    mainCategoryName={
                                                      categoryName
                                                    }
                                                    goToSubcategory={(
                                                      subcategoryid
                                                    ) =>
                                                      goToSubcategory(
                                                        categoryName,
                                                        item.id,
                                                        subcategoryid
                                                      )
                                                    }
                                                  />
                                                </div>
                                              </div>
                                            );
                                          }
                                        )
                                      ) : (
                                        <p className="ps-3 category-not-found">
                                          No Category Found
                                        </p>
                                      )}
                                    </Slider>
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <p className="ps-3">No Category Found</p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })) :
                  <div className="d-flex justify-content-center" style={{ marginTop: 200 }}>
                    <Triangle color="var(--theme-color)" />
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
