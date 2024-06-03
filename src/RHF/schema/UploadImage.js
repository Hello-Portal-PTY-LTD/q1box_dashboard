import * as yup from 'yup';

const schema = yup.object().shape({
  galleryName: yup.string(),
  files: yup.array().of(yup.mixed()).min(1, 'At least one file is required.'),
  updateAndTrack: false,
});

export default schema;
