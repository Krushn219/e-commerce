export const subCategorySliderParams = (length) => ({
  centerMode: false,
  dots: false,
  arrows: true,
  infinite: length > 4,
  speed: 500,
  swipeToSlide: true,
  autoplay: true,
  slidesToShow: 5,
  slidesToScroll: 5,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        infinite: length > 4,
      },
    },
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 3,
      },
    },
    {
      breakpoint: 575,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 440,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 350,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
});

export const color = [{
  id: 1,
  className: 'grey-color',
  color: 'Grey',
  quantity: 1
},{
  id: 2,
  className: 'Taupe-color',
  color: 'Taupe',
  quantity: 1
},{
  id: 3,
  className: 'white-color',
  color: 'White',
  quantity: 5
},{
  id: 4,
  className: 'offwhite-color',
  color: 'Off White',
  quantity: 1
},{
  id: 5,
  className: 'red-color',
  color: 'Red',
  quantity: 2
},{
  id: 6,
  className: 'black-color',
  color: 'Black',
  quantity: 3
},{
  id: 7,
  className: 'green-color',
  color: 'Green',
  quantity: 1
}]

export const size = [{
  id: 1,
  size: 'S',
  quantity: 6
},{
  id: 2,
  size: 'M',
  quantity: 6
},{
  id: 3,
  size: 'L',
  quantity: 5
},{
  id: 4,
  size: 'XL',
  quantity: 5
}]

export const brand = [{
  id: 1,
  title: 'Gluen',
  quantity: 2
},{
  id: 2,
  title: 'Jolidon',
  quantity: 3
},{
  id: 3,
  title: 'Manib',
  quantity: 5
},{
  id: 4,
  title: 'Mia & Mor',
  quantity: 3
},{
  id: 5,
  title: 'Musani',
  quantity: 3
},{
  id: 6,
  title: 'Nick',
  quantity: 2
},{
  id: 7,
  title: 'Zalando',
  quantity: 4
},{
  id: 7,
  title: 'zara',
  quantity: 4
}]

export const demension = [{
  id: 1,
  size: '40 x 60cm',
  quantity: 1
},{
  id: 2,
  size: '40 x 90cm',
  quantity: 1
}]


