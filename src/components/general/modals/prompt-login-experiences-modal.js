import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { Dialog, DialogTitle, DialogActions, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import PrimaryButton from '@general/buttons/primary-button';
import ModalService from '@services/modal.service'; 

export default function PromptLoginExperiencesModal() {
  const history = useHistory();
  const modalService = ModalService.getInstance();
  modalService.registerModal('promptLoginExperiences', toggleModal);

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
         To share your experience, please log in to an existing AllClear account, or create a new one. 
        </Title>
        <CloseButton aria-label="close" onClick={() => toggleModal(false)}>
          <CloseIcon />
        </CloseButton>
        <Actions disableSpacing={true}>
          <PrimaryButton  
            color={'primary'} 
            style={{boxShadow: '0px 0px 10px  5px lightgrey'}} 
            variant={'contained'} onClick={() => history.push('/sign-in')} 
          >
            Login 
          </PrimaryButton>
          <PrimaryButton  
            style={{ marginTop: 10, boxShadow: '0px 0px 10px  5px lightgrey' }} 
            onClick={() => history.push('/sign-up')}
          >
            Create Account 
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

const Actions = styled(DialogActions)`
  flex-direction: column;
`;

const CloseButton = styled(IconButton)`
  position: absolute;
  top: 0;
  right: 0;
  margin: 20px;
`;