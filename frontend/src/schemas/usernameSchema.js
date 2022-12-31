import * as yup from "yup";

export const usernameSchema = yup.object().shape({
  username: yup.string().max(20).required("required"),
});
