import * as yup from 'yup';

const signInSchema = yup.object().shape({
  username: yup.string().max(20).required('required'),
  password: yup.string().min(8).required('invalid password '),
});

export default signInSchema;
