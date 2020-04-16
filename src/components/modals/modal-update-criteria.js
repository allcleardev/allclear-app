import React, { useContext, useState } from 'react';
import { forEach } from 'lodash';
import FabBlueBottom from '../fabBlueBottom';
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
import SettingsSVG from '../svgs/svg-settings';
import { CRITERIA_FORM_DATA } from './modal-update-criteria.constants';
import { AppContext } from '../../contexts/App.context';
import ModalService from '../../services/modal.service';
import FacilityService from '../../services/facility.service';

export default function UpdateCriteriaModal() {
  // "DEPENDENCY INJECTION Section"
  // todo: this will probably have to move into app.js because it will be needed by all different parts of the app
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
      <FabBlueBottom
        handle_name={() => {
          toggleModal(true, 'body');
        }}
        class_name="btn-blue-bottom hide-mobile"
      >
        {SettingsSVG()}
      </FabBlueBottom>
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

function UpdateCriteria({ onClose, onSubmit }) {
  useStyles();
  const { setAppState, appState } = useContext(AppContext);

  // const initialPendingStateUpdates = { ...appState.searchCriteria };

  console.log('appcri', appState.searchCriteria);

  const [pendingStateUpdates, setPendingStateUpdates] = useState(appState.searchCriteria);

  // let pendingStateUpdates = {};

  //eslint-disable-next-line
  const facilityService = FacilityService.getInstance();

  async function commitPendingModalState() {
    // sanitize form values for BE filter

    // this is now at appstate.person.searchcriteria?
    let searchCriteria = {
      ...appState.searchCriteria,
      ...pendingStateUpdates,
    };

    forEach(searchCriteria, (value, key) => {
      // remove filter from both places
      if (value === 'Any') {
        delete appState.searchCriteria[key];
        delete searchCriteria[key];
      }
    });

    // todo: set latlng to appprovider here - get
    const { latitude, longitude } = appState.person;

    //eslint-disable-next-line
    const result = await facilityService.search({
      ...searchCriteria,
      from: {
        latitude,
        longitude,
        miles: 100,
      },
    });

    console.log('---', searchCriteria);

    setAppState({
      ...appState,
      map: {
        ...appState.map,
        locations: result.data.records || [],
      },
      searchCriteria: {
        ...appState.searchCriteria,
        ...searchCriteria,
      },
    });

    console.log('searchCriteria', pendingStateUpdates);

    // close the modal
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
              value={pendingStateUpdates[key]}
              onChange={(evt) => {
                const currKey = evt.currentTarget.dataset.key;
                const currValue = evt.target.value;

                // update the value at that key
                pendingStateUpdates[currKey] = currValue;

                // setPendingStateUpdates({
                //   ...pendingStateUpdates,
                //   // [currKey]: currValue,
                // });
                console.log('+++', pendingStateUpdates);
              }}
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

        {_generateFormItems()}
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
            onClick={() => {
              commitPendingModalState();
              onSubmit();
            }}
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

// const descriptionElementRef = useRef(null);
// useEffect(() => {
//   if (open) {
//     const {current: descriptionElement} = descriptionElementRef;
//     if (descriptionElement !== null) {
//       descriptionElement.focus();
//     }
//   }
// }, [open]);
