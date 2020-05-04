import { isUndefined, isNull, reduce, lowerCase, get } from 'lodash';
import qs from 'qs';

export function colorLog(color, input) {
  console.log(`%c${input}`, `color:${color};`);
}

export function boolToEng(boolVal) {
  return boolVal ? 'Yes' : 'No';
}

export function isNullOrUndefined(value) {
  return isUndefined(value) || isNull(value);
}

export function getNumActiveFilters(searchCriteria) {
  return reduce(
    searchCriteria,
    (acc, filterVal) => {
      const isInactive = isNullOrUndefined(filterVal) || lowerCase(filterVal) === 'any';
      if (!isInactive) acc++;
      return acc;
    },
    0,
  );
}

export function getActiveFilters(searchCriteria) {
  return reduce(
    searchCriteria,
    (acc, val, key) => {
      const isInactive = isNullOrUndefined(val) || lowerCase(val) === 'any';
      if (!isInactive) acc = [...acc, { key, value: val }];
      return acc;
    },
    [],
  );
}

export function loadScript(file) {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src = file;
  document.head.appendChild(script);
}

export function getRouteQueryParams(location) {
  let searchParams = location.search;
  searchParams = searchParams.replace('?', '');
  searchParams = qs.parse(searchParams, []);
  return searchParams;
}

export function clickMapMarker(appState, index, currHistory, inLocations) {
  // todo: dont touch dom lol, do this with refs (much harder)

  const locations = (inLocations) ? inLocations : appState.map.locations;
  const elemToOpen = document.querySelectorAll('.MuiExpansionPanel-root')[index];
  const isCurrentlyExpanded = [].slice.call(elemToOpen.classList).includes('Mui-expanded');
  if (!isCurrentlyExpanded) elemToOpen.children[0].click();

  const selection = locations[index].id;
  !inLocations && currHistory.push({
    pathname: '/map',
    search: qs.stringify({
      ...appState.route.params,
      selection
    }),
  });

  const isLastElement = index === locations.length - 1;
  if (isLastElement) {
    // wait for expansion panel animation to end before scrolling
    setTimeout(() => {
      elemToOpen.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, 300);
  } else {
    elemToOpen.scrollIntoView({ behavior: 'smooth' });
  }
}

export function metersToMiles(i) {
  return i * 0.000621371192;
}

export function milesToMeters(i) {
  return i * 1609.344;
}

export function getFacilityDetailsMap(facility) {
  const booleanToYesNo = (val) => val ? 'Yes' : 'No';
  return [
    { field: 'Location Type', value: get(facility, ['type', 'name']) },
    { field: 'Appointment Needed', value: booleanToYesNo(facility.appointmentRequired) },
    { field: 'Drive-Through', value: booleanToYesNo(facility.driveThru) },
    { field: 'Telescreening Available', value: booleanToYesNo(facility.telescreeningAvailable) },
    { field: 'Referral From Doctor Needed', value: booleanToYesNo(facility.referralRequired) },
    // { key: 'Doctor Referral Crtieria', value: get(facility, 'type', 'name' )}
    { field: 'Accepts 3rd Party Test Orders', value: booleanToYesNo(facility.acceptsThirdParty) },
    { field: 'Accepts Insurance', value: booleanToYesNo(facility.acceptsInsurance) },
    // { key: 'Insurance Providers', value: }
    // { key: 'Other Testing Criteria', value: }
    // { key: 'Notes', value: }
  ];
}

export function convertToReadableDate(dateStr) {
  const date = new Date(dateStr);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

export function getFeedbackButtonURL(facility) {
  return `
    https://airtable.com/shrVJrPQs4qQkcW4o?prefill_Name=${facility.name || facility.title || ''}
    &prefill_Phone number=${facility.phone || ''}
    &prefill_Hours=${facility.service_time === undefined ? '' : facility.service_time}
    &prefill_This location was drive through=${(facility.driveThru.toString() === 'true' ? 'Drive Through' : '')}
    &prefill_This location required an appointment=${boolToEng(facility.appointmentRequired) || ''}
    &prefill_Address=${facility.address || facility.description} || ''`;
}