import { FC, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { useFormik } from "formik";
import * as Yup from "yup";

import { IPricelist } from "interfaces/pricelist.interface";
import { IModalProps } from "interfaces/modal-props.interface";

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
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Membership Name"
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
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Length</Form.Label>
            <Form.Control
              type="number"
              placeholder="Length In Days"
              name="length"
              value={formik.values.length}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={!!formik.errors.length && formik.touched.length}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              {formik.errors.length}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="cost">
            <Form.Label>Cost</Form.Label>
            <Form.Control
              type="number"
              placeholder="Cost"
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
            {props.type === "new" ? "Submit Item" : "Submit Changes"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default PricelistModal;
