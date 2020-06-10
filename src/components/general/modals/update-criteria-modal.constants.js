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
        name: 'Drive Through',
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
        name: 'Appointment',
      },
      {
        id: false,
        name: 'No Appointment',
      },
    ],
    placeholder: false
  },
  {
    title: 'Show Only Free Testing Centers',
    key: 'freeOrLowCost',
    inputType: 'select',
    options: [
      {
        id: 'Any',
        name: 'Show All Centers',
      },
      {
        id: true,
        name: 'Free Centers',
      }
    ],
    placeholder: false
  },
  {
    title: 'Test Types',
    key: 'includeTestTypes',
    inputType: 'select',
    options: [
      {
        id: 'Any',
        name: 'Show All Centers',
      },
      {
        id: 'ii',
        name: 'Antibody Tests',
      },
      {
        id: 'rp',
        name: 'Nasal Swab',
      }
    ],
    placeholder: false
  },
  {
    title: 'Test Location Type',
    key: 'typeId',
    inputType: 'select',
    options: [
      { id: null, name: 'Show All Centers' },
      { id: 'ch', name: 'Community Health Clinic' },
      { id: 'ho', name: 'Hospital' },
      { id: 'mc', name: 'Medical Center' },
      { id: 'pu', name: 'Pop-up/Mobile Site' },
      { id: 'pv', name: 'Private Doctor\'s Office' },
      { id: 'pd', name: 'Public Health Department' },
      { id: 'uc', name: 'Urgent Care' }
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
