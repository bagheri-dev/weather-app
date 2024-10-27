import axios from 'axios';
import { ILocationData } from '../types/locationData.Type';

export const getLocation = async (country: string) => {
  try {
    const response = await axios.get<ILocationData>('https://api.opencagedata.com/geocode/v1/json', {
      params: {
        q: country,
        key: '49bb4a92534d4704a31bff083f6e09ce',
      },
    });

    const results = response.data.results;

    if (results && results.length > 0) {
      const { geometry } = results[0];
      const { lat, lng } = geometry;

      return { lat, lng };
    } else {
      console.error('No results found');
      return null;
    }
  } catch (error) {
    console.error('Error fetching location:', error);
    return null;
  }
};
