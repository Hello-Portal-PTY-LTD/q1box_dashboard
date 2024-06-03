import * as yup from 'yup';
const formValidation = yup
  .object()
  .shape({
    url: yup.string().required(),
    updateAndTrack: yup.boolean(),
  })
  .required();

export default formValidation;
