import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useMembersActions from "hooks/useMembersActions";
import usePricelistActions from "hooks/usePricelistActions";
import { IMember } from "interfaces/member.interface";
import { IPricelist } from "interfaces/pricelist.interface";

import MembersTable from "components/MembersTable/MembersTable";
import MembersTableRow from "components/MembersTable/MembersTableRow";
import NewMemberModal from "components/MembersTable/NewMemberModal";

const Members = () => {
  const { getMembers, searchByName, deleteMember } = useMembersActions();
  const { getPricelist } = usePricelistActions();

  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState<IMember[]>([]);
  const [pricelist, setPricelist] = useState<IPricelist[]>([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleAdd = () => {
    setShowModal(true);
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
    Promise.all([getMembers(), getPricelist()])
      .then((res: any[]) => {
        setMembers(res[0].data);
        setPricelist(res[1].data);
      })
      .finally(() => setLoading(false));
  }, [getMembers]);

  return (
    <>
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
      <NewMemberModal
        pricelist={pricelist}
        show={showModal}
        onHide={() => setShowModal(false)}
      />
    </>
  );
};

export default Members;
