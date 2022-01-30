import { FC, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import * as Yup from "yup";

import { IModalProps } from "interfaces/modal-props.interface";
import FormGroup from "components/FormGroup";
import FormButton from "components/FormButton";

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
      if (props.onConfirm) {
        props.onConfirm(values, () => {
          setLoading(false);
        });
      }
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
          <FormGroup
            type="date"
            name="date"
            label="Payment Date"
            value={formik.values.date}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.errors.date && formik.touched.date}
            error={formik.errors.date}
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

export default NewPaymentModal;
