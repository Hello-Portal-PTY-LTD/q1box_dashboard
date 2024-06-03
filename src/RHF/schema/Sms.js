import * as yup from 'yup';
const schema = yup
  .object()
  .shape({
    phone: yup.string().required(),
    message: yup.string().required(),
    updateAndTrack: yup.boolean(),
  })
  .required();

export default schema;
