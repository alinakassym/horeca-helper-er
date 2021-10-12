import axios from 'axios';

// emulator
// const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2' : 'http://localhost';

// android device
const baseUrl = 'http://localhost';

const port = '8080'

export const getUsers = async () => {
  const r = await axios.get('' +
    `${baseUrl}:${port}`);
  console.log('res', r.data)
  return r;
};
