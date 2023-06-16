import Icon1 from "../../assets/Images/Icon 1.png";
import Icon2 from "../../assets/Images/Icon 2.png";
import Icon3 from "../../assets/Images/Icon 3.png";
import Icon4 from "../../assets/Images/Icon 4.png";

export const support = [
  {
    img: Icon1,
    text: "FREESHIPPING",
    p: "Lorem ipsum dolor sit",
  },
  {
    img: Icon2,
    text: "24X7SUPPORT",
    p: "Lorem ipsum dolor sit",
  },
  {
    img: Icon3,
    text: "BIGSAVING",
    p: "Lorem ipsum dolor sit",
  },
  {
    img: Icon4,
    text: "MONEYBACK",
    p: "Lorem ipsum dolor sit",
  },
]

export const productsSliderParams = (length) => ({
  dots: false,
  infinite: false,
  speed: 300,
  autoplay: true,
  swipeToSlide: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  rows: length > 8 ? 2 : 1,
  slidesPerRow: 1,
  responsive: [
    {
      breakpoint: 1199,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
      },
    },
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
      },
    },
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 399,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
});

export const testimonialSliderParams = (length) => ({
  dots: false,
  // infinite: true,
  infinite: false,
  speed: 300,
  autoplay: true,
  swipeToSlide: true,
  autoplaySpeed: 3000,
  slidesToShow: 2,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
      },
    },
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 575,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
});

export const ShopcategorySlider = () => ({
  dots: false,
  infinite: false,
  speed: 300,
  autoplay: true,
  swipeToSlide: true,
  autoplaySpeed: 3000,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 575,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
})



