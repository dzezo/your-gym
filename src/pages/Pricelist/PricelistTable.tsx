import { FC } from "react";
import styled from "styled-components";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import { FaPlusCircle, FaSearch } from "react-icons/fa";

interface IPricelistTable {
  title: string;
  loading: boolean;
  onAdd: () => void;
  children: JSX.Element[];
}

const PricelistTable: FC<IPricelistTable> = ({
  title,
  loading,
  onAdd,
  children,
}) => {
  return (
    <Card>
      <Card.Header>
        {title}
        <HeaderAction onClick={onAdd}>
          <FaPlusCircle /> Add Item
        </HeaderAction>
      </Card.Header>
      <Card.Body>
        {loading ? (
          <SpinnerWrapper>
            <Spinner animation="grow" />
          </SpinnerWrapper>
        ) : (
          <Table responsive borderless hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Length</th>
                <th>Price</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {children.length > 0 ? (
                children
              ) : (
                <tr>
                  <td className="text-center" colSpan={6}>
                    No {title}
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>
  );
};

export default PricelistTable;

const SpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px 0;
`;

const HeaderAction = styled.a`
  cursor: pointer;
  float: right;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;

  svg {
    margin-right: 5px;
  }

  &:hover {
    color: inherit;
    opacity: 0.7;
  }
`;
