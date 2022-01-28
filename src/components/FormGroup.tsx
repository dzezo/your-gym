import React, { ChangeEventHandler, FocusEventHandler } from "react";
import Form from "react-bootstrap/Form";

interface IFormGroup {
  type: string;
  name: string;
  label: string;
  placeholder: string;
  value: any;
  onChange: ChangeEventHandler<any>;
  onBlur: FocusEventHandler<any>;
  isInvalid: boolean | undefined;
  error: string | undefined;
}

const FormGroup: React.FC<IFormGroup> = (props) => {
  return (
    <Form.Group className="mb-3" controlId={props.name}>
      <Form.Label>{props.label}</Form.Label>
      <Form.Control
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        isInvalid={props.isInvalid}
      ></Form.Control>
      <Form.Control.Feedback type="invalid">
        {props.error}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default FormGroup;
