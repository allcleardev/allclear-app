import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';
import { IconButton } from '@material-ui/core';

import { ReactComponent as PinIcon } from '@assets/images/pin-icon.svg';
import { ReactComponent as LockIcon } from '@assets/images/lock.svg';
import FormModal from '@general/modals/form-modal';

import PeopleService from '@services/people.service';
import ModalService from '@services/modal.service';
import PrimaryButton from '@general/buttons/primary-button';

export default function PinLocation({ location }) {
  const peopleService = PeopleService.getInstance();
  const modalService = ModalService.getInstance();
  const history = useHistory();

  const initialLocationState = {
    location,
    pinned: location.favorite,
  };

  const [locationState, setLocationState] = useState(initialLocationState);

  const onPinClicked = async (location) => {
    const pinned = !locationState.pinned;
    const postData = [location.id];
    let response;

    if (!location.favorite) {
      response = await peopleService.addFacility(postData);
    } else {
      response = await peopleService.removeFacility(postData);
    }

    if (response && response.statusText === 'Forbidden') {
      console.warn('No valid user session');
      modalService.toggleModal('promptLogin', true);
    } else {
      setLocationState({ location, pinned });
    }
  };

  return (
    <>
      <PinButton aria-label="pin" onClick={onPinClicked.bind(this, locationState.location)}>
        <Pin pinned={locationState.pinned ? 1 : 0} />
      </PinButton>
      <FormModal
        titleText="You are not logged in"
        modalName="promptLogin"
        contentText="You need to be logged in to AllClear to save pinned locations. Please login or create an account to continue."
        icon={<LockIcon />}
        actions = {
          <>
              <LoginButton color={'primary'} variant={'contained'} onClick={() => history.push('/sign-in')}>
                  Login
              </LoginButton>
              <CreateAccountButton style={{ marginTop: 10 }} onClick={() => history.push('/sign-up')}>
                  Create Account
              </CreateAccountButton>  
          </>
      }
      />
    </>
  );
}

const PinButton = styled(IconButton)`
  position: absolute;
  right: 0;
  top: 0;
  margin: 7px;

  &:hover {
    background-color: transparent;
  }
`;

const Pin = styled(PinIcon)`
  cursor: pointer;

  ${({ pinned }) =>
    pinned && css
    `
    transform: rotate(-15deg);
    transition: all ease 0.3s;
    transition-delay: 8ms;
    fill: #002c83;
    animation: ${pinAnimation} 1s cubic-bezier(0.28, 0.84, 0.42, 1);

    path {
      stroke: #002c83;
    }
  `}
`;

const pinAnimation = keyframes`
  0% {
    transform: scale(1, 1) rotate(0) translateY(0);
  }
  10% {
    transform: scale(1.1, 0.9) rotate(-2.5deg) translateY(0);
  }
  30% {
    transform: scale(0.9, 1.1) rotate(-5deg) translateY(-3px);
  }
  50% {
    transform: scale(1, 1) rotate(-15deg) translateY(3px);
  }
  57% {
    transform: scale(1, 1) rotate(-15deg) translateY(0);
  }
  64% {
    transform: scale(1, 1) rotate(-15deg) translateY(0);
  }
  100% {
    transform: scale(1, 1) rotate(-15deg) translateY(0);
  }
`;

const LoginButton = styled(PrimaryButton)`
  box-shadow: 0px 0px 10px 5px lightGrey;
`;    

const CreateAccountButton = styled(PrimaryButton)`
  box-shadow: 0px 0px 10px 5px lightGrey; 
  margin-top: 10px;
`; 
