import React, { useRef, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import ReactImageZoom from 'react-image-zoom';
import ReactImageMagnify from 'react-image-magnify';
import "./style.css"

const CarouselSlider = ({ image }) => {
    const [img, setImg] = useState(image[0]);
    const hoverHandler = (image, i) => {
        setImg(image);
        refs.current[i].classList.add('active');
        for (var j = 0; j < image.length; j++) {
            if (i !== j) {
                refs.current[j].classList.remove('active');
            }
        }
    };
    const refs = useRef([]);
    refs.current = [];
    const addRefs = (el) => {
        if (el && !refs.current.includes(el)) {
            refs.current.push(el);
        }
    };

    const props = { width: 295, height: 245, scale: 2.4, zoomStyle: "top: -110px; z-index: 999; border-radius: 0 10px 10px 0", offset: { "vertical": 0, "horizontal": 44 }, img: img };

    return (
        <>
            <div className="container">
                <Carousel showArrows={true} showThumbs={true} swipeable={true} showIndicators={false}>
                    {image.map((item, index) => {
                        return (
                            <div key={index} className="product-page-slide-img">
                                <img
                                    src={item}
                                    alt="img"
                                    id={index}
                                    className="img-fluid"
                                />
                            </div>
                        );
                    })}</Carousel>
            </div>
        </>
    )
}

export default CarouselSlider
