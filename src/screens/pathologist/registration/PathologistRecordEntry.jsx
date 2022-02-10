/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import _ from "lodash";
import TextFieldComponent from "../../../components/TextFieldComponent";
import "./pathologistrecordentry.css";
import RadioComponent from "../../../components/RadioComponent";
import DatePickerComponent from "../../../components/DatePickerComponent";
import { Button, Col, Row } from "react-bootstrap";
import TextAreaComponent from "../../../components/TextAreaComponent";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SelectComponent from "../../../components/SelectComponent";
import logo1 from "../../../assets/images/pathologist.png";
import ImageUpload from "../../../components/ImageUpload";
import axios from "axios";
import { Link } from "react-router-dom";
import { pathologistRegister } from "../../../helpers/helpers";

function PathologistRecordEntry() {
  const [file, setFile] = useState(null);
  const patientRegisterSchema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    dob: yup.string().required("Date of birth is required"),
    gender: yup.string().required("Gender is required"),
    email: yup.string().email().required("Email is required"),
    phone: yup.string().required("Phone is required"),
    address: yup.string().required("Address is required"),
    ICMRregistrationId: yup.string().required("ICMRregistrationId required"),
    designation: yup.string().required("Designation is Required"),
    experience: yup.string().required("Experience is required"),
    emergencyFirstName: yup.string().required("Emergency First Name is Required"),
    emergencyLastName: yup.string().required("Emergency Last Name is Required"),
    emergencyRelationship: yup.string().required("Emergency Relationship is Required"),
    emergencyPhone: yup.string().required("Emergency Phone is Required"),
    password: yup.string().required("Password is required"),
    confirmpassword: yup
      .string()
      .required("Confirm Password is required")
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
    {
      name: "designation",
      label: "Designation",
      type: "text",
      placeholder: "Designation",
    },
    {
      name: "experience",
      label: "Experience",
      type: "text",
      placeholder: "Experience (in years)",
    },
    {
        name: "ICMRregistrationId",
        label: "ICMR Registration ID",
        type: "number",
        placeholder: "ICMR registration ID",
      },
    {
      name: "maritalstatus",
      label: "Marital Status",
      type: "select",
      options: [
        { label: "Single", name: "single" },
        { label: "Married", name: "married" },
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
    { name: "image", label: "Image", type: "image" },
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
    if (file) {
      formData.append("image", file);
    }
    formData.append("data", JSON.stringify(e));
   console.log(e)
   pathologistRegister(formData).then(res => {
     console.log(res,'res...')
   })
    // postApi();
  };

  return (
    <div className="patient__container">
      <div className="Main__wraper">
        <div className="add__record__container mb-5">
          <span className="add__record__text">New Pathologist Enrollment</span>
          <span>
            <img src={logo1} className="patient_logo"></img>
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
                    <ImageUpload getFile={getFile} file={file}>
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
              Submit
            </Button>
            {/* <Button className="w-100 mb-4 mt-2" variant="primary"> */}
            {/* <div className="text-center text-white pb-3 pt-3">
              <Link to="/patient/dashboard" className="text-white" >
                Go to dashboard
                </Link>

            </div> */}
            {/* </Button> */}
          </form>
        </div>
      </div>
    </div>
  );
}

export default PathologistRecordEntry;
