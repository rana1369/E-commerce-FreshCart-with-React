import React, { useEffect, useState } from 'react'
import   './Brands.module.css'
import axios from 'axios';

export default function Brands() {
  const [Brands, setBrands]=useState([]);
 useEffect(()=>{getAllBrands()}, []);
  async function getAllBrands(){
  let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  console.log(data.data);
  setBrands(data.data)
  }
  return (
    <>
      <div className="row">
        {Brands.map((brand) => (
          <div key={brand._id} className="col-lg-4 col-sm-12 col-md-4">
            <img src={brand?.image} alt=""></img>
          </div>
        ))}
      </div>
    </>
  );
    
  
}
