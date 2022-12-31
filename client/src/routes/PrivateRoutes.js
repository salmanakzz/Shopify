import React, { useContext, useLayoutEffect, useState } from "react";
import Axios from "../axios/axios";
import { ContextUser } from "../store/MainContext";
import TokenCheck from "./TokenCheck";
import jwt from "jwt-decode";
import { accessUserRequestUrl } from "../urls/urls";

function PrivateRoutes({ authUrl, user }) {
  console.log('private route');
  const [auth, setAuth] = useState(false);
  const [token, setToken] = useState(false);

  const { setCurrentUser, setCurrentAdmin } = useContext(ContextUser);

  useLayoutEffect(() => {
    console.log('private useEffect');
    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    }
    const getToken = getCookie(user ? "token" : "adminToken");
    const getRefreshToken = getCookie(
      user ? "refreshToken" : "adminRefreshToken"
    );

    Axios.get(authUrl, {
      headers: {
        "x-accesss-token": getToken,
      },
    }).then(({ data }) => {
      console.log(data);
      if (user) {
        if (!data.auth && data.error?.message === "jwt expired") {
          accessTokenRequest(getRefreshToken);
          return
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
      setAuth(true);
    });
    const accessTokenRequest = (getRefreshToken) => {
      Axios.get(accessUserRequestUrl, {
        headers: {
          "x-refresh-token": getRefreshToken,
        },
      }).then(({ data }) => {
        if (data.user) {
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
  }, [authUrl]);

  return auth && <TokenCheck tokenParam={token} user={user} />;
}

export default PrivateRoutes;
