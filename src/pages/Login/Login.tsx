import { useState } from "react";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useUserActions } from "hooks/useUserActions";
import FormGroup from "components/FormGroup";
import FormButton from "components/FormButton";

const Login = () => {
  const { login, error, setError } = useUserActions();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "Dzzo",
      password: "lozinka123",
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
        <StartButton onClick={() => navigate("/register")}>
          Get Started
        </StartButton>
      </LoginIntro>
      <LoginForm>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup
            type="text"
            name="username"
            label="Username"
            placeholder="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.errors.username && formik.touched.username}
            error={formik.errors.username}
          />
          <FormGroup
            type="password"
            name="password"
            label="Password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.errors.password && formik.touched.password}
            error={formik.errors.password}
          />
          <FormButton type="submit" label="Login" loading={loading} />
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

const LoginWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  width: 100%;
  height: 100%;
  min-height: 100vh;

  @media (max-width: 940px) {
    flex-direction: column;
  }
`;

const LoginIntro = styled.section`
  padding: 20px;
  width: 100%;

  @media (max-width: 940px) {
    text-align: center;
  }
`;

const IntroH1 = styled.h1`
  margin: 10px 0;
  line-height: 1.25;
  font-size: 2rem;

  @media (max-width: 500px) {
    line-height: 1;
    font-size: 1.75rem;
  }
`;

const IntroH5 = styled.h5`
  margin-top: 10px;
  margin-bottom: 30px;
  font-size: 1rem;
`;

const LoginForm = styled.div`
  padding: 20px;
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
      margin-top: 10px;
      width: 100%;
    }
  }
`;

const StartButton = styled(Button)`
  padding: 15px 40px;
  text-transform: uppercase;
`;
