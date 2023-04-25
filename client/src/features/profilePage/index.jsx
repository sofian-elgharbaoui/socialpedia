import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import UserWidget from "../widgets/UserWidget";
import CreatePostWidget from "../widgets/CreatePostWidget";
import FriendsWidget from "../widgets/FriendsWidget";
import FeedPosts from "../widgets/FeedPosts";
import NavBar from "../../components/NavBar";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUser } from "../authPage/authSlice";

export default function ProfilePage({ urlOrigin }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <>
      <NavBar />
      <Container sx={{ py: 1 }}>
        <Grid container spacing={1}>
          <Grid xs={12} sm={4}>
            <UserWidget isProfile={true} />
            <FriendsWidget urlOrigin={urlOrigin} />
          </Grid>
          <Grid xs={12} sm={8}>
            <CreatePostWidget urlOrigin={urlOrigin} />
            <FeedPosts urlOrigin={urlOrigin} isProfile={true} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
