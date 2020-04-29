import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MobileMenu from '@general/headers/mobile-menu';
import SettingsSVG from '@svg/svg-settings';
import GoogleMapsAutocomplete from '@general/inputs/google-maps-autocomplete';

export default function MobileTopBar(props) {
  return (
    <div className="mobile-top-bar">
      <MobileMenu isLoggedIn={props.isLoggedIn}></MobileMenu>
      <div className="location-search">
        <GoogleMapsAutocomplete
          locationSelected={props.onLocationSelected}
          onClear={props.onLocationCleared}
          searchIconColor={'lightgray'}
          noOptionsText={'Please Enter a Search Term to View Results'}
        ></GoogleMapsAutocomplete>
        <IconButton
          aria-label="edit filters"
          aria-haspopup="true"
          className="edit-filters-icon-button"
          size="small"
          style={{ padding: '12px' }}
          onClick={props.onFilterClick}
        >
          {SettingsSVG({ color: '#666666' })}
        </IconButton>
      </div>
    </div>
  );
}
