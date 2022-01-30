import { useCallback } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { authAtom } from "recoil/authAtom";
import useErrorHandler from "./useErrorHandler";

export function useMembersActions() {
  const baseUrl = `${process.env.REACT_APP_API_URL}/members`;
  const user = useRecoilValue(authAtom);
  const [error, setError] = useErrorHandler();
  const abortController = new AbortController();

  const getDashboard = useCallback(async () => {
    return axios.all([
      axios.get(`${baseUrl}/active/${user?.id}`, {
        signal: abortController.signal,
      }),
      axios.get(`${baseUrl}/${user?.id}/statistics`, {
        signal: abortController.signal,
      }),
    ]);
  }, [baseUrl, user]);

  const getMembers = useCallback(async () => {
    return axios.get(`${baseUrl}/${user?.id}`);
  }, [baseUrl, user]);

  const getActiveMembers = useCallback(async () => {
    return axios.get(`${baseUrl}/active/${user?.id}`);
  }, [baseUrl, user]);

  const searchByName = useCallback(
    async (name: string, fromActive?: boolean) => {
      if (!!name) {
        return axios.get(`${baseUrl}/${user?.id}/search/${name}`);
      } else if (fromActive) {
        return getActiveMembers();
      } else {
        return getMembers();
      }
    },
    [baseUrl, user, getActiveMembers, getMembers]
  );

  const deleteMember = useCallback(
    async (memberId: string, withStats?: boolean) => {
      if (withStats) {
        const deleted = await axios.delete(`${baseUrl}/member/${memberId}`);
        const stats = await axios.get(`${baseUrl}/${user?.id}/statistics`);
        return [deleted, stats];
      } else {
        return axios.delete(`${baseUrl}/member/${memberId}`);
      }
    },
    [baseUrl, user]
  );

  const addNewMember = useCallback(
    async (data: any, withStats?: boolean) => {
      if (withStats) {
        const newMember = await axios.post(`${baseUrl}/${user?.id}`, data);
        const stats = await axios.get(`${baseUrl}/${user?.id}/statistics`);
        return [newMember, stats];
      } else {
        return axios.post(`${baseUrl}/${user?.id}`, data);
      }
    },
    [baseUrl, user]
  );

  const getMember = useCallback(
    async (memberId: string) => {
      return axios.get(`${baseUrl}/member/${memberId}`);
    },
    [baseUrl]
  );

  const updateMember = useCallback(
    async (memberId: string, update: any) => {
      return axios.put(`${baseUrl}/member/${memberId}`, update);
    },
    [baseUrl]
  );

  const addNewMembership = useCallback(
    async (memberId: string, membership: any) => {
      return axios.post(`${baseUrl}/member/${memberId}`, membership);
    },
    [baseUrl]
  );

  const removeMembership = useCallback(
    async (memberId: string, membershipId: string) => {
      return axios.delete(
        `${baseUrl}/member/${memberId}/membership/${membershipId}`
      );
    },
    [baseUrl]
  );

  const addPayment = useCallback(
    async (memberId: string, membershipId: string, payment: any) => {
      return axios.post(
        `${baseUrl}/member/${memberId}/membership/${membershipId}`,
        payment
      );
    },
    [baseUrl]
  );

  const removePayment = useCallback(
    async (memberId: string, membershipId: string, paymentId: string) => {
      return axios.delete(
        `${baseUrl}/member/${memberId}/membership/${membershipId}/payment/${paymentId}`
      );
    },
    [baseUrl]
  );

  return {
    getDashboard,
    getMembers,
    getActiveMembers,
    searchByName,
    deleteMember,
    getMember,
    addNewMember,
    updateMember,
    addPayment,
    removePayment,
    addNewMembership,
    removeMembership,
    abortController,
    error,
    setError,
  };
}

export default useMembersActions;
