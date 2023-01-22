import * as yup from "yup";

export const schemaRegistration = yup
  .object({
    nickName: yup.string().required(),
    email: yup.string().required("Email is required").email("Email is invalid"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
    confirmPassword: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("password"), null], "Confirm Password does not match"),
  })
  .required();
