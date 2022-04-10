import { Form } from "react-bootstrap";
import _ from "lodash";

const TextAreaComponent = ({ name, label, placeholder, register, errorMessage }) => {
  return (
    <Form.Group className="mb-3 text__field" controlId="formBasicEmail">
      <Form.Label className="b">{label}</Form.Label>
      <Form.Control {...register(name)} as="textarea" rows={4} type="text" placeholder={placeholder} />
      {_.size(errorMessage) ? <Form.Text className="text-danger">{errorMessage}</Form.Text> : null}
    </Form.Group>
  );
};
export default TextAreaComponent;
