export const CRITERIA_FORM_DATA = [
  {
    title: 'Show Drive-Through Test Centers',
    key: 'driveThru',
    inputType: 'select',
    options: [
      {
        value: 'Any',
        text: 'Show All Centers',
      },
      {
        value: true,
        text: 'Drive Through Only',
      },
      {
        value: false,
        text: 'No Drive Throughs',
      },
    ],
  },
  {
    title: 'Show Appointment Only Test Centers',
    key: 'appointmentRequired',
    inputType: 'select',
    options: [
      {
        value: 'Any',
        text: 'Show All Centers',
      },
      {
        value: true,
        text: 'Appointment only',
      },
      {
        value: false,
        text: 'No Appointment',
      },
    ],
  },
  // {
  //   title: 'Symptoms',
  //   subtitle: 'Select all that apply.',
  //   key: 'symptoms',
  //   optionsKey: 'symptoms',
  //   inputType: 'MultiSelectInput',
  // },
  // {
  //   title: 'Exposure to COVID-19',
  //   subtitle: 'Some test centers require knowledge of your exposure to people who have tested positive for COVID-19',
  //   key: 'exposures',
  //   optionsKey: 'exposures',
  //   inputType: 'select',
  // },
  // {
  //   title: 'Conditions',
  //   subtitle: 'Select all that apply',
  //   key: 'conditions',
  //   optionsKey: 'conditions',
  //   inputType: 'MultiSelectInput',
  // },
  // {
  //   title: 'Health Worker Status',
  //   subtitle: 'Some test centeres require you or someone you live with to be a health worker.',
  //   key: 'healthWorkerStatus',
  //   optionsKey: 'healthWorkerStatus',
  //   inputType: 'select',
  // },
];

// {/*SYMPTOMS*/}
// <div className="sub-card">
//   <h5 className="body-sub-title">Symptoms</h5>
//   <p className="body-sub-description">Select all that apply.</p>
//   <FormControl variant="outlined" className="form-control">
//     <Select
//       labelId="demo-simple-select-outlined-label"
//       id="demo-simple-select-outlined"
//       value={symptoms}
//       displayEmpty
//       multiple
//       onChange={(event) => handleSymptomsChange(event, 'symptoms')}
//       className="select-white-back"
//     >
//       <MenuItem value="">Fever, Shortness of Breath</MenuItem>
//     </Select>
//   </FormControl>
// </div>
//
//
// {/*EXPOSURE*/}
// <div className="sub-card">
//   <h5 className="body-sub-title">Exposure to COVID-19</h5>
//   <p className="body-sub-description">
//     Some test centers require knowledge of your exposure to people who have tested positive for COVID-19.
//   </p>
//   <FormControl variant="outlined" className="form-control">
//     <Select
//       labelId="demo-simple-select-outlined-label"
//       id="demo-simple-select-outlined"
//       value={exposure}
//       displayEmpty
//       onChange={(event) => handleExposureChange(event, 'exposure')}
//       className="select-white-back"
//     >
//       <MenuItem value="">Not Sure</MenuItem>
//       <MenuItem value={10}>
//         <FormControlLabel
//           control={<Checkbox checked={state.checkedB} onChange={handleCheckboxChange} name="checkedB" />}
//           label="I have reviewed and agree to the Terms & Conditions and Privacy Policy"
//           className="check-label turn-white"
//         />
//       </MenuItem>
//     </Select>
//   </FormControl>
// </div>
//
//
// {/*CONDITIONS*/}
// <div className="sub-card">
//   <h5 className="body-sub-title">Conditions</h5>
//   <p className="body-sub-description">Select all that apply.</p>
//   <FormControl variant="outlined" className="form-control">
//     <Select
//       labelId="demo-simple-select-outlined-label"
//       id="demo-simple-select-outlined"
//       value={conditions}
//       displayEmpty
//       multiple
//       onChange={(event) => handleConditionsChange(event, 'conditions')}
//       className="select-white-back"
//     >
//       <MenuItem value="">Weekend Immune System</MenuItem>
//     </Select>
//   </FormControl>
// </div>
//
// {/*HEALTH WORKER STATUS*/}
// <div className="sub-card">
//   <h5 className="body-sub-title">Health Worker Status</h5>
//   <p className="body-sub-description">
//     Some test centers require knowledge of if you or someone you live with is a health workers or first
//     responder.
//   </p>
//   <FormControl variant="outlined" className="form-control">
//     <Select
//       labelId="demo-simple-select-outlined-label"
//       id="demo-simple-select-outlined"
//       value={exposure}
//       displayEmpty
//       onChange={(event) => handleExposureChange(event, 'exposure')}
//       className="select-white-back"
//     >
//       <MenuItem value="">I live with a health care worker or first responder</MenuItem>
//     </Select>
//   </FormControl>
// </div>