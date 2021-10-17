import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authHeaders from './utils/auth';

// emulator
const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2' : 'http://localhost';

// android device
// const baseUrl = 'http://localhost';

const port = '3000';

export const getCompanies = async () => {
  const headers = await authHeaders;

  const r = await axios.get('' +
    `${baseUrl}:${port}/er/companies`, {
    headers: headers
  });
  console.log('res', r.data)
  return r;
};

export const getCompany = async () => {
  const headers = await authHeaders;
  console.log('CompaniesService headers:', headers)

  const r = await axios.get('' +
    `${baseUrl}:${port}/er/companies/me`, {
    headers: headers
  });
  console.log('Company Service getCompany result:', r.data)
  return r;
};

export const updateCompany = async (data) => {
  const headers = await authHeaders;

  const r = await axios.patch('' +
    `${baseUrl}:${port}/er/companies/me`, data, {
    headers: headers
  });
  console.log('Company Service updateCompany result:', r.data)
  return r;
};
