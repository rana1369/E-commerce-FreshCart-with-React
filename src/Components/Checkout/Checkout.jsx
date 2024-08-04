import React, { useContext } from 'react'
import   './Checkout.module.css'
import { useFormik } from 'formik'
import { cartContext } from '../Context/CartContext'
export default function Checkout() {
  let {paymentOnline}= useContext(cartContext)
   async function handleSubmit(values){
  
   let res= await paymentOnline('6661cb9f906baf016e828a23', values); 
       console.log(res);
   if(res.data.status ==='success'){
      window.location.href= res.data.session.url
   }
   }
   let formik =useFormik({
    initialValues:{
      details:'',
      city:'',
      phone:''
    },

    onSubmit:handleSubmit
   });
   
  return <>
  <div className="w-50 py-5 mx-auto">
<form onSubmit={formik.handleSubmit}> 
  <label htmlFor='details' >Details:</label>
  <input type='text' className='form-control mb-3' value={formik.values.details} onChange={formik.handleChange} name='details' id='details' placeholder='Enter Details Of Your Address'/>
  <label htmlFor='city' >City:</label>
  <input type='text' className='form-control mb-3' value={formik.values.city} onChange={formik.handleChange} name='city' id='city' placeholder='Enter Your city'/>
  <label htmlFor='phone' >Phone:</label>
  <input type='text' className='form-control mb-3' value={formik.values.phone} onChange={formik.handleChange} name='phone' id='phone'  placeholder='Enter Your Phone'/>
  <button  disabled={!formik.isValid && formik.dirty} type='submit' className='btn border-main w-100 bg-main '>Pay</button>
</form>
  </div>
  </>
    
  
}
