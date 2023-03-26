import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../authState/authSlice";
import homeReducer from "../features/homePage/homeSlice";
import loginReducer from "../features/loginPage/loginSlice";
import profileReducer from "../features/profilePage/profileSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    home: homeReducer,
    login: loginReducer,
    profile: profileReducer,
  },
});
