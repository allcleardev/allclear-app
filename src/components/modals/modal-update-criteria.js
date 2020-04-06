import React, {useEffect, useRef, useState} from 'react';
import FabBlueBottom from '../fabBlueBottom';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import UpdateCriteria from '../../pages/updateTestingCriteriaModal';
import SettingsSVG from '../svgs/svg-settings';

export default function UpdateCriteriaModal() {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const {current: descriptionElement} = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <>
      <FabBlueBottom handle_name={handleClickOpen('body')} class_name="btn-blue-bottom hide-mobile">
        {SettingsSVG()}
      </FabBlueBottom>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        style={{zIndex: '5'}}
      >
        <DialogTitle id="scroll-dialog-title">Update Testing Center Criteria</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <UpdateCriteria></UpdateCriteria>
        </DialogContent>
      </Dialog>
    </>
  );
}
