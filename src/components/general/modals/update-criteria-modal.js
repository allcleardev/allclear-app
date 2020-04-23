import React, { useContext, useState } from 'react';
import BottomFab from '../buttons/bottom-fab';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import CardBlank from '../cards-unused/user-profile-card';
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import Select from '@material-ui/core/Select';
import SettingsSVG from '@svg/svg-settings';
import { CRITERIA_FORM_DATA } from './update-criteria-modal.constants';
import { AppContext } from '@contexts/app.context';
import ModalService from '@services/modal.service';
import FacilityService from '@services/facility.service';

export default function UpdateCriteriaModal() {
  // todo: this will probably have to move into App.js because it will be needed by all different parts of the app
  const modalService = ModalService.getInstance();
  modalService.registerModal('criteria', toggleModal);

  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');

  function toggleModal(isOpen, scrollType) {
    setOpen(isOpen);
    if (isOpen === true) {
      setScroll(scrollType);
    }
  }

  // todo: this
  // const { setAppState, appState } = useContext(AppContext);
  // function _onResetClicked(){
  //   let searchCriteria = {};
  //   forEach(appState.searchCriteria, (e, i) => {
  //     searchCriteria[i] = 'Any';
  //   });
  //
  //   setAppState({
  //     ...appState,
  //     searchCriteria,
  //     forceRefresh: true
  //   })
  // }

  return (
    <>
      <BottomFab
        handle_name={() => {
          toggleModal(true, 'body');
        }}
        class_name="btn-blue-bottom hide-mobile"
      >
        {SettingsSVG()}
      </BottomFab>
      <Dialog
        open={open}
        onClose={() => {
          toggleModal(false);
        }}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        style={{ zIndex: '5' }}
      >
        <DialogTitle
          className={'update-criteria-modal__title'}
          id="scroll-dialog-title">Update Search Criteria</DialogTitle>
        <DialogContent dividers={scroll === 'paper'} classes={{root: 'update-criteria-modal'}}>
          {/*<Button*/}
          {/*  onClick={_onResetClicked}*/}
          {/*  className="btn-big bg-primary color-white fontsize-16"*/}
          {/*>*/}
          {/*  Reset Search Criteria*/}
          {/*</Button>*/}

          <UpdateCriteria
            onClose={() => {
              toggleModal(false);
            }}
            onSubmit={() => {
              toggleModal(false);
            }}
          ></UpdateCriteria>
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

function UpdateCriteria({ onClose, onSubmit }) {
  useStyles();
  const { setAppState, appState } = useContext(AppContext);

  const [formValues, setFormValues] = React.useState(appState.searchCriteria);
  const formItems = _generateFormItems();

  const facilityService = FacilityService.getInstance();

  function _onSelectChanged(evt) {
    const currKey = evt.currentTarget.dataset.key;
    const currValue = evt.target.value;

    setFormValues({
      ...formValues,
      [currKey]: currValue,
    });
  }

  async function _onSubmitClicked() {
    let { latitude, longitude } = appState.person;

    // default to last submitted search
    latitude = latitude ? latitude : appState.map.latitude;
    longitude = longitude ? longitude : appState.map.longitude;

    // call API
    const result = await facilityService.search({
      ...formValues,
      from: {
        latitude,
        longitude,
        miles: 100,
      },
    });

    // update persistent app state
    setAppState({
      ...appState,
      map: {
        ...appState.map,
        locations: result.data.records || [],
      },
      searchCriteria: formValues,
      isListLoading: false,
      modalSubmitCount: appState.modalSubmitCount + 1,
      forceRefresh: !appState.forceRefresh,
    });

    // call parent submit function
    onSubmit();
  }

  function _generateFormItems() {
    return CRITERIA_FORM_DATA.map((formItem, i) => {
      let { title, options, key, inputType } = formItem;

      // account for options that come from an endpoint
      options = options ? options : appState.profile.options[key];
      options = options || [];

      return (
        <div key={i} className="sub-card">
          {/*REGULAR SELECT*/}
          {inputType === 'select' && singleSelect({ title, options, key })}
        </div>
      );
    });
  }

  // Form Options
  function singleSelect({ title, options, key }) {
    return (
      <>
        <h5 className="body-sub-title">{title}</h5>
        <FormControl variant="outlined" className="form-control">
          <Select
            labelId="demo-simple-select-outlined-label"
            displayEmpty
            className="select-white-back"
            value={formValues[key]}
            onChange={_onSelectChanged}
          >
            {options &&
              options.map((optionItem, i2) => {
                const { id, name } = optionItem;
                return (
                  <MenuItem key={i2} value={id} name={name} data-name={name} data-key={key}>
                    {name}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
      </>
    );
  }

  return (
    <>
      <CardBlank>
        {formItems}
      </CardBlank>

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
          <Button onClick={_onSubmitClicked} className="btn-big bg-primary color-white fontsize-16">
            Search
          </Button>
        </Grid>
        <Grid item xs={12} sm={5}>
          <Button onClick={onClose} className="btn-big bg-grey2 fontsize-16">
            Cancel
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
