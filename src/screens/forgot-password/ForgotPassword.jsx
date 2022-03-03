import React, { useState } from "react";
import "../patient/login/login.css";
import pathologistImage from "../../assets/images/pathologist.png";
import patientImage from '../../assets/images/recovered.png'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate,useLocation } from "react-router-dom";
import _ from "lodash";
import { Button, Spinner } from "react-bootstrap";
import { pathologistPasswordChange, patientPasswordChange } from "../../helpers/helpers";
import ToastComponent from "../../components/ToastComponent";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const {pathname} = useLocation()
  const [state, setState] = useState({
   type: '',
   show: false,
   message:''
  })
  const [loginLoading, setLoginLoading] = useState(false);
  
  const forgotPasswordSchema = yup.object().shape({
    email: yup.string().email().required("email is required"),
  });

  const titleName = () => pathname === "/patient/forgot-password" ? "Patient" : "Pathologist"
  const image = () => pathname === "/patient/forgot-password" ? patientImage : pathologistImage
  const loginLink = () => pathname === "/patient/forgot-password" ? "/patient/login" : "/pathologist/login"
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(forgotPasswordSchema) });

  const onSubmit = (e) => {
   if(pathname === "/patient/forgot-password"){
     setLoginLoading(true)
      patientPasswordChange(e).then(res => {
        if(_.get(res,'data.type') === "error"){
            setLoginLoading(false)
             setState({
               show: true,
               message: _.get(res,'data.message'),
               type: "danger"
             })
        }else{
          setLoginLoading(false)
          setState({
            show: true,
            message: _.get(res,'data.message'),
            type: "success"
          })
          reset()
        }
    })
   }else if(pathname === "/pathologist/forgot-password"){
     setLoginLoading(true)
      pathologistPasswordChange(e).then(res => {
          if(_.get(res,'data.type') === "error"){
              setLoginLoading(false)
               setState({
                 show: true,
                 message: _.get(res,'data.message'),
                 type: "danger"
               })
          }else{
            setLoginLoading(false)
            setState({
              show: true,
              message: _.get(res,'data.message'),
              type: "success"
            })
          }
      })
   }
  };
  console.log(errors)

  return (
    <div className="login">
      <div className="form">
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex">
            <img src={image()} alt="" className="logo-p img-fluid mb-3" />
            <h1 className="patient-head">{titleName()}</h1>
          </div>
          <br/>

          <input
            type="text"
            name="email"
            placeholder="email@email.com"
            {...register("email")}
          />
          <p className="text-danger text-start pl-3">{_.get(errors, "email.message", " ")}</p>
          <button className="mt-3 login-btn" type="submit">
          {loginLoading ?  <Spinner  animation="border" /> : "Login" }
          </button>
          <div className="w-100 justify-content-center d-flex align-items-center text-white mb-4 text-center mt-2">
            go back to login ?{" "}
            <Button
              style={{ color: "#66fcf1" }}
              variant="link"
              onClick={() => {
                navigate(loginLink());
              }}
            >
              click here!
            </Button>
          </div>
        </form>
      </div>
      <ToastComponent state={state} setState={setState}/>
    </div>
  );
};

export default ForgotPassword;
