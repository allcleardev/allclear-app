import React from 'react';
import HomescreenHeader from '../components/general/headers/header-homescreen';
import CardBlank from '../components/general/cards-unused/user-profile-card';
import { Link } from 'react-router-dom';
import SwitchComponent from '../components/switch';

import Box from '@material-ui/core/Container';
import { Button, Grid } from '@material-ui/core';
// import { makeStyles, } from "@material-ui/core/styles";
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  button: {
    width: '100%',
    margin: '15px 0',
    borderRadius: '10px',
    height: 48,
  },
  checked: {},
  track: {},
}));

export default function UpdateTestingCenterCriteriaPage() {
  useStyles();

  const [drive_through, setDriveThrough] = React.useState('');
  const [appoinment_only, setAppoinmentOnly] = React.useState('');
  const [exposure, setExposure] = React.useState('');
  const [conditions, setConditions] = React.useState('');
  const [symptoms, setSymptoms] = React.useState('');
  // Event Handlers for Select components
  const handleDriveThroughChange = (event) => {
    setDriveThrough(event.target.value);
  };
  const handleAppointmentOnlyChange = (event) => {
    setAppoinmentOnly(event.target.value);
  };
  const handleExposureChange = (event) => {
    setExposure(event.target.value);
  };
  const handleConditionsChange = (event) => {
    setConditions(event.target.value);
  };
  const handleSymptomsChange = (event) => {
    setSymptoms(event.target.value);
  };
  // Event Handler for Checkbox
  const [state, setState] = React.useState({
    checkedB: true,
  });

  const handleCheckboxChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <Box className="update-criteria">
      <HomescreenHeader>
        <div className="header-title-area">
          <Fab size="small" aria-label="add" className="btn-back-fab">
            <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7.59375 13.1428L1.59375 7.14282L7.59375 1.14282"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Fab>
          <p className="header-title">Update testing Center Criteria</p>
        </div>
      </HomescreenHeader>
      <Grid container style={{ display: 'flex', justifyContent: 'center' }}>
        <Grid item xs={12} sm={7}>
          <CardBlank>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <h3 className="body-title">Use My Location</h3>
              <div>
                <SwitchComponent></SwitchComponent>
              </div>
            </div>

            <div className="sub-card">
              <p className="body-sub-title">Location</p>
              <FormControl className="form-control">
                <TextField
                  id="outlined-margin-none"
                  defaultValue=""
                  className="white-back-input"
                  variant="outlined"
                  label=""
                  height="60px"
                  InputLabelProps={{ shrink: false }}
                  style={{}}
                />
              </FormControl>
            </div>
            <div className="sub-card">
              <h5 className="body-sub-title">Drive-Through Test Centers</h5>
              <FormControl variant="outlined" className="form-control">
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={drive_through}
                  displayEmpty
                  onChange={(event) => handleDriveThroughChange(event, 'drive_through')}
                  className="select-white-back"
                >
                  <MenuItem value="">Any</MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="sub-card">
              <h5 className="body-sub-title">Appoinment Only Test Centers</h5>
              <FormControl variant="outlined" className="form-control">
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={appoinment_only}
                  displayEmpty
                  onChange={(event) => handleAppointmentOnlyChange(event, 'appoinment_only')}
                  className="select-white-back"
                >
                  <MenuItem value="">Any</MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="sub-card">
              <h5 className="body-sub-title">Exposure to COVID-19</h5>
              <p className="body-sub-description">
                Some test centers require knowledge of your exposure to people who have tested positive for COVID-19.
              </p>
              <FormControl variant="outlined" className="form-control">
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={exposure}
                  displayEmpty
                  onChange={(event) => handleExposureChange(event, 'exposure')}
                  className="select-white-back"
                >
                  <MenuItem value="">Not Sure</MenuItem>
                  <MenuItem value={10}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={state.checkedB}
                          onChange={handleCheckboxChange}
                          name="checkedB"
                          color="third"
                        />
                      }
                      label="I have reviewed and agree to the Terms & Conditions and Privacy Policy"
                      className="check-label turn-white"
                    />
                  </MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="sub-card">
              <h5 className="body-sub-title">Conditions</h5>
              <p className="body-sub-description">Select all that apply.</p>
              <FormControl variant="outlined" className="form-control">
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={conditions}
                  displayEmpty
                  onChange={(event) => handleConditionsChange(event, 'conditions')}
                  className="select-white-back"
                >
                  <MenuItem value="">Weakened Immune System</MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="sub-card">
              <h5 className="body-sub-title">Symptoms</h5>
              <p className="body-sub-description">Select all that apply.</p>
              <FormControl variant="outlined" className="form-control">
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={symptoms}
                  displayEmpty
                  onChange={(event) => handleSymptomsChange(event, 'symptoms')}
                  className="select-white-back"
                >
                  <MenuItem value="">Fever, Shortness of Breath</MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
          </CardBlank>

          <Grid
            container
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '25px 0',
            }}
          >
            <Grid item xs={12} sm={5}>
              <Button className="btn-big bg-primary color-white fontsize-16">Update Profile</Button>
              <Link to="/map">
                <Button className="btn-big bg-grey2 fontsize-16">Cancel</Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
