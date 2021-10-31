import axios from 'axios';
import {Platform} from 'react-native';

// emulator
// const baseUrl =
//   Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

// android device
// const baseUrl = 'http://localhost:3000';

// cloud BE
const baseUrl = 'https://horecahelper.kz/backend';

export const searchEmployees = async (data, hhToken) => {
  const r = await axios.post(`${baseUrl}/er/employees/search`, data, {
    headers: {Authorization: `Bearer ${hhToken || ''}`},
  });
  // console.log('Employees Service searchEmployees result:', r.data);
  return r;
};

export const getEmployeeById = async (id, hhToken) => {
  const r = await axios.get(`${baseUrl}/er/employees/${id}`, {
    headers: {Authorization: `Bearer ${hhToken || ''}`},
  });
  console.log('Employees Service getEmployeeById result:', r.data);
  return r;
};

export const updateEmployee = async (data, hhToken) => {
  const r = await axios.patch(`${baseUrl}/ee/employees/me`, data, {
    headers: {Authorization: `Bearer ${hhToken || ''}`},
  });
  console.log('Employees Service updateEmployee result:', r.data);
  return r;
};

export const postWork = async (data, hhToken) => {
  const r = await axios.post(`${baseUrl}/ee/works`, data, {
    headers: {Authorization: `Bearer ${hhToken || ''}`},
  });
  console.log('Employees Service setWork result:', r.data);
  return r;
};

export const updateWork = async (data, hhToken) => {
  const r = await axios.patch(`${baseUrl}/ee/works/${data.id}`, data, {
    headers: {Authorization: `Bearer ${hhToken || ''}`},
  });
  console.log('Employees Service setWork result:', r.data);
  return r;
};

export const deleteWork = async (id, hhToken) => {
  const r = await axios.delete(`${baseUrl}/ee/works/${id}`, {
    headers: {Authorization: `Bearer ${hhToken || ''}`},
  });
  console.log('Employees Service deleteWork result:', r.data);
  return r;
};
