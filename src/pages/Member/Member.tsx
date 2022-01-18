import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Card, Container, Row, Col } from "react-bootstrap";
import {
  FaInfoCircle,
  FaPhone,
  FaCreditCard,
  FaEnvelope,
  FaEdit,
  FaPlusCircle,
} from "react-icons/fa";

import Box from "components/Box";
import useMembersActions from "hooks/useMembersActions";
import { defaultMember, IMemberDetails } from "interfaces/member.interface";
import Membership from "./Membership";

const Member = () => {
  const [member, setMember] = useState<IMemberDetails>(defaultMember);
  const [loading, setLoading] = useState(false);
  const { getMember } = useMembersActions();
  const params = useParams();

  useEffect(() => {
    const memberId = params.id;

    if (memberId) {
      getMember(memberId).then((res: any) => {
        setMember(res.data);
      });
    }
  }, []);

  const handleEdit = () => {};

  const handleNewMembership = () => {};

  return (
    <>
      <Card className="mb-4">
        <Card.Header>
          Member Info
          <HeaderAction onClick={handleEdit}>
            <FaEdit /> Edit
          </HeaderAction>
        </Card.Header>
        <Card.Body>
          <Container>
            <Row>
              <Col className="mb-1" md={6} xl={3}>
                <Box
                  icon={<FaInfoCircle />}
                  value="Name"
                  title={member?.name}
                />
              </Col>
              <Col className="mb-1" md={6} xl={3}>
                <Box icon={<FaPhone />} value="Phone" title={member?.phone} />
              </Col>
              <Col className="mb-1" md={6} xl={3}>
                <Box
                  icon={<FaEnvelope />}
                  value="E-mail"
                  title={member?.email}
                />
              </Col>
              <Col className="mb-1" md={6} xl={3}>
                <Box
                  icon={<FaCreditCard />}
                  value="Debt"
                  title={member?.totalDebt}
                />
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>
          Memberships
          <HeaderAction onClick={handleNewMembership}>
            <FaPlusCircle /> New Membership
          </HeaderAction>
        </Card.Header>
        <Card.Body>
          {member.memberships.map((membership) => (
            <Membership key={membership._id} {...membership} />
          ))}
        </Card.Body>
      </Card>
    </>
  );
};

export default Member;

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
