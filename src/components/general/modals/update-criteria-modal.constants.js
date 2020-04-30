export const CRITERIA_FORM_DATA = [
  {
    title: 'Show Drive-Through Test Centers',
    key: 'driveThru',
    inputType: 'select',
    options: [
      {
        id: 'Any',
        name: 'Show All Centers',
      },
      {
        id: true,
        name: 'Drive Through Only',
      },
      {
        id: false,
        name: 'No Drive Throughs',
      },
    ],
    placeholder: false
  },
  {
    title: 'Show Appointment Only Test Centers',
    key: 'appointmentRequired',
    inputType: 'select',
    options: [
      {
        id: 'Any',
        name: 'Show All Centers',
      },
      {
        id: true,
        name: 'Appointment only',
      },
      {
        id: false,
        name: 'No Appointment',
      },
    ],
    placeholder: false
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
