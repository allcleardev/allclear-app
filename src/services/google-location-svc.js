import Axios from 'axios';

export const GetNewPosition = (latitude, longitude, miles) => {

  return Axios.post(
    'facilities/search',
    {
        from:
        {
            latitude,
            longitude,
            miles,
        }
    }
  );
};
