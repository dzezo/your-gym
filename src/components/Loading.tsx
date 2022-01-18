import styled from "styled-components";
import Spinner from "react-bootstrap/Spinner";

const Loading = () => {
  return (
    <SpinnerWrapper>
      <Spinner animation="grow" />
    </SpinnerWrapper>
  );
};

export default Loading;

const SpinnerWrapper = styled.div`
  height: 100%;
  min-height: 100vh;
  width: 100%;
  min-width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;
