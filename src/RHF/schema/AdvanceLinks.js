import * as yup from 'yup'

const linkSchema = yup.object().shape({
  type: yup.string(),
  url: yup.string().url().required('Url is required'),
  name: yup.string().required('Name is required'),
})

// const previewImageSchema = yup.object().shape({
//   preview: yup.string(),
//   file: yup.mixed(),
// })

const previewSchema = yup.object().shape({
  bgColor: yup.string().required(),
  fontFamily: yup.string().required(),
  iconsColor: yup.string().required(),
  textColor: yup.string().required(),
  coverImage: yup.mixed(),
  name: yup.string().trim().max(14, 'Maximum Name characters must be less than 15 characters'),
  profileImage: yup.mixed(),
})

const AdvanceLinksSchema = yup.object().shape({
  links: yup.array().of(linkSchema.required()).required(),
  preview: previewSchema,
  updateAndTrack: yup.boolean(),
})

export default AdvanceLinksSchema
