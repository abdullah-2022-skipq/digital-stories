import * as yup from "yup";

export const contactDetailsSchema = yup.object().shape({
  name: yup.string().max(40).required("required"),
  email: yup.string().email("Please enter a valid email").required("required"),
});
