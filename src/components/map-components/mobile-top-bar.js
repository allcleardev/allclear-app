import React from 'react';
import MobileMenu from '@general/headers/mobile-menu';
import GoogleMapsAutocomplete from '@general/inputs/google-maps-autocomplete';
import EditFiltersBtn from '@components/map-components/edit-filters-btn';

export default function MobileTopBar(props) {
  return (
    <div className="mobile-top-bar">
      <MobileMenu btnStyle={props.btnStyle}></MobileMenu>
      <div className="location-search">
        <GoogleMapsAutocomplete
          locationSelected={props.onLocationSelected}
          onClear={props.onLocationCleared}
          searchIconColor={'lightgray'}
          noOptionsText={'Please Enter a Search Term to View Results'}
        ></GoogleMapsAutocomplete>
        <EditFiltersBtn
          numActiveFilters={props.numActiveFilters}
          onClick={props.onFilterClick}
        >
        </EditFiltersBtn>
      </div>
    </div>
  );
}
