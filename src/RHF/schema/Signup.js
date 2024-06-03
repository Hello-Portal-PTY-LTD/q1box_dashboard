import * as Yup from "yup";

const schema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
  firstName: Yup.string()
    .trim() // Automatically remove leading and trailing spaces
    .required("First Name is required")
    .matches(/[a-zA-Z]/, "First Name is Invalid")
    .max(14, "First name should be less than 15 characters"),

  lastName: Yup.string()
    .trim() // Automatically remove leading and trailing spaces
    .required("Last Name is required")
    .matches(/[a-zA-Z]/, "Last Name is Invalid")
    .max(14, "Last name should be less than 15 characters"),

  password: Yup.string()
    .required("Password is required")
    .min(
      8,
      "Password: 8+ charcters, lowercase, uppercase, special character, number."
    )
    .matches(/[a-z]+/, "One lowercase character")
    .matches(/[A-Z]+/, "One uppercase character")
    .matches(/[@$!%*#?^&]+/, "One special character")
    .matches(/\d+/, "One number"),
});

export default schema;
