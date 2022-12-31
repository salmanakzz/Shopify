import { createContext, useState } from "react";

export const ContextUser = createContext(null);

function MainContext({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [profileUser, setProfileUser] = useState(currentUser);
  return (
    <ContextUser.Provider
      value={{
        currentUser,
        setCurrentUser,
        profileUser,
        setProfileUser,
        currentAdmin,
        setCurrentAdmin,
      }}
    >
      {children}
    </ContextUser.Provider>
  );
}

export default MainContext;
