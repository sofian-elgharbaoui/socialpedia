import { Container } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import NavBar from "../../components/NavBar";
import UserWedget from "./UserWidget";
import CreatePostWidget from "./CreatePostWidget";
import FeedPosts from "./FeedPosts";

export default function HomePage() {
  return (
    <>
      <NavBar />
      <Container sx={{ py: 1 }}>
        <Grid container spacing={1}>
          <Grid md={3.5} width="100%">
            <UserWedget />
          </Grid>
          <Grid md={5} width="100%">
            <CreatePostWidget />
            <FeedPosts />
          </Grid>
          <Grid md={3.5} width="100%">
            <UserWedget />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
