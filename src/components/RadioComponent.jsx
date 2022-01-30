import React from "react";
import { Form } from "react-bootstrap";
import _ from "lodash";
function RadioComponent({ name, label, register, errorMessage }) {
  return (
    <Form.Group className="mb-3 text__field" controlId="formBasicEmail">
      <Form.Label className="text-white">{label}</Form.Label>
      <div className="d-flex justify-content-between w-25 mb-3">
        <div class="form-check">
          <input {...register("gender")} value="male" name="gender" class="form-check-input" type="radio" id="male" />
          <label class="form-check-label text-white pl-1 pr-2" for="male">
            Male
          </label>
        </div>
        <div class="form-check">
          <input
            {...register("gender")}
            class="form-check-input"
            name="gender"
            value="female"
            type="radio"
            id="female"
          />
          <label class="form-check-label text-white pl-1" for="female">
            Female
          </label>
        </div>
      </div>
      {_.size(errorMessage) ? <Form.Text className="text-danger">{errorMessage}</Form.Text> : null}
    </Form.Group>
  );
}

export default RadioComponent;
