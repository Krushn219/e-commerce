export const filterProducts = (toFilter) => {
  let arr = []
  toFilter.forEach((product) => {
    arr.push({
      id: product._id,
      title: product.title,
      image: product.image,
      description: product.description,
      rating: product.ratings || 4.5,
      originalPrice: product.originalPrice,
      withDiscount: product.withDiscount,
      category: product.category,
      subCategory: product.subCategory,
      inStock: product.countInStock,
      attributes: product?.attributes,
      brand: product?.brand,
      reviews: product?.reviews || [],
      isAvailable: product.isAvailable,
      isSpecial: product.isSpecial,
      isTrending: product.isTrending,
    })
  })
  return arr;
}

export const filterBlogs = (tofilter) => {
  let arr = []
  tofilter.forEach((blogs) => {
    arr.push({
      id:blogs._id,
      title:blogs.title,
      image:blogs.image,
      description:blogs.description,
      createdAt: blogs.createdAt 
    })
  })
  return arr;
}

export const filtercategory = (tofilter) => {
  let arr = []
  tofilter.forEach((subCategories) => {
    arr.push({
      id:subCategories._id,
      name:subCategories.name
    })
  })
  return arr;
}

export const filterAddresses = (toFilter) => {
  let arr = []
  toFilter.forEach((element) => {
    arr.push({
      id: element._id,
      address: element.address,
      addressComplement: element.addressComplement,
      city: element.city,
      country: element.country,
      state: element.state,
      postcode: element.postcode
    })
  })
  return arr;
}

export const filterMainCategories = (toFilter) => {
  let arr = []
  toFilter.forEach((element) => {
    arr.push({
      id: element._id,
      mainCategoryName: element.name,
      status: element.status,
      image: element.image
    })
  })
  return arr
}

export const filterFilterCategories = (toFilter) => {
  let arr = []
  toFilter.forEach((element) => {
    arr.push({
      id: element.id,
      name: element.name,
    })
  })
  return arr
}

export const filterFilterSubcategories = (toFilter) => {
  let arr = []
  toFilter.forEach((element) => {
    arr.push({
      id: element.subcategory?._id,
      name: element.subcategory?.name,
    })
  })
  return arr
}

export const filterWishlist = (tofilter) => {
  let arr = []
  tofilter.forEach((element) => {
    arr.push({
     id: element._id,
     default: element.Default,
     createdAt: element.createdAt,
     name: element.name,
     quantity: element.quantities,
     views: element.viewed,
     directlink: element.directlink
    })
  })
  return arr
}
