import * as yup from "yup";

export const schemaRegistration = yup
  .object({
    user_name: yup
      .string()
      .required("Name is required")
      .trim("Name cannot include leading and trailing spaces"),
    user_email: yup.string().required("Email is required").email("Email is invalid"),
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
