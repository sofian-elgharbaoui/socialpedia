import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { Form, Formik } from "formik";
import Dropzone from "react-dropzone";
import { setIsPosting } from "../authPage/authSlice.js";

import { useTheme, styled } from "@mui/material/styles";
import {
  Box,
  Avatar,
  TextField,
  Divider,
  Typography,
  Button,
  useMediaQuery,
  IconButton,
  Tooltip,
  Collapse,
} from "@mui/material";

import ImageIcon from "@mui/icons-material/Image";
import RecordVoiceIcon from "@mui/icons-material/RecordVoiceOver";
import ClipIcon from "@mui/icons-material/Attachment";
import AttachmentIcon from "@mui/icons-material/Attachment";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

import { WidgetWrapper } from "../../components/WidgetWrapper";
import { FlexBetween } from "../../components/FlexBetween";
import { useState } from "react";
import axios from "axios";

function userImg(path) {
  return `http://localhost:5000/assets/${path}`;
}

function modifiedPicturePath(picturePath) {
  const arLetters = [
    "ا",
    "ب",
    "ت",
    "ث",
    "ج",
    "ح",
    "خ",
    "د",
    "ذ",
    "ر",
    "ز",
    "س",
    "ش",
    "ص",
    "ض",
    "ط",
    "ظ",
    "ع",
    "غ",
    "ف",
    "ق",
    "ك",
    "ل",
    "م",
    "ن",
    "ه",
    "و",
    "ي",
  ];
  let lastDotIndex = picturePath.lastIndexOf(".");
  let picturePathLetters = picturePath.substring(0, lastDotIndex).split("");
  let fileExtention = picturePath.substring(lastDotIndex);

  for (const letter of arLetters) {
    if (picturePathLetters.includes(letter)) {
      return nanoid() + fileExtention;
    }
  }
  return picturePath;
}

const StyledButton = styled(Button)(({ theme }) => ({
  flexBasis: "20%",
  textTransform: "initial",
  color: theme.palette.medium,
}));

export default function CreatePostWidget({ urlOrigin }) {
  const [isDropzoneOpened, setIsDropzoneOpened] = useState(false);
  const [isImage, setIsImage] = useState(false);
  const {
    token,
    user: { firstName, lastName, picturePath },
  } = useSelector((state) => state.auth);

  const fullName = [firstName, lastName]
    .map((v) => v[0].toUpperCase() + v.slice(1))
    .join(" ");

  const dispatch = useDispatch();
  const { palette, breakpoints } = useTheme();
  const isMobileOpened = useMediaQuery(breakpoints.between("sm", "md"));

  const initialValues = {
    description: "",
    postPicture: "",
  };

  async function handleSubmit(values, onSubmitProps) {
    try {
      if (!values.description && !values.postPicture) return;
      const formData = new FormData();
      if (values.description)
        formData.append("description", values.description);

      if (values.postPicture) {
        let modifiedPostPicture = new File(
          [values.postPicture],
          modifiedPicturePath(values.postPicture.path),
          {
            lastModified: values.postPicture.lastModified,
            type: values.postPicture.type,
          }
        );
        formData.append("postPicture", modifiedPostPicture);
        formData.append("picturePath", modifiedPostPicture.name);
      }

      await axios.post(`${urlOrigin}/posts`, formData, {
        headers: {
          Authorization: token,
        },
      });
      // this line of code will make the feedPosts comp render again after each submiting click
      dispatch(setIsPosting());
      // dispatch(setFeedPosts({ posts: allPosts.map((post) => post._id) }));
      setIsImage(false);
      onSubmitProps.resetForm();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <WidgetWrapper mb={1}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, setFieldValue, getFieldProps }) => (
          <Form>
            <FlexBetween gap={2}>
              <Avatar alt={fullName} src={userImg(picturePath)} />
              <TextField
                placeholder="what's on your mind..."
                size="small"
                sx={{ flexGrow: 1 }}
                InputProps={{
                  sx: { borderRadius: 5 },
                }}
                {...getFieldProps("description")}
              />
            </FlexBetween>

            <Collapse in={isDropzoneOpened}>
              <Dropzone
                accept={{ "image/png": [], "image/jpg": [], "image/jpeg": [] }}
                multiple={false}
                onDrop={(acceptedFiles) => {
                  setFieldValue("postPicture", acceptedFiles[0]);
                  setIsImage(true);
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <FlexBetween
                    sx={{
                      border: `1px dashed ${palette.primary.main}`,
                      p: 1,
                      mt: 2,
                      outline: "none",
                    }}
                  >
                    <Box
                      {...getRootProps()}
                      sx={{ flexGrow: 1, cursor: "pointer" }}
                    >
                      <input {...getInputProps()} />
                      {values.postPicture ? (
                        <FlexBetween>
                          <Typography>{values.postPicture.name}</Typography>
                          <IconButton>
                            <EditOutlinedIcon />
                          </IconButton>
                        </FlexBetween>
                      ) : (
                        <Typography color={palette.grey[600]}>
                          Add a picture here
                        </Typography>
                      )}
                    </Box>
                    {isImage && (
                      <Box>
                        <IconButton
                          onClick={() => {
                            setFieldValue("postPicture", null);
                            setIsImage(false);
                          }}
                        >
                          <DeleteOutlinedIcon />
                        </IconButton>
                      </Box>
                    )}
                  </FlexBetween>
                )}
              </Dropzone>
            </Collapse>

            <Divider sx={{ my: 2 }} />

            <FlexBetween>
              <Tooltip title="Image">
                <StyledButton onClick={() => setIsDropzoneOpened((s) => !s)}>
                  <ImageIcon />
                  {isMobileOpened && <Typography ml={0.5}>Image</Typography>}
                </StyledButton>
              </Tooltip>
              <Tooltip title="Clip">
                <StyledButton sx={{ textTransform: "initial" }}>
                  <ClipIcon />
                  {isMobileOpened && <Typography ml={0.5}>Clip</Typography>}
                </StyledButton>
              </Tooltip>
              <Tooltip title="Attachment">
                <StyledButton sx={{ textTransform: "initial" }}>
                  <AttachmentIcon />
                  {isMobileOpened && (
                    <Typography ml={0.5}>Attachment</Typography>
                  )}
                </StyledButton>
              </Tooltip>
              <Tooltip title="Audio">
                <StyledButton sx={{ textTransform: "initial" }}>
                  <RecordVoiceIcon />
                  {isMobileOpened && <Typography ml={0.5}>Audio</Typography>}
                </StyledButton>
              </Tooltip>

              <StyledButton
                type="submit"
                sx={{ textTransform: "initial", fontSize: 14 }}
              >
                Post
              </StyledButton>
            </FlexBetween>
          </Form>
        )}
      </Formik>
    </WidgetWrapper>
  );
}
