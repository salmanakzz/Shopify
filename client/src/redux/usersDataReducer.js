import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../api/admin/fetchUsers";

const getUsersData = createAsyncThunk("api/usersData", () => {
  return fetchUsers();
});

const initialState = {
  data: [],
  loading: false,
  error: "",
};

const usersDataSlice = createSlice({
  name: "usersData",
  initialState,
  extraReducers: {
    [getUsersData.pending]: (state, action) => {
      state.loading = true;
    },
    [getUsersData.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [getUsersData.rejected]: (state, action) => {
      state.loading = false;
      state.error = "some error occured!";
    },
  },
});

export { getUsersData };

export default usersDataSlice.reducer;
