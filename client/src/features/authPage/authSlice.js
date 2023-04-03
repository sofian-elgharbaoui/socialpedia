import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  userPosts: [],
  posts: [],
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
    setFriends(state, action) {
      if (state.user) {
        state.friends = action.payload.friends;
      } else {
        console.error("User friends do not exist :(");
      }
    },
    setUserPosts(state, action) {
      state.userPosts = action.payload.userPosts;
    },
    setPost(state, action) {
      if (
        state.userPosts.every((post) => post._id !== action.payload.post._id)
      ) {
        state.userPosts.push(action.payload.post);
      } else {
        return;
      }
    },
    setFeedPosts(state, action) {
      state.posts = action.payload.posts;
    },
  },
});

export const fetchPosts = createAsyncThunk(
  "auth/fetchPosts",
  async (_, { getState, dispatch }) => {
    const {
      data: { allPosts },
    } = await axios.get("http://localhost:3001/posts", {
      headers: { Authorization: getState().auth.token },
    });

    if (allPosts) dispatch(setFeedPosts({ posts: allPosts }));
  }
);

export const {
  setMode,
  setLogin,
  setLogout,
  setFriends,
  setUserPosts,
  setPosts,
  setFeedPosts,
} = authSlice.actions;

export default authSlice.reducer;
