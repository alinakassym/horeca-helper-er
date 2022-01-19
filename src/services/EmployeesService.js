import http from '../http-common';

export const searchEmployees = async data => {
  const r = await http.post('/er/employees/search', data);
  // console.log('Employees Service searchEmployees result:', r.data);
  return r.data;
};

export const getEmployeeById = async id => {
  const r = await http.get(`/er/employees/${id}`);
  // console.log('Employees Service getEmployeeById result:', r.data);
  return r;
};

export const updateEmployee = async data => {
  const r = await http.patch('/ee/employees/me', data);
  // console.log('Employees Service updateEmployee result:', r.data);
  return r;
};

export const postWork = async data => {
  const r = await http.post('/ee/works', data);
  // console.log('Employees Service setWork result:', r.data);
  return r;
};

export const updateWork = async data => {
  const r = await http.patch(`/ee/works/${data.id}`, data);
  // console.log('Employees Service setWork result:', r.data);
  return r;
};

export const deleteWork = async id => {
  const r = await http.delete(`/ee/works/${id}`);
  // console.log('Employees Service deleteWork result:', r.data);
  return r;
};

export const putEmployeeReview = async (id, data) => {
  const r = await http.put(`/er/works/${id}/review`, data);
  console.log('Employees Service putEmployeeReview result:', r.data);
  return r;
};
