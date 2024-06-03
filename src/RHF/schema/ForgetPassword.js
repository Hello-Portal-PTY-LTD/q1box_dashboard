import * as Yup from 'yup'

const schema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email address'),

})

export default schema
