import * as yup from 'yup';

const schema = yup.object().shape({
  googlePlayUrl: yup.string().url(),
  appStoreUrl: yup.string().url(),
});

export default schema;
