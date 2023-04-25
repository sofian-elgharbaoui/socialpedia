import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";

import {
  Avatar,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
  ListItem,
  Menu,
  MenuItem,
} from "@mui/material";

import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EditIcon from "@mui/icons-material/Edit";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function userImg(path) {
  return `http://localhost:5000/assets/${path}`;
}

export default function UserWidget({ isProfile = false }) {
  const [isMenu, setIsMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const navigate = useNavigate();

  const {
    _id,
    firstName,
    lastName,
    friends,
    location,
    picturePath,
    occupation,
    viewedProfile,
    impressions,
  } = useSelector((state) => state.auth.user);

  const fullName = [firstName, lastName]
    .map((v) => v[0].toUpperCase() + v.slice(1))
    .join(" ");

  function handleMenu(e) {
    setIsMenu(true);
    setAnchorEl(e.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
    setIsMenu(false);
  }

  function handleChangeData() {}
  return (
    <Card style={{ boxShadow: "none", borderRadius: 14 }}>
      <CardHeader
        avatar={<Avatar src={userImg(picturePath)} alt={firstName} />}
        title={fullName}
        subheader={friends.length + " friends"}
        action={
          <>
            <IconButton
              onClick={handleMenu}
              sx={{
                cursor: "pointer",
                "&:hover": {
                  color: "grey.500",
                },
              }}
            >
              <ManageAccountsIcon />
            </IconButton>
            <Menu open={isMenu} anchorEl={anchorEl} onClose={handleClose}>
              {isProfile ? (
                <MenuItem onClick={handleChangeData}>Change Data</MenuItem>
              ) : (
                <MenuItem onClick={() => navigate(`/profile/${_id}`)}>
                  Go to profile
                </MenuItem>
              )}
            </Menu>
          </>
        }
      />
      <Divider variant="middle" />
      <List sx={{ color: theme.palette.grey[600] }}>
        <ListItemButton>
          <ListItemIcon>
            <LocationOnIcon />
          </ListItemIcon>
          <ListItemText>{location}</ListItemText>
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <BusinessCenterIcon />
          </ListItemIcon>
          <ListItemText>{occupation}</ListItemText>
        </ListItemButton>
      </List>
      <Divider variant="middle" />
      <List>
        <ListItemButton>
          <ListItemText sx={{ color: theme.palette.grey[600] }}>
            Who's viewed your profile
          </ListItemText>
          <Typography>{viewedProfile}</Typography>
        </ListItemButton>
        <ListItemButton>
          <ListItemText sx={{ color: theme.palette.grey[600] }}>
            Impressions of your post
          </ListItemText>
          <Typography>{impressions}</Typography>
        </ListItemButton>
      </List>
      <Divider variant="middle" />
      <Typography sx={{ ml: 2, mt: 1 }} variant="h5">
        Social Profiles
      </Typography>
      <List disablePadding>
        <CardHeader
          sx={{ py: 1 }}
          component={ListItem}
          avatar={<TwitterIcon />}
          title="Twitter"
          subheader="Social Network"
          action={
            <IconButton>
              <EditIcon />
            </IconButton>
          }
        />
        <CardHeader
          sx={{ py: 1 }}
          component={ListItem}
          avatar={<LinkedInIcon />}
          title="LinkedIn"
          subheader="Network Platform"
          action={
            <IconButton>
              <EditIcon />
            </IconButton>
          }
        />
      </List>
    </Card>
  );
}
