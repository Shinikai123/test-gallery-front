import * as yup from "yup";

export const schemaLogin = yup
  .object({
    email: yup.string().required("Email is required").email("Email is invalid"),
    password: yup.string().required("Password is required"),
  })
  .required();
