import { configureStore } from "@reduxjs/toolkit";
import auth from "./authSlice";
import userRegistration from "./userRegistrationSlice";

export const store = configureStore({ reducer: { auth, userRegistration } });
