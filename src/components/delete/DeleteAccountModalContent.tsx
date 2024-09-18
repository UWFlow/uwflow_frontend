import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useTheme } from 'styled-components';

import Button from 'components/input/Button';
import { BACKEND_ENDPOINT, USER_ACCOUNT_ENDPOINT } from 'constants/Api';
import { DEFAULT_ERROR, DELETE_ACCOUNT_SUCCESS } from 'constants/Messages';
import { makeAuthenticatedDELETERequest } from 'utils/Api';

import {
  ButtonsWrapper,
  ConfirmationText,
  DeleteAccountTitle,
  DeleteModalWrapper,
} from './styles/DeleteAccount';

export type DeleteAccountModalContentProps = {
  onRequestClose?: () => void;
};

const DeleteAccountModalContent = ({
  onRequestClose = () => {},
}: DeleteAccountModalContentProps) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);

  const notifyDeleted = () => toast(DELETE_ACCOUNT_SUCCESS);
  const notifyError = () => toast(DEFAULT_ERROR);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const [response, status] = await makeAuthenticatedDELETERequest(
        `${BACKEND_ENDPOINT}${USER_ACCOUNT_ENDPOINT}`,
        {},
      );

      if (status === 200 || status === 204) {
        notifyDeleted();
        localStorage.clear();
        window.location.href = '/';
        onRequestClose();
      } else {
        notifyError();
      }
    } catch (err) {
      notifyError();
    } finally {
      setLoading(false);
    }
  };

  return (
    <DeleteModalWrapper>
      <DeleteAccountTitle>Delete your account</DeleteAccountTitle>
      <ConfirmationText>
        Your reviews will be anonymized and the rest of your account data will
        be permanently deleted.
      </ConfirmationText>
      <ConfirmationText>
        Are you sure you want to continue? This action cannot be undone.
      </ConfirmationText>
      <ButtonsWrapper>
        <Button
          color={theme.dark3}
          handleClick={onRequestClose}
          margin="0 16px 0 0"
        >
          Cancel
        </Button>
        <Button color={theme.red} handleClick={handleDelete} disabled={loading}>
          {loading ? 'Deleting...' : 'Delete'}
        </Button>
      </ButtonsWrapper>
    </DeleteModalWrapper>
  );
};

export default DeleteAccountModalContent;
