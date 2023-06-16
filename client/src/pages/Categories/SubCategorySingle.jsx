import React from 'react';


const SubCategorySingle = ({ goToSubcategory,  element }) => {

  const { subcategory } = element;

  return (
    <div className='product-main-subcategory-slider'>
    <div className='product-men text-center' onClick={() => goToSubcategory(subcategory?._id)}>
      <div className='product-men-img'>
        <img src={subcategory?.image} alt="img" />
      </div>
      <p>{subcategory?.name}</p>
    </div>
  </div>
  );
}

export default SubCategorySingle;

