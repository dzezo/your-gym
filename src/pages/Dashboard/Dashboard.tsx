import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";
import { FaUser, FaTimesCircle, FaMinus, FaCheckCircle } from "react-icons/fa";
import { IMember } from "interfaces/member.interface";
import { useMembersActions } from "hooks/useMembersActions";

import Box from "components/Box";
import MembersTable from "components/MembersTable/MembersTable";
import MembersTableRow from "components/MembersTable/MembersTableRow";

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
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState<IMember[]>([]);
  const [stats, setStats] = useState(defaultDashboardStats);
  const navigate = useNavigate();

  const { getDashboard, searchByName, deleteMember } = useMembersActions();

  useEffect(() => {
    setLoading(true);
    getDashboard()
      .then((res: any) => {
        const [activeMembers, stats] = res;
        setMembers(activeMembers.data);
        setStats(stats.data);
        setLoading(false);
      })
      .finally(() => setLoading(false));
  }, [getDashboard]);

  const handleAdd = () => {
    console.log("adding member");
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
        onAdd={handleAdd}
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
    </>
  );
};

export default Dashboard;
