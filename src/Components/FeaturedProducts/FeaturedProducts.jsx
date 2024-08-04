import React, { useContext, useEffect, useState } from 'react'
import   './FeaturedProducts.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { cartContext } from '../Context/CartContext';

import toast from 'react-hot-toast';

export default function FeaturedProducts() {
  const [products ,setProduct]=useState([]);
  const [isFav, setisFav] = useState(false);
  let {addProductToCart}= useContext(cartContext);
  let {addwishList}= useContext(cartContext);

  async function getProduct(){
   let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
   
    setProduct(data.data)
  }
  useEffect(()=> {getProduct()} ,[])

  async function addProduct(Id){
   let response =  await addProductToCart(Id);
   if (response?.data?.status ==='success'){
     toast.success(response.data.message ,{duration:1000})
  }
  else{
    toast.error('Failed To Add Product',{duration:1000})
  }
  }
  async function addProductInWishList(Id){
    let response =  await addwishList(Id);
    if (response?.data?.status ==='success'){
      toast.success(response.data.message ,{duration:1000})
      setisFav(true);
   }
   else{
     toast.error('Failed To Add Product In WishList',{duration:1000})
   }
   }
  return (
    <>
      <div className="row pt-4">
        {products.map((product) => (
          <div key={product._id} className="col-md-2">
            <div className="product px-2 py-3">
              <Link to={`ProductDetails/${product._id}`}>
                <img
                  className="w-100"
                  src={product.imageCover}
                  alt={product.title}
                />
                <span className="text-main fw-bold f-sm">
                  {product.category.name}
                </span>
                <h3 className="h6 fw-bolder">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </h3>
                <div className="d-flx justify-content-center">
                  <span className="text-muted">{product.price} EGP</span>
                  <span>
                    <i className="fas fa-star rating-color"></i>
                    {product.ratingsAverage}
                  </span>
                </div>
              </Link>
              <div className="d-flex justify-content-end">
                <button
                  onClick={() => addProductInWishList(product._id)}
                  className={
                    isFav
                      ? "btn border-main my-1 text-main"
                      : "btn border-main my-1 "
                  }
                >
                  <i class="fa-solid fa-heart "></i>{" "}
                </button>
              </div>

              <button
                onClick={() => addProduct(product._id)}
                className="btn bg-main w-100 text-white "
              >
                + Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
  
}
