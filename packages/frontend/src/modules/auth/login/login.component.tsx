import React, { FC, useState } from 'react';
import { AxiosResponse, AxiosError } from 'axios';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { userService } from '../services/user.service';
import Notification from '../../common/components/notification/notification.component';
import { StyledContainer } from '../../common/components/styled/container.styled';
import { StyledButton } from '../../common/components/styled/button.styled';
import { StyledAuthForm } from '../components/styled/authForm.styled';
import { APP_KEYS } from '../../common/consts';
import { loginUserSchema } from '../schemas/user.schema';
import { IUserBody } from '../types/userBody.type';
import { IUser } from '../types/user.type';

interface LoginProps {}

const Login: FC<LoginProps> = () => {
  const navigate = useNavigate();
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
    mutationFn: (loginUserFormData: IUserBody) => userService.loginUser(loginUserFormData),
    onSuccess: ({ data: user }: AxiosResponse<IUser>) => {
      localStorage.setItem(APP_KEYS.STORAGE_KEYS.TOKEN, `Bearer ${user.token}` || '');
      queryClient.invalidateQueries([APP_KEYS.QUERY_KEYS.USER]);
      navigate(APP_KEYS.ROUTER_KEYS.TODOS_LIST);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      handleOpenError(error.response?.data.message || 'Something went wrong!');
    }
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: loginUserSchema,
    onSubmit: ({ email, password }, actions) => {
      mutate({ email, password });
      actions.resetForm();
    }
  });

  return (
    <StyledContainer>
      <StyledAuthForm onSubmit={formik.handleSubmit}>
        <h2>Login</h2>
        <label htmlFor="email">
          Email
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
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            id="password"
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </label>
        <p>{formik.touched.password && formik.errors.password ? formik.errors.password : ''}</p>
        <fieldset>
          <StyledButton as={Link} $small to={APP_KEYS.ROUTER_KEYS.ROOT}>
            Back
          </StyledButton>
          <StyledButton $small type="submit" disabled={!(formik.dirty && formik.isValid)}>
            Login
          </StyledButton>
        </fieldset>
      </StyledAuthForm>
      <Notification isOpen={isErrorOpen} message={errorMessage} onClose={handleCloseError} />
    </StyledContainer>
  );
};

export default Login;
