import React, { useEffect, useState } from 'react'
import   './CategorySlider.module.css'
import Slider from "react-slick";
import axios from 'axios';

export default function CategorySlider() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
  };

const [categories ,setCategory] =useState(null)
 async function getCategories(){
   let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
   setCategory(data.data);
  
  }
  useEffect(()=>{
  getCategories();
  },[])
  return <>
   <Slider {...settings}>
           {categories?.map((cat)=>
                <div  key={cat._id}>
                <img className='w-100' height={200} alt='' src={cat?.image}/>
                <h2 className='h6 pt-2'>{cat?.name}</h2>
                </div>
           
           )
           }
          
 
          </Slider>
  </>
    
  
}
