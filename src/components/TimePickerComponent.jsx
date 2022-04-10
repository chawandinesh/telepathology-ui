import React from "react";
import _ from "lodash";
import { Form } from "react-bootstrap";

function TimePickerComponent({ name, label, register, errorMessage }) {
  return (
    <>
      <Form.Group className="mb-3 text__field" controlId="formBasicEmail">
        <Form.Label className="b">{label}</Form.Label>
        <Form.Control step="00:15" type="time" {...register(name)} placeholder="Enter email" />
        {_.size(errorMessage) ? <Form.Text className="text-danger">{errorMessage}</Form.Text> : null}
      </Form.Group>
    </>
  );
}

export default TimePickerComponent;
