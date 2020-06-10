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
  },
  {
    displayName: 'Nasal Swab Test',
    icon: Swab,
    key: 'rp',
  },
  {
    displayName: 'Drivethrough',
    icon: Car,
    key: 'driveThru',
  },
  {
    displayName: 'Plasma Donation',
    icon: Donate,
    key: 'canDonatePlasma',
  },
  {
    displayName: 'Free or Low-Cost Testing',
    icon: DollarSign,
    key: 'freeOrLowCost',
  },
  {
    displayName: 'Online Scheduling',
    icon: Monitor,
    key: 'teleScreeningAvailable',
  },
];

export const SCREENING_METHODS = [
  {
    displayName: 'Accepts Insurance',
    icon: InsuranceCard,
    key: 'acceptsInsurance',
  },
  {
    displayName: 'Government ID Required',
    icon: Id,
    key: 'governmentIdRequired',
  },
  {
    displayName: 'Referral Required',
    icon: Users,
    key: 'referralRequired',
  },
  {
    displayName: 'Appointment Required',
    icon: Calendar,
    key: 'appointmentRequired',
  },
  {
    displayName: 'First Responders Prioritized',
    icon: Transportation,
    key: 'firstResponderFriendly',
  },
  {
    displayName: 'Minimum Age',
    icon: AlertTriangle,
    key: 'minimumAge',
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
  minimumAge: '', // TODO: clarify since type should be number but mock shows use as boolean
  // city: '', // NOTE: not currently used in UI
  // state: '', // NOTE: not currently used in UI
  // typeId: '', // NOTE: not currently used in UI
};
