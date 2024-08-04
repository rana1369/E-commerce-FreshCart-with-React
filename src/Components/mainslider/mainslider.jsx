import React from 'react';
import Slider from "react-slick";
import   './mainslider.module.css';

import slider1 from "../../assets/images/slider-image-1.jpeg"
import slider2 from "../../assets/images/slider-image-2.jpeg"
import slider3 from "../../assets/images/slider-image-3.jpeg"
import side1 from "../../assets/images/grocery-banner.png"
import side2 from "../../assets/images/grocery-banner-2.jpeg"

export default function Mainslider() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <div className="row gx-0 py-4">
        <div className="col-md-8">
          <Slider {...settings}>
            <img height={400} src={slider1} alt="" />

            <img height={400} src={slider2} alt="" />

            <img height={400} src={slider3} alt="" />
          </Slider>
        </div>
        <div className="col-md-4">
          <img className="w-100" height={200} alt="" src={side1} />
          <img className="w-100" height={200} alt="" src={side2} />
        </div>
      </div>
    </>
  );
    
  
}
