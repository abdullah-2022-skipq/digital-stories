import * as yup from 'yup';

const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

const passwordRulesString = 'Use digits, lowercase and uppercase letters';

const passwordSchema = yup.object().shape({
  password: yup
    .string()
    .min(8)
    .matches(passwordRegEx, { message: passwordRulesString })
    .required('required'),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('required'),
});

export default passwordSchema;
