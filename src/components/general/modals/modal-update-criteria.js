import React, {useContext, useState} from 'react';
import BottomFab from '../buttons/bottom-fab';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import CardBlank from '../cards-unused/user-profile-card';
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import SettingsSVG from '@svg/svg-settings';
import { CRITERIA_FORM_DATA } from './modal-update-criteria.constants';
import { AppContext } from '../../../contexts/app.context';
import ModalService from '../../../services/modal.service';
import FacilityService from '../../../services/facility.service';

export default function UpdateCriteriaModal() {
  // "DEPENDENCY INJECTION Section"
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
        <DialogTitle id="scroll-dialog-title">Update Search Criteria</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
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


function UpdateCriteria({onClose, onSubmit}) {
  useStyles();
  const {setAppState, appState} = useContext(AppContext);

  const [formValues, setFormValues] = React.useState(appState.searchCriteria);
  const formItems = _generateFormItems();

  //eslint-disable-next-line
  const facilityService = FacilityService.getInstance();

  function _onSelectChanged(evt){

    const currKey = evt.currentTarget.dataset.key;
    const currValue = evt.target.value;

    setFormValues({
      ...formValues,
      [currKey]: currValue
    });

  }

  async function _onSubmitClicked(){
    const {latitude, longitude} = appState.person;

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
      isListLoading: false
    });

    // call parent submit function
    onSubmit();
  }

  function _generateFormItems() {
    return CRITERIA_FORM_DATA.map((formItem, i) => {
      const { title, options, key } = formItem;

      return (
        <div key={i} className="sub-card">
          <h5 className="body-sub-title">{title}</h5>
          <FormControl variant="outlined" className="form-control">
            <Select
              labelId="demo-simple-select-outlined-label"
              displayEmpty
              className="select-white-back"
              value={formValues[key]}
              onChange={_onSelectChanged}
            >
              {options.map((optionItem, i2) => {
                const { value, text } = optionItem;

                return (
                  <MenuItem key={i2} value={value} name={text} data-name={text} data-key={key}>
                    {text}
                  </MenuItem>
                );
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
        ></div>

        {formItems}
      </CardBlank>

      {/*Update Profile Checkbox*/}
      {/*<Grid*/}
      {/*  container*/}
      {/*  style={{*/}
      {/*    display: 'flex',*/}
      {/*    justifyContent: 'space-around',*/}

      {/*    padding: '20px 0px 0px 24px',*/}
      {/*  }}*/}
      {/*  className="btn-group"*/}
      {/*>*/}
      {/*    <FormControlLabel*/}
      {/*      control={*/}
      {/*        <Checkbox*/}
      {/*          // checked={state.checkedB}*/}
      {/*          // onChange={handleChange}*/}
      {/*          name="checkedB"*/}
      {/*        />*/}
      {/*      }*/}
      {/*      style={{fontSize: 12, color: 'primary'}}*/}
      {/*      label="Update Profile Upon Search"*/}
      {/*      className="check-label"*/}
      {/*    />*/}
      {/*</Grid>*/}

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
          <Button
            onClick={_onSubmitClicked}
            className="btn-big bg-primary color-white fontsize-16"
          >
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
