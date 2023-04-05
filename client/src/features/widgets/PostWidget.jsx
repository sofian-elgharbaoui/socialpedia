// how to let the dispatch work inside a hook
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  Avatar,
  Card,
  CardHeader,
  IconButton,
  Typography,
  CardContent,
  CardActions,
  TextField,
  Button,
  Collapse,
  Box,
  CardMedia,
  Skeleton,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";

import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonRemoveAlt1Icon from "@mui/icons-material/PersonRemoveAlt1";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import CommentsIcon from "@mui/icons-material/Comment";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { FlexBetween } from "../../components/FlexBetween";
import { fetchPosts, setFriends } from "../authPage/authSlice";
import { setFeedPosts } from "../authPage/authSlice";

function imgSrc(path) {
  return `http://localhost:3001/assets/${path}`;
}

export default function PostWidget({ urlOrigin, postId }) {
  const [isCommentOpened, setIsCommentOpened] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const { token, posts } = useSelector((s) => s.auth);
  // this solves the problem of makeing a simple var to assign the post value
  const [post, setPost] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { post: postInfo },
        } = await axios.get(`${urlOrigin}/posts/${postId}`, {
          headers: { Authorization: token },
        });
        setPost(postInfo);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [posts, postId, token, urlOrigin]);

  const {
    _id: userId,
    friends,
    firstName: userFirstName,
    lastName: userLastName,
  } = useSelector((s) => s.auth.user);

  // this condition is for the data that will be used before the comp finished mounting
  if (!post) {
    return (
      <Card>
        <CardHeader
          avatar={
            <Skeleton
              animation="wave"
              variant="circular"
              width={40}
              height={40}
            />
          }
          title={<Skeleton animation="wave" width="80%" />}
          subheader={<Skeleton animation="wave" width="80%" />}
          action={
            <Skeleton
              animation="wave"
              variant="circular"
              width={40}
              height={40}
            />
          }
        />
        <CardContent>
          <Skeleton animation="wave" />
        </CardContent>
        <Skeleton animation="wave" variant="rounded" height={200} />
        <CardActions>
          <FlexBetween sx={{ width: "100%" }}>
            <Skeleton animation="wave" width={40} height={20} />
            <Skeleton animation="wave" width={40} height={20} />
          </FlexBetween>
        </CardActions>
      </Card>
    );
  }

  const {
    firstName: postFirstName,
    lastName: postLastName,
    location,
    userPicturePath,
    description,
    picturePath,
    likes,
    comments,
    createdBy,
  } = post;

  const postFullName = [postFirstName, postLastName]
    .map((v) => v[0].toUpperCase() + v.slice(1))
    .join(" ");

  const userFullName = [userFirstName, userLastName]
    .map((v) => v[0].toUpperCase() + v.slice(1))
    .join(" ");

  let actionIcon;
  if (userId === createdBy) actionIcon = <MoreVertIcon />;
  else {
    if (friends.includes(createdBy)) actionIcon = <PersonRemoveAlt1Icon />;
    else actionIcon = <PersonAddAlt1Icon />;
  }

  async function handleActionAddRemoveFriend() {
    if (userId !== createdBy) {
      // remove or add,
      const {
        data: { userFriends },
      } = await axios.patch(
        `${urlOrigin}/user/friends/${createdBy}`,
        {
          friendId: createdBy,
        },
        {
          headers: { Authorization: token },
        }
      );

      dispatch(setFriends({ friends: userFriends }));
    }
  }
  async function handleLikeButtonClick() {
    try {
      const {
        data: { allPosts },
      } = await axios.patch(
        `${urlOrigin}/posts/like`,
        { postId },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      dispatch(setFeedPosts({ posts: allPosts.map((post) => post._id) }));
    } catch (error) {
      console.error(error);
    }
  }
  async function handleCommentSubmit(e) {
    e.preventDefault();
    if (!commentValue) return;
    try {
      await axios.patch(
        `${urlOrigin}/posts/comment`,
        {
          postId,
          comment: commentValue,
        },
        { headers: { Authorization: token } }
      );
      dispatch(fetchPosts());
      setCommentValue("");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Card style={{ boxShadow: "none", borderRadius: 14 }}>
      <CardHeader
        avatar={<Avatar src={imgSrc(userPicturePath)} alt={postFullName} />}
        title={<Typography variant="h6">{postFullName}</Typography>}
        subheader={location}
        action={
          <IconButton onClick={handleActionAddRemoveFriend}>
            {actionIcon}
          </IconButton>
        }
      />
      <CardContent>
        {description && <Typography mb={1.5}>{description}</Typography>}
        {picturePath && (
          <CardMedia
            component="img"
            image={imgSrc(picturePath)}
            alt={description}
          />
        )}
      </CardContent>
      <CardActions sx={{ mx: 1, flexDirection: "column" }}>
        <FlexBetween sx={{ width: "100%" }}>
          <FlexBetween columnGap={0.5}>
            <Typography>{Object.keys(likes).length}</Typography>
            <IconButton onClick={handleLikeButtonClick} bgcolor="#fff">
              <ThumbUpAltOutlinedIcon
                sx={{
                  color:
                    Object(likes).hasOwnProperty(userId) &&
                    palette.primary.main,
                }}
              />
            </IconButton>
          </FlexBetween>
          <FlexBetween columnGap={0.5}>
            <Typography>{comments.length}</Typography>
            <IconButton onClick={(e) => setIsCommentOpened((prev) => !prev)}>
              <CommentsIcon />
            </IconButton>
          </FlexBetween>
        </FlexBetween>
        <Collapse in={isCommentOpened} sx={{ mt: 2, width: "100%" }}>
          <Box
            component="form"
            onSubmit={handleCommentSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <TextField
              label={userFullName}
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
            />
            <Button type="submit" sx={{ ml: "auto" }}>
              Submit
            </Button>
          </Box>
          <Box>
            {comments.map((comment, idx) => (
              <Typography
                key={comment + idx}
                sx={{
                  borderLeft: "2px solid" + palette.grey[400],
                  pl: 1,
                  mb: 1,
                  fontSize: 14,
                }}
              >
                {comment}
              </Typography>
            ))}
          </Box>
        </Collapse>
      </CardActions>
    </Card>
  );
}
