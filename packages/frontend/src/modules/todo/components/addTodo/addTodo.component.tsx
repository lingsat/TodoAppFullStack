import React, { FC, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useFormik } from 'formik';
import { todoService } from '../../services/todo.service';
import Notification from '../../../common/components/notification/notification.component';
import { StyledButton } from '../../../common/components/styled/button.styled';
import * as Styled from './addTodo.styled';
import { APP_KEYS } from '../../../common/consts';
import { createTodoSchema } from '../../schemas/todo.schema';
import { ITodoBody } from '../../types/todoBody.type';
import { IUser } from '../../../auth/types/user.type';

interface AddTodoProps {}

const AddTodo: FC<AddTodoProps> = () => {
  // Error notification
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isErrorOpen, setIsErrorOpen] = useState<boolean>(false);

  const handleOpenError = (message: string) => {
    setErrorMessage(message);
    setIsErrorOpen(true);
  };

  const handleCloseError = () => {
    setIsErrorOpen(false);
  };

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (newTodoFormData: ITodoBody) => todoService.addTodo(newTodoFormData),
    onSuccess: () => {
      queryClient.invalidateQueries([APP_KEYS.QUERY_KEYS.TODOS]);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      handleOpenError(error.response?.data.message || 'Something went wrong!');
    }
  });

  const userData = queryClient.getQueryData<{ data: IUser }>([APP_KEYS.QUERY_KEYS.USER]);
  const userId: number | undefined = userData?.data.id;

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      isPrivate: false
    },
    validationSchema: createTodoSchema,
    onSubmit: ({ title, description, isPrivate }, actions) => {
      mutate({ title, description, isPrivate, userId });
      actions.resetForm();
    }
  });

  return (
    <Styled.AddTodo onSubmit={formik.handleSubmit}>
      <label htmlFor="title">
        Title
        <input
          type="text"
          name="title"
          id="title"
          value={formik.values.title}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
      </label>
      <p>{formik.touched.title && formik.errors.title ? formik.errors.title : ''}</p>
      <label htmlFor="description">
        Description
        <textarea
          name="description"
          id="description"
          cols={30}
          rows={4}
          value={formik.values.description}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
      </label>
      <p>
        {formik.touched.description && formik.errors.description ? formik.errors.description : ''}
      </p>
      <fieldset>
        <label htmlFor="isPrivate">
          Private
          <input
            type="checkbox"
            name="isPrivate"
            id="isPrivate"
            checked={formik.values.isPrivate}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </label>
      </fieldset>
      <StyledButton $auto type="submit" disabled={!(formik.dirty && formik.isValid)}>
        Add New Todo
      </StyledButton>
      <Notification isOpen={isErrorOpen} message={errorMessage} onClose={handleCloseError} />
    </Styled.AddTodo>
  );
};

export default AddTodo;
