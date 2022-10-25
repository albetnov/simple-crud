import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AuthAction } from "../Store/AuthSlice";
import { checkLoginStatus } from "../Utilities/Api";

export default function useLogin() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    const attemptLogin = async () => {
      const me = await checkLoginStatus(token);

      if (me) {
        dispatch(AuthAction.login(token));
        const data = await me.json();
        dispatch(AuthAction.user(data));
      }
    };

    attemptLogin();
  }, []);
}
