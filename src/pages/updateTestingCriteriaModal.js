import React from "react";
import CardBlank from "../components/cardBlank";
import SwitchComponent from "../components/switch";
import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  button: {
    width: "100%",
    margin: "15px 0",
    borderRadius: "10px",
    height: 48
  },
  checked: {},
  track: {}
}));

export default function UpdateCriteria() {
  useStyles();

  const [drive_through, setDriveThrough] = React.useState("");
  const [appoinment_only, setAppoinmentOnly] = React.useState("");
  const [exposure, setExposure] = React.useState("");
  const [conditions, setConditions] = React.useState("");
  const [symptoms, setSymptoms] = React.useState("");
  // Event Handlers for Select components
  const handleDriveThroughChange = event => {
    setDriveThrough(event.target.value);
  };
  const handleAppointmentOnlyChange = event => {
    setAppoinmentOnly(event.target.value);
  };
  const handleExposureChange = event => {
    setExposure(event.target.value);
  };
  const handleConditionsChange = event => {
    setConditions(event.target.value);
  };
  const handleSymptomsChange = event => {
    setSymptoms(event.target.value);
  };
  // Event Handler for Checkbox
  const [state, setState] = React.useState({
    checkedB: true
  });

  const handleCheckboxChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div>
      <CardBlank>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center"
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
              onChange={event =>
                handleDriveThroughChange(event, "drive_through")
              }
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
              onChange={event =>
                handleAppointmentOnlyChange(event, "appoinment_only")
              }
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
            Some test centers require knowledge of your exposure to people who
            have tested positive for COVID-19.
          </p>
          <FormControl variant="outlined" className="form-control">
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={exposure}
              displayEmpty
              onChange={event => handleExposureChange(event, "exposure")}
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
              onChange={event => handleConditionsChange(event, "conditions")}
              className="select-white-back"
            >
              <MenuItem value="">Weekend Immune System</MenuItem>
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
              onChange={event => handleSymptomsChange(event, "symptoms")}
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
          display: "flex",
          justifyContent: "space-around",

          padding: "25px 0"
        }}
        className="btn-group"
      >
        <Grid item xs={12} sm={5}>
          <Button className="btn-big bg-primary color-white fontsize-16">
            Update Profile
          </Button>
        </Grid>
        <Grid item xs={12} sm={5}>
          <Button className="btn-big bg-grey2 fontsize-16">Cancel</Button>
        </Grid>
      </Grid>
    </div>
  );
}
