import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Layout from './Components/Layout/Layout';
import Brands from './Components/Brands/Brands';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Cart from './Components/Cart/Cart';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import Home from './Components/Home/Home';
import NotFound from './Components/NotFound/NotFound';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import CartContext from './Components/Context/CartContext';
import {Toaster} from 'react-hot-toast';
import Checkout from './Components/Checkout/Checkout';
import AllOrders from './Components/AllOrders/AllOrders';
import Profil from './Components/AllOrders/AllOrders';

function App() {
   
  const [userData , setUserData]=useState(null);
                     
  function saveUserData(){
    let encodedToken = localStorage.getItem('userToken');
    let decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken);
}  

useEffect(() => {
  if (localStorage.getItem('userToken') !== null) {
    saveUserData();
  }
}, []);
  let routers= createBrowserRouter([
    {path:'',element:<Layout setUserData={setUserData} userData ={userData}/> ,children :[
      {index:true ,element:<ProtectedRoute><Home/></ProtectedRoute> },
      {path:'brands',element:<ProtectedRoute><Brands/></ProtectedRoute>},
      {path:'checkout',element:<ProtectedRoute><Checkout/></ProtectedRoute>},
      {path:'profil',element:<ProtectedRoute><AllOrders/></ProtectedRoute>},

      {path:'cart',element:<ProtectedRoute><Cart/></ProtectedRoute>},
      {path:'productDetails/:id',element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
      {path:'login',element:<Login saveUserData={saveUserData}/> },
      {path:'register',element:<Register/>},
      {path:'*',element:<NotFound/>},

    ]}
  ])
  return <CartContext>
    <Toaster/>
     <RouterProvider router={routers}> </RouterProvider>
     
     </CartContext> 
   
  
  
    
  
    
  
}

export default App;
