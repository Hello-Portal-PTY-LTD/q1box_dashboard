import * as yup from 'yup';

const schema = yup.object().shape({
  url: yup
    .string()
    .required('Pdf Url or File is required')
    .typeError('Url Required for pdf or upload a file'),
  file: yup.mixed(),
});

export default schema;
