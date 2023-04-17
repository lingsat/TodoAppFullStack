import React, { FC, useState } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { todoService } from '../../services/todo.service';
import Notification from '../../../common/components/notification/notification.component';
import { StyledButton } from '../../../common/components/styled/button.styled';
import * as Styled from './editTodo.styled';
import { APP_KEYS } from '../../../common/consts';
import { ITodoBody } from '../../types/todoBody.type';
import { ITodo } from '../../types/todo.type';
import { updateTodoSchema } from '../../schemas/todo.schema';

interface EditTodoProps {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
  isPrivate: boolean;
  onToggleEditForm: () => void;
}

const EditTodo: FC<EditTodoProps> = ({
  id,
  title,
  description,
  isComplete,
  isPrivate,
  onToggleEditForm
}) => {
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
    mutationFn: (updatedTodo: ITodoBody) => todoService.updateTodo(updatedTodo),
    onSuccess: ({ data: newTodo }: AxiosResponse<ITodo>) => {
      onToggleEditForm();
      queryClient.invalidateQueries([APP_KEYS.QUERY_KEYS.TODOS, newTodo.id]);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      handleOpenError(error.response?.data.message || 'Something went wrong!');
    }
  });

  const formik = useFormik({
    initialValues: {
      title,
      description
    },
    validationSchema: updateTodoSchema,
    onSubmit: async (values) => {
      mutate({
        id,
        title: values.title,
        description: values.description,
        isPrivate,
        isComplete
      });
    }
  });

  return (
    <Styled.EditTodo onSubmit={formik.handleSubmit}>
      <label htmlFor="title">
        New Title
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
        New Description
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
      <StyledButton $auto type="submit" disabled={!formik.isValid}>
        Edit Todo
      </StyledButton>
      <Notification isOpen={isErrorOpen} message={errorMessage} onClose={handleCloseError} />
    </Styled.EditTodo>
  );
};

export default EditTodo;
