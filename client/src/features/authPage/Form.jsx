import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "./authSlice";

import { useFormik } from "formik";
import DropZone from "react-dropzone";
import * as Yup from "yup";
import axios from "axios";

import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Alert,
  Collapse,
  Typography,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { FlexBetween } from "../../components/FlexBetween";

const registerSchema = Yup.object({
  firstName: Yup.string()
    .required("Required")
    .min(2, "Must be 2 characters at least")
    .max(10, "Must be 10 characters or less"),
  lastName: Yup.string()
    .required("Required")
    .min(2, "Must be 2 characters at least")
    .max(15, "Must be 15 characters or less"),
  email: Yup.string().required("Required").email("invalid email"),
  password: Yup.string().required("Required").min(8, "Pass a strong password"),
  occupation: Yup.string().required("Required"),
  location: Yup.string().required("Required"),
  avatar: Yup.string().required("Required"),
});
const loginSchema = Yup.object({
  email: Yup.string().required("Required").email("invalid email"),
  password: Yup.string().required("Required").min(8, "Pass your real password"),
});
const InitialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  occupation: "",
  location: "",
  avatar: "",
};

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

// to solve the problem of having the same values in both forms,
// make the fields that are connected and seems alike visible always,
// and the other fields visible only if the current page is the register page.

