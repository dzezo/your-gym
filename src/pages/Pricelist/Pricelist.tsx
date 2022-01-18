import { useState, useEffect } from "react";

import usePricelistActions from "hooks/usePricelistActions";
import { IPricelist } from "interfaces/pricelist.interface";
import PricelistTable from "./PricelistTable";
import PricelistTableRow from "./PricelistTableRow";

const Pricelist = () => {
  const [loading, setLoading] = useState(false);
  const [pricelist, setPricelist] = useState<IPricelist[]>([]);

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
    console.log("adding member");
  };

  const handleEdit = (id: string) => {
    console.log("handling edit");
  };

  const handleDelete = (id: string, callback: Function) => {
    console.log("handling edit");
  };

  return (
    <PricelistTable title="Pricelist" loading={loading} onAdd={handleAdd}>
      {pricelist.map((p) => (
        <PricelistTableRow
          key={p._id}
          {...p}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </PricelistTable>
  );
};

export default Pricelist;
