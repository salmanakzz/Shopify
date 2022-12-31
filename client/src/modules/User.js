import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatsPage from "../pages/Chats/Chats";
import HomePage from "../pages/Home/Home";
import LoginPage from "../pages/Login/Login";
import OtpLoginPage from "../pages/OtpLogin/OtpLogin";
import ProfilePage from "../pages/Profile/Profile";
import SignupPage from "../pages/Signup/Signup";
import LoginCheck from "../routes/LoginCheck";
import PrivateRoutes from "../routes/PrivateRoutes";
import { userAuth, userLogin, userSignup } from "../urls/urls";

function User() {
  return (
    <Router>
      <Routes>
        <Route element={<LoginCheck authUrl={userAuth} user={true}/>}>
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
          path="/signup"
          exact
          element={<SignupPage user={true} url={userSignup} />}
        />
        <Route element={<PrivateRoutes authUrl={userAuth} user={true}/>}>
          <Route path="/" exact element={<HomePage user={true} />} />
          <Route path="/profile" exact element={<ProfilePage user={true} />} />
          <Route path="/chats" exact element={<ChatsPage user={true} />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default User;
