import React from "react";
import styled from "styled-components";

interface ILink {
  label: string;
  onClick: () => void;
}

const Link: React.FC<ILink> = ({ label, onClick }) => {
  return <LinkComponent onClick={onClick}>{label}</LinkComponent>;
};

export default Link;

const LinkComponent = styled.a`
  cursor: pointer;
  text-decoration: none;
  color: var(--bs-body-color);

  &:hover {
    color: var(--bs-body-color);
    opacity: 0.7;
  }
`;
