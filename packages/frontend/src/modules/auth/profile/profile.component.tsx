import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { userService } from '../services/user.service';
import EmailChangeForm from '../components/emailChangeForm/emailChangeForm.component';
import PasswordChangeForm from '../components/passwordChangeForm/passwordChangeForm.component';
import { StyledContainer } from '../../common/components/styled/container.styled';
import { StyledButton } from '../../common/components/styled/button.styled';
import { StyledLoadingSpinner } from '../../common/components/styled/loadingSpinner.styled';
import { StyledErrorMessage } from '../../common/components/styled/error.styled';
import * as Styled from './profile.styled';
import { APP_KEYS } from '../../common/consts';
import { IUser } from '../types/user.type';

interface ProfileProps {}

const Profile: FC<ProfileProps> = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: [APP_KEYS.QUERY_KEYS.USER],
    queryFn: () => userService.getUserInfo()
  });

  if (!data) {
    return <StyledErrorMessage>Something went wrong!</StyledErrorMessage>;
  }

  const user: IUser = data.data;

  const handleLogout = () => {
    localStorage.removeItem(APP_KEYS.STORAGE_KEYS.TOKEN);
    queryClient.setQueryData([APP_KEYS.QUERY_KEYS.USER], null);
    queryClient.setQueryData([APP_KEYS.QUERY_KEYS.TODOS], null);
    navigate(APP_KEYS.ROUTER_KEYS.ROOT);
  };

  if (isLoading) {
    return <StyledLoadingSpinner />;
  }

  if (error) {
    return <StyledErrorMessage>Something went wrong!</StyledErrorMessage>;
  }

  return (
    <StyledContainer>
      <Styled.Profile>
        <h2>User Profile:</h2>
        <h3>Email: {user.email}</h3>
        <h4>Change Email</h4>
        <EmailChangeForm user={user} />
        <h4>Change Password</h4>
        <PasswordChangeForm user={user} />
        <StyledButton $medium onClick={handleLogout}>
          Log Out
        </StyledButton>
      </Styled.Profile>
    </StyledContainer>
  );
};

export default Profile;
