import styled from "styled-components";

export const RegisterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  width: 100%;
  height: 100%;
  min-height: 100vh;
`;

export const FormWrapper = styled.div`
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
