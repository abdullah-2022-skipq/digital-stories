import * as yup from 'yup';

const contactDetailsSchema = yup.object().shape({
  name: yup.string().max(30).required('required'),
  email: yup.string().email('Please enter a valid email').required('required'),
});

export default contactDetailsSchema;
