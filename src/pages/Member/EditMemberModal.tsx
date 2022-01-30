import { FC, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IMemberDetails } from "interfaces/member.interface";
import { IModalProps } from "interfaces/modal-props.interface";
import FormGroup from "components/FormGroup";
import FormButton from "components/FormButton";

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
            type="email"
            name="email"
            label="E-mail"
            placeholder="E-mail"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.errors.email && formik.touched.email}
            error={formik.errors.email}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" disabled={loading} onClick={props.onHide}>
            Close
          </Button>
          <FormButton type="submit" label="Login" loading={loading} />
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditMemberModal;
