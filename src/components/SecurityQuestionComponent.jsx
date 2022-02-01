import React from 'react';
import {Form} from "react-bootstrap";

const SecurityQuestionComponent = ({label}) => {
  return <div className='mb-5'>
       <Form.Label className="text-white">Security Question</Form.Label>
        <Form.Select aria-label="Default select example">

  <option>Select a question from the following options</option>
  <option value="1">what is your date of birth?</option>
  <option value="2">which is your favourite car</option>
  <option value="3">what is your native place</option>
  <option value="3">What is your favourite color?</option>
</Form.Select>
<Form.Group className="mb-3 mt-2" controlId="exampleForm.ControlInput1">
    <Form.Label className="text-white">Security Answer</Form.Label>
    <Form.Control type="text" placeholder="Your answer" />
  </Form.Group>


  </div>;
};

export default SecurityQuestionComponent;
