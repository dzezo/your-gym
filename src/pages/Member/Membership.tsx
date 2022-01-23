import { FC, useState } from "react";
import styled from "styled-components";
import { FaTrash, FaTag, FaCalendar, FaExchangeAlt } from "react-icons/fa";
import { Row, Col } from "react-bootstrap";

import Box from "components/Box";
import { getDateString } from "helpers/utils";
import { IMembership } from "interfaces/member.interface";

const Membership: FC<IMembership & { showModal: () => void }> = (props) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      <MembershipWrapper>
        <MembershipHeader>
          <MembershipHeading onClick={() => setShowMore(!showMore)}>
            {props.mName} | DAYS LEFT: {props.daysLeft} | DEBT: {props.debt}
          </MembershipHeading>
          <MembershipAction onClick={props.showModal}>
            <span>Pay</span>
            <FaTag />
          </MembershipAction>
          <MembershipAction className="danger">
            <FaTrash />
          </MembershipAction>
        </MembershipHeader>
        {showMore && (
          <MembershipBody>
            <Row>
              <Col className="mb-3" md={6}>
                <Box
                  icon={<FaExchangeAlt />}
                  value="Balance"
                  title={`Cost: ${props.cost} \nDebt: ${props.debt}`}
                />
              </Col>
              <Col className="mb-3" md={6}>
                <Box
                  icon={<FaCalendar />}
                  value="Date"
                  title={`Start: ${getDateString(
                    props.start
                  )} \nEnd: ${getDateString(props.end)}`}
                />
              </Col>
            </Row>
            {props.log.map((payment) => (
              <MembershipPayment key={payment._id}>
                <PaymentData>
                  <div>Date: {getDateString(payment.date)}</div>
                  <div>Amount: {payment.amount}</div>
                </PaymentData>
                <PaymentAction>
                  <FaTrash />
                </PaymentAction>
              </MembershipPayment>
            ))}
          </MembershipBody>
        )}
      </MembershipWrapper>
    </>
  );
};

export default Membership;

const MembershipWrapper = styled.div`
  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

const MembershipHeader = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const MembershipHeading = styled.div`
  flex-grow: 1;
  background-color: #f8f5f0;
  border: 1px solid var(--bs-body-color);
  border-radius: 0.25rem;
  cursor: pointer;
  padding: 5px 15px;
  text-transform: uppercase;

  &:hover {
    background-color: var(--color-blue);
    color: var(--color-light-blue);
  }
`;

const MembershipAction = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  padding: 5px 10px;
  cursor: pointer;

  & > span {
    margin-right: 5px;
  }

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

const MembershipBody = styled.div`
  border: 1px solid var(--bs-body-color);
  border-radius: 0.25rem;
  padding: 15px;
  margin-top: 10px;

  & h4 {
    font-size: 1rem;
  }
`;

const MembershipPayment = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: 1px solid var(--bs-body-color);
  border-radius: 0.25rem;
  padding: 10px;

  &:not(:last-child) {
    margin-bottom: 5px;
  }
`;

const PaymentData = styled.div`
  font-size: 0.9rem;
`;

const PaymentAction = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: red;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;
