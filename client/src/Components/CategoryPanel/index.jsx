import React from "react";
import { Triangle } from "react-loader-spinner";

const CategoryPanel = ({
  isLoading,
  categories,
  toggleCategory,
  handleCategoryVisibility,
  goToSubcategory,
}) => {
  return (
    <>
      {
        !isLoading ?
          (Object.keys(categories || {}).map((categoryName, i) => {
            return (
              <div key={i} className="cloths-category">
                <h3 className="categories-main-title-visible">{categoryName} :</h3>
                {
                  categories[categoryName].map((item, index) => {
                    return (
                      <div key={item.id}>
                        <div
                          className="d-flex justify-content-between visible-title-category"
                          onClick={() =>
                            handleCategoryVisibility(categoryName, index)
                          }
                        >
                          <h4>{item.name}</h4>
                          <div className="visible-categories">
                            {toggleCategory[categoryName][index] ? "-" : "+ "}
                          </div>
                        </div>
                        <div
                          className={
                            toggleCategory[categoryName][index]
                              ? "category-subtitle active"
                              : "category-subtitle"
                          }
                        >
                          {item?.subCategories?.length ? (
                            item.subCategories.map((element, i) => {
                              return (
                                <div key={i}>
                                  <p
                                    onClick={() =>
                                      goToSubcategory(
                                        categoryName,
                                        item.id,
                                        element.subcategory._id
                                      )
                                    }
                                  >
                                    {element?.subcategory?.name}
                                  </p>
                                </div>
                              );
                            })
                          ) : (
                            <p className="ps-3 category-not-found">
                              No SubCategory Found
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })
                }
              </div>
            );
          })) :
          <div className="d-flex justify-content-center">
            <Triangle color="var(--theme-color)" />
          </div>
      }
    </>
  );
};

export default CategoryPanel;
