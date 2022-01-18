import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { authAtom } from "recoil/authAtom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useErrorHandler from "./useErrorHandler";

export function useUserActions() {
  const baseUrl = `${process.env.REACT_APP_API_URL}/users`;
  const [auth, setAuth] = useRecoilState(authAtom);
  const [error, setError] = useErrorHandler();
  const navigate = useNavigate();

  const login = useCallback(
    async (username: string, password: string) => {
      return axios
        .post(`${baseUrl}/authenticate`, { username, password })
        .then((res) => {
          const { user } = res.data;

          localStorage.setItem("user", JSON.stringify(user));
          setAuth(user);

          navigate("/dashboard", { replace: true });
        });
    },
    [baseUrl]
  );

  const register = useCallback(
    async (data: any) => {
      return axios.post(`${baseUrl}/register`, data).then(() => {
        navigate("/", { replace: true });
      });
    },
    [baseUrl]
  );

  const logout = () => {
    localStorage.removeItem("user");
    setAuth(null);
    navigate("/");
  };

  return {
    login,
    logout,
    register,
    error,
    setError,
  };
}

export default useUserActions;
