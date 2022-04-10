import _ from "lodash";
import React from "react";
import { Form } from "react-bootstrap";
const PrefixNameComponent = ({ register, label, options, name }) => {
  return (
    <div>
      <Form.Group className="mb-3 text__field" controlId="formBasicEmail">
        <Form.Label className="b mr-2">{label}</Form.Label>
        <Form.Control {...register(name)} as="select" aria-label={name} name={name}>
          {_.map(options, (eachOption) => (
            <option value={eachOption.name}>{eachOption.label}</option>
          ))}
        </Form.Control>
      </Form.Group>
    </div>
  );
};

export default PrefixNameComponent;
