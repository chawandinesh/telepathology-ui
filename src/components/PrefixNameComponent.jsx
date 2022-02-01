import React from "react";
import {Form} from "react-bootstrap"
const PrefixNameComponent = ({label}) => {
  return (
    <div>
         <Form.Group className="mb-3 text__field" controlId="formBasicEmail">
        <Form.Label className="text-white mr-2">{label}</Form.Label>
      <select name="name_prefix" id="name_prefix">
        <option value="Mrs">Mrs</option>
        <option value="Mr">Mr</option>
      </select>
      </Form.Group>
    </div>
  );
};

export default PrefixNameComponent;
