import Axios from 'axios';
/*eslint-disable */
export const GetNewPosition = (lat, lng, miles) => {
  return Axios.post(
    'https://api-dev.allclear.app/facilities/search',
    {
        from:
        {
            latitude: lat,
            longitude: lng,
            miles: miles,
        }
    },
    {
      headers: { 'X-AllClear-SessionID': sessionStorage.getItem('sessid') },
    },
  );
};
/*eslint-enable */
