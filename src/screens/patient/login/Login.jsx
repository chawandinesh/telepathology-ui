import React from "react";
import "./login.css";
import recovered from "../../../assets/images/recovered.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import { Button } from "react-bootstrap";
import { patientLogin } from "../../../helpers/helpers";

const Login = () => {
  const navigate = useNavigate();
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
    patientLogin(e)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response.code);
      });
  };

  return (
    <div className="login">
      <div className="form">
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex">
            <h1 className="patient-head">Patient Login</h1>
            <img src={recovered} alt="" className="logo-p img-fluid mb-3" />
          </div>

          <input
            type="text"
            name="email"
            placeholder="email@email.com"
            {...register("email")}
            // pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          />
          <p className="text-danger text-start pl-3">{_.get(errors, "email.message", " ")}</p>
          <input type="password" name="password" placeholder="password" {...register("password")} />
          <p className="text-danger text-start pl-3">{_.get(errors, "password.message", " ")}</p>
          <button className="mt-3 login-btn" type="submit">
            login
          </button>
          <div className="w-100 justify-content-center d-flex align-items-center text-white mb-4 text-center mt-2">
            Don't have an account ?{" "}
            <Button
              style={{ color: "#66fcf1" }}
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
