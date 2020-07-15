import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { isNullOrUndefined } from '@util/general.helpers';

import PrimaryButton from '@general/buttons/primary-button';
import ModalService from '@services/modal.service';

export default function PromptLoginModal(props) {
  const history = useHistory();
  const modalService = ModalService.getInstance();
  modalService.registerModal(props.modalName, toggleModal);

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
          {props.icon}
          {props.titleText}
        </Title>
        <CloseButton aria-label="close" onClick={() => toggleModal(false)}>
          <CloseIcon />
        </CloseButton>
        {!isNullOrUndefined(props.contentText) && ( 
          <Content dividers={scroll === 'paper'}>
            {props.contentText}
          </Content>
        )}
        <Actions disableSpacing={true}>
          <LoginButton color={'primary'} variant={'contained'} onClick={() => history.push('/sign-in')}>
            Login
          </LoginButton>
          <CreateAccountButton style={{ marginTop: 10 }} onClick={() => history.push('/sign-up')}>
            Create Account
          </CreateAccountButton>
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

const LoginButton = styled(PrimaryButton)`
  box-shadow: 0px 0px 10px 5px lightGrey;
`;    

const CreateAccountButton = styled(PrimaryButton)`
  box-shadow: 0px 0px 10px 5px lightGrey; 
  margin-top: 10px;
`; 
