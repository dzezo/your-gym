import { useState, useEffect, useRef } from "react";

import usePricelistActions from "hooks/usePricelistActions";
import { IPricelist } from "interfaces/pricelist.interface";
import PricelistTable from "./PricelistTable";
import PricelistTableRow from "./PricelistTableRow";
import PricelistModal, {
  PricelistModalType,
} from "pages/Pricelist/PricelistModal";

const Pricelist = () => {
  const { getPricelist, postItem, updateItem, deleteItem } =
    usePricelistActions();

  const [loading, setLoading] = useState(false);
  const [pricelist, setPricelist] = useState<IPricelist[]>([]);

  const [showModal, setShowModal] = useState(false);
  const modalType = useRef<PricelistModalType>("new");
  const selectedItem = useRef<IPricelist>();

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

  const handleSubmit = (data: any, callback: Function) => {
    if (modalType.current === "new") {
      postItem(data)
        .then((res) => {
          const item = res.data.item;
          setPricelist([item, ...pricelist]);
        })
        .finally(() => {
          callback();
          setShowModal(false);
        });
    } else {
      updateItem(selectedItem.current?._id, data)
        .then((res) => {
          const updated = res.data.item;
          setPricelist(
            pricelist.map((item) => (item._id === updated._id ? updated : item))
          );
        })
        .finally(() => {
          callback();
          setShowModal(false);
        });
    }
  };

  const handleDelete = (id: string, callback: Function) => {
    deleteItem(id)
      .then(() => {
        setPricelist(pricelist.filter((item) => item._id !== id));
      })
      .finally(() => callback());
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
        onConfirm={handleSubmit}
        type={modalType.current}
        item={selectedItem.current}
      />
    </>
  );
};

export default Pricelist;
