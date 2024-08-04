import React from 'react'
import   './Layout.module.css'
import {Outlet} from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { useNavigate } from "react-router-dom";

export default function Layout({userData ,setUserData}) {
  let navigate = useNavigate();

  function logOut(){
  localStorage.removeItem('userToken');
  localStorage.removeItem('userId');

  setUserData(null);
  navigate('/login')
  }
  return <>

   <Navbar logOut={logOut} userData ={userData}></Navbar>
   <div className='container'>

     <Outlet></Outlet>

    </div>
  <Footer></Footer>
  </>
    
  
}
