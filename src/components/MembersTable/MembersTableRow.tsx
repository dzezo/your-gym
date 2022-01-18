import { FC, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { FaTrash, FaEye } from "react-icons/fa";
import styled from "styled-components";

import { getDateString } from "helpers/utils";

interface IMembersTableRow {
  id: string;
  name: string;
  debt: number;
  start: Date;
  left: number;
  onView: (id: string) => void;
  onDelete: (id: string, callback: Function) => void;
}

const MembersTableRow: FC<IMembersTableRow> = (props) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    setLoading(true);
    props.onDelete(props.id, () => {
      setLoading(false);
    });
  };

  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.debt}</td>
      <td>{getDateString(props.start)}</td>
      <td>
        {props.left > 0 ? props.left : "Expired"}{" "}
        {props.left > 1 ? "days" : props.left === 1 ? "day" : ""}
      </td>
      {loading ? (
        <TableSpinner colSpan={2}>
          <SpinnerWrapper>
            <Spinner animation="border" size="sm" />
          </SpinnerWrapper>
        </TableSpinner>
      ) : (
        <>
          <TableAction>
            <TableLink onClick={() => props.onView(props.id)}>
              <FaEye />
            </TableLink>
          </TableAction>
          <TableAction>
            <TableLink className="danger" onClick={handleDelete}>
              <FaTrash />
            </TableLink>
          </TableAction>
        </>
      )}
    </tr>
  );
};

export default MembersTableRow;

const TableSpinner = styled.td`
  text-align: center;
  width: 1%;
`;

const SpinnerWrapper = styled.div`
  width: 48px;
`;

const TableAction = styled.td`
  vertical-align: middle;
  width: 1%;
`;

const TableLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: inherit;

  &:hover {
    color: inherit;
    opacity: 0.7;
  }

  &.danger {
    color: red;
  }
  &.danger:hover {
    color: red;
    opacity: 0.7;
  }
`;
