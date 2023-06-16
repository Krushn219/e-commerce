import blog2 from "../../assets/Images/Blog 2.png";
import blog1 from "../../assets/Images/Blog 1.png";

export const settings = (length) => ({
  dots: false,
  infinite: false,
  speed: 500,
  autoplay: true,
  swipeToSlide: true,
  slidesToShow: 6,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1299,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
        infinite: true,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
});

export const productDescription = {
  inTheBox: "This is a very important decision which will affect the decisions of any other typeface like headlines. Body text isthe most common element in a product. This is what all your users will see and experience. As a result, the look and feel of your body text will have the greatest impact on the quality of your design.",
  Feature: ["Green Speed Performance Help To Reach Top In Google Search Engine.", "Unlimited Color with Dark Mode", "6 Header Layouts", "3 Mobile Layouts", "4 Footer Layouts", "and Many More..."],
  descriptionImg: blog2,
  descriptionImg1: blog1,
  performance: "For beginners, it’s recommended to stay with one font until you have achieved mastery of that font. Play with the styles. Modern typefaces already come with many different styles, which means they share common distinct weights. Typefaces with a larger range of styles can help you differentiate text in special contexts, like a button or a label. If you still want/need to use more than one font, ensure the font families complement each other."
}