import http from '../http-common';

export const getWorksList = async () => {
  const r = await http.get('/er/works/my');
  return r.data;
};

export const sendReview = async (id, data) => {
  const r = await http.put(`/er/works/${id}/review`, data);
  return r.data;
};

export const confirmWork = async (id, data) => {
  const r = await http.post(`/er/works/${id}/confirm`, data);
  return r.data;
};
