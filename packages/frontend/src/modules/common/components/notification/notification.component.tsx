import React, { FC } from 'react';
import { Alert, Snackbar } from '@mui/material';

interface NotificationProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
  sevirity?: 'error' | 'success';
}

const Notification: FC<NotificationProps> = ({ message, isOpen, onClose, sevirity = 'error' }) => (
  <Snackbar
    open={isOpen}
    autoHideDuration={2000}
    onClose={onClose}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
  >
    <Alert onClose={onClose} severity={sevirity}>
      {message}
    </Alert>
  </Snackbar>
);

export default Notification;
