import { FC, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { FaTrash, FaPen } from "react-icons/fa";
import styled from "styled-components";

interface IMembersTableRow {
  _id: string;
  name: string;
  length: number;
  cost: number;
  onEdit: (id: string) => void;
  onDelete: (id: string, callback: Function) => void;
}

const PricelistTableRow: FC<IMembersTableRow> = (props) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    setLoading(true);
    props.onDelete(props._id, () => {
      setLoading(false);
    });
  };

  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.length}</td>
      <td>{props.cost}</td>
      {loading ? (
        <TableSpinner colSpan={2}>
          <SpinnerWrapper>
            <Spinner animation="border" size="sm" />
          </SpinnerWrapper>
        </TableSpinner>
      ) : (
        <>
          <TableAction>
            <TableLink onClick={() => props.onEdit(props._id)}>
              <FaPen />
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

export default PricelistTableRow;

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
