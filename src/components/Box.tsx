import React from "react";
import styled from "styled-components";

interface IBox {
  icon: JSX.Element;
  value: number | string;
  title: number | string;
}

const Box: React.FC<IBox> = (props) => {
  return (
    <BoxComponent>
      <h3>
        {props.icon}
        {props.value}
      </h3>
      <h4>{props.title}</h4>
    </BoxComponent>
  );
};

export default Box;

const BoxComponent = styled.div`
  height: 100%;
  min-height: 20px;
  padding: 20px;
  background-color: #f8f5f0;
  border: none;
  border-radius: 0.25rem;

  & h3 {
    display: flex;
    align-items: center;

    svg {
      margin-right: 5px;
    }
  }

  & h4 {
    margin-top: 10px;
    white-space: pre-wrap;
  }
`;
