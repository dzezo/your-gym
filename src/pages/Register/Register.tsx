import { useState } from "react";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useUserActions } from "hooks/useUserActions";
import Link from "components/Link";
import FormGroup from "components/FormGroup";
import FormButton from "components/FormButton";

const Register = () => {
  const { register, error, setError } = useUserActions();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      password2: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      username: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required(),
      password2: Yup.string()
        .oneOf([Yup.ref("password"), null], "Password mismatch")
        .required("confirmation is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      await register(values).finally(() => setLoading(false));
    },
  });

  return (
    <RegisterWrapper>
      <FormWrapper>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup
            type="text"
            name="name"
            label="Name"
            placeholder="Name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.errors.name && formik.touched.name}
            error={formik.errors.name}
          />
          <FormGroup
            type="text"
            name="username"
            label="Username"
            placeholder="Username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.errors.username && formik.touched.username}
            error={formik.errors.username}
          />
          <FormGroup
            type="email"
            name="email"
            label="E-mail"
            placeholder="E-mail"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.errors.email && formik.touched.email}
            error={formik.errors.email}
          />
          <FormGroup
            type="password"
            name="password"
            label="Password"
            placeholder="Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.errors.password && formik.touched.password}
            error={formik.errors.password}
          />
          <FormGroup
            type="password"
            name="password2"
            label="Confirm Password"
            placeholder="Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.errors.password2 && formik.touched.password2}
            error={formik.errors.password2}
          />
          <FormButton type="submit" label="Register" loading={loading} />
          <div>
            <span className="me-1">Already a member?</span>
            <Link label="Sign in" onClick={() => navigate("/")} />
          </div>
        </Form>
      </FormWrapper>
      {!!error && (
        <ToastContainer className="p-3" position="bottom-end">
          <Toast onClose={() => setError("")} show={!!error} autohide>
            <Toast.Header>
              <span className="me-auto">Registration Error</span>
            </Toast.Header>
            <Toast.Body>{error}</Toast.Body>
          </Toast>
        </ToastContainer>
      )}
    </RegisterWrapper>
  );
};

export default Register;

const RegisterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  width: 100%;
  height: 100%;
  min-height: 100vh;
`;

const FormWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  & > form {
    border-radius: 0.25rem;
    box-shadow: 0 0 10px 5px #00000025;
    padding: 30px 20px;
    width: 100%;
    max-width: 500px;

    Button {
      margin-top: 20px;
      width: 100%;
    }

    & > div:last-child {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 10px;
    }
  }
`;
