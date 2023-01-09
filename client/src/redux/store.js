import { configureStore } from "@reduxjs/toolkit";
import postsDataReducer from "./postsDataReducer";
import usersDataReducer from "./usersDataReducer";

const store = configureStore({
  reducer: {
    usersData: usersDataReducer,
    postsData: postsDataReducer,
  },
});

export default store;
