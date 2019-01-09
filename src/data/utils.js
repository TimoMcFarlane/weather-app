import { API_KEY, BASE_URL } from 'react-native-dotenv';

export const fetchBuilder = (city, scope) => {
  return fetch(`${BASE_URL}${scope}?q=${city}&units=metric&appid=${API_KEY}`);
};