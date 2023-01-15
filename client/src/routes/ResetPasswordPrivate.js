import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { resetPassword } from "../api/resetPassword";

export const ResetPasswordPrivate = () => {
  const [auth, setAuth] = useState(false);
  const [valid, setValid] = useState(false);
  const { id, token } = useParams();

  useEffect(() => {
    resetPassword("get", id, token).then((response) => {
      const { status, verified } = response;
      if (status === "ok" && verified) {
        setValid(true);
        setAuth(true);
        return;
      }
      setAuth(true);
      setValid(false);
    });

    return () => {
      setAuth(false);
      setValid(false);
    };
  }, []);

  return (
    auth &&
    (valid ? <Outlet /> : <Navigate to={"/login"} />)
  );
};
