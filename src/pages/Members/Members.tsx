import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMembersActions } from "hooks/useMembersActions";
import { IMember } from "interfaces/member.interface";

import MembersTable from "components/MembersTable/MembersTable";
import MembersTableRow from "components/MembersTable/MembersTableRow";

const Members = () => {
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState<IMember[]>([]);
  const navigate = useNavigate();

  const { getMembers, searchByName, deleteMember } = useMembersActions();

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
      })
      .catch(() => callback());
  };

  useEffect(() => {
    setLoading(true);
    getMembers()
      .then((res: any) => {
        setMembers(res.data);
        setLoading(false);
      })
      .finally(() => setLoading(false));
  }, [getMembers]);

  return (
    <MembersTable
      title="Members"
      loading={loading}
      onAdd={handleAdd}
      onSearch={handleSearch}
    >
      {members.map((m) => (
        <MembersTableRow
          key={m.id}
          {...m}
          onView={handleView}
          onDelete={handleDelete}
        />
      ))}
    </MembersTable>
  );
};

export default Members;
