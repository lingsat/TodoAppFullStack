import React, { FC, useState } from 'react';
import { AxiosResponse, AxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFormik } from 'formik';
import Notification from '../../../common/components/notification/notification.component';
import { userService } from '../../services/user.service';
import { StyledButton } from '../../../common/components/styled/button.styled';
import { StyledChangeForm } from '../styled/changeForm.styled';
import { changeEmailSchema } from '../../schemas/user.schema';
import { APP_KEYS } from '../../../common/consts';
import { IUser } from '../../types/user.type';
import { IUserBody } from '../../types/userBody.type';

interface EmailChangeFormProps {
  user: IUser;
}

const EmailChangeForm: FC<EmailChangeFormProps> = ({ user }) => {
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
    mutationFn: (loginUserFormData: IUserBody) => userService.updateUserEmail(loginUserFormData),
    onSuccess: (data: AxiosResponse<IUser>) => {
      queryClient.setQueryData([APP_KEYS.QUERY_KEYS.USER], data);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      handleOpenError(error.response?.data.message || 'Something went wrong!');
    }
  });

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: changeEmailSchema,
    onSubmit: ({ email }, actions) => {
      const { id } = user;
      mutate({ id, email });
      actions.resetForm();
    }
  });

  return (
    <StyledChangeForm onSubmit={formik.handleSubmit}>
      <label htmlFor="email">
        New Email
        <input
          type="email"
          name="email"
          id="email"
          value={formik.values.email}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
      </label>
      <p>{formik.touched.email && formik.errors.email ? formik.errors.email : ''}</p>
      <StyledButton $auto type="submit" disabled={!(formik.dirty && formik.isValid)}>
        Change Email
      </StyledButton>
      <Notification isOpen={isErrorOpen} message={errorMessage} onClose={handleCloseError} />
    </StyledChangeForm>
  );
};

export default EmailChangeForm;
