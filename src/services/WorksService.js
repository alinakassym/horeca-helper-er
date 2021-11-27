import http from '../http-common';

export const getWorksList = async () => {
  const r = await http.get('/er/works/my');
  return r.data;
};

export const sendReview = async (id, data) => {
  const r = await http.put(`/er/works/${id}/review`, data);
  return r.data;
};
