import React from 'react';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import {
  DeleteGroupMutation,
  DeleteGroupMutationVariables,
} from 'generated/graphql';
import { useTheme } from 'styled-components';

import Button from 'components/input/Button';
import { DELETE_GROUP } from 'graphql/mutations/SharedGroup';

import {
  ButtonsWrapper,
  ConfirmationText,
  DeleteAccountTitle,
  DeleteModalWrapper,
} from './styles/DeleteAccount';

export type DeleteGroupModalContentProps = {
  groupId: number;
  groupName: string;
  onDeleted: () => Promise<unknown>;
  onRequestClose?: () => void;
};

const DeleteGroupModalContent = ({
  groupId,
  groupName,
  onDeleted,
  onRequestClose = () => {},
}: DeleteGroupModalContentProps) => {
  const theme = useTheme();
  const [deleteGroup, { loading: deleting }] = useMutation<
    DeleteGroupMutation,
    DeleteGroupMutationVariables
  >(DELETE_GROUP);

  const handleDelete = async () => {
    try {
      await deleteGroup({ variables: { groupId } });
      onRequestClose();
      await onDeleted();
    } catch {
      toast('Could not delete the group.');
    }
  };

  return (
    <DeleteModalWrapper>
      <DeleteAccountTitle>Delete &quot;{groupName}&quot;?</DeleteAccountTitle>
      <ConfirmationText>
        This removes the group and its members. This action cannot be undone.
      </ConfirmationText>
      <ButtonsWrapper>
        <Button
          color={theme.dark3}
          handleClick={onRequestClose}
          margin="0 16px 0 0"
        >
          Cancel
        </Button>
        <Button color={theme.red} handleClick={handleDelete} loading={deleting}>
          Delete
        </Button>
      </ButtonsWrapper>
    </DeleteModalWrapper>
  );
};

export default DeleteGroupModalContent;
