import Joi from 'joi';

export const userAuthSchema = Joi.object({
  email: Joi.string().email().required(),
  // Min 8 characters, one digit, one lowercase, one uppercase
  password: Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
});

export const emailSchema = Joi.object({
  email: Joi.string().email().required()
});

export const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/),
  newPassword: Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
});
