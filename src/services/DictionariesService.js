import http from '../http-common';

export const getCities = async () => {
  const r = await http.get('/er/dictionaries/cities');
  console.log('getCities result:', r.data);
  return r.data;
};

export const getGenders = async () => {
  const r = await http.get('/er/dictionaries/genders');
  console.log('getGenders result:', r.data);
  return r.data;
};

export const getPositions = async () => {
  const r = await http.get('/er/dictionaries/positions');
  console.log('getPositions result:', r.data);
  return r.data;
};

export const getSchedules = async () => {
  const r = await http.get('/er/dictionaries/schedules');
  console.log('getSchedules result:', r.data);
  return r.data;
};

export const getCategories = async () => {
  const r = await http.get('/er/dictionaries/categories');
  console.log('getCategories result:', r.data);
  return r.data;
};
