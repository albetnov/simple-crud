import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthAction } from "../../Store/AuthSlice";

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(AuthAction.logout());
    navigate("/");
  }, []);

  return <p>Logging you out.</p>;
}
