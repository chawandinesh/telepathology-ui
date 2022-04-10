import React, { useState } from "react";
import "./login.css";
import recovered from "../../../assets/images/recovered.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import { Button, Spinner } from "react-bootstrap";
import { patientLogin } from "../../../helpers/helpers";

const Login = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  
  const LoginSchema = yup.object().shape({
    email: yup.string().email().required("email is required"),
    password: yup
      .string()
      .required("password is required")
      .min(8, "Password is too short - should be 8 chars minimum."),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(LoginSchema) });

  const onSubmit = (e) => {
    console.log(e, "data");
    setLoginError(false)
    setLoginLoading(true)
    patientLogin(e)
      .then((res) => {
        return res.data
      })
      .then((res) => {
        const token = _.get(res,'token','')
        setLoginLoading(false)
        localStorage.setItem("token",token)
        localStorage.setItem("user", JSON.stringify(res.data))
        setTimeout(() => {
          navigate("/patient/dashboard")
        }, 200);
      })
      .catch((err) => {
        setLoginLoading(false)
        setLoginError(true)
      });
  };

  return (
    <div className="login">
      <div className="form bgw">
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex">
            <h1 className="patient-head b">Patient Login</h1>
            <img src={recovered} alt="" className="logo-p img-fluid mb-3" />
          </div>

          <input
            type="text"
            name="email"
            placeholder="Enter email"
            {...register("email")}
            // pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          />
          <p className="text-danger text-start pl-3">{_.get(errors, "email.message", " ")}</p>
          <input type="password" name="password" placeholder="password" {...register("password")} />
          <div className="forgot__password__container w-100 b d-flex justify-content-end">
            <div>
              Forgot password ?
              <span
                className="b"
                style={{ fontSize: 13,  marginLeft: 10, cursor: "pointer", fontWeight:'bold' }}
                onClick={() => {
                  navigate("/patient/forgot-password");
                }}
              >
                Click here!
              </span>
            </div>
          </div>
          <p className="text-danger text-start pl-3">{_.get(errors, "password.message", " ")}</p>
          {loginError ? <p className="text-danger text-start pl-3">Invalid credentials</p> : null}
          <button className="mt-3 bgb text-white login-btn" type="submit">
            {loginLoading ? <Spinner animation="border" /> : "Login"}
          </button>
          <div className="w-100 justify-content-center d-flex align-items-center b mb-4 text-center mt-2">
            Don't have an account ?{" "}
            <Button
              className="b"
              style={{  fontWeight:'bold' }}
              variant="link"
              onClick={() => {
                navigate("/patient/registration");
              }}
            >
              Register here
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
