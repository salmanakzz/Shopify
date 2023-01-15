import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatsPage from "../pages/Chats/Chats";
import { ForgotPasswordPage } from "../pages/ForgotPassword/ForgotPassword";
import HomePage from "../pages/Home/Home";
import LoginPage from "../pages/Login/Login";
import OtpLoginPage from "../pages/OtpLogin/OtpLogin";
import ProfilePage from "../pages/Profile/Profile";
import { ResetPasswordPage } from "../pages/ResetPassword/ResetPassword";
import SignupPage from "../pages/Signup/Signup";
import LoginCheck from "../routes/LoginCheck";
import PrivateRoutes from "../routes/PrivateRoutes";
import { ResetPasswordPrivate } from "../routes/ResetPasswordPrivate";
import { userAuth, userLogin, userSignup } from "../urls/urls";

function User() {
  return (
    <Router>
      <Routes>
        <Route element={<LoginCheck authUrl={userAuth} user={true} />}>
          <Route
            path="/login"
            exact
            element={<LoginPage user={true} url={userLogin} />}
          />
        </Route>
        <Route
          path="/otp_login"
          exact
          element={<OtpLoginPage user={true} url={userLogin} />}
        />
        <Route
          path="/forgot-password"
          exact
          element={<ForgotPasswordPage user={true} url={userLogin} />}
        />
        <Route element={<ResetPasswordPrivate />}>
          <Route
            path="/reset-password/:id/:token"
            exact
            element={<ResetPasswordPage user={true} url={userLogin} />}
          />
        </Route>
        <Route
          path="/signup"
          exact
          element={<SignupPage user={true} url={userSignup} />}
        />
        <Route
          element={<PrivateRoutes path="/" authUrl={userAuth} user={true} />}
        >
          <Route path="/" exact element={<HomePage user={true} />} />
        </Route>
        <Route
          element={
            <PrivateRoutes path="/profile" authUrl={userAuth} user={true} />
          }
        >
          <Route path="/profile" exact element={<ProfilePage user={true} />} />
        </Route>
        <Route
          element={
            <PrivateRoutes path="/chats" authUrl={userAuth} user={true} />
          }
        >
          <Route path="/chats" exact element={<ChatsPage user={true} />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default User;
