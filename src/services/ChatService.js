import http from '../http-common';

export const getChats = async () => {
  const r = await http.get('/er/chats');
  console.log('getChats: ', r.data);
  return r.data;
};

export const getChatById = async (id, data) => {
  const r = await http.get(`/er/chats/${id}/messages`, data);
  return r.data;
};

export const postMessage = async (id, data) => {
  const r = await http.post(`/er/chats/${id}/messages`, data);
  return r.data;
};
