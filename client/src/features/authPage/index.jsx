import { useNavigate } from "react-router-dom";
import { AppBar, Box, Typography } from "@mui/material";

import Form from "./Form";
import { Container } from "@mui/system";

const navHeight = 50;

function LoginNav() {
  let navigate = useNavigate();

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: "background.alt",
        height: `${navHeight}px`,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: "primary.main",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "&:hover": {
            opacity: 0.8,
            cursor: "pointer",
          },
        }}
        onClick={() => navigate("/home")}
      >
        Socialpedia
      </Typography>
    </AppBar>
  );
}

export default function AuthPage({ urlOrigin }) {
  return (
    <>
      <LoginNav />
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          my: 2,
        }}
      >
        <Box
          sx={{
            bgcolor: "background.alt",
            width: { xs: "95%", sm: "75%" },
            borderRadius: 2,
          }}
        >
          <Form urlOrigin={urlOrigin} />
        </Box>
      </Container>
    </>
  );
}
