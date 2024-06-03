import * as Yup from 'yup';

const productSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  price: Yup.number()
    .required('Price is required')
    .typeError('Price Must be a Number')
    .positive('Price must be a positive number'),
  description: Yup.string(),
  image: Yup.mixed(),
});

const previewSchema = Yup.object().shape({
  bgColor: Yup.string().required(),
  textColor: Yup.string().required(),
  coverImage: Yup.mixed(),
});

const schema = Yup.object().shape({
  menuName: Yup.string(),
  storeLink: Yup.string().url(),
  buttonName: Yup.string(),
  shopName: Yup.string().required('Shop name is required'),
  preview: previewSchema,
  products: Yup.array()
    .of(productSchema)
    .min(1, 'At least one product is required'),
});

export default schema;
