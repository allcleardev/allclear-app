import { isUndefined, isNull } from 'lodash';

export function colorLog(color, input) {
  console.log(`%c${input}`, `color:${color};`);
}

export function boolToEng(boolVal) {
  return boolVal ? 'Yes' : 'No';
}

export function isNullOrUndefined(value) {
  return isUndefined(value) || isNull(value);
}
