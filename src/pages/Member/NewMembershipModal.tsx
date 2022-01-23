import React, { FC, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IModalProps } from "interfaces/modal-props.interface";
import { IPricelist } from "interfaces/pricelist.interface";

const NewMembershipModal: FC<IModalProps & { pricelist: IPricelist[] }> = (
  props
) => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      membership: "",
      start: "",
      cost: 0,
      amount: 0,
    },
    validationSchema: Yup.object({
      membership: Yup.string().required(),
      start: Yup.date().required(),
      cost: Yup.number().required(),
      amount: Yup.number().required(),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      console.log(values);
    },
    enableReinitialize: true,
  });

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const membershipId = e.target.value;
    const membership = props.pricelist.find(
      (membership) => membership._id === membershipId
    );

    formik.setFieldValue("membership", membership?._id);
    formik.setFieldValue("cost", membership?.cost);
  };

  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Member Info</Modal.Title>
      </Modal.Header>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="membership">
            <Form.Label>Membership Type</Form.Label>
            <Form.Select
              name="membership"
              value={formik.values.membership}
              onChange={handleSelectChange}
              onBlur={formik.handleBlur}
              isInvalid={
                !!formik.errors.membership && formik.touched.membership
              }
            >
              <option>Select Membership</option>
              {props.pricelist.map((membership) => (
                <option key={membership._id} value={membership._id}>
                  {membership.name}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {formik.errors.membership}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="date">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              name="start"
              value={formik.values.start}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={!!formik.errors.start && formik.touched.start}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              {formik.errors.start}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="cost">
            <Form.Label>Membership Cost</Form.Label>
            <Form.Control
              type="number"
              placeholder="0"
              name="cost"
              value={formik.values.cost}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={!!formik.errors.cost && formik.touched.cost}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              {formik.errors.cost}
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

export default NewMembershipModal;
