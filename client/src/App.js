import { useMemo } from "react";
import { useSelector } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import themeSettings from "./theme";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// app comps routes
import AuthPage from "./features/authPage/index";
import HomePage from "./features/homePage/index";
import ProfilePage from "./features/profilePage/index";
import ErrorPage from "./features/ErrorPage";

export default function App() {
  const mode = useSelector((state) => state.auth.mode);
  const isAuth = useSelector((state) => state.auth.token);

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route
            path="/home"
            element={isAuth ? <HomePage /> : <Navigate to="/" />}
          />
          <Route
            path="/profile/:userId"
            element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}
