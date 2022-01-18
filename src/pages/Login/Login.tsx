import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useUserActions } from "hooks/useUserActions";

import {
  LoginWrapper,
  LoginIntro,
  IntroH1,
  IntroH5,
  LoginForm,
  LoginButton,
} from "./Login.styled";

const Login = () => {
  const { login, error, setError } = useUserActions();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required(),
      password: Yup.string().required(),
    }),
    onSubmit: async (values) => {
      const { username, password } = values;
      setLoading(true);
      login(username, password).finally(() => setLoading(false));
    },
  });

  return (
    <LoginWrapper>
      <LoginIntro>
        <IntroH1>
          CREATE PRICELIST, ADD MEMBERS <br />
          AND MANAGE THEM WITH EASE
        </IntroH1>
        <IntroH5>
          With yourGYM you can track every membership and payment, <br />
          just click onmember`s name to access their profile
        </IntroH5>
        <LoginButton onClick={() => navigate("/register")}>
          Get Started
        </LoginButton>
      </LoginIntro>
      <LoginForm>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={!!formik.errors.username && formik.touched.username}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              {formik.errors.username}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={!!formik.errors.password && formik.touched.password}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              {formik.errors.password}
            </Form.Control.Feedback>
          </Form.Group>
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
            Login
          </Button>
        </Form>
      </LoginForm>
      {!!error && (
        <ToastContainer className="p-3" position="bottom-end">
          <Toast onClose={() => setError("")} show={!!error} autohide>
            <Toast.Header>
              <span className="me-auto">Login Error</span>
            </Toast.Header>
            <Toast.Body>{error}</Toast.Body>
          </Toast>
        </ToastContainer>
      )}
    </LoginWrapper>
  );
};

export default Login;
