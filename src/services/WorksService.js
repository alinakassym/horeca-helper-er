import http from '../http-common';

export const getWorksList = async () => {
  const r = await http.get('/er/works/my');
  console.log('getWorksList result: ', r.data);
  return r.data;
};
