import * as yup from 'yup'

const schema = yup.object().shape({
  bulkData: yup.array().of(yup.mixed()).min(1, 'File required to make QR batch'),
  bulkName: yup.string(),
})

export default schema
