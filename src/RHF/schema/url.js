import * as yup from 'yup'

const urlValidation = yup
  .object()
  .shape({
    url: yup
      .string()
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        'Enter correct url!'
      )
      .required('Url is required!'),
    updateAndTrack: yup.boolean(),
  })
  .required()

export default urlValidation
