import React, { useEffect } from "react";
import axios from "axios";
import "../auth/login.css";
import picture from "../assets/jogging.png";
import { Link, useNavigate } from "react-router-dom";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password required"),
});

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    // console.log(token);
    if (token) {
      navigate("/home");
    }
  }, []);

  const handleLogin = async (data) => {
    try {
      const dataInfo = { email: data.email, password: data.password };

      const response = await axios.post(
        "http://localhost:8080/api/auth/checkUser",
        dataInfo
      );
      // console.log(response);
      const { token, user } = response.data;
      // console.log(response.data);
      if (token) {
        // console.log("da");
        localStorage.setItem("token", token);
        navigate("/home", { state: { user } });
      }
    } catch (error) {
      // Handle login error
      console.error("Error during login:", error);
      // console.log(error.response);
      alert(error.response.data.message);
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={loginSchema}
      onSubmit={handleLogin}
    >
      <div className="container">
        <div className="image">
          <img src={picture} alt="Login" />
        </div>
        <Form className="inputPart">
          <h1>Login</h1>
          <div>
            <label htmlFor="email">Email</label>
            <Field type="text" id="email" name="email" required />
            <ErrorMessage
              name="email"
              component="div"
              className="errorMessage"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Field type="password" id="password" name="password" required />
            <ErrorMessage
              name="password"
              component="div"
              className="errorMessage"
            />
          </div>
          <div>
            <p>
              Don't have account?<Link to="/register">Register</Link>
            </p>
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </Form>
      </div>
    </Formik>
  );
};

export default Login;
