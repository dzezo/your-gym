import { useCallback } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { authAtom } from "recoil/authAtom";
import useErrorHandler from "./useErrorHandler";

export function usePricelistActions() {
  const baseUrl = `${process.env.REACT_APP_API_URL}/pricelists`;
  const user = useRecoilValue(authAtom);
  const [error, setError] = useErrorHandler();

  const getPricelist = useCallback(async () => {
    return axios.get(`${baseUrl}/${user?.id}`);
  }, [baseUrl, user]);

  return {
    getPricelist,
    error,
    setError,
  };
}

export default usePricelistActions;
