import Axios from 'axios';
/*eslint-disable */
export const GetNewPosition = (lat, lng, miles) => {
  const sessionId = localStorage.getItem('sessid');

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
    {
      headers: {
        'X-AllClear-SessionID': sessionId,
      }
    }
  );
};
/*eslint-enable */
