import { useCallback } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { authAtom } from "recoil/authAtom";
import useErrorHandler from "./useErrorHandler";

export function useMembersActions() {
  const baseUrl = `${process.env.REACT_APP_API_URL}/members`;
  const user = useRecoilValue(authAtom);
  const [error, setError] = useErrorHandler();

  const getDashboard = useCallback(async () => {
    return axios.all([
      axios.get(`${baseUrl}/active/${user?.id}`),
      axios.get(`${baseUrl}/${user?.id}/statistics`),
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
    async (data: any) => {
      return axios.post(`${baseUrl}/${user?.id}`, data);
    },
    [baseUrl, user]
  );

  const getMember = useCallback(
    async (memberId: string) => {
      return axios.get(`${baseUrl}/member/${memberId}`);
    },
    [baseUrl]
  );

  // updateMember(memberId, update){
  //   var headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   return this.http.put('members/member/' + memberId, JSON.stringify(update), {headers: headers})
  //     .map(res => res.json());
  // }

  // addNewMembership(memberId, membership){
  //   var headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   return this.http.post('members/member/' + memberId, JSON.stringify(membership), {headers: headers})
  //     .map(res => res.json());
  // }

  // removeMembership(memberId, membershipId){
  //   return this.http.delete('members/member/' + memberId + '/membership/' + membershipId)
  //     .map(res => res.json());
  // }

  // addPayment(memberId, membershipId, payment){
  //   var headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   return this.http.post('members/member/' + memberId + '/membership/' + membershipId, JSON.stringify(payment), {headers: headers})
  //     .map(res => res.json());
  // }

  // removePayment(memberId, membershipId, paymentId){
  //   return this.http.delete('members/member/' + memberId + '/membership/' + membershipId + '/payment/' + paymentId)
  //     .map(res => res.json());
  // }

  return {
    getDashboard,
    getMembers,
    getActiveMembers,
    searchByName,
    deleteMember,
    getMember,
    addNewMember,
    error,
    setError,
  };
}

export default useMembersActions;
