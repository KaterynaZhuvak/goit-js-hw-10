import axios from 'axios';
let value = true;

axios.defaults.headers.common['x-api-key'] =
  'live_xNlsBNR1EL34BK6Wbea8FpCcO90ihAQy1i4beoiTYcvycLQiUZHb5UOMBDprladk';

export function fetchBreeds() {
  const apiUrl = 'https://api.thecatapi.com/v1/breeds';

  return axios
    .get(apiUrl, {
      headers: {
        'x-api-key': axios.defaults.headers.common['x-api-key'],
      },
    })
    .then(resp => {
      if (!resp.data || resp.data.length === 0) {
        throw new Error('No cat found for the specified breed.');
      }

      return resp.data;
    });
}

export function fetchCatByBreed(breedId) {
  const apiUrl = 'https://api.thecatapi.com/v1/images/search';

  if (value) {
    value = false;
    return value;
  }
  
  return axios
    .get(apiUrl, {
      headers: {
        'x-api-key': axios.defaults.headers.common['x-api-key'],
      },
      params: {
        breed_ids: breedId,
      },
    })
    .then(resp => {
      if (!resp.data || resp.data.length === 0) {
        throw new Error('No cat found for the specified breed.');
      }

      return resp.data;
    });
}
