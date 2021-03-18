import React, { useEffect } from "react";
import { auth } from "../_redux/actor_actions";
import { useDispatch, useSelector } from "react-redux";

export default function (Compo, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    let actor = useSelector((state) => state.actor);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth()).then((res) => {
        //로그인 안했다
        if (!res.payload.isAuth) {
          //로그인만 가능한 페이지면
          if (option) {
            props.history.push("/login");
          }
        } else {
          //로그인 했다
          //관리자 권한이 없다
          if (adminRoute && !res.payload.isAdmin) {
            props.history.push("/");
          } else {
            // 관리자 권한이 있고
            if (option === false) {
              props.history.push("/");
            }
          }
        }
      });
    }, []);

    return <Compo {...props} actor={actor} />;
  }
  return AuthenticationCheck;
}
