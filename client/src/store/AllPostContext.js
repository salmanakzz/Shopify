import { createContext, useState } from "react";

export const ContextAllPosts = createContext(null);

function AllPostsContext({ children }) {
  const [postDatas, setPostDatas] = useState(null);
  const [profilePostDatas, setProfilePostDatas] = useState(null);
  return (
    <ContextAllPosts.Provider
      value={{
        postDatas,
        setPostDatas,
        profilePostDatas,
        setProfilePostDatas,
      }}
    >
      {children}
    </ContextAllPosts.Provider>
  );
}

export default AllPostsContext;
