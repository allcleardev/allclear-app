import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { IconButton } from '@material-ui/core';

import { ReactComponent as PinIcon } from '@assets/images/pin-icon.svg';
import PromptLoginModal from '@general/modals/prompt-login-modal';

import PeopleService from '@services/people.service';
import ModalService from '@services/modal.service';

export default function PinLocation({ location }) {
  const peopleService = PeopleService.getInstance();
  const modalService = ModalService.getInstance();

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
      <PromptLoginModal />
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
