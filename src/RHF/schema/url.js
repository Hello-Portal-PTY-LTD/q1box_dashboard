import * as yup from 'yup'

const urlValidation = yup
  .object()
  .shape({
    url: yup
      .string()
      .matches(
        /^(https?:\/\/)(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(:[0-9]{1,5})?(\/[a-zA-Z0-9#\/]*)?(\?[a-zA-Z0-9-_=&%]*)?$/,
        'Enter a valid URL!'
      )
      .required('URL is required!'),
    updateAndTrack: yup.boolean(),
  })
  .required()

export default urlValidation
