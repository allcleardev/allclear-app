
import { withVerification } from '@hocs/verification';
import PeopleService from '@services/people.service';

const peopleService = PeopleService.getInstance();
const onVerification = (data) => peopleService.verifyAuthRequest(data);
const onCodeResent = (phone) => peopleService.login({ phone });

export default withVerification('sign-in', onVerification, onCodeResent, false);