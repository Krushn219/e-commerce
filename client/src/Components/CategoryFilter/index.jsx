import React, { useEffect, useLayoutEffect, useState } from "react";
import "./style.css";
import CategoriesProducts from "../../pages/Categories/CategoriesProducts";
import Grid2 from "../../pages/Categories/Grid2";
import List1 from "../../pages/Categories/List1";
import List2 from "../../pages/Categories/List2";
import Catlog from "../../pages/Categories/Catlog";
import grid from "../../assets/Images/grid.svg";
import grid2main from "../../assets/Images/grid2.svg";
import listmain from "../../assets/Images/list.svg";
import listmain2 from "../../assets/Images/listmain2.svg";
import catelog from "../../assets/Images/catelog.svg";
import filter from "../../assets/Images/filter.png";
import {
  getCategoryproduct,
  getmainCategoryproduct,
  getProducts,
  getSubCategoryproduct,
} from "../../Utils/APIs";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { filterProducts } from "../../Utils/Data";
import _ from 'lodash';
import { Triangle } from "react-loader-spinner";

var thumbsize = 14;

const Slider = ({
  min,
  max,
  getminVal,
  getmaxVal,
  avgVal,
  minVal,
  maxVal,
  avg,
}) => {
  const width = 200;

  const minWidth = thumbsize + ((avg - min) / (max - min)) * (width - 2 * thumbsize);
  const minPercent = ((minVal - min) / (avg - min)) * 100;
  const maxPercent = ((maxVal - avg) / (max - avg)) * 100;
  const styles = {
    min: {
      width: minWidth,
      left: 0,
      "--minRangePercent": `${minPercent}%`,
    },
    max: {
      width: thumbsize + ((max - avg) / (max - min)) * (width - 2 * thumbsize),
      left: minWidth,
      "--maxRangePercent": `${maxPercent}%`,
    },
  };

  useLayoutEffect(() => {
    avgVal((maxVal + minVal) / 2);
  }, [minVal, maxVal]);

  return (
    <div
      className="min-max-slider"
      data-legendnum="2"
      data-rangemin={min}
      data-rangemax={max}
      data-thumbsize={thumbsize}
      data-rangewidth={width}
    >
      <input
        id="min"
        className="min"
        style={styles.min}
        name="min"
        type="range"
        step="1"
        min={min}
        max={avg}
        value={minVal}
        onChange={({ target }) => getminVal(Number(target.value))}
      />
      <input
        id="max"
        className="max"
        style={styles.max}
        name="max"
        type="range"
        step="1"
        min={avg}
        max={max}
        value={maxVal}
        onChange={({ target }) => getmaxVal(Number(target.value))}
      />
    </div>
  );
};

const CategoryFilter = ({ categories }) => {
  const { subcategoryid, categoryid, maincategoryid } = useParams();
  const [tabIndex, setTabIndex] = useState(0);
  const [productlist, setProductlist] = useState([]);
  const [isshowmain, setisshowmain] = useState(false);
  const [avg, setAvg] = useState(50000);
  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(100000);
  const [search, setsearch] = useState("");
  const [filterBrand, setfilterBrand] = useState([])
  const [filterSize, setfilterSize] = useState([])
  const [filtercolor, setfiltercolor] = useState([])
  const [filteredList, setfilteredList] = useState([])
  const [filterCat, setfilterCat] = useState([]);
  const [filterAvail, setfilterAvail] = useState({
    inStock: false,
    notAvailable: false,
  });
  const [isLoading, setisLoading] = useState(true);
  const [availableProductCount, setavailableProductCount] = useState(0)
  const [totalProducts, settotalProducts] = useState(0)

  const getminVal = (value) => {
    setMinVal(value);
  };

  const getmaxVal = (value) => {
    setMaxVal(value);
  };

  const avgVal = (value) => {
    setAvg(Math.round(value));
  };

  useEffect(() => {
    common()
  }, []);

  const common = () => {
    if (!subcategoryid && !categoryid) {
      MaincategoryProductAPI();
    } else if (!subcategoryid) {
      categoryProductAPI();
    } else {
      SubcategoryProductAPI();
    }
  }

  useEffect(() => {
    if (categories?.length) {
      let arr = [];
      // categories
      getAllProducts().then((products) => {
        if (products?.length) {
          categories?.forEach((cat) => {
            const temp = [];
            products?.forEach((p) => {
              if (p?.category?.name === cat.name) {
                temp.push(p)
              }
            })
            arr.push({
              ...cat,
              products: temp,
              status: false,
            });
          });

          // availability
          let availableCount = 0;

          productlist?.forEach((p) => {
            if (p.isAvailable) {
              availableCount += 1;
            }
          })
          setavailableProductCount(availableCount)
          settotalProducts(productlist.length)

          // brand
          const uniqueProducts = _.unionBy(products, 'brand');
          if (filteredList[0]?.maincategory?._id === maincategoryid) {
            const temp2 = uniqueProducts.filter((item) => item.brand !== undefined).map((item) => ({
              products: productlist.filter((element) => element.brand === item.brand),
              brand: item.brand,
              status: false,
            }));
            setfilterBrand(temp2)
          } else if (filteredList[0]?.category?._id === categoryid) {
            const temp2 = uniqueProducts.filter((item) => item.brand !== undefined).map((item) => ({
              products: productlist.filter((element) => element.brand === item.brand),
              brand: item.brand,
              status: false,
            }));
            setfilterBrand(temp2)
          } else if (filteredList[0]?.subcategories?._id === subcategoryid) {
            const temp2 = uniqueProducts.filter((item) => item.brand !== undefined).map((item) => ({
              products: productlist.filter((element) => element.brand === item.brand),
              brand: item.brand,
              status: false,
            }));
            setfilterBrand(temp2)
          }

          // size
          const uniqueSize = _.unionBy(products, 'size');
          if (filteredList[0]?.maincategory?._id === maincategoryid) {
            const temp3 = uniqueSize.filter((item) => item.size !== undefined).map((item) => ({
              products: productlist.filter((element) => element.size === item.size),
              size: item.size,
              status: false
            }));
            setfilterSize(temp3)
          } else if (filteredList[0]?.category?._id === categoryid) {
            const temp3 = uniqueSize.filter((item) => item.size !== undefined).map((item) => ({
              products: productlist.filter((element) => element.size === item.size),
              size: item.size,
              status: false
            }));
            setfilterSize(temp3)
          } else if (filteredList[0]?.subcategories?._id === subcategoryid) {
            const temp3 = uniqueSize.filter((item) => item.size !== undefined).map((item) => ({
              products: productlist.filter((element) => element.size === item.size),
              size: item.size,
              status: false
            }));
            setfilterSize(temp3)
          }

          // color
          const uniqueColor = _.unionBy(products, 'attributes');
          if (filteredList[0]?.maincategory?._id === maincategoryid) {
            const temp4 = uniqueColor.filter((item) => item.attributes !== undefined).map((item) => ({
              products: productlist.filter((element) => element.attributes === item.attributes),
              attributes: item.attributes,
              status: false
            }))
            setfiltercolor(temp4)
          } else if (filteredList[0]?.category?._id === categoryid) {
            const temp4 = uniqueColor.filter((item) => item.attributes !== undefined).map((item) => ({
              products: productlist.filter((element) => element.attributes === item.attributes),
              attributes: item.attributes,
              status: false
            }))
            setfiltercolor(temp4)
          } else if (filteredList[0]?.subcategories?._id === subcategoryid) {
            const temp4 = uniqueColor.filter((item) => item.attributes !== undefined).map((item) => ({
              products: productlist.filter((element) => element.attributes === item.attributes),
              attributes: item.attributes,
              status: false
            }))
            setfiltercolor(temp4)
          }
        }
        setfilterCat(arr);
      })
    }
  }, [categories])

  const toggleSizeStatus = (id, checked) => {
    const arr = filterSize?.filter((item) => {
      if (item.size === id) {
        item.status = checked;
      }
      return item;
    })
    setfilterSize(arr)
  }

  const toggleColorStatus = (id, checked) => {
    const arr = filtercolor?.filter((item) => {
      if (item.attributes === id) {
        item.status = checked;
      }
      return item;
    })
    setfiltercolor(arr)
  }

  const getAllProducts = async () => {
    try {
      const res = await getProducts();
      return (res?.data?.productlist || []);
    } catch (error) {
      toast(error)
    }
    setisLoading(false);
  }

  const SubcategoryProductAPI = async () => {
    try {
      setProductlist([]);
      const res = await getSubCategoryproduct(subcategoryid);
      setProductlist(res?.data?.subcategories || []);
      setfilteredList(res?.data?.subcategories || []);
    } catch (error) {
      toast(error);
    }
    setisLoading(false);
  };

  const MaincategoryProductAPI = async () => {
    try {
      setProductlist([]);
      const res = await getmainCategoryproduct(maincategoryid);
      setProductlist(res?.data?.maincategories || []);
      setfilteredList(res?.data?.maincategories || []);
    } catch (error) {
      toast(error);
    }
    setisLoading(false);
  };

  const categoryProductAPI = async () => {
    try {
      setProductlist([]);
      const res = await getCategoryproduct(categoryid);
      setProductlist(res?.data?.categories || []);
      setfilteredList(res?.data?.categories || []);
    } catch (error) {
      toast(error);
    }
    setisLoading(false);
  };

  const Filter = () => {
    setisshowmain(!isshowmain);
  };

  const toggleCatStatus = (id, checked) => {
    const arr = filterCat?.filter((item) => {
      if (item.id === id) {
        item.status = checked;
      }
      return item;
    });
    setfilterCat(arr);
  };

  const FilerCatAPI = async (value) => {
    try {
      let res;
      if (value === "BestSellers") {
        res = await getProducts("isBestSeller=true");
      } else if (value === "Name,AtoZ") {
        res = await getProducts("limit=50&sortBy=withDiscount&ProductsBy=1");
      } else if (value === "Name,ZtoA") {
        res = await getProducts("limit=50&sortBy=withDiscount&ProductsBy=desc")
      } else if (value === "Price,lowtohigh") {
        res = await getProducts("limit=50&sortBy=withDiscount&ProductsBy=1");
      } else if (value === "Price,hightolow") {
        res = await getProducts("limit=50&sortBy=withDiscount&ProductsBy=desc");
      }
      if (maincategoryid && !categoryid && !subcategoryid) {
        setfilteredList(filterProducts(res?.data?.productlist.filter((p) => p.maincategory._id === maincategoryid) || []));
      } else if (maincategoryid && categoryid && !subcategoryid) {
        setfilteredList(filterProducts(res?.data?.productlist.filter((p) => p.category._id === categoryid) || []));
      } else if (maincategoryid && categoryid && subcategoryid) {
        setfilteredList(filterProducts(res?.data?.productlist.filter((p) => p.subcategories._id === subcategoryid) || []));
      }
    } catch (error) {
      toast(error);
    }
  };

  useEffect(() => {
    // categories
    let temp = [];
    if (filterCat?.length) {
      let isAnyTrue = false;
      let tempid = ''
      filterCat.forEach((c) => {
        if (c.status) {
          isAnyTrue = true
          tempid = c.id
        }
      })
      if (isAnyTrue) {
        filterCat.forEach((c) => {
          if (c.status) {
            temp = [...temp, ...c.products]
          }
        })
      }
    }

    // price
    let temp1
    if (temp.length) {
      temp1 = temp.filter((t) => t?.withDiscount >= minVal && t?.withDiscount <= maxVal)
    } else {
      temp1 = productlist?.filter((t) => t?.withDiscount >= minVal && t?.withDiscount <= maxVal)
    }

    // availability
    if (filterAvail.inStock !== filterAvail.notAvailable) {
      if (filterAvail.inStock) {
        temp1 = temp1.filter((t) => t.isAvailable);
      } else {
        temp1 = temp1.filter((t) => !t.isAvailable);
      }
    }

    // brand
    if (temp1.length && filterBrand?.length) {
      let isAnyTrue = false;
      const activeBrands = [];
      filterBrand.forEach((b) => {
        if (b.status) {
          isAnyTrue = true
          activeBrands.push(b.brand)
        }
      })
      if (isAnyTrue) {
        temp1 = temp1.filter((t) => activeBrands.includes(t.brand))
      }
    }

    // size
    if (temp1.length && filterSize?.length) {
      let isAnyTrue = false;
      const activeSize = [];
      filterSize.forEach((s) => {
        if (s.status) {
          isAnyTrue = true
          activeSize.push(s.size)
        }
      })
      if (isAnyTrue) {
        temp1 = temp1.filter((t) => activeSize.includes(t.size))
      }
    }

    // color
    if (temp1.length && filtercolor?.length) {
      let isAnyTrue = false;
      const activeColor = [];
      filtercolor?.forEach((c) => {
        if (c.status) {
          isAnyTrue = true
          activeColor.push(c.attributes)
        }
      })
      if (isAnyTrue) {
        temp1 = temp1.filter((t) => activeColor.includes(t.attributes))
      }
    }
    setfilteredList(temp1)

  }, [filterCat, minVal, maxVal, filterAvail.inStock, filterAvail.notAvailable, filterBrand, filterSize, filtercolor])

  return (
    <div key="5">
      <div className="products-main-category d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <div className="filter-btn">
            <button onClick={Filter}>
              <img src={filter} alt="img" />
              <span>Filter</span>
            </button>
          </div>
          <div>
            <p>{filteredList?.length} products</p>
          </div>
        </div>
        <div className="main-grid-section">
          <p onClick={() => setTabIndex(0)}>
            <img
              className={tabIndex === 0 ? "grid-img active" : "grid-img"}
              src={grid}
              alt="img"
            />
          </p>
          <p onClick={() => setTabIndex(1)}>
            <img
              className={tabIndex === 1 ? "grid2-img active" : "grid2-img"}
              src={grid2main}
              alt="img"
            />
          </p>
          <p onClick={() => setTabIndex(2)}>
            <img
              className={tabIndex === 2 ? "list-img active" : "list-img"}
              src={listmain}
              alt="img"
            />
          </p>
          <p onClick={() => setTabIndex(3)}>
            <img
              className={tabIndex === 3 ? "list2-img active" : "list2-img"}
              src={listmain2}
              alt="img"
            />
          </p>
          <p onClick={() => setTabIndex(4)}>
            <img
              className={tabIndex === 4 ? "catelog-img active" : "catelog-img"}
              src={catelog}
              alt="img"
            />
          </p>
        </div>
        <div className="dropdown-category d-flex">
          <p className="sort-by pt-1">Sort By :</p>
          <select
            className="ms-2"
            onClick={(e) => FilerCatAPI(e?.target?.value)}
          >
            <option>Default</option>
            <option value='BestSellers'>Best Sellers</option>
            <option value='Name,AtoZ'>Name, A to Z</option>
            <option value='Name,ZtoA'>Name, Z to A</option>
            <option value='Price,lowtohigh'>Price, low to high</option>
            <option value='Price,hightolow'>Price, high to low</option>
          </select>
        </div>
      </div>
      {/* Filter */}
      <div className={isshowmain ? "filter-wrapper active" : "filter-wrapper"}>
        <div className="filter-main-wrapper">
          <div className="d-flex flex-wrap justify-content-between filter-save">
            <div className="d-flex flex-wrap">
              <h4>FILTER</h4>
              <input
                type="text"
                className="ps-3"
                placeholder="search Products..."
                onChange={(e) => {
                  setsearch(e.target.value);
                }} />
            </div>
          </div>
          <div className="filter-inner-wrapper">
            <div className="row">
              {/* CATEGORIES */}
              {categories?.length && (
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                  <div className="filter-category">
                    <p>CATEGORIES</p>
                    {filterCat?.length ? (
                      filterCat.map((element) => {
                        return (
                          <div
                            className="filter-label-checkbox"
                            key={element.id}
                          >
                            <div className="filter-checkbox">
                              <input
                                id={element.id}
                                type="checkbox"
                                checked={element?.status}
                                onChange={(e) =>
                                  toggleCatStatus(element?.id, e?.target?.checked)
                                }
                              />
                              <label htmlFor={element.id}>{element.name}</label>
                            </div>
                            <div>
                              <span>({element?.products?.length ?? 0})</span>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p>No Categories</p>
                    )}
                  </div>
                </div>
              )}
              {/* AVAILABILITY */}
              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                <div className="filter-category">
                  <p>AVAILABILITY</p>
                  <div className="filter-availability">
                    <div>
                      <div className="filter-label-checkbox">
                        <div className="filter-checkbox">
                          <input
                            id="inStock"
                            type="checkbox"
                            checked={filterAvail.inStock}
                            onChange={(e) => setfilterAvail({ ...filterAvail, inStock: e?.target?.checked })}
                          />
                          <label htmlFor="inStock">In Stock</label>
                        </div>
                        <div>
                          <span>({availableProductCount || 0})</span>
                        </div>
                      </div>
                      <div className="filter-label-checkbox">
                        <div className="filter-checkbox">
                          <input
                            id="notAvailable"
                            type="checkbox"
                            checked={filterAvail.notAvailable}
                            onChange={(e) => setfilterAvail({ ...filterAvail, notAvailable: e?.target?.checked })}
                          />
                          <label htmlFor="notAvailable">Not Available</label>
                        </div>
                        <div>
                          <span>({(totalProducts - availableProductCount) || 0})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* BRAND */}
              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                <div className="filter-category mt-sm-top mt-remove">
                  <p>BRAND</p>
                  <div className="filter-brand">
                    {filterBrand?.length ?
                      filterBrand?.map((item) => {
                        return <div className="filter-label-checkbox" key={item.brand}>
                          <div className="filter-checkbox">
                            <input
                              type="checkbox"
                              checked={item?.status}
                              id={item.brand}
                              onChange={(e) => {
                                const arr = [];
                                filterBrand.forEach((b) => {
                                  if (b.brand === item.brand) {
                                    arr.push({
                                      ...b,
                                      status: e?.target?.checked,
                                    })
                                  } else {
                                    arr.push(b)
                                  }
                                })
                                setfilterBrand(arr);
                              }} />
                            <label htmlFor={item.brand}>{item?.brand}</label>
                          </div>
                          <div>
                            <span>({item?.products?.length || 0})</span>
                          </div>
                        </div>
                      }) : <p>No brands yet</p>}
                  </div>
                </div>
              </div>
              {/* PRICE */}
              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                <div className="filter-category mt-sm-top mt-remove">
                  <p>PRICE</p>
                  <div className="filter-category">
                    <div className="filter-category-value">
                      <span>
                        $ {minVal} - $ {maxVal}
                      </span>
                    </div>
                    <div className="price-slider">
                      <Slider
                        min={0}
                        avg={avg}
                        minVal={minVal}
                        maxVal={maxVal}
                        max={100000}
                        getminVal={getminVal}
                        getmaxVal={getmaxVal}
                        avgVal={avgVal}
                        range={{
                          start: 0,
                          end: 100000,
                        }}
                        rangeLabels={{
                          start: '0',
                          end: '100000',
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* SIZE */}
              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                <div className="filter-category my-3 mt-remove">
                  <p>SIZE</p>
                  <div className="filter-brand">
                    {filterSize?.length ? (
                      filterSize?.map((item) => {
                        return (
                          <div className="filter-label-checkbox" key={item.size}>
                            <div className="filter-checkbox">
                              <input
                                type="checkbox"
                                id={item.size}
                                checked={item.status}
                                onChange={(e) => toggleSizeStatus(item?.size, e?.target?.checked)} />
                              <label htmlFor={item.size}>{item?.size}</label>
                            </div>
                            <div>
                              <span>({item?.products?.length || 0})</span>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p>No size available</p>
                    )}
                  </div>
                </div>
              </div>
              {/* COLOR */}
              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                <div className="filter-category my-3 mt-remove">
                  <p>COLOR</p>
                  <div className="filter-color">
                    {filtercolor?.length ? (
                      filtercolor?.map((element) => {
                        return (
                          <div
                            className="filter-label-checkbox"
                            key={element.attributes}
                          >
                            <div className="filter-checkbox">
                              <input
                                type="checkbox"
                                id={element.attributes}
                                checked={element.status}
                                onChange={(e) => toggleColorStatus(element?.attributes, e?.target?.checked)} />
                              <label>{element.attributes}</label>
                            </div>
                            <div>
                              <span>({element?.products?.length})</span>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p>No Choose Color</p>
                    )}
                  </div>
                </div>
              </div>
              {/* DIMENSION */}
              {/* <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                <div className="filter-category my-3 mt-remove">
                  <p>DIMENSION</p>
                  {demension.length &&
                    demension.map((element) => {
                      return (
                        <div className="filter-label-checkbox" key={element.id}>
                          <div className="filter-checkbox">
                            <input type="checkbox" />
                            <label>{element.size}</label>
                          </div>
                          <div>
                            <span>({element.quantity})</span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <div className="products-main-grid-category">
        {/* grid-wrapper */}
        <div
          className={tabIndex === 0 ? "grid-wrapper active" : "grid-wrapper"}
        >
          <div className="row">
            {filteredList?.length && !isLoading ? (
              filteredList
                .filter(
                  (element) =>
                    element.title.toLowerCase().includes(search)
                )
                ?.map((item, i) => {
                  return <CategoriesProducts key={i} item={item} />;
                })
            ) : (
              !isLoading && <p className="ps-3">No product Found</p>
            )}
          </div>
          {isLoading && (
            <div
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Triangle color="var(--theme-color)" />
            </div>
          )}
        </div>
        {/* grid-2 wrapper */}
        <div
          className={tabIndex === 1 ? "grid2-wrapper active" : "grid2-wrapper"}
        >
          <div className="row">
            {filteredList?.length && !isLoading ? (
              filteredList
                .filter(
                  (element) =>
                    element.title.toLowerCase().includes(search)
                )
                ?.map((item, i) => {
                  return <Grid2 key={i} item={item} />;
                })
            ) : (
              !isLoading && <p className="ps-3">No product Found</p>
            )}
          </div>
          {isLoading && (
            <div
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Triangle color="var(--theme-color)" />
            </div>
          )}
        </div>
        {/* list wrapper */}
        <div
          className={tabIndex === 2 ? "list-wrapper active" : "list-wrapper"}
        >
          {filteredList?.length && !isLoading ? (
            filteredList
              .filter(
                (element) =>
                  element.title.toLowerCase().includes(search)
              )
              ?.map((item, i) => {
                return <List1 key={i} item={item} />;
              })
          ) : (
            !isLoading && <p className="ps-3">No product Found</p>
          )}
          {isLoading && (
            <div
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Triangle color="var(--theme-color)" />
            </div>
          )}
        </div>
        {/* list 2 wrapper */}
        <div
          className={
            tabIndex === 3 ? "list2-main-wrapper active" : "list2-main-wrapper"
          }
        >
          <div className="row">
            {filteredList?.length && !isLoading ? (
              filteredList
                .filter(
                  (element) =>
                    element.title.toLowerCase().includes(search)
                )
                ?.map((item, i) => {
                  return <List2 key={i} item={item} />;
                })
            ) : (
              !isLoading && <p className="ps-3">No product Found</p>
            )}
          </div>
          {isLoading && (
            <div
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Triangle color="var(--theme-color)" />
            </div>
          )}
        </div>
        {/* catelog wrapper */}
        <div
          className={
            tabIndex === 4
              ? "catelog-main-wrapper active"
              : "catelog-main-wrapper"
          }
        >
          {filteredList?.length && !isLoading ? (
            filteredList
              .filter(
                (element) =>
                  element.title.toLowerCase().includes(search)
              )
              ?.map((item, i) => {
                return <Catlog key={i} item={item} />;
              })
          ) : (
            !isLoading && <p className="ps-3">No product Found</p>
          )}
          {isLoading && (
            <div
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Triangle color="var(--theme-color)" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
