import { useMemo } from "react";
import { useSelector } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import themeSettings from "./theme";

import { BrowserRouter, Routes, Route } from "react-router-dom";

// app comps routes
import LoginPage from "./features/loginPage/index";
import HomePage from "./features/homePage/index";
import ProfilePage from "./features/profilePage/index";
import ErrorPage from "./features/ErrorPage";

export default function App() {
  const mode = useSelector((state) => state.auth.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile/:userId" element={<ProfilePage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}
