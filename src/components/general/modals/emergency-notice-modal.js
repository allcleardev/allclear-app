import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import ModalService from '@services/modal.service';
import Button from '@material-ui/core/Button';

export default function EmergencyNoticeModal() {
  // todo: this will probably have to move into App.js because it will be needed by all different parts of the app
  const modalService = ModalService.getInstance();
  modalService.registerModal('emergencyNotice', toggleModal);

  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');

  function toggleModal(isOpen, scrollType) {
    setOpen(isOpen);
    if (isOpen === true) {
      setScroll(scrollType);
    }
  }

  return (
    <Dialog
      open={open}
      onClose={() => toggleModal(false)}
      scroll={scroll}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      style={{ zIndex: '5' }}
    >
      <div style={{ padding: '20px' }}>
        <DialogTitle id="scroll-dialog-title">If this is a medical emergency, stop and dial 911.</DialogTitle>
        <DialogContent
          dividers={scroll === 'paper'}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => toggleModal(false)}
          >
            This Is Not An Emergency
          </Button>
        </DialogContent>
      </div>
    </Dialog>
  );
}