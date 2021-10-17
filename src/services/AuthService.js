import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authHeaders from './utils/auth';

// emulator
const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2' : 'http://localhost';

// android device
// const baseUrl = 'http://localhost';

const port = '3000';

export const getAuthData = async (googleToken) => {
  const headers = await authHeaders;
  console.log('AuthService: headers: ', headers)

  const r = await axios.post('' +
    `${baseUrl}:${port}/er/auth/login/google`, {
    googleToken: googleToken
  });
  console.log('res', r.data)
  return r.data;
};
