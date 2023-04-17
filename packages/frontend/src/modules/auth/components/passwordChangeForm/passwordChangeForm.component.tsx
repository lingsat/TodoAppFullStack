import React, { FC, useState } from 'react';
import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import Notification from '../../../common/components/notification/notification.component';
import { userService } from '../../services/user.service';
import { StyledButton } from '../../../common/components/styled/button.styled';
import { StyledChangeForm } from '../styled/changeForm.styled';
import { changePasswordSchema } from '../../schemas/user.schema';
import { IUserBody } from '../../types/userBody.type';
import { IUser } from '../../types/user.type';

interface PasswordChangeFormProps {
  user: IUser;
}

const PasswordChangeForm: FC<PasswordChangeFormProps> = ({ user }) => {
  // Error notification
  const [message, setMessage] = useState<string>('');
  const [isErrorOpen, setIsErrorOpen] = useState<boolean>(false);
  const [sevirity, setSevetiry] = useState<'error' | 'success'>('error');

  const handleOpenNotification = (mesg: string, sev: 'error' | 'success' = 'error') => {
    setSevetiry(sev);
    setMessage(mesg);
    setIsErrorOpen(true);
  };

  const handleCloseNotification = () => {
    setIsErrorOpen(false);
  };

  const { mutate } = useMutation({
    mutationFn: (loginUserFormData: IUserBody) => userService.updateUserPassword(loginUserFormData),
    onSuccess: () => {
      handleOpenNotification('Password changed', 'success');
    },
    onError: (error: AxiosError<{ message: string }>) => {
      handleOpenNotification(error.response?.data.message || 'Something went wrong!');
    }
  });

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: ''
    },
    validationSchema: changePasswordSchema,
    onSubmit: ({ oldPassword, newPassword }, actions) => {
      const { id } = user;
      mutate({ id, oldPassword, newPassword });
      actions.resetForm();
    }
  });

  return (
    <StyledChangeForm onSubmit={formik.handleSubmit}>
      <label htmlFor="oldPassword">
        Old Password
        <input
          type="password"
          name="oldPassword"
          id="oldPassword"
          value={formik.values.oldPassword}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
      </label>
      <p>
        {formik.touched.oldPassword && formik.errors.oldPassword ? formik.errors.oldPassword : ''}
      </p>
      <label htmlFor="newPassword">
        New Password
        <input
          type="password"
          name="newPassword"
          id="newPassword"
          value={formik.values.newPassword}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
      </label>
      <p>
        {formik.touched.newPassword && formik.errors.newPassword ? formik.errors.newPassword : ''}
      </p>
      <StyledButton $auto type="submit" disabled={!(formik.dirty && formik.isValid)}>
        Change Password
      </StyledButton>
      <Notification
        isOpen={isErrorOpen}
        message={message}
        onClose={handleCloseNotification}
        sevirity={sevirity}
      />
    </StyledChangeForm>
  );
};

export default PasswordChangeForm;
