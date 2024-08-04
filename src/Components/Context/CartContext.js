import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let cartContext =createContext();


export default function CartContext(props) {             
 const [cartId, setCartId] = useState(null);                                                  
    let headers = {
        'token': localStorage.getItem('userToken')
    };
    useEffect(()=>{   
      getCart();
    },[])
    async function getCart(){
      let response = await getLoggedUserCart();
    }
    function addProductToCart(Id){
      return axios.post(
        'https://ecommerce.routemisr.com/api/v1/cart',
        { productId: Id },
        { headers: headers }
      )
      .then(response => response)
      .catch(error => error);
    }
     function getLoggedUserCart() {
       return axios
         .get(
           `https://ecommerce.routemisr.com/api/v1/cart`,

           { headers: headers }
         )
         .then((response) => {
          localStorage.setItem('userId', response.data.data.cartOwner);
           return response;
         })
         .catch((error) => error);
     }
     function getUserOrders(Id) {
      return axios
        .get(
          `https://ecommerce.routemisr.com/api/v1/orders/user/${Id}`,

          { headers: headers }
        )
        .then((response) => response)
        .catch((error) => error);
    }
    function getwishList() {
      return axios
        .get(
          `https://ecommerce.routemisr.com/api/v1/wishlist`,

          { headers: headers }
        )
        .then((response) => response)
        .catch((error) => error);
    }
    function addwishList(Id) {
      return axios
        .post(
          `https://ecommerce.routemisr.com/api/v1/wishlist`,

          { headers: headers },
          { productId: Id }
        )
        .then((response) => response)
        .catch((error) => error);
    }
    function addAddress(name,details,phone,city) {
      return axios
        .post(
          `https://ecommerce.routemisr.com/api/v1/addresses`,

          { headers: headers },
          { name: name , details :details , phone :phone , city :city }
        )
        .then((response) => response)
        .catch((error) => error);
    }
    function getAddress() {
      return axios
        .post(
          `https://ecommerce.routemisr.com/api/v1/addresses`,

          { headers: headers },
          
        )
        .then((response) => response)
        .catch((error) => error);
    }
    
     function updateCart(Id, count) {
       return axios
         .put(
           `https://ecommerce.routemisr.com/api/v1/cart/${Id}`,
           { count: count },
           { headers: headers }
         )
         .then((response) => response)
         .catch((error) => error);
     }
     function paymentOnline(cartId, shippingAddress) {
      return axios
        .post(
          `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
          { shippingAddress: shippingAddress },
          { headers: headers }
        )
        .then((response) => response)
        .catch((error) => error);
    }
     function RemoveProductFromCart(Id) {
       return axios
         .delete(
           `https://ecommerce.routemisr.com/api/v1/cart/${Id}`,

           { headers: headers }
         )
         .then((response) => response)
         .catch((error) => error);
     }
 
    return (
    <cartContext.Provider value={{addProductToCart, getAddress,addAddress,addwishList,getwishList, getUserOrders , paymentOnline , getLoggedUserCart ,updateCart ,RemoveProductFromCart}}>
        {props.children}
    </cartContext.Provider>
  )
}


