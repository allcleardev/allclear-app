import React, { useContext } from 'react';
// import PropTypes from 'prop-types';
import Box from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import SettingsSVG from '../components/svgs/svg-settings';
import ModalService from '../services/modal.service';

import { get } from 'lodash';

import TestingLocationListItem from '../components/map-components/testing-location-list-item';

// import MapPageContext from '../contexts/MapPage.context';
import { AppContext } from '../contexts/App.context';

export default function TestingLocationListContainer() {
  const { appState } = useContext(AppContext);

  const locations = get(appState, 'map.locations');

  // get modal service so we can toggle it open
  let modalService = ModalService.getInstance();

  return (
    <div
      id="side-drawer"
      style={{
        width: 400,
        overflowY: 'scroll',
        height: 'auto',
      }}
      className="side-drawer hide-scrollbar wid100-sm"
    >
      <div style={{ height: '60px' }} className="geolist-resizer">
        <svg width="37" height="6" viewBox="0 0 37 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M2.75977 5.18164C1.37905 5.18164 0.259766 4.06235 0.259766 2.68164C0.259766
              1.30093 1.37905 0.181641 2.75977 0.181641H33.7598C35.1405 0.181641 36.2598 1.30093
              36.2598 2.68164C36.2598 4.06235 35.1405 5.18164 33.7598 5.18164H2.75977Z"
            fill="#aaadb3"
          />
        </svg>
      </div>
      <Box>
        <Button
          className={'edit-filters-btn'}
          variant="contained"
          color="primary"
          fullWidth
          startIcon={SettingsSVG()}
          onClick={() => {
            modalService.toggleModal('criteria', true);
          }}
        >
          Edit Search Filters
        </Button>
      </Box>
      {locations &&
        locations.map((result, index) => (
          <TestingLocationListItem
            key={index}
            index={index}
            title={result.name}
            description={result.address}
            city_state={result.city + ', ' + result.state}
            service_time={result.hours}
            driveThru={result.driveThru}
            phone={result.phone}
            {...result}
          ></TestingLocationListItem>
        ))}

      {locations.length === 0 && <h2 style={{ display: 'flex', justifyContent: 'center' }}>No Results Found </h2>}
    </div>
  );
}
