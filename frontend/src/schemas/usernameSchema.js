import * as yup from 'yup';

const usernameSchema = yup.object().shape({
  username: yup.string().max(20).required('required'),
});

export default usernameSchema;
