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
import Messenger from "./features/messengerPage/index";
import ErrorPage from "./features/ErrorPage";

export default function App() {
  const mode = useSelector((state) => state.auth.mode);
  const isAuth = useSelector((state) => state.auth.token);

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  const urlOrigin = "http://localhost:5000";

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route
            path="/"
            element={
              isAuth ? (
                <HomePage urlOrigin={urlOrigin} />
              ) : (
                <Navigate to="/auth" />
              )
            }
          />
          <Route path="/auth" element={<AuthPage urlOrigin={urlOrigin} />} />
          <Route
            path="/profile/:userId"
            element={
              isAuth ? (
                <ProfilePage urlOrigin={urlOrigin} />
              ) : (
                <Navigate to="/auth" />
              )
            }
          />
          <Route
            path="/messenger"
            element={
              isAuth ? (
                <Messenger urlOrigin={urlOrigin} />
              ) : (
                <Navigate to="/auth" />
              )
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}
