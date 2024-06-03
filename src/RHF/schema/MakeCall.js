import * as yup from "yup";
const schema = yup
  .object()
  .shape({
    phone: yup
      .string()
      .required()
      .matches(
        /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
        "Invalid phone number format"
      )
      .max(15, "max 15 characters are allowed"),

    updateAndTrack: yup.boolean(),
  })
  .required();

export default schema;
