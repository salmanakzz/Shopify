import { fetchAllPosts } from "../api/admin/fetchAllPosts";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const getAllPosts = createAsyncThunk("api/postsData", () => {
  return fetchAllPosts();
});

const initialState = {
  data: [],
  loading: false,
  error: "",
};

const postsDataSlice = createSlice({
  name: "postsData",
  initialState,
  extraReducers: {
    [getAllPosts.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [getAllPosts.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export { getAllPosts };

export default postsDataSlice.reducer;
