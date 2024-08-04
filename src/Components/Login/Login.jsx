import React, { useState } from "react";
import "./Login.module.css";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
export default function Login({saveUserData}) {
  let navigate = useNavigate();
  const [messageError, setMessageError] = useState("");
  async function handleLogin(values) {
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .catch((error) => {
        
        setMessageError(
          `${error.response.data.message} `
        );
      });  
    if (data.message === "success") {
     
      localStorage.setItem('userToken', data.token);
      
       saveUserData();
       navigate("/");
    }
  }
  let validation = Yup.object({
   
    email: Yup.string()
      .required("email is required ")
      .email("email not valid "),
    password: Yup.string()
      .required("password is required ")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "password must start with uppercase..."
      ),
  
  });
  let formik = useFormik({
    initialValues: {
     
      email: "",
      password: "",
     
    },
    validationSchema: validation,
    onSubmit: handleLogin,
  });
  return (
    <>
      <h1 className="d-flex justify-content-center ">Login Now !</h1>
      {messageError.length > 0 ? (
        <div className="alert alert-danger text-center w-75 ">{messageError}</div>
      ) : null}
      <div className="d-flex justify-content-center">
        <form className="w-75" onSubmit={formik.handleSubmit}>
         

          <label className="mt-2" htmlFor="email">
            Email :
          </label>
          <input
            type="email"
            className="form-control"
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            name="email"
            id="email"
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger mt-1 py-0">
              {formik.errors.email}
            </div>
          ) : null}

          <label className="mt-2" htmlFor="password">
            Password :
          </label>
          <input
            type="password"
            className="form-control"
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            name="password"
            id="password"
            autoComplete="new-password"
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger mt-1 py-0">
              {formik.errors.password}
            </div>
          ) : null}

          <div className="d-flex justify-content-end">
            <button
              disabled={!formik.isValid && formik.dirty}
              type="submit"
              className=" btn bg-main mt-2 text-white "
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
