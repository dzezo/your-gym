import { FC, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IModalProps } from "interfaces/modal-props.interface";

const NewPaymentModal: FC<IModalProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      date: "",
      amount: 0,
    },
    validationSchema: Yup.object({
      date: Yup.string().required(),
      amount: Yup.number().required(),
    }),
    onSubmit: async (values) => {
      setLoading(true);
    },
    enableReinitialize: true,
  });

  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Member Info</Modal.Title>
      </Modal.Header>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="date">
            <Form.Label>Payment Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={formik.values.date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={!!formik.errors.date && formik.touched.date}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              {formik.errors.date}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="amount">
            <Form.Label>Amount Paid</Form.Label>
            <Form.Control
              type="number"
              placeholder="0"
              name="amount"
              value={formik.values.amount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={!!formik.errors.amount && formik.touched.amount}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              {formik.errors.amount}
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" disabled={loading} onClick={props.onHide}>
            Close
          </Button>
          <Button type="submit" variant="success" disabled={loading}>
            {loading && (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-1"
              />
            )}
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default NewPaymentModal;
