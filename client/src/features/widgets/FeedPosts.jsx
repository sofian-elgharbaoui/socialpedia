import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts, fetchUserPosts } from "../authPage/authSlice";

import PostWidget from "../widgets/PostWidget.jsx";
import { Box } from "@mui/material";

export default function FeedPosts({ urlOrigin, isProfile = false }) {
  const dispatch = useDispatch();
  // the useSelector will run each time the s.auth.posts changed at every place
  let feedPosts = useSelector((s) => s.auth.posts);

  // this hook is used to fetch the posts for the first rendering
  useEffect(() => {
    if (isProfile) dispatch(fetchUserPosts());
    else dispatch(fetchPosts());
  }, [dispatch, isProfile]);

  return (
    <Box display="flex" flexDirection="column-reverse" rowGap={1}>
      {feedPosts.map((postId) => (
        <PostWidget key={postId} urlOrigin={urlOrigin} postId={postId} />
      ))}
    </Box>
  );
}
