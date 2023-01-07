import { configureStore } from "@reduxjs/toolkit";
import auth from "./authSlice";
import userRegistration from "./userRegistrationSlice";
import multiStepForm from "./multiStepFormSlice";
import user from "./userSlice";
import navbar from "./navbarSlice";

export const store = configureStore({
  reducer: { auth, userRegistration, multiStepForm, user, navbar },

  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({ serializableCheck: false }),
});
