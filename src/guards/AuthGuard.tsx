import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authAtom } from "recoil/authAtom";

const AuthGuard = () => {
  const loggedUser = useRecoilValue(authAtom);
  const location = useLocation();

  if (!loggedUser) {
    return <Navigate to="/" state={{ from: location }} replace />;
  } else {
    return <Outlet />;
  }
};

export default AuthGuard;
