import { configureStore } from "@reduxjs/toolkit";
import auth from "./authSlice";
import userRegistration from "./userRegistrationSlice";
import multiStepForm from "./multiStepFormSlice";

export const store = configureStore({
  reducer: { auth, userRegistration, multiStepForm },
});
