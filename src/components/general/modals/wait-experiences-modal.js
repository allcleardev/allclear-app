import React, { useState } from 'react';
import styled from 'styled-components';

import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { ReactComponent as LockIcon } from '@assets/images/lock.svg';
import PrimaryButton from '@general/buttons/primary-button';
import ModalService from '@services/modal.service';

export default function WaitExperiencesModal() {
  const modalService = ModalService.getInstance();
  modalService.registerModal('promptWaitExperiences', toggleModal);

  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');

  function toggleModal(isOpen, scrollType) {
    setOpen(isOpen);
    if (isOpen === true) {
      setScroll(scrollType);
    }
  }

  return (
    <> 
      <Modal
        open={open}
        onClose={() => {
          toggleModal(false);
        }}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <Title>
          <LockIcon />
          You must wait!
        </Title>
        <CloseButton aria-label="close" onClick={() => toggleModal(false)}>
          <CloseIcon />
        </CloseButton>
        <Content dividers={scroll === 'paper'}>
          You must wait 24 hours before submitting another review of a Testing Site.
        </Content>
        <Actions disableSpacing={true}>
          <PrimaryButton color={'primary'} variant={'contained'} onClick={() => toggleModal(false)}>
            Back
          </PrimaryButton>
        </Actions>
      </Modal>
    </>
  );
}

const Modal = styled(Dialog)`
  .MuiPaper-rounded {
    border-radius: 30px;
    padding: 30px;
  }
`;

const Title = styled(DialogTitle)`
  h2 {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    font-size: 24px;
  }

  svg {
    margin-bottom: 48px;
  }
`;

const Content = styled(DialogContent)`
  overflow-y: hidden;
  margin-bottom: 46px;
  padding: 0 24px;
  text-align: center;
  letter-spacing: -0.41px;
  font-size: 16px;
`;

const Actions = styled(DialogActions)`
  flex-direction: column;
`;

const CloseButton = styled(IconButton)`
  position: absolute;
  top: 0;
  right: 0;
  margin: 20px;
`;
