import React from "react";
import "./style.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Triangle } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const HomePageBanner = ({ banner, bannersingle, isLoading, goToShop }) => {

  return (
    <div>
      <div className="about-wrapper row">
        {!isLoading ? <div className="about-img">
          <div className="position-relative">
            <img src={bannersingle?.image} alt="png" className="img-fluid" />
            <div className="about-content">
              <div>
                Upto <span>{bannersingle?.offer}</span> Off
              </div>
              <p className="banner-disc">{bannersingle?.description}</p>
              <button className="shop-main-btn" onClick={goToShop}>Shop Now</button>
            </div>
          </div>
        </div>
          : (<div
            style={{ textAlign: "center", padding: "30px" }}
          >
            <Triangle color="var(--theme-color)" />
          </div>)
        }
        <div className="about-inner-wrapper">
          <div className="h-100">
            <Carousel
              id="carouselExampleControls"
              data-bs-ride="carousel"
              autoPlay={true}
              interval={3000}
              swipeable={true}
              showThumbs={false}
              emulateTouch={true}
            >
              {banner?.length && !isLoading ? (
                banner?.map((element) => {
                  return (
                    <div className="active" key={element}>
                      <img
                        src={element.image}
                        className="img-fluid h-100"
                        alt="png"
                      />
                      <div className="about-slider2">
                        <h2>{element.description}</h2>
                        <p>{element.offer}</p>
                        <button className="shop-main-btn" onClick={goToShop}>Shop Now</button>
                      </div>
                    </div>
                  );
                })
              ) : (
                !isLoading && <p></p>
              )}
            </Carousel>
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
    </div>
  );
};

export default HomePageBanner;
