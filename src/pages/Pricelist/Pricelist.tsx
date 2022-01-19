import { useState, useEffect, useRef } from "react";

import usePricelistActions from "hooks/usePricelistActions";
import { IPricelist } from "interfaces/pricelist.interface";
import PricelistTable from "./PricelistTable";
import PricelistTableRow from "./PricelistTableRow";
import PricelistModal, {
  PricelistModalType,
} from "components/modals/PricelistModal";

const Pricelist = () => {
  const [loading, setLoading] = useState(false);
  const [pricelist, setPricelist] = useState<IPricelist[]>([]);

  const [showModal, setShowModal] = useState(false);
  const modalType = useRef<PricelistModalType>("new");
  const selectedItem = useRef<IPricelist>();

  const { getPricelist } = usePricelistActions();

  useEffect(() => {
    setLoading(true);
    getPricelist()
      .then((res: any) => {
        setPricelist(res.data);
        setLoading(false);
      })
      .finally(() => setLoading(false));
  }, [getPricelist]);

  const handleAdd = () => {
    modalType.current = "new";
    selectedItem.current = undefined;
    setShowModal(true);
  };

  const handleEdit = (item: IPricelist) => {
    modalType.current = "edit";
    selectedItem.current = item;
    setShowModal(true);
  };

  const handleDelete = (id: string, callback: Function) => {
    console.log("handling edit");
  };

  return (
    <>
      <PricelistTable title="Pricelist" loading={loading} onAdd={handleAdd}>
        {pricelist.map((pricelistItem) => (
          <PricelistTableRow
            key={pricelistItem._id}
            {...pricelistItem}
            onEdit={() => handleEdit(pricelistItem)}
            onDelete={handleDelete}
          />
        ))}
      </PricelistTable>
      <PricelistModal
        show={showModal}
        onHide={() => setShowModal(false)}
        type={modalType.current}
        item={selectedItem.current}
      />
    </>
  );
};

export default Pricelist;
