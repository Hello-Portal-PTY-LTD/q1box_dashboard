import * as yup from 'yup';
const schema = yup
  .object()
  .shape({
    text: yup.string().required(),
    updateAndTrack: yup.boolean(),
  })
  .required();

export default schema;
