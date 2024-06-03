import * as Yup from 'yup';

const Video = Yup.object().shape({
  videoTitle: Yup.string().required('Video title is required.'),
  videoUrl: Yup.string()
    .url('Please enter a valid URL for the video URL.')
    .required('Video URL is required.'),
  description: Yup.string().required('Video description is required.'),
  preview: Yup.object().shape({
    backGroundColor: Yup.string(),
    buttonColor: Yup.string(),
    textColor: Yup.string(),
  }),
  updateAndTrack: Yup.boolean().required(
    'Please indicate whether you want to update and track the video.'
  ),
});

export default Video;
