import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  isPosting: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode(state) {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout(state) {
      state.user = null;
      state.token = null;
    },
    setUser(state, action) {
      state.user = action.payload.user;
    },
    setFriends(state, action) {
      state.user.friends = action.payload.friends;
    },
    setIsPosting(state) {
      state.isPosting = !state.isPosting;
    },
  },
});

// export const fetchPosts = createAsyncThunk(
//   "auth/fetchPosts",
//   async (_, { getState, dispatch }) => {
//     const {
//       data: { allPosts },
//     } = await axios.get("http://localhost:5000/posts", {
//       headers: { Authorization: getState().auth.token },
//     });

//     dispatch(setFeedPosts({ posts: allPosts.map((post) => post._id) }));
//   }
// );

// export const fetchUserPosts = createAsyncThunk(
//   "auth/fetchUserPosts",
//   async (_, { getState, dispatch }) => {
//     const {
//       data: { userPosts },
//     } = await axios.get(`http://localhost:5000/posts/profile`, {
//       headers: { Authorization: getState().auth.token },
//     });

//     dispatch(setFeedPosts({ posts: userPosts.map((post) => post._id) }));
//   }
// );

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, { getState, dispatch }) => {
    const {
      data: { userInfo },
    } = await axios.get(`http://localhost:5000/user`, {
      headers: { Authorization: getState().auth.token },
    });

    dispatch(setUser({ user: userInfo }));
  }
);

export const {
  setMode,
  setLogin,
  setLogout,
  setFriends,
  setUser,
  setIsPosting,
} = authSlice.actions;

export default authSlice.reducer;
