import * as yup from 'yup'

// const previewImageSchema = yup.object().shape({
//   preview: yup.string(),
//   file: yup.mixed(),
// });

const socialIconsSchema = yup.object().shape({
  url: yup.string().url('Invalid URL').required('URL is required'),
  type: yup.string().required('Icon type is required'),
  name: yup.string().required('Social name is required'),
})

const previewSchema = yup.object().shape({
  bgColor: yup.string().required(),
  iconsColor: yup.string().required(),
  textColor: yup.string().required(),
  coverImage: yup.mixed(),
  profileImage: yup.mixed(),
  profileName: yup.string().trim().max(15, 'Profile Name must be less then 16 characters'),
  summary: yup.string().trim(),
})

const schema = yup.object().shape({
  links: yup.array().of(socialIconsSchema.required()).required(),

  preview: previewSchema.required(),
  updateAndTrack: yup.boolean(),
})

export default schema
