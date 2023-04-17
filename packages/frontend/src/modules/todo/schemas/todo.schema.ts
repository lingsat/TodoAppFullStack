import * as yup from 'yup';

export const createTodoSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  isPrivate: yup.bool().required()
});

export const updateTodoSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required()
});

export const searchTodoSchema = yup.object({
  searchValue: yup.string().required()
});
