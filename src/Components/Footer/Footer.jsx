import React from 'react'
import   './Footer.module.css'
import amzon from "../../assets/icon/amazon-pay-svgrepo-com.png";
import american from "../../assets/icon/amex-svgrepo-com.png";
import paypal from "../../assets/icon/paypal-logo-svgrepo-com.png";
import mastercard from "../../assets/icon/mastercard-old-svgrepo-com.png" ;
import googleplay from "../../assets/icon/google-play-badge-1-logo-svgrepo-com.png";
import appstore from "../../assets/icon/download-on-the-app-store-apple-logo-svgrepo-com.png";

export default function Footer() {
  return (
    <>
      <div className=" footer mt-4">
        <div className="container py-4">
          <h1>Get the FreshCart app</h1>

          <p>
            we will send you a link , open it on your phone to download the app{" "}
          </p>
          <div className="d-flex mb-4">
            <input
              className="w-75 me-2 bg-white footer-input"
              placeholder="Email..."
            />
            <button className="btn bg-main text-white">Share App Link</button>
          </div>
          <hr></hr>

          <div className="row mb-4">
            <div className="col-lg-6 col-sm-12  align-items-center">
              <div className=" d-lg-flex d-sm-block align-items-center">
                <div className="col-lg-4 col-sm-12">
                  <span className="me-2">Payment Partners</span>
                </div>
                <div className="col-sm-12">
                  <img
                    className="me-2"
                    style={{ width: "15%" }}
                    src={amzon}
                    alt="amazon"
                  ></img>
                  <img
                    className="me-2"
                    style={{ width: "15%" }}
                    src={american}
                    alt="american"
                  ></img>
                  <img
                    className="me-2"
                    style={{ width: "15%" }}
                    src={mastercard}
                    alt="mastercard"
                  ></img>
                  <img style={{ width: "15%" }} src={paypal} alt="paypal"></img>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-sm-12  align-items-center ">
              <span className="me-2">Get deliveries with FreshCart</span>
              <img
                className="me-2"
                width={80}
                src={googleplay}
                alt="google-play"
              ></img>
              <img width={80} src={appstore} alt="app-store"></img>
            </div>
          </div>
          <hr></hr>
        </div>
      </div>
    </>
  );              
                                
}
