import http from '../http-common';

export const getStats = async () => {
  const r = await http.get('/er/utils/stats');
  console.log('getStats: ', r.data);
  return r.data;
};
