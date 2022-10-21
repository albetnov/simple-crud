import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { StoreState } from "../Store/Auth";
import useLogin from "../Hooks/useLogin";

export default function CheckForAuth({ inverse = false }) {
  useLogin();
  const authed = useSelector((state: StoreState) => state.isLoggedIn);

  if (inverse && authed) {
    return <Navigate to="/home" />;
  } else if (!inverse && !authed) {
    return <Navigate to="/auth/login" />;
  }

  return <Outlet />;
}
