import * as yup from 'yup';
const sendEmailValidation = yup
  .object()
  .shape({
    email: yup
      .string()
      .email('Email must be a valid email address')
      .required('Email is required'),
    subject: yup.string().required(),
    message: yup.string().required(),
    updateAndTrack: yup.boolean(),
  })
  .required();

export default sendEmailValidation;
