import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PostWidget from "../widgets/PostWidget.jsx";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Skeleton,
} from "@mui/material";
import axios from "axios";
import { FlexBetween } from "../../components/FlexBetween";

export default function FeedPosts({ urlOrigin, isProfile = false }) {
  // the useSelector will run each time the s.auth.posts changed at every place
  let { token, isPosting } = useSelector((s) => s.auth);
  const [posts, setPosts] = useState([null, null, null, null]);

  // this hook is used to fetch the posts according to the isProfile value
  useEffect(() => {
    if (isProfile) {
      (async () => {
        const {
          data: { userPosts },
        } = await axios.get("http://localhost:5000/posts/profile", {
          headers: { Authorization: token },
        });
        setPosts(userPosts);
      })();
    } else {
      (async () => {
        const {
          data: { allPosts },
        } = await axios.get("http://localhost:5000/posts", {
          headers: { Authorization: token },
        });
        setPosts(allPosts);
      })();
    }
  }, [token, isProfile, isPosting]);

  return (
    <Box display="flex" flexDirection="column-reverse" rowGap={1}>
      {posts.map((post) =>
        !post ? (
          <Card>
            <CardHeader
              avatar={
                <Skeleton
                  animation="wave"
                  variant="circular"
                  width={40}
                  height={40}
                />
              }
              title={<Skeleton animation="wave" width="80%" />}
              subheader={<Skeleton animation="wave" width="80%" />}
              action={
                <Skeleton
                  animation="wave"
                  variant="circular"
                  width={40}
                  height={40}
                />
              }
            />
            <CardContent>
              <Skeleton animation="wave" />
            </CardContent>
            <Skeleton animation="wave" variant="rounded" height={200} />
            <CardActions>
              <FlexBetween sx={{ width: "100%" }}>
                <Skeleton animation="wave" width={40} height={20} />
                <Skeleton animation="wave" width={40} height={20} />
              </FlexBetween>
            </CardActions>
          </Card>
        ) : (
          <PostWidget key={post._Id} urlOrigin={urlOrigin} post={post} />
        )
      )}
    </Box>
  );
}
