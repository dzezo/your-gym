import styled from "styled-components";
import Button from "react-bootstrap/Button";

export const LoginWrapper = styled.div`
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

export const LoginIntro = styled.section`
  padding: 20px;
  width: 100%;

  @media (max-width: 940px) {
    text-align: center;
  }
`;

export const IntroH1 = styled.h1`
  margin: 10px 0;
  line-height: 1.25;
  font-size: 2rem;

  @media (max-width: 500px) {
    line-height: 1;
    font-size: 1.75rem;
  }
`;

export const IntroH5 = styled.h5`
  margin-top: 10px;
  margin-bottom: 30px;
  font-size: 1rem;
`;

export const LoginForm = styled.div`
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

export const LoginButton = styled(Button)`
  padding: 15px 40px;
  text-transform: uppercase;
`;
