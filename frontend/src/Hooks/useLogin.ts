import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AuthAction } from "../Store/AuthSlice";

export default function useLogin() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(AuthAction.login(token));
    }
  }, []);
}
