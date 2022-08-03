import * as yup from 'yup';

const setupOneSchema = yup.object().shape({
  uname: yup.string().required('Username is required.'),
  name: yup.string().required('Full Name is required.'),
  email: yup.string().email().required('Email is required.'),
});

export {setupOneSchema};
