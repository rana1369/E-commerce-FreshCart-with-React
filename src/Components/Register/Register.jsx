import React, { useState } from "react";
import "./Register.module.css";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
export default function Register() {
  let navigate = useNavigate();
  const [messageError, setMessageError] = useState("");
  async function handleRegister(values) {
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .catch((error) => {
        setMessageError(
          `${error.response.data.errors.param} : ${error.response.data.errors.msg}`
        );
      });
    if (data.message === "success") {
      navigate("/login");
    }
  }
  let validation = Yup.object({
    name: Yup.string()
      .required("name is required ")
      .min(3, "min lenght is 3 char")
      .max(25, "max lenght is 10 char"),
    email: Yup.string()
      .required("email is required ")
      .email("email not valid "),
    password: Yup.string()
      .required("password is required ")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "password must start with uppercase..."
      ),
    repassword: Yup.string()
      .required("repassword is required ")
      .oneOf([Yup.ref("password")], "repassword must match password"),
    phone: Yup.string()
      .required("phone is required ")
      .matches(/^01[0125][0-9]{8}$/, "phone must start with 01 "),
  });
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      repassword: "",
      phone: "",
    },
    validationSchema: validation,
    onSubmit: handleRegister,
  });
  return (
    <>
      <h1 className="d-flex justify-content-center">Register Now !</h1>
      {messageError.length > 0 ? (
        <div className="alert alert-danger ">{messageError}</div>
      ) : null}
      <div className="d-flex justify-content-center">
        <form className="w-75" onSubmit={formik.handleSubmit}>
          <label htmlFor="name">Name :</label>
          <input
            type="text"
            className="form-control "
            value={formik.values.name}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            name="name"
            id="name"
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="alert alert-danger mt-1 py-0">
              {formik.errors.name}
            </div>
          ) : null}

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

          <label className="mt-2" htmlFor="repassword">
            Repassword :
          </label>
          <input
            type="password"
            className="form-control"
            value={formik.values.repassword}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            name="repassword"
            id="repassword"
            autoComplete="new-password"
          />
          {formik.errors.repassword && formik.touched.repassword ? (
            <div className="alert alert-danger mt-1 py-0">
              {formik.errors.repassword}
            </div>
          ) : null}

          <label className="mt-2" htmlFor="phone">
            Phone :
          </label>
          <input
            type="tel"
            className="form-control"
            value={formik.values.phone}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            name="phone"
            id="phone"
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert alert-danger mt-1 py-0">
              {formik.errors.phone}
            </div>
          ) : null}
          <div className="d-flex justify-content-end">
            <button
              disabled={!formik.isValid && formik.dirty}
              type="submit"
              className=" btn bg-main mt-2 text-white "
            >
              Regist
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
