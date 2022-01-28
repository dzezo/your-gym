import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";
import { FaUser, FaTimesCircle, FaMinus, FaCheckCircle } from "react-icons/fa";

import useMembersActions from "hooks/useMembersActions";
import usePricelistActions from "hooks/usePricelistActions";
import { IMember } from "interfaces/member.interface";
import { IPricelist } from "interfaces/pricelist.interface";

import Box from "components/Box";
import MembersTable from "components/MembersTable/MembersTable";
import MembersTableRow from "components/MembersTable/MembersTableRow";
import NewMemberModal from "components/MembersTable/NewMemberModal";

interface DashboardStats {
  activeMembers: number;
  indeptedMembers: number;
  members: number;
  unpaidAmount: number;
}
const defaultDashboardStats: DashboardStats = {
  activeMembers: 0,
  indeptedMembers: 0,
  members: 0,
  unpaidAmount: 0,
};

const Dashboard = () => {
  const {
    getDashboard,
    searchByName,
    deleteMember,
    addNewMember,
    abortController,
  } = useMembersActions();
  const { getPricelist } = usePricelistActions();

  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState<IMember[]>([]);
  const [pricelist, setPricelist] = useState<IPricelist[]>([]);
  const [stats, setStats] = useState(defaultDashboardStats);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    Promise.all([getDashboard(), getPricelist()])
      .then((res: any[]) => {
        const [activeMembers, stats] = res[0];
        setMembers(activeMembers.data);
        setStats(stats.data);

        const pricelist = res[1];
        setPricelist(pricelist.data);
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));

    return () => {
      abortController.abort();
    };
  }, [getDashboard]);

  const handleAdd = (data: any, callback: Function) => {
    addNewMember(data, true)
      .then((res: any) => {
        const [{ data }, stats] = res;
        const newMember = data.member;

        setMembers([newMember, ...members]);
        setStats(stats.data);
      })
      .finally(() => {
        callback();
        setShowModal(false);
      });
  };

  const handleSearch = async (searchTerm: string) => {
    setLoading(true);
    searchByName(searchTerm, true)
      .then((res: any) => setMembers(res.data))
      .finally(() => setLoading(false));
  };

  const handleView = (id: string) => {
    navigate(`/member/${id}`);
  };

  const handleDelete = (memberId: string, callback: Function) => {
    deleteMember(memberId, true)
      .then((res: any) => {
        const [deleted, stats] = res;
        if (deleted.data.success) {
          setMembers(members.filter((m) => m.id !== memberId));
        }
        setStats(stats.data);
      })
      .catch(() => callback());
  };

  return (
    <>
      <Card className="mb-4">
        <Card.Header>Overview</Card.Header>
        <Card.Body>
          <Container>
            <Row>
              <Col className="mb-1" md={6} xl={3}>
                <Box
                  icon={<FaUser />}
                  value={stats.members}
                  title="All Members"
                />
              </Col>
              <Col className="mb-1" md={6} xl={3}>
                <Box
                  icon={<FaCheckCircle />}
                  value={stats.activeMembers}
                  title="Active Members"
                />
              </Col>
              <Col className="mb-1" md={6} xl={3}>
                <Box
                  icon={<FaTimesCircle />}
                  value={stats.indeptedMembers}
                  title="Unpaid Memberships"
                />
              </Col>
              <Col className="mb-1" md={6} xl={3}>
                <Box
                  icon={<FaMinus />}
                  value={stats.unpaidAmount}
                  title="Unpaid Amount"
                />
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
      <MembersTable
        title="Active Members"
        loading={loading}
        onAdd={() => setShowModal(true)}
        onSearch={handleSearch}
      >
        {members.map(
          (m): JSX.Element => (
            <MembersTableRow
              key={m.id}
              {...m}
              onView={handleView}
              onDelete={handleDelete}
            />
          )
        )}
      </MembersTable>
      <NewMemberModal
        pricelist={pricelist}
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={handleAdd}
      />
    </>
  );
};

export default Dashboard;
