import React from "react";
import _ from "lodash";
import { Form } from "react-bootstrap";

function DatePickerComponent({ name, label, register, errorMessage }) {
  return (
    <>
      <Form.Group className="mb-3 text__field" controlId="formBasicEmail">
        <Form.Label className="text-white">{label}</Form.Label>
        <Form.Control type="date" {...register(name)} placeholder="Enter email" />
        {_.size(errorMessage) ? <Form.Text className="text-danger">{errorMessage}</Form.Text> : null}
      </Form.Group>
    </>
  );
}

export default DatePickerComponent;
