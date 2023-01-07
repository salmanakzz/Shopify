import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AllPostsPage from "../pages/AllPosts/AllPosts";
import { BlockedUsersPage } from "../pages/BlockedUsers/BlockedUsers";
import DashboardPage from "../pages/Dashboard/Dashboard";
import LoginPage from "../pages/Login/Login";
import UsersPage from "../pages/Users/Users";
import LoginCheck from "../routes/LoginCheck";
import UserPrivateRoutes from "../routes/PrivateRoutes";
import { adminAuth, adminLogin } from "../urls/urls";

function Admin() {
  return (
    <Router>
      <Routes>
        <Route element={<LoginCheck authUrl={adminAuth} user={false} />}>
          <Route
            path="/admin"
            exact
            element={<LoginPage user={false} url={adminLogin} />}
          />
        </Route>
        <Route element={<UserPrivateRoutes authUrl={adminAuth} user={false} />}>
          <Route
            path="/dashboard"
            exact
            element={<DashboardPage user={false} url={adminLogin} />}
          />
          <Route
            path="/users"
            exact
            element={<UsersPage user={false} url={adminLogin} />}
          />
          <Route
            path="/blocked-users"
            exact
            element={<BlockedUsersPage user={false} url={adminLogin} />}
          />
          <Route
            path="/posts"
            exact
            element={<AllPostsPage user={false} url={adminLogin} />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default Admin;
