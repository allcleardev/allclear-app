import {isUndefined, isNull, reduce, lowerCase} from 'lodash';

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
      if (!isInactive) acc = [...acc, {key, value: val}];
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

export function metersToMiles(i) {
  return i * 0.000621371192;
}

export function milesToMeters(i) {
  return i * 1609.344;
}
