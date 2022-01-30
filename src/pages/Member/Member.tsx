import { useState, useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Card, Container, Row, Col, Spinner } from "react-bootstrap";
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
import usePricelistActions from "hooks/usePricelistActions";
import { defaultMember, IMemberDetails } from "interfaces/member.interface";
import Membership from "./Membership";
import EditMemberModal from "./EditMemberModal";
import NewPaymentModal from "./NewPaymentModal";
import NewMembershipModal from "./NewMembershipModal";
import { IPricelist } from "interfaces/pricelist.interface";

interface IModalState {
  showEditMember: boolean;
  showNewMembership: boolean;
  showNewPayment: boolean;
  payload?: any;
}

const defaultModalState = {
  showEditMember: false,
  showNewMembership: false,
  showNewPayment: false,
};

type ActionType =
  | "TOGGLE_EDIT_MEMBER"
  | "TOGGLE_NEW_PAYMENT"
  | "TOGGLE_NEW_MEMBERSHIP";

const modalHandler = (
  modalState: IModalState,
  action: { type: ActionType; payload?: any }
) => {
  switch (action.type) {
    case "TOGGLE_EDIT_MEMBER":
      return {
        ...modalState,
        showEditMember: !modalState.showEditMember,
      };
    case "TOGGLE_NEW_PAYMENT":
      return {
        ...modalState,
        showNewPayment: !modalState.showNewPayment,
        payload: action.payload,
      };
    case "TOGGLE_NEW_MEMBERSHIP":
      return {
        ...modalState,
        showNewMembership: !modalState.showNewMembership,
      };
    default:
      return modalState;
  }
};

const Member = () => {
  const {
    getMember,
    updateMember,
    addPayment,
    addNewMembership,
    removeMembership,
    removePayment,
  } = useMembersActions();
  const { getPricelist } = usePricelistActions();
  const [member, setMember] = useState<IMemberDetails>(defaultMember);
  const [pricelist, setPricelist] = useState<IPricelist[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalState, setModalState] = useReducer(
    modalHandler,
    defaultModalState
  );
  const params = useParams();

  useEffect(() => {
    const memberId = params.id;

    setLoading(true);
    if (memberId) {
      Promise.all([getMember(memberId), getPricelist()])
        .then((res: any[]) => {
          setMember(res[0].data);
          setPricelist(res[1].data);
        })
        .finally(() => setLoading(false));
    }
  }, []);

  const handleMemberEdit = (update: any, callback: Function) => {
    updateMember(member._id, update)
      .then((res: any) => {
        const { data } = res;
        setMember(data.member);
      })
      .finally(() => {
        callback();
        setModalState({ type: "TOGGLE_EDIT_MEMBER" });
      });
  };

  const handleNewMembership = (membership: any, callback: Function) => {
    addNewMembership(member._id, membership)
      .then((res: any) => {
        const { data } = res;
        setMember(data.member);
      })
      .finally(() => {
        callback();
        setModalState({ type: "TOGGLE_NEW_MEMBERSHIP" });
      });
  };

  const handleNewPayment = (payment: any, callback: Function) => {
    addPayment(member._id, modalState.payload, payment)
      .then((res: any) => {
        const { data } = res;
        setMember(data.member);
      })
      .finally(() => {
        callback();
        setModalState({ type: "TOGGLE_NEW_PAYMENT" });
      });
  };

  const handleMembershipDelete = (membershipId: string, callback: Function) => {
    removeMembership(member._id, membershipId)
      .then((res: any) => {
        const { data } = res;
        setMember(data.member);
      })
      .catch(() => callback());
  };

  const handlePaymentDelete = (
    membershipId: string,
    paymentId: string,
    callback: Function
  ) => {
    removePayment(member._id, membershipId, paymentId)
      .then((res: any) => {
        const { data } = res;
        setMember(data.member);
      })
      .catch(() => callback());
  };

  return (
    <>
      <Card className="mb-4">
        <Card.Header>
          Member Info
          <HeaderAction
            onClick={() => setModalState({ type: "TOGGLE_EDIT_MEMBER" })}
          >
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
          <HeaderAction
            onClick={() => setModalState({ type: "TOGGLE_NEW_MEMBERSHIP" })}
          >
            <FaPlusCircle /> New Membership
          </HeaderAction>
        </Card.Header>
        <Card.Body>
          {loading ? (
            <SpinnerWrapper>
              <Spinner animation="grow" />
            </SpinnerWrapper>
          ) : member.memberships.length > 0 ? (
            member.memberships.map((membership) => (
              <Membership
                key={membership._id}
                {...membership}
                showModal={() =>
                  setModalState({
                    type: "TOGGLE_NEW_PAYMENT",
                    payload: membership._id,
                  })
                }
                onDeleteMembership={handleMembershipDelete}
                onDeletePayment={handlePaymentDelete}
              />
            ))
          ) : (
            <NoMemberships>
              <h4>User has no memberships</h4>
            </NoMemberships>
          )}
        </Card.Body>
      </Card>
      <EditMemberModal
        {...member}
        show={modalState.showEditMember}
        onHide={() => setModalState({ type: "TOGGLE_EDIT_MEMBER" })}
        onConfirm={handleMemberEdit}
      />
      <NewMembershipModal
        pricelist={pricelist}
        show={modalState.showNewMembership}
        onHide={() => setModalState({ type: "TOGGLE_NEW_MEMBERSHIP" })}
        onConfirm={handleNewMembership}
      />
      <NewPaymentModal
        show={modalState.showNewPayment}
        onHide={() => setModalState({ type: "TOGGLE_NEW_PAYMENT" })}
        onConfirm={handleNewPayment}
      />
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

const SpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px 0;
`;

const NoMemberships = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;
