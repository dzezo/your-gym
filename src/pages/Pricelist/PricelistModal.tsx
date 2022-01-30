import { FC, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import * as Yup from "yup";

import { IPricelist } from "interfaces/pricelist.interface";
import { IModalProps } from "interfaces/modal-props.interface";
import FormGroup from "components/FormGroup";
import FormButton from "components/FormButton";

export type PricelistModalType = "new" | "edit";

export interface IPricelistModalProps extends IModalProps {
  type: PricelistModalType;
  item?: IPricelist;
}

const PricelistModal: FC<IPricelistModalProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: props.item?.name ?? "",
      length: props.item?.length ?? 0,
      cost: props.item?.cost ?? 0,
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      length: Yup.number().required(),
      cost: Yup.number().required(),
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
        <Modal.Title>
          {props.type === "new" ? "New Item" : "Edit Item"}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <FormGroup
            type="text"
            name="name"
            label="Name"
            placeholder="Membership Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.errors.name && formik.touched.name}
            error={formik.errors.name}
          />
          <FormGroup
            type="number"
            name="length"
            label="Length"
            placeholder="Length In Days"
            value={formik.values.length}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.errors.length && formik.touched.length}
            error={formik.errors.length}
          />
          <FormGroup
            type="number"
            name="cost"
            label="Cost"
            placeholder="0"
            value={formik.values.cost}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.errors.cost && formik.touched.cost}
            error={formik.errors.cost}
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

export default PricelistModal;
