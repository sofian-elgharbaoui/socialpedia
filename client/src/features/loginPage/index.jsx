import { useNavigate } from "react-router-dom";

import {
  AppBar,
  Box,
  FormControl,
  Typography,
  // useMediaQuery,
  // useTheme,
} from "@mui/material";

import Form from "./Form";

export default function LoginPage() {
  // const theme = useTheme();
  // const isMobileOpened = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <LoginNav />
      <Box>
        <Form></Form>
      </Box>
    </>
  );
}

function LoginNav() {
  let navigate = useNavigate();

  return (
    <AppBar sx={{ bgcolor: "background.alt", py: 1.2 }}>
      <Typography
        variant="h4"
        color={"primary.main"}
        sx={{
          textAlign: "center",
          "&:hover": {
            color: "primary.light",
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
