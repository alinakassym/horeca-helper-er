import axios from 'axios';

// emulator
const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2' : 'http://localhost';

// android device
// const baseUrl = 'http://localhost';

const port = '3000';

export const getCities = async (hhToken) => {
  const r = await axios.get('' +
    `${baseUrl}:${port}/er/dictionaries/cities`, {
    headers: {'Authorization': `Bearer ${hhToken || ''}`}
  });
  console.log('getCities result:', r.data)
  return r.data;
};

export const getGenders = async (hhToken) => {
  const r = await axios.get('' +
    `${baseUrl}:${port}/er/dictionaries/genders`, {
    headers: {'Authorization': `Bearer ${hhToken || ''}`}
  });
  console.log('getGenders result:', r.data)
  return r.data;
};

export const getPositions = async (hhToken) => {
  const r = await axios.get('' +
    `${baseUrl}:${port}/er/dictionaries/positions`, {
    headers: {'Authorization': `Bearer ${hhToken || ''}`}
  });
  console.log('getPositions result:', r.data)
  return r.data;
};

export const getSchedules = async (hhToken) => {
  const r = await axios.get('' +
    `${baseUrl}:${port}/er/dictionaries/schedules`, {
    headers: {'Authorization': `Bearer ${hhToken || ''}`}
  });
  console.log('getSchedules result:', r.data)
  return r.data;
};
