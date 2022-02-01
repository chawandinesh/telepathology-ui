/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import _ from "lodash";
import TextFieldComponent from "../components/TextFieldComponent";
import "./patientrecordentry.css";
import RadioComponent from "../components/RadioComponent";
import DatePickerComponent from "../components/DatePickerComponent";
import { Button, Col, Row } from "react-bootstrap";
import TextAreaComponent from "../components/TextAreaComponent";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ImageComponent from "../components/ImageComponent";
import PrefixNameComponent from "../components/PrefixNameComponent";
import { Form } from "react-bootstrap";
import SecurityQuestionComponent from "../components/SecurityQuestionComponent";
import logo from "../assets/images/medical.png"
import logo1 from "../assets/images/recovered.png"
function PatientRecordEntry() {
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
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(patientRegisterSchema) });

  const fields = [
    {
      name: "name_prefix",
      label: "Prefix",
      type: "select"
    },
    {
      name: "firstName",
      label: "First Name",
      type: "text",
      placeholder: "First name",
      validation: { required: true, maxLength: 20 },
    },
    {
      name: "lastName",
      label: "Last Name",
      type: "text",
      placeholder: "Last name",
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
      type: "text",
      placeholder: "Marital Status",
    },
    { name: "image", label: "Image", type: "image" },
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
  ];

  const questionField =[
    {
      name:"securityQuestion",
      type:"select",
      label:"Security Question"
    },
    {
      name:"securityAnswer",
      type:"text",
      label:"Your Answer"
    }
  ]

  useEffect(() => {
    reset({ gender: "male" });
  }, []);

  const onSubmit = (e) => {
    console.log("submitted", e);
  };

  return (
    <div className="patient__container">
      <div className="Main__wraper">
        <div className="add__record__container mb-5">
          <span className="add__record__text">New  Patient Enrollment</span>
          <span ><img src={logo1} className="patient_logo"></img></span>
        </div>
        <div className="patient__form__container">
          <form onSubmit={handleSubmit(onSubmit)}>
            {_.map(fields, (eachField) => {
              const { type, label, placeholder, name } = eachField;
              return (
                <>
                  {eachField.type === "image" ? (
                    <ImageComponent register={register} />
                  ) : eachField.type === "radio" ? (
                    <RadioComponent
                      errorMessage={_.get(
                        errors[eachField.name],
                        "message",
                        ""
                      )}
                      register={register}
                      name={name}
                      label={label}
                    />
                  ) : eachField.type === "date" ? (
                    <DatePickerComponent
                      errorMessage={_.get(
                        errors[eachField.name],
                        "message",
                        ""
                      )}
                      register={register}
                      name={name}
                      label={label}
                    />
                  ) : eachField.type === "textArea" ? (
                    <TextAreaComponent
                      errorMessage={_.get(
                        errors[eachField.name],
                        "message",
                        ""
                      )}
                      register={register}
                      placeholder={placeholder}
                      name={name}
                      label={label}
                    />
                  ) : eachField.type === "select" ? (
                    <PrefixNameComponent label={label} name={name} />
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
                      errorMessage={_.get(
                        errors[eachField.name],
                        "message",
                        ""
                      )}
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
            <hr className="hr__tag mt-5 mb-4"/>
            <div className="Emergency_contact_Form_Detail_container">
              <div className="row ">
                <h2 className="text-white mb-3">Emergency Contact Details </h2>
                <div className="col-lg-6">
                  <Form>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className="text-white">First Name</Form.Label>
                      <Form.Control type="text" placeholder="First Name" />
                    </Form.Group>
                  </Form>
                </div>
                <div className="col-lg-6">
                  <Form>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className="text-white">Last Name</Form.Label>
                      <Form.Control type="text" placeholder="Last Name" />
                    </Form.Group>
                  </Form>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <Form.Label className="text-white">Relationship</Form.Label>
                  <Form.Control type="text" placeholder="Relationship" />
                </div>
                <div className="col-12 mt-3 ">
                  <Form.Label className="text-white">Contact Number</Form.Label>
                  <Form.Control type="phone" placeholder="Phone" />
                </div>
              </div>
            </div>
            <hr className="hr__tag  mt-5 mb-4"/>
            <div className="security__questions__container">
            {_.map(questionField,
             (each) => {
              const { type, label, placeholder, name } = each;
              return(
                <>
                {each.name === "securityQuestion" ? <SecurityQuestionComponent label={label}/>:null}
                </>
              )

            })}

            </div>
            <Button
              className="w-100 mb-4 primary__btn"
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PatientRecordEntry;
