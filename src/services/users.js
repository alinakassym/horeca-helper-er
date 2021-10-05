import axios from 'axios';

const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2' : 'http://localhost';

export const getUsers = async () => {
  const r = await axios.get('' +
    `${baseUrl}:3000/users`);
  return r;
};
