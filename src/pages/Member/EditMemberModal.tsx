import { FC, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IMemberDetails } from "interfaces/member.interface";
import { IModalProps } from "interfaces/modal-props.interface";

const EditMemberModal: FC<IMemberDetails & IModalProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: props.name ?? "",
      phone: props.phone ?? "",
      email: props.email ?? "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      phone: Yup.string().required(),
      email: Yup.string().email().required(),
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
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Full Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={!!formik.errors.name && formik.touched.name}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              placeholder="Phone Number"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={!!formik.errors.phone && formik.touched.phone}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              {formik.errors.phone}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              type="email"
              placeholder="E-mail"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={!!formik.errors.email && formik.touched.email}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              {formik.errors.email}
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

export default EditMemberModal;
