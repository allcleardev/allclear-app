import { ADD_LOCATION } from '../actionTypes';

const initState = [];

export default function (state = initState, action) {
  switch (action.type) {
    case ADD_LOCATION: {
      const results = action.payload;
      return results;
    }

    default: {
      return state;
    }
  }
}
