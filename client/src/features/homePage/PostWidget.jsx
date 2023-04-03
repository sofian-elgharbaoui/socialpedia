import {
  Avatar,
  Card,
  CardHeader,
  IconButton,
  Typography,
  CardContent,
} from "@mui/material";

import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

function imgSrc(path) {
  return `http://localhost:3001/assets/${path}`;
}

export default function PostWedget({ post }) {
  const {
    firstName,
    lastName,
    location,
    userPicturePath,
    description,
    picturePath,
  } = post;

  const fullName = [firstName, lastName]
    .map((v) => v[0].toUpperCase() + v.slice(1))
    .join(" ");

  return (
    <Card style={{ boxShadow: "none", borderRadius: 14 }}>
      <CardHeader
        avatar={<Avatar src={imgSrc(userPicturePath)} alt={fullName} />}
        title={fullName}
        subheader={location}
        action={
          <IconButton>
            <PersonAddAlt1Icon></PersonAddAlt1Icon>
          </IconButton>
        }
      />
      <CardContent>
        {description && <Typography mb={1.5}>{description}</Typography>}
        {picturePath && (
          <img src={imgSrc(picturePath)} alt={description} width="100%" />
        )}
      </CardContent>
    </Card>
  );
}
