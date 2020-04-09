import Axios from 'axios';
/*eslint-disable */
export const GetNewPosition = (lat, lng, miles) => {
  return Axios.post(
    'facilities/search',
    {
        from:
        {
            latitude: lat,
            longitude: lng,
            miles: miles,
        }
    },
  );
};
/*eslint-enable */
