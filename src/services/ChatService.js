import http from '../http-common';

export const getChats = async () => {
  const r = await http.get('/er/chats');
  // console.log('getChats: ', r.data);
  return r.data;
};

export const getChatsLookup = async employeeId => {
  const r = await http.get(`/er/chats/lookup?employeeId=${employeeId}`);
  console.log('getChatsLookup: ', r.data);
  return r.data;
};

export const getChatById = async id => {
  const r = await http.get(`/er/chats/${id}/messages`);
  console.log('getChatById: ', r.data);
  return r.data;
};

export const postMessage = async (id, data) => {
  const r = await http.post(`/er/chats/${id}/messages`, data);
  return r.data;
};

export const getChatsSearch = async data => {
  const r = await http.get(`/er/chats/search?term=${data}`);
  console.log('data: ', data);
  console.log('getChatsSearch: ', r.data);
  return r.data;
};
