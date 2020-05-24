import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '@contexts/app.context';
import { useHistory } from 'react-router';
import { clickMapMarker } from '@util/general.helpers';

export default function MapMarker(props) {
  const { index } = props;
  const { appState } = useContext(AppContext);
  const history = useHistory();

  return (
    <Marker
      isNew={props.isNew}
      isAntibody={props.type && props.type.some((type) => type.id === 'ii')}
      onClick={() => {
        clickMapMarker(appState, index, history);
        // todo: instead of touching dom, utilize previously set state and ref markers to accomplish this?
      }}
    >
      {props.text}
    </Marker>
  );
}

const Vars = {
  markerSize: 30,
};

// initially any map object has left top corner at lat lng coordinates
// it's on you to set object origin to 0,0 coordinates
// TODO: pull colors from app theme
const Marker = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #002c83;
  text-align: center;
  color: white;
  font-size: 14px;
  font-weight: bold;
  padding: 4px;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px,
    rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;
  top: -${Vars.markerSize / 2}px;
  left: -${Vars.markerSize / 2}px;
  width: ${Vars.markerSize}px;
  height: ${Vars.markerSize}px;

  ${({ isAntibody }) =>
    isAntibody &&
    `
    background-color: #11BCF1;
  `}

  ${({ isNew }) =>
    isNew &&
    `
    &:after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: 1px solid rgba(255, 255, 255, 0.5);
      background-color: #ff771a;
    }
  `}
`;
