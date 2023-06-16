import brand1 from '../../assets/Images/brand1.jpg'
import brand2 from '../../assets/Images/brand2.jpg'
import brand3 from '../../assets/Images/brand3.jpg'
import brand4 from '../../assets/Images/brand4.jpg'
import brand5 from '../../assets/Images/brand5.jpg'
import brand6 from '../../assets/Images/brand6.jpg'
import brand7 from '../../assets/Images/brand7.jpg'
import brand8 from '../../assets/Images/brand8.jpg'

export const brandimg = [{
  id: 1,
  img: brand1
}, {
  id: 2,
  img: brand2
}, {
  id: 3,
  img: brand3
}, {
  id: 4,
  img: brand4
}, {
  id: 5,
  img: brand5
}, {
  id: 6,
  img: brand6
}, {
  id: 7,
  img: brand7
}, {
  id: 8,
  img: brand8
}]

export const brandSlider = {
  dots: false,
  infinite: true,
  arrows: true,
  speed: 500,
  autoplay: true,
  swipeToSlide: true,
  slidesToShow: 5,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        infinite: true,
      },
    },
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 575,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
};