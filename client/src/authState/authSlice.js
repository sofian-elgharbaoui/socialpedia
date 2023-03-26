import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
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
        console.error("user friends do not exist :(");
      }
    },
    setPosts(state, action) {
      state.posts = action.payload.posts;
    },
    setPost(state, action) {
      if (state.posts.every((post) => post._id !== action.payload.post._id)) {
        state.posts.push(action.payload.post);
      } else {
        return;
      }
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;

export default authSlice.reducer;
