import React, { ChangeEventHandler, FocusEventHandler } from "react";
import Form from "react-bootstrap/Form";

interface IFormSelect {
  name: string;
  label: string;
  value: any;
  onChange: ChangeEventHandler<any>;
  onBlur: FocusEventHandler<any>;
  isInvalid: boolean | undefined;
  error: string | undefined;
  options: any[];
  optionsValue: string;
  optionsLabel: string;
  optionsPlaceholder: string;
}

const FormSelect: React.FC<IFormSelect> = (props) => {
  return (
    <Form.Group className="mb-3" controlId={props.name}>
      <Form.Label>{props.label}</Form.Label>
      <Form.Select
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        isInvalid={props.isInvalid}
      >
        <option>{props.optionsPlaceholder}</option>
        {props.options.map((option, i) => (
          <option key={i} value={option[props.optionsValue]}>
            {option[props.optionsLabel]}
          </option>
        ))}
      </Form.Select>
      <Form.Control.Feedback type="invalid">
        {props.error}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default FormSelect;