export default function MyForm({ urlOrigin }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [isAlertOpened, setIsAlertOpened] = useState(false);
  const [alterMsg, setAlertMsg] = useState(" ");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { palette } = useTheme();

  async function register(values, onSubmitProps) {
    try {
      const formData = new FormData();

      for (let value in values) {
        formData.append(value, values[value]);
      }

      // I used teh formData API to add more fields to the form before sending it
      formData.append("picturePath", modifiedPicturePath(values.avatar.path));

      let userData = await axios.post(`${urlOrigin}/auth/register`, formData);

      // I have to handle the server validation errors/success with this data
      console.log(userData);

      if (userData) {
        onSubmitProps.resetForm();
        setIsRegister(false);
      }
    } catch (error) {
      console.error(error);

      setAlertMsg(error.response.data.message);
      setIsAlertOpened(true);
    }
  }

  async function login({ email, password }, onSubmitProps) {
    try {
      const userData = await axios.post(`${urlOrigin}/auth/login`, {
        email,
        password,
      });

      if (userData) {
        const info = {
          user: userData.data.userInfo,
          token: `Bearer ${userData.data.token}`,
        };

        dispatch(setLogin(info));
        onSubmitProps.resetForm();
        navigate("/home");
      }
    } catch (error) {
      console.log(error);

      setAlertMsg(error.response.data.message);
      setIsAlertOpened(true);
    }
  }

  const {
    values,
    errors,
    touched,
    getFieldProps,
    setFieldValue,
    resetForm,
    isSubmiting,
    handleSubmit,
  } = useFormik({
    initialValues: InitialValues,
    validationSchema: isRegister ? registerSchema : loginSchema,
    onSubmit: async function (values, onSubmitProps) {
      if (isRegister) await register(values, onSubmitProps);
      else await login(values, onSubmitProps);
    },
  });

  // to make the formik trackes all errors, give it one intialVvalues
  // that have all the forms (login/register) potential values.
  // This is because a problem in the initialValues prop from the Formik

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            p: 2,
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            rowGap: 0.5,
            columnGap: 1,
          }}
        >
          <Collapse in={isAlertOpened} sx={{ gridColumn: "span 4", mb: 1 }}>
            <Alert
              sx={{ alignItems: "center" }}
              severity="error"
              action={
                <IconButton
                  onClick={() => setIsAlertOpened(false)}
                  color="inherit"
                >
                  <CloseIcon />
                </IconButton>
              }
            >
              {alterMsg}
            </Alert>
          </Collapse>

          {isRegister && (
            <>
              <TextField
                sx={{ gridColumn: { xs: "span 4", sm: "span 2" } }}
                name="firstName"
                type="text"
                label="First Name"
                error={errors.firstName && touched.firstName}
                {...getFieldProps("firstName")}
                helperText={
                  errors.firstName && touched.firstName ? errors.firstName : " "
                }
              />
              <TextField
                sx={{ gridColumn: { xs: "span 4", sm: "span 2" } }}
                name="lastName"
                type="text"
                label="Last Name"
                error={errors.lastName && touched.lastName}
                {...getFieldProps("lastName")}
                helperText={
                  errors.lastName && touched.lastName ? errors.lastName : " "
                }
              />
              <TextField
                sx={{ gridColumn: "span 4" }}
                name="occupation"
                type="text"
                label="Occupation"
                error={errors.occupation && touched.occupation}
                {...getFieldProps("occupation")}
                helperText={
                  errors.occupation && touched.occupation
                    ? errors.occupation
                    : " "
                }
              />
              <TextField
                sx={{ gridColumn: "span 4" }}
                name="location"
                type="text"
                label="Location"
                error={errors.location && touched.location}
                {...getFieldProps("location")}
                helperText={
                  errors.location && touched.location ? errors.location : " "
                }
              />
              <Box
                sx={{
                  gridColumn: "span 4",
                  mb: 2.5,
                  border: `1px solid ${
                    errors.avatar && touched.avatar
                      ? palette.error.main
                      : palette.grey[400]
                  }`,
                  borderRadius: 1,
                  p: "1rem",
                  position: "relative",
                  "&:hover": {
                    borderColor:
                      errors.avatar && touched.avatar
                        ? palette.error.main
                        : palette.grey[900],
                  },
                }}
              >
                <DropZone
                  accept={{
                    "image/png": [],
                    "image/jpeg": [],
                    "image/jpg": [],
                  }}
                  multiple={false}
                  onDrop={(acceptedFiles) => {
                    // this set the avatar key to a string even is the passed values is an obj
                    setFieldValue("avatar", acceptedFiles[0]);
                  }}
                >
                  {({ getRootProps, getInputProps }) => (
                    <Box
                      {...getRootProps()}
                      sx={{
                        border: `1px dashed ${palette.primary.main}`,
                        p: 1,
                        cursor: "pointer",
                      }}
                    >
                      <input {...getInputProps()} />
                      {values.avatar ? (
                        <FlexBetween>
                          <Typography>{values.avatar.name}</Typography>
                          <IconButton>
                            <EditOutlinedIcon />
                          </IconButton>
                        </FlexBetween>
                      ) : (
                        <Typography color={palette.grey[600]}>
                          Add picture here
                        </Typography>
                      )}
                    </Box>
                  )}
                </DropZone>
                <Typography
                  variant="caption"
                  position="absolute"
                  bottom="-1.2rem"
                  color={palette.error.main}
                >
                  {errors.avatar && touched.avatar ? errors.avatar : " "}
                </Typography>
              </Box>
            </>
          )}
          <TextField
            sx={{ gridColumn: "span 4" }}
            name="email"
            type="email"
            label="Email"
            error={errors.email && touched.email}
            {...getFieldProps("email")}
            helperText={errors.email && touched.email ? errors.email : " "}
          />
          <TextField
            sx={{ gridColumn: "span 4" }}
            name="password"
            label="Password"
            type={isPasswordVisible ? "text" : "password"}
            error={errors.password && touched.password}
            {...getFieldProps("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton
                    onClick={() => setIsPasswordVisible((preV) => !preV)}
                    onMouseDown={() => setIsPasswordVisible((preV) => !preV)}
                    edge="end"
                  >
                    {isPasswordVisible ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            helperText={
              errors.password && touched.password ? errors.password : " "
            }
          />
          <Box sx={{ gridColumn: "span 4", mt: 1 }}>
            <Button
              fullWidth
              type="submit"
              variant="outlined"
              size="large"
              disabled={isSubmiting}
            >
              {isRegister ? "Register" : "Log in"}
            </Button>
            <Typography>
              {isRegister
                ? `Already have an account?`
                : `Do not you have an account?`}
              <Button
                onClick={() => {
                  setIsAlertOpened(false);
                  setIsRegister((preV) => !preV);
                  setIsPasswordVisible(false);
                  resetForm();
                }}
              >
                {isRegister ? "Log in." : "Create one."}
              </Button>
            </Typography>
          </Box>
        </Box>
      </form>
    </>
  );
}
