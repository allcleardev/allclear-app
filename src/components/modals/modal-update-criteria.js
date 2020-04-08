import React, {useContext, useEffect, useRef, useState} from 'react';
import FabBlueBottom from '../fabBlueBottom';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import CardBlank from '../../components/cardBlank';
import {Button, Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import SettingsSVG from '../svgs/svg-settings';
import {CRITERIA_FORM_DATA} from './modal-update-criteria.constants';
import {AppContext} from '../../contexts/App.context';


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
        <DialogTitle id="scroll-dialog-title">Update Search Criteria</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <UpdateCriteria></UpdateCriteria>
        </DialogContent>
      </Dialog>
    </>
  );
}


const useStyles = makeStyles((theme) => ({
  button: {
    width: '100%',
    margin: '15px 0',
    borderRadius: '10px',
    height: 48,
  },
  checked: {},
  track: {},
}));

function UpdateCriteria() {
  useStyles();
  const { appState, setAppState } = useContext(AppContext);


  function _generateFormItems() {
    return CRITERIA_FORM_DATA.map((formItem, i) => {
      const {title, options, key} = formItem;

      return (
        <div
          key={i}
          className="sub-card">
          <h5 className="body-sub-title">{title}</h5>
          <FormControl variant="outlined" className="form-control">
            <Select
              labelId="demo-simple-select-outlined-label"
              displayEmpty
              className="select-white-back"
              onChange={(evt) => {
                const z = appState;
                const y = setAppState;
                const currName = evt.currentTarget.dataset.name;
                const currKey = evt.currentTarget.dataset.key;
                const currValue = evt.target.value;
                setAppState({
                  ...appState,
                  searchCriteria: {
                    ...appState.searchCriteria,
                    [currKey]: currValue
                  }
                });
              }}
            >

              {options.map((optionItem, i2) => {
                const {value, text} = optionItem;
                return (<MenuItem
                  key={i2}
                  value={value}
                  name={text}
                  data-name={text}
                  data-key={key}
                >
                  {text}
                </MenuItem>);
              })}

            </Select>
          </FormControl>
        </div>
      );
    });

  }


  return (
    <>
      <CardBlank>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
        </div>

        {_generateFormItems()}

      </CardBlank>


      {/*Update Profile Checkbox*/}
      <Grid
        container
        style={{
          display: 'flex',
          justifyContent: 'space-around',

          padding: '20px 0px 0px 24px',
        }}
        className="btn-group"
      >
        <Grid item xs={12} sm={12}>
          <FormControlLabel
            control={
              <Checkbox
                // checked={state.checkedB}
                // onChange={handleChange}
                name="checkedB"
              />
            }
            style={{fontSize: 12, color: 'primary'}}
            label="Update Profile Upon Search"
            className="check-label"
          />
        </Grid>
      </Grid>

      <Grid
        container
        style={{
          display: 'flex',
          justifyContent: 'space-around',

          padding: '5px 0',
        }}
        className="btn-group"
      >
        <Grid item xs={12} sm={5}>
          <Button className="btn-big bg-primary color-white fontsize-16">Search</Button>
        </Grid>
        <Grid item xs={12} sm={5}>
          <Button className="btn-big bg-grey2 fontsize-16">Cancel</Button>
        </Grid>
      </Grid>
    </>
  );
}


