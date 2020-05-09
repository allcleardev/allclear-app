import PeopleService from '@services/people.service';
import { withVerification } from '@hocs/verification';

const peopleService = PeopleService.getInstance();
const onVerification = ({ phone, token: code }) => peopleService.confirmAuthRequest({ phone, code });
const onCodeResent = (authPayload) => peopleService.authStart(authPayload);

export default withVerification('sign-up', onVerification, onCodeResent, true);