import * as Yup from 'yup';

const Coupon = Yup.object().shape({
  buttonLink: Yup.string().url().required('Button Link is required'),
  buttonText: Yup.string().required('Button Text is required'),
  // validUntil: Yup.date()
  //   .typeError("Valid Until must be a valid date")
  //   .required("Valid Until date is required")
  //   .default(() => new Date()),
  couponNo: Yup.string().required('Coupon Number is required'),
  couponDetails: Yup.string().required('Coupon Details is required'),

  salePercentage: Yup.string()
    .min(0, 'Sale Percentage must be at least 0')
    .max(100, 'Sale Percentage must be at most 100')
    .required('Sale Percentage is required'),
  couponTime: Yup.object().shape({
    hours: Yup.number()
      .required('Hours are required')
      .min(0, 'Hours must be at least 0')
      .max(99, 'Hours must be at most 99'),
    minutes: Yup.number()
      .required('Minutes are required')
      .min(0, 'Minutes must be at least 0')
      .max(59, 'Minutes must be at most 59'),
    seconds: Yup.number()
      .required('Seconds are required')
      .min(0, 'Seconds must be at least 0')
      .max(59, 'Seconds must be at most 59'),
  }),
  preview: Yup.object().shape({
    bgColor: Yup.string().required('Background Color is required'),
    buttonColor: Yup.string().required('Button Color is required'),
    textColor: Yup.string().required('Text Color is required'),
    coverImage: Yup.mixed(),
  }),
  updateAndTrack: Yup.boolean().required('Update and Track is required'),
});

export default Coupon;
