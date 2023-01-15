import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import Axios from "../axios/axios";
import { ContextUser } from "../store/MainContext";
import TokenCheck from "./TokenCheck";
import jwt from "jwt-decode";
import { accessUserRequestUrl } from "../urls/urls";

function PrivateRoutes({ authUrl, user ,path}) {
  console.log("private route");
  const [auth, setAuth] = useState(false);
  const [token, setToken] = useState(false);

  const { setCurrentUser, setCurrentAdmin } = useContext(ContextUser);

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  const getToken = getCookie(user ? "token" : "adminToken");
  const getRefreshToken = getCookie(
    user ? "refreshToken" : "adminRefreshToken"
  );
  useEffect(() => {
    console.log("private useEffect");

    Axios.get(authUrl, {
      headers: {
        "x-accesss-token": getToken,
      },
    }).then(({ data }) => {
      setAuth(true);
      console.log(data);
      if (user) {
        if (!data.auth && data.error?.message === "jwt expired") {
          setToken(false);
          setAuth(false);
          accessTokenRequest(getRefreshToken);
          return;
        }
        if (data.user && data.auth) {
          const jwtDecodeUser = jwt(getToken).data;
          setCurrentUser(jwtDecodeUser);
          setToken(true);
          setAuth(true);
          return;
        }
      } else {
        if (data.admin && data.auth) {
          const jwtDecodeUser = jwt(getToken).data;
          setCurrentAdmin(jwtDecodeUser);
          setToken(true);
          setAuth(true);
          return;
        }
      }
    });

    return () => {
      console.log('return');
      setAuth(false);
    };
  }, [path]);
  const accessTokenRequest = (getRefreshToken) => {
    Axios.get(accessUserRequestUrl, {
      headers: {
        "x-refresh-token": getRefreshToken,
      },
    }).then(({ data }) => {
      if (data.user) {
        console.log("new tocken generated");
        document.cookie = `token=${data.token}`;
        document.cookie = `refreshToken=${data.refreshToken}`;
        const jwtDecodeUser = jwt(getToken).data;
        setCurrentUser(jwtDecodeUser);
        setToken(true);
        setAuth(true);
        return;
      }
    });
  };

  console.log(auth);
  return auth && <TokenCheck tokenParam={token} user={user} />;
}

export default PrivateRoutes;
