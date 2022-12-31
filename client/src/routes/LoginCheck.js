import React, { useContext, useLayoutEffect, useState } from "react";
import Axios from "../axios/axios";
import { ContextUser } from "../store/MainContext";
import jwt from "jwt-decode";
import TokenCheck2 from "./TockenCheck2";

function LoginCheck({ authUrl, user }) {
  const [auth, setAuth] = useState(false);
  const [token, setToken] = useState(false);

  const { setCurrentUser, setCurrentAdmin } = useContext(ContextUser);

  useLayoutEffect(() => {
    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    }
    const getToken = getCookie(user ? "token" : "adminToken");
    Axios.get(authUrl, {
      headers: {
        "x-accesss-token": getToken,
      },
    }).then(({ data }) => {
      if (user) {
        if (data.user && data.auth) {
          const jwtDecodeUser = jwt(getToken).data;
          setCurrentAdmin(jwtDecodeUser);
          setToken(true);
          setAuth(true);
          return;
        }
      } else {
        if (data.admin && data.auth) {
          const jwtDecodeUser = jwt(getToken).data;
          setCurrentUser(jwtDecodeUser);
          setToken(true);
          setAuth(true);
          return;
        }
      }
      setAuth(true);
    });
  }, [authUrl]);

  return auth && <TokenCheck2 tokenParam={token} user={user} />;
}

export default LoginCheck;
