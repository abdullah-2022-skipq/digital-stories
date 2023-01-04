import { configureStore } from "@reduxjs/toolkit";
import auth from "./authSlice";
import userRegistration from "./userRegistrationSlice";
import multiStepForm from "./multiStepFormSlice";
import user from "./userSlice";

export const store = configureStore({
  reducer: { auth, userRegistration, multiStepForm, user },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({ serializableCheck: false }),
});
