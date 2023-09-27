import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import picture from "../assets/running.jpg";

const registrationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const Register = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      navigate("/home");
    }
  }, []);
  const handleSubmit = async (data) => {
    // Handle registration logic here
    try {
      const response = await axios.post("http://localhost:8080/api/auth", data);
      console.log(response.status);
      console.log(typeof response.status);
      if (response.status === 200) {
        navigate("/home");
      }
    } catch (error) {
      // console.log(error);
      alert("user already exist");
    }
  };

  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={registrationSchema}
      onSubmit={handleSubmit}
    >
      <div className="container">
        <div className="image">
          <img src={picture} alt="Login" width="300px" height="300px" />
        </div>
        <Form className="inputPart">
          <h1>Registration</h1>
          <div>
            <label htmlFor="username">Username:</label>
            <Field type="text" id="username" name="username" />
            <ErrorMessage
              name="username"
              component="div"
              className="errorMessage"
            />
          </div>

          <div>
            <label htmlFor="email">Email:</label>
            <Field type="email" id="email" name="email" />
            <ErrorMessage
              name="email"
              component="div"
              className="errorMessage"
            />
          </div>

          <div>
            <label htmlFor="password">Password:</label>
            <Field type="password" id="password" name="password" />
            <ErrorMessage
              name="password"
              component="div"
              className="errorMessage"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <Field
              type="password"
              id="confirmPassword"
              name="confirmPassword"
            />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="errorMessage"
            />
          </div>
          <p>
            You have account?<Link to="/login">Login</Link>
          </p>
          <button type="submit">Register</button>
        </Form>
      </div>
    </Formik>
  );
};

export default Register;
