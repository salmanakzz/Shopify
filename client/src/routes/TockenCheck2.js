import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function TokenCheck2({ tokenParam, user }) {
  const token = tokenParam;

  return user ? (
    token ? (
      <Navigate to="/" />
    ) : (
      <Outlet />
    )
  ) : token ? (
    <Navigate to="/dashboard" />
  ) : (
    <Outlet />
  );
}

export default TokenCheck2;
