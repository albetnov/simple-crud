import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { StoreState } from "../Store/Auth";
import useLogin from "../Hooks/useLogin";

export default function CheckForAuth({ inverse = false }) {
  useLogin();
  const authed = useSelector((state: StoreState) => state.isLoggedIn);

  if (inverse && authed) {
    return <Navigate to="/" />;
  } else if (!inverse && !authed) {
    return <Navigate to="/auth/login" />;
  }

  return <Outlet />;
}
