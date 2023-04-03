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
} from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EditIcon from "@mui/icons-material/Edit";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";

function userImg(path) {
  return `http://localhost:3001/assets/${path}`;
}

export default function UserWedget() {
  const {
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

  const theme = useTheme();
  return (
    <Card style={{ boxShadow: "none", borderRadius: 14 }}>
      <CardHeader
        avatar={<Avatar src={userImg(picturePath)} alt={firstName} />}
        title={fullName}
        subheader={friends.length + " friends"}
        action={
          <IconButton>
            <ManageAccountsIcon />
          </IconButton>
        }
        textAling
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
