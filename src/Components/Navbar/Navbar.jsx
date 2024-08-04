import React from 'react'
import './Navbar.module.css'
import logo from '../../assets/freshcart-logo.svg'
import userImage from '../../assets/images/832.jpg'

import { Link } from 'react-router-dom';
export default function Navbar({userData ,logOut}) {
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-light bg-light stacky-top">
        <div className="container">
          <Link className="navbar-brand" to="#">
           <img src={logo} alt='logo' />
          </Link>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
           {userData !== null ? <ul className="navbar-nav me-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to="" aria-current="page">
                  Home
                  <span className="visually-hidden">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="brands">
                  Brand
                </Link>
              </li>
            </ul> : null }
            <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
              {userData !==null ?  <li className="nav-item d-flex justify-content-center align-items-center">
               <Link to="cart" className="fa-solid fa-cart-shopping" style={{ color: '#0aad0a' }}></Link>
               <Link to="profil"><img style={{width:'40px',height:'40px',borderRadius:'50%'}}  src={userImage} alt='user-img'/></Link>
              </li>  : null}
             
              {userData === null ? <>
               <li className="nav-item">
                <Link className="nav-link active" to="login" aria-current="page">
                  Login
                  <span className="visually-hidden">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="register">
                  Register
                </Link>
              </li>
              </> :  <li className="nav-item">
                <span onClick={logOut} className="nav-link cursor-pointer" to="#">
                  Logout
                </span>
              </li>}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
    
  
}
