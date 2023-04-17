import * as yup from 'yup';

export const loginUserSchema = yup.object({
  email: yup.string().email().required(),
  password: yup
    .string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      'Min 8 chars, 1 digit, 1 lowercase, 1 uppercase'
    )
    .required()
});

export const registerUserSchema = yup.object({
  email: yup.string().email().required(),
  password: yup
    .string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      'Min 8 chars, 1 digit, 1 lowercase, 1 uppercase'
    )
    .required(),
  confirmPass: yup
    .string()
    .oneOf([yup.ref('password'), ''], 'Passwords must match')
    .required()
});

export const changeEmailSchema = yup.object({
  email: yup.string().email().required()
});

export const changePasswordSchema = yup.object({
  oldPassword: yup
    .string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      'Min 8 chars, 1 digit, 1 lowercase, 1 uppercase'
    )
    .required(),
  newPassword: yup
    .string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      'Min 8 chars, 1 digit, 1 lowercase, 1 uppercase'
    )
    .required()
});
