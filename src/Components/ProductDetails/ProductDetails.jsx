import React, { useEffect, useState } from 'react'
import   './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Slider from "react-slick";
export default function ProductDetails() {
  let param =useParams();
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const [ProductDetails ,setProductDetails] =useState(null)
 async function getProductDetails(id){
   let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    setProductDetails(data.data);
  
  }
  useEffect(()=>{
  getProductDetails(param.id);
  },[])
  return (
    <>
      <div className="row py-4 align-items-center">
        <div className="col-md-4">
        <Slider {...settings}>
           
          {ProductDetails?.images.map((img)=> <img src={img} alt='' />)}

         </Slider>
        </div>
        <div className="col-md-8">
          <h3>{ProductDetails?.title}</h3>
          <p className="text-muted p-3">{ProductDetails?.description}</p>

          <div className="d-flx justify-content-center">
            <span className="text-muted">{ProductDetails?.price} EGP</span>
            <span>
              <i className="fas fa-star rating-color"></i>
              {ProductDetails?.ratingsAverage}
            </span>
          </div>

          <button className="btn bg-main w-100 text-white ">+ Add</button>
        </div>
      </div>
    </>
  );
    
  
}
