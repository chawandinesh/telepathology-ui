import { Form } from "react-bootstrap";
import _ from "lodash";
const TextFieldComponent = ({ name, type, label, placeholder, register, errorMessage }) => {
  return (
    <Form.Group className="mb-3 text__field" controlId="formBasicEmail">
      <Form.Label className="text-white">{label}</Form.Label>
      <Form.Control {...register(name)} type={type} placeholder={placeholder} />
      {_.size(errorMessage) ? <Form.Text className="text-danger">{errorMessage}</Form.Text> : null}
    </Form.Group>
  );
};
export default TextFieldComponent;
