import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function TokenCheck({ tokenParam, user }) {
  const token = tokenParam;

  return user ? (
    token ? (
      <Outlet />
    ) : (
      <Navigate to="/login" />
    )
  ) : token ? (
    <Outlet />
  ) : (
    <Navigate to="/admin" />
  );
}

export default TokenCheck;
