/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import _ from "lodash";
import TextFieldComponent from "../../../components/TextFieldComponent";
import "./patientrecordentry.css";
import RadioComponent from "../../../components/RadioComponent";
import DatePickerComponent from "../../../components/DatePickerComponent";
import { Button, Col, Row, Spinner, Toast, ToastContainer } from "react-bootstrap";
import TextAreaComponent from "../../../components/TextAreaComponent";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SelectComponent from "../../../components/SelectComponent";
import logo1 from "../../../assets/images/recovered.png";
import ImageUpload from "../../../components/ImageUpload";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { patientRegister } from "../../../helpers/helpers";

function PatientRecordEntry() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [file, setFile] = useState(null);
  const [registerLoading, setRegisterLoading] = useState(false);
  const patientRegisterSchema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    dob: yup.string().required("Date of birth is required"),
    gender: yup.string().required("Gender is required"),
    email: yup.string().email().required("Email is required"),
    phone: yup.string().required("Phone is required"),
    address: yup.string().required("Address is required"),
    height: yup.number().typeError("Must be a number").required("Required"),
    weight: yup.number().typeError("Must be a number").required("Required"),
    bloodgroup: yup.string().required("Blood group is required"),
    ABHAHealthId: yup
      .number()
      .typeError("Must be a  number")
      .required("ABHAHealthId Required")
      .test("len", "Must be exactly 10 digits", (val) => val.toString().length === 10),
    emergencyFirstName: yup.string().required("Emergency First Name is Required"),
    emergencyLastName: yup.string().required("Emergency Last Name is Required"),
    emergencyRelationship: yup.string().required("Emergency Relationship is Required"),
    emergencyPhone: yup.string().required("Emergency Phone is Required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password is too short - should be 8 chars minimum."),
    confirmpassword: yup
      .string()
      .required("Confirm Password is required")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
    securityAnswer: yup.string().required("Security answer requred"),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(patientRegisterSchema) });

  const fields = [
    {
      name: "name",
      label: "Name",
      type: "all",
      placeholder: "all",
    },
    { name: "dob", label: "DOB", type: "date", placeholder: "Date of birth" },
    { name: "gender", label: "Gender", type: "radio" },
    { name: "email", label: "Email", type: "email", placeholder: "Email" },
    { name: "phone", label: "Phone", type: "phone", placeholder: "Phone" },
    {
      name: "address",
      label: "Address",
      type: "textArea",
      placeholder: "Address",
    },
    { name: "weight", label: "Weight", type: "number", placeholder: "Weight" },
    {
      name: "bloodgroup",
      label: "Blood group",
      type: "text",
      placeholder: "Blood group",
    },
    {
      name: "ABHAHealthId",
      label: "ABHA Health ID",
      type: "number",
      placeholder: "ex- 55 2548 3355",
    },
    {
      name: "maritalstatus",
      label: "Marital Status",
      type: "select",
      options: [
        { label: "Single", name: "single" },
        { label: "Married", name: "married" },
        { label: "Diversed", name: "diversed" },
        { label: "Widow", name: "widow" },
      ],
      placeholder: "Marital Status",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Your Password",
    },
    {
      name: "confirmpassword",
      label: "Confirm Password",
      type: "password",
      placeholder: "Confirm Password",
    },
    { name: "image", label: "Profile Image", type: "image" },
  ];

  const emergencyFields = [
    {
      name: "emergencyFirstName",
      label: "First Name",
      type: "text",
      placeholder: "First Name",
    },
    {
      name: "emergencyLastName",
      label: "Last Name",
      type: "text",
      placeholder: "Last Name",
    },
    {
      name: "emergencyRelationship",
      label: "Relationship",
      type: "text",
      placeholder: "Relationship",
    },
    {
      name: "emergencyPhone",
      label: "Phone",
      type: "text",
      placeholder: "Phone",
    },
  ];

  const questionFields = [
    {
      name: "securityQuestion",
      type: "select",
      options: [
        { label: "What is your date of birth?", name: "what is your date of birth?" },
        { label: "Which is your favourite car?", name: "which is your favourite car?" },
        { label: "What is your native place?", name: "what is your native place?" },
        { label: "what is your favourite color?", name: "what is your favourite color?" },
      ],
      label: "Security Question",
      placeholder: "Select a Security Question",
    },
    {
      name: "securityAnswer",
      type: "text",
      label: "Your Answer",
    },
  ];

  useEffect(() => {
    reset({ gender: "male", name_prefix: "mr" });
  }, []);

  const getFile = (file) => {
    setFile(file);
  };
  const formData = new FormData();

  const onSubmit = (e) => {
    setRegisterLoading(true);
    setShow(false);
    setError(false);
    if (file) {
      formData.append("image", file);
    }
    formData.append("data", JSON.stringify(e));

    patientRegister(formData)
      .then((res) => {
        setShow(true);
        setError(false);
        setRegisterLoading(false);
        console.log(res, "res");
        reset();
        setTimeout(() => {
          navigate("/patient/login");
        }, 3000);
        setFile(null);
        // alert("success");
      })
      .catch((err) => {
        setError(true);
        setRegisterLoading(false);
        console.log(err);
      });
  };

  return (
    <div className="patient__container">
      <div className="Main__wraper">
        <div className="add__record__container mb-5">
          <span className="add__record__text">New Patient Enrollment</span>
          <span>
            <img src={logo1} className="patient_logo" alt="patient_logo"></img>
          </span>
        </div>
        <div className="patient__form__container">
          <form onSubmit={handleSubmit(onSubmit)}>
            {_.map(fields, (eachField) => {
              const { type, label, placeholder, name } = eachField;
              return (
                <>
                  {eachField.name === "name" ? (
                    <Row>
                      <hr className="hr__tag mt-0 mb-4" />
                      <h2 className="text-white mb-3">Basic Details</h2>
                      <Col xs={2}>
                        {" "}
                        <SelectComponent
                          register={register}
                          label="Prefix"
                          name="name_prefix"
                          options={[
                            { label: "Mr", name: "mr" },
                            { label: "Mrs", name: "mrs" },
                          ]}
                        />
                      </Col>
                      <Col xs={5}>
                        <TextFieldComponent
                          errorMessage={_.get(errors, "firstName.message", "")}
                          register={register}
                          type={type}
                          placeholder="First Name"
                          name="firstName"
                          label="First Name"
                        />
                      </Col>
                      <Col xs={5}>
                        <TextFieldComponent
                          errorMessage={_.get(errors, "lastName.message", "")}
                          register={register}
                          type={type}
                          placeholder="Last Name"
                          name="lastName"
                          label="Last Name"
                        />
                      </Col>
                    </Row>
                  ) : eachField.type === "select" ? (
                    <SelectComponent
                      label={eachField.label}
                      name={eachField.name}
                      options={eachField.options}
                      register={register}
                    />
                  ) : eachField.type === "image" ? (
                    <ImageUpload getFile={getFile}>
                      <div className="rounded-md shadow-lg" style={{ width: "100%", backgroundColor: "#c5c6c7" }}>
                        <div className="items-center p-4 m-4 text-center border-4 border-dotted w-96 h-96">
                          <p className="self-auto">Drag and drop (Or click to drop) a image file</p>
                        </div>
                      </div>
                      <input
                        name="image"
                        type="text"
                        value={file ? file : ""}
                        className="d-none"
                        {...register("image")}
                      />
                    </ImageUpload>
                  ) : eachField.type === "radio" ? (
                    <RadioComponent
                      errorMessage={_.get(errors[eachField.name], "message", "")}
                      register={register}
                      name={name}
                      label={label}
                    />
                  ) : eachField.type === "date" ? (
                    <DatePickerComponent
                      errorMessage={_.get(errors[eachField.name], "message", "")}
                      register={register}
                      name={name}
                      label={label}
                    />
                  ) : eachField.type === "textArea" ? (
                    <TextAreaComponent
                      errorMessage={_.get(errors[eachField.name], "message", "")}
                      register={register}
                      placeholder={placeholder}
                      name={name}
                      label={label}
                    />
                  ) : eachField.name === "weight" ? (
                    <Row>
                      <Col>
                        <TextFieldComponent
                          errorMessage={_.get(errors, "height.message", "")}
                          register={register}
                          type={type}
                          placeholder="Height (cms)"
                          name="height"
                          label="Height"
                        />
                      </Col>
                      <Col>
                        <TextFieldComponent
                          register={register}
                          errorMessage={_.get(errors, "weight.message", "")}
                          type={type}
                          placeholder="Weight (kg)"
                          name="weight"
                          label="Weight"
                        />
                      </Col>
                    </Row>
                  ) : (
                    <TextFieldComponent
                      errorMessage={_.get(errors[eachField.name], "message", "")}
                      register={register}
                      type={type}
                      placeholder={placeholder}
                      name={name}
                      label={label}
                    />
                  )}
                </>
              );
            })}
            <hr className="hr__tag mt-5 mb-4" />
            <Row>
              <h2 className="text-white mb-3">Emergency Contact Details </h2>
            </Row>
            {_.map(emergencyFields, (eachField) => {
              const { type, label, placeholder, name } = eachField;
              return (
                <>
                  {eachField.type === "text" ? (
                    <TextFieldComponent
                      errorMessage={_.get(errors[name], "message", "")}
                      label={label}
                      name={name}
                      placeholder={placeholder}
                      register={register}
                      type={type}
                    />
                  ) : null}
                </>
              );
            })}
            <hr className="hr__tag  mt-5 mb-4" />
            {_.map(questionFields, (eachField) => {
              const { type, label, placeholder, name } = eachField;
              return (
                <>
                  {eachField.type === "text" ? (
                    <TextFieldComponent
                      errorMessage={_.get(errors[name], "message", "")}
                      label={label}
                      name={name}
                      placeholder={placeholder}
                      register={register}
                      type={type}
                    />
                  ) : eachField.type === "select" ? (
                    <SelectComponent label={label} name={name} options={eachField.options} register={register} />
                  ) : null}
                </>
              );
            })}
            <Button className="w-100 mb-4 mt-2 primary__btn" variant="primary" type="submit">
              {registerLoading ? <Spinner animation="border" /> : "Register"}
            </Button>
            <div className="w-100 justify-content-center d-flex align-items-center text-white mb-4 text-center mt-2">
              Already registered ?{" "}
              <Button
                style={{ color: "#66fcf1" }}
                variant="link"
                onClick={() => {
                  navigate("/patient/login");
                }}
              >
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer position="top-end" className="p-3">
        <Toast onClose={() => setShow(false)} bg="success" show={show} delay={3000} autohide>
          <Toast.Header>
            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
            <strong className="me-auto">Success</strong>
            <small className="text-muted">just now</small>
          </Toast.Header>
          <Toast.Body style={{ color: "#fff" }}>Successfully Registerred</Toast.Body>
        </Toast>
      </ToastContainer>
      <ToastContainer position="top-end" className="p-3">
        <Toast onClose={() => setError(false)} bg="danger" show={error} delay={3000} autohide>
          <Toast.Header>
            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
            <strong className="me-auto">Failed</strong>
            <small className="text-muted">just now</small>
          </Toast.Header>
          <Toast.Body style={{ color: "#fff" }}>Failed to register</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default PatientRecordEntry;
