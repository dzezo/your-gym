import React, { FC, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import * as Yup from "yup";

import { IModalProps } from "interfaces/modal-props.interface";
import { IPricelist } from "interfaces/pricelist.interface";
import FormGroup from "components/FormGroup";
import FormButton from "components/FormButton";

const NewMemberModal: FC<IModalProps & { pricelist: IPricelist[] }> = (
  props
) => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      membership: "",
      start: "",
      cost: 0,
      amount: 0,
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      phone: Yup.string().required(),
      email: Yup.string().email().required(),
      membership: Yup.string().required(),
      start: Yup.date().required(),
      cost: Yup.number().required(),
      amount: Yup.number().required(),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      if (props.onConfirm) {
        const data = {
          ...values,
          membershipId: values.membership,
          submitTime: new Date(),
        };
        props.onConfirm(data, () => {
          setLoading(false);
        });
      }
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
          <FormGroup
            type="text"
            name="name"
            label="Name"
            placeholder="Full Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.errors.name && formik.touched.name}
            error={formik.errors.name}
          />
          <FormGroup
            type="text"
            name="phone"
            label="Phone"
            placeholder="Phone Number"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.errors.phone && formik.touched.phone}
            error={formik.errors.phone}
          />
          <FormGroup
            type="text"
            name="email"
            label="E-mail"
            placeholder="E-mail"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.errors.email && formik.touched.email}
            error={formik.errors.email}
          />

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

          <FormGroup
            type="date"
            name="start"
            label="Start Date"
            value={formik.values.start}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.errors.start && formik.touched.start}
            error={formik.errors.start}
          />
          <FormGroup
            type="number"
            name="cost"
            label="Membership Cost"
            placeholder="0"
            value={formik.values.cost}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.errors.cost && formik.touched.cost}
            error={formik.errors.cost}
          />
          <FormGroup
            type="number"
            name="amount"
            label="Amount Paid"
            placeholder="0"
            value={formik.values.amount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.errors.amount && formik.touched.amount}
            error={formik.errors.amount}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" disabled={loading} onClick={props.onHide}>
            Close
          </Button>
          <FormButton type="submit" label="Submit" loading={loading} />
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default NewMemberModal;
