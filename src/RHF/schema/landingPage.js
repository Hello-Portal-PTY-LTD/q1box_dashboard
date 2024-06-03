import * as yup from 'yup'
const schema = yup
  .object()
  .shape({
    url: yup.string().required('Landing Page Url is required!'),
    url2: yup.string().required('Landing Page Url is required!'),
    url3: yup.string().required('Landing Page Url is required!'),
    updateAndTrack: yup.boolean(),
  })
  .required()

export default schema
