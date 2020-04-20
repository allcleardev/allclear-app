import React from 'react';

import throttle from 'lodash/throttle';
import parse from 'autosuggest-highlight/parse';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import Autocomplete from '@material-ui/lab/Autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { TextField, Grid, Typography, makeStyles } from '@material-ui/core';

const autocompleteService = { current: null };

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));

export default function GoogleMapsAutocomplete(props) {
  const classes = useStyles();
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState([]);

  const handleTextChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSelectionChange = async (e, value) => {
    if (value) {
      const address = value.description;
      await geocodeByAddress(address)
        .then((results) => getLatLng(results[0]))
        .then((latLng) => {
          // decorate latlng values into the response
          value = {
            ...value,
            latitude: latLng.lat,
            longitude: latLng.lng,
          };
        })
        .catch((error) => console.error('Error', error));

      props.locationSelected(true, value);
    } else {
      props.locationSelected(false, value);
    }
  };

  const fetch = React.useMemo(
    () =>
      throttle((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback);
      }, 200),
    [],
  );

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions([]);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        setOptions(results || []);
      }
    });

    return () => {
      active = false;
    };
  }, [inputValue, fetch]);

  if (!props.useCurrentLocation) {
    return (
      <Autocomplete
        id="google-maps-autocomplete"
        getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
        filterOptions={(x) => x}
        options={options}
        autoComplete
        includeInputInList
        onChange={handleSelectionChange}
        disabled={props.useCurrentLocation}
        defaultValue={props.initialValue}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="New York, NY or 11211"
            variant="outlined"
            className="input"
            onChange={handleTextChange}
            disabled={props.useCurrentLocation}
          />
        )}
        renderOption={(option) => {
          const matches = option.structured_formatting.main_text_matched_substrings;
          const parts = parse(
            option.structured_formatting.main_text,
            matches.map((match) => [match.offset, match.offset + match.length]),
          );

          return (
            <Grid container alignItems="center">
              <Grid item>
                <LocationOnIcon className={classes.icon} />
              </Grid>
              <Grid item xs>
                {parts.map((part, index) => (
                  <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                    {part.text}
                  </span>
                ))}

                <Typography variant="body2" color="textSecondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          );
        }}
      />
    );
  } else {
    return (
      <TextField
        placeholder="Using Current Location"
        variant="outlined"
        className="input"
        onChange={handleTextChange}
        disabled={props.useCurrentLocation}
      />
    );
  }
}
