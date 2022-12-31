import React from "react";
import Login from "../../components/Login/Login";

function AdminLoginPage({ admin, url }) {
  return <Login admin={admin} url={url} />;
}

export default AdminLoginPage;
