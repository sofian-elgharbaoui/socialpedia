import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import NavBar from "../../components/NavBar";
import UserWedget from "../widgets/UserWidget";
import CreatePostWidget from "../widgets/CreatePostWidget";
import FeedPosts from "../widgets/FeedPosts";
import AdWidget from "../widgets/AdWidget";
import FriendsWidget from "../widgets/FriendsWidget";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUser } from "../authPage/authSlice";

export default function HomePage({ urlOrigin }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <>
      <NavBar />
      <Container sx={{ py: 1 }}>
        <Grid container spacing={1}>
          <Grid md={3.5} width="100%">
            <UserWedget />
          </Grid>
          <Grid md={5} width="100%">
            <CreatePostWidget urlOrigin={urlOrigin} />
            <FeedPosts urlOrigin={urlOrigin} />
          </Grid>
          <Grid md={3.5} width="100%">
            <AdWidget urlOrigin={urlOrigin} />
            <FriendsWidget urlOrigin={urlOrigin} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
