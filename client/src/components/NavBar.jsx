import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// mui comps
import {
  AppBar,
  TextField,
  Typography,
  Container,
  IconButton,
  Select,
  MenuItem,
  Drawer,
  useMediaQuery,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";

// styled comps
import { FlexBetween } from "./FlexBetween";

// icons
import SearchIcon from "@mui/icons-material/Search";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HelpIcon from "@mui/icons-material/Help";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import { setMode } from "../features/authPage/authSlice";

export default function NavBar() {
  const [userMenuValue, setUserMenuValue] = useState("");
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const mode = useSelector((state) => state.auth.mode);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const theme = useTheme();
  const isMobileOpened = useMediaQuery(theme.breakpoints.down("md"));

  const user = useSelector((state) => state.auth.user);
  const fullName =
    "fake name" || `${user.firstName} ${user.lastName}`.toLowerCase();

  function handleCloseDrawer(e) {
    setIsMenuOpened(false);
  }
  return (
    <AppBar sx={{ bgcolor: "background.alt", py: 1.2 }} position="sticky">
      <Container>
        <FlexBetween>
          <FlexBetween gap={5}>
            <Typography
              variant="h4"
              color={"primary.main"}
              sx={{
                "&:hover": {
                  color: "primary.light",
                  cursor: "pointer",
                },
              }}
              onClick={() => navigate("/home")}
            >
              Socialpedia
            </Typography>
            {!isMobileOpened && (
              <TextField
                size="small"
                label="Search..."
                InputProps={{
                  endAdornment: (
                    <IconButton edge="end">
                      <SearchIcon />
                    </IconButton>
                  ),
                }}
              />
            )}
          </FlexBetween>
          {isMobileOpened ? (
            <IconButton onClick={() => setIsMenuOpened(true)}>
              <MenuIcon />
            </IconButton>
          ) : (
            <FlexBetween gap={2}>
              <IconButton onClick={() => dispatch(setMode())}>
                {mode === "light" ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
              <IconButton>
                <MessageIcon />
              </IconButton>
              <IconButton>
                <NotificationsIcon />
              </IconButton>
              <IconButton>
                <HelpIcon />
              </IconButton>
              <Select
                size="small"
                sx={{ width: 120 }}
                value={userMenuValue}
                displayEmpty
                onChange={(e) => setUserMenuValue(e.target.value)}
                inputProps={{ "aria-label": "user account info" }}
              >
                <MenuItem value="">{fullName}</MenuItem>
                <MenuItem value="profile">Profile</MenuItem>
              </Select>
            </FlexBetween>
          )}
          <Drawer
            anchor="right"
            open={isMenuOpened}
            onClose={handleCloseDrawer}
          >
            <FlexBetween gap={3} flexDirection="column" width={200} padding={2}>
              <IconButton
                sx={{ alignSelf: "flex-end" }}
                onClick={handleCloseDrawer}
              >
                <CloseIcon />
              </IconButton>
              <IconButton onClick={() => dispatch(setMode())}>
                {mode === "light" ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
              <IconButton>
                <MessageIcon />
              </IconButton>
              <IconButton>
                <NotificationsIcon />
              </IconButton>
              <IconButton>
                <HelpIcon />
              </IconButton>
              <Select
                size="small"
                sx={{ width: 120 }}
                value={userMenuValue}
                displayEmpty
                onChange={(e) => setUserMenuValue(e.target.value)}
                inputProps={{ "aria-label": "user account info" }}
              >
                <MenuItem value="">{fullName}</MenuItem>
                <MenuItem value="profile">Profile</MenuItem>
              </Select>
            </FlexBetween>
          </Drawer>
        </FlexBetween>
      </Container>
    </AppBar>
  );
}
