import axios from 'axios';
import {Platform} from 'react-native';

// emulator
// const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

// android device
// const baseUrl = 'http://localhost:3000';

// cloud BE
const baseUrl = 'https://horecahelper.kz/backend';

export const getCompanies = async hhToken => {
  const r = await axios.get(`${baseUrl}/er/companies`, {
    headers: {Authorization: `Bearer ${hhToken || ''}`},
  });
  console.log('res', r.data);
  return r;
};

export const getCompany = async hhToken => {
  const r = await axios.get(`${baseUrl}/er/companies/me`, {
    headers: {Authorization: `Bearer ${hhToken || ''}`},
  });
  console.log('Company Service getCompany result:', r.data);
  return r;
};

export const updateCompany = async (data, hhToken) => {
  const r = await axios.patch(`${baseUrl}/er/companies/me`, data, {
    headers: {Authorization: `Bearer ${hhToken || ''}`},
  });
  console.log('Company Service updateCompany result:', r.data);
  return r;
};

export const updateCompanyPhoto = async (img, hhToken) => {
  const data = new FormData();
  data.append('file', {
    name: img.fileName,
    type: img.type,
    uri: Platform.OS === 'android' ? img.uri : img.uri.replace('file://', ''),
  });

  const url = `${baseUrl}/er/companies/me/photo`;

  const r = await axios.post(url, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      Authorization: `Bearer ${hhToken || ''}`,
    },
  });
  console.log('Employees Service updateCompanyPhoto result:', r.data);
  return r;
};
