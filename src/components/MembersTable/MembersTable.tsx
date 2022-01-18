import { FC, useRef } from "react";
import styled from "styled-components";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { FaPlusCircle, FaSearch } from "react-icons/fa";

interface IMembersTable {
  title: string;
  loading: boolean;
  onAdd: () => void;
  onSearch: (term: string) => void;
  children: JSX.Element[];
}

const MembersTable: FC<IMembersTable> = ({
  title,
  children,
  loading,
  onAdd,
  onSearch,
}) => {
  const searchTerm = useRef<HTMLInputElement>(null);

  const handleEnter = (e: any) => {
    if (e.key === "Enter") onSearch(searchTerm.current?.value || "");
  };

  return (
    <Card>
      <Card.Header>
        {title}
        <HeaderAction onClick={onAdd}>
          <FaPlusCircle /> Add Members
        </HeaderAction>
      </Card.Header>
      <Card.Body>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Search Members..."
            ref={searchTerm}
            onKeyUp={handleEnter}
          />
          <Button
            className="d-flex align-items-center"
            variant="outline-secondary"
            onClick={() => onSearch(searchTerm.current?.value || "")}
          >
            <FaSearch />
          </Button>
        </InputGroup>
        {loading ? (
          <SpinnerWrapper>
            <Spinner animation="grow" />
          </SpinnerWrapper>
        ) : (
          <Table responsive borderless hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Debt</th>
                <th>Start Date</th>
                <th>Expires In</th>
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

export default MembersTable;

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
