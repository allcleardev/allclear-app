import AlertTriangle from '@assets/images/add-testcenter-alert-triangle.svg';
import Calendar from '@assets/images/add-testcenter-calendar.svg';
import Car from '@assets/images/add-testcenter-car.svg';
import DiagnosticTest from '@assets/images/add-testcenter-diagnostic-test.svg';
import DollarSign from '@assets/images/add-testcenter-dollar-sign.svg';
import Donate from '@assets/images/add-testcenter-donate.svg';
import Id from '@assets/images/add-testcenter-id.svg';
import InsuranceCard from '@assets/images/add-testcenter-insurance-card.svg';
import Monitor from '@assets/images/add-testcenter-monitor.svg';
import Swab from '@assets/images/add-testcenter-swab.svg';
import Transportation from '@assets/images/add-testcenter-transportation.svg';
import Users from '@assets/images/add-testcenter-users.svg';

export const GOT_TESTED_OPTIONS = [
  {
    displayName: 'Yes',
    key: 'yes',
    value: true,
  },
  {
    displayName: 'No',
    key: 'no',
    value: false,
  },
  {
    displayName: 'Did not try',
    key: 'not_applicable',
    value: undefined,
  },
];

export const OFFERINGS = [
  {
    displayName: 'Antibody Test',
    icon: DiagnosticTest,
    key: 'ii',
    value: false
  },
  {
    displayName: 'Nasal Swab Test',
    icon: Swab,
    key: 'rp',
    value: false
  },
  {
    displayName: 'Drivethrough',
    icon: Car,
    key: 'driveThru',
    value: false
  },
  {
    displayName: 'Plasma Donation',
    icon: Donate,
    key: 'canDonatePlasma',
    value: false
  },
  {
    displayName: 'Free or Low-Cost Testing',
    icon: DollarSign,
    key: 'freeOrLowCost',
    value: false
  },
  {
    displayName: 'Online Scheduling',
    icon: Monitor,
    key: 'telescreeningAvailable',
    value: false
  },
];

export const SCREENING_METHODS = [
  {
    displayName: 'Accepts Insurance',
    icon: InsuranceCard,
    key: 'acceptsInsurance',
    value: false
  },
  {
    displayName: 'Government ID Required',
    icon: Id,
    key: 'governmentIdRequired',
    value: false
  },
  {
    displayName: 'Referral Required',
    icon: Users,
    key: 'referralRequired',
    value: false
  },
  {
    displayName: 'Appointment Required',
    icon: Calendar,
    key: 'appointmentRequired',
    value: false
  },
  {
    displayName: 'First Responders Prioritized',
    icon: Transportation,
    key: 'firstResponderFriendly',
    value: false
  },
  {
    displayName: 'Minimum Age',
    icon: AlertTriangle,
    key: 'minimumAge',
    value: false
  },
];

export const POST_DATA_STATE = {
  name: '',
  address: '',
  driveThru: false,
  teleScreeningAvailable: false,
  freeOrLowCost: false,
  acceptsInsurance: false,
  governmentIdRequired: false,
  referralRequired: false,
  firstResponderFriendly: false,
  appointmentRequired: false,
  notes: '',
  gotTested: undefined,
  type: { id: 'none' },
  testTypes: [],
  minimumAge: undefined,
};
