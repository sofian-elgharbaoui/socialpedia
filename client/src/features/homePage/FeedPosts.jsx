import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../authPage/authSlice";

import PostWidget from "./PostWidget.jsx";
import { Box } from "@mui/material";

export default function FeedPosts() {
  const dispatch = useDispatch();
  // the useSelector will run each time the s.auth.posts changed at every place
  let feedPosts = useSelector((s) => s.auth.posts);
  console.log("ok");

  // this hook is used to fetch the posts for the first rendering
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <Box display="flex" flexDirection="column-reverse" rowGap={1}>
      {feedPosts.map((post) => (
        <PostWidget post={post} />
      ))}
    </Box>
  );
}
