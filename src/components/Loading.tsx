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
  min-height: calc(100vh - 120px); // header 80px + padding: 20px
  display: flex;
  align-items: center;
  justify-content: center;
`;
