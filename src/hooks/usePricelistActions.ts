import { useCallback } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { authAtom } from "recoil/authAtom";
import useErrorHandler from "./useErrorHandler";

interface IPricelistItem {
  name: string;
  length: number;
  cost: number;
}

export function usePricelistActions() {
  const baseUrl = `${process.env.REACT_APP_API_URL}/pricelists`;
  const user = useRecoilValue(authAtom);
  const [error, setError] = useErrorHandler();

  const getPricelist = useCallback(async () => {
    return axios.get(`${baseUrl}/${user?.id}`);
  }, [baseUrl, user]);

  const postItem = useCallback(
    async (item: IPricelistItem) => {
      return axios.post(`${baseUrl}/${user?.id}`, item);
    },
    [baseUrl, user]
  );

  const updateItem = useCallback(
    async (id: string = "", item: IPricelistItem) => {
      return axios.put(`${baseUrl}/item/${id}`, item);
    },
    [baseUrl, user]
  );

  const deleteItem = useCallback(
    async (id: string) => {
      return axios.delete(`${baseUrl}/item/${id}`);
    },
    [baseUrl, user]
  );

  return {
    getPricelist,
    postItem,
    updateItem,
    deleteItem,
    error,
    setError,
  };
}

export default usePricelistActions;
