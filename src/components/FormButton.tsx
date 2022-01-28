import React from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

interface IFormButton {
  type: "button" | "submit" | "reset" | undefined;
  label: string;
  loading: boolean;
}

const FormButton: React.FC<IFormButton> = (props) => {
  return (
    <Button type={props.type} variant="success" disabled={props.loading}>
      {props.loading && (
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
          className="me-1"
        />
      )}
      {props.label}
    </Button>
  );
};

export default FormButton;
