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
      name: "firstName",
      label: "First Name",
      type: "text",
      placeholder: "First name",
      validation: { required: true, maxLength: 20 },
    },
    { name: "lastName", label: "Last Name", type: "text", placeholder: "Last name" },
    { name: "dob", label: "DOB", type: "date", placeholder: "Date of birth" },
    { name: "gender", label: "Gender", type: "radio" },
    { name: "email", label: "Email", type: "email", placeholder: "Email" },
    { name: "phone", label: "Phone", type: "phone", placeholder: "Phone" },
    { name: "address", label: "Address", type: "textArea", placeholder: "Address" },
    { name: "weight", label: "Weight", type: "number", placeholder: "Weight" },
    { name: "bloodgroup", label: "Blood group", type: "text", placeholder: "Blood group" },
    { name: "image", label: "Image", type: "image" },
  ];

  useEffect(() => {
    reset({ gender: "male" });
  }, []);

  const onSubmit = (e) => {
    console.log("submitted", e);
  };

  return (
    <div className="patient__container">
      <div className="add__record__container">
        <span className="add__record__text">Add Patient Record</span>
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
          <Button className="w-100 mb-4 primary__btn" variant="primary" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default PatientRecordEntry;
