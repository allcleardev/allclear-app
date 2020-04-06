import Axios from 'axios';

export const GetNewPosition = (lat, lng, miles) => {
  return Axios.post(
    'https://api-dev.allclear.app/facilities/search',
    {
      lat,
      lng,
      miles,
    },
    {
      headers: { 'X-AllClear-SessionID': sessionStorage.getItem('sessid') },
    },
  );
};
