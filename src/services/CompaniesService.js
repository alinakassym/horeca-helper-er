import {Platform} from 'react-native';
import http from '../http-common';

// emulator
// const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

// android device
// const baseUrl = 'http://localhost:3000';

// cloud BE
const baseUrl = 'https://horecahelper.kz/backend';

export const getCompanies = async () => {
  const r = await http.get(`${baseUrl}/er/companies`);
  console.log('res', r.data);
  return r;
};

export const getCompany = async () => {
  const r = await http.get(`${baseUrl}/er/companies/me`);
  console.log('Company Service getCompany result:', r.data);
  return r;
};

export const updateCompany = async data => {
  const r = await http.patch(`${baseUrl}/er/companies/me`, data);
  console.log('Company Service updateCompany result:', r.data);
  return r;
};

export const updateCompanyPhoto = async img => {
  const data = new FormData();
  data.append('file', {
    name: img.fileName,
    type: img.type,
    uri: Platform.OS === 'android' ? img.uri : img.uri.replace('file://', ''),
  });

  const url = `${baseUrl}/er/companies/me/photo`;

  const r = await http.post(url, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
    },
  });
  console.log('Employees Service updateCompanyPhoto result:', r.data);
  return r;
};
