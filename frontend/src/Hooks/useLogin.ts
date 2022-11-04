import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AuthAction } from "../Store/AuthSlice";
import { checkLoginStatus } from "../Utilities/Api";

export default function useLogin() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const time = localStorage.getItem("expiresIn");

    if (!token || !time) return;

    const attemptLogin = async () => {
      if (parseInt(time) < new Date().getTime()) {
        dispatch(AuthAction.logout());
      }
      const me = await checkLoginStatus(token);

      if (me) {
        dispatch(AuthAction.login({ token, time }));
        const data = await me.json();
        dispatch(AuthAction.user(data));
      }
    };

    attemptLogin();
  }, []);
}
