import * as yup from "yup";

const BusinessCard = yup.object().shape({
  firstName: yup
    .string()
    .trim()
    .required("First Name Required")
    .max(14, "First name should be less than 15 characters"),
  lastName: yup
    .string()
    .trim()
    .required("Last Name Required")
    .max(14, "Last name should be less than 15 characters "),

  email: yup.string().email("Email must be a valid email address"),
  workPhone: yup.string(),
  mobilePhone: yup
    .string()
    .required("Mobile Number Is Required")
    .matches(
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
      "Invalid phone number format"
    ), // Validates for numerical value
  companyName: yup.string(),
  jobTitle: yup.string(),
  street: yup.string(),
  city: yup.string(),
  zipcode: yup.string(),
  website: yup.string().url("Invalid URL"),
  country: yup.string(),
  state: yup.string(),
  summary: yup.string(),
});

export default BusinessCard;
