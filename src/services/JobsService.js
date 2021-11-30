import http from '../http-common';

export const getJobs = async () => {
  const r = await http.get('/er/jobs/my');
  // console.log('getJobs result: ', r.data);
  return r;
};

export const getJobById = async id => {
  const r = await http.get(`/er/jobs/${id}`);
  // console.log('getJobById result: ', r.data);
  return r;
};

export const updateJobById = async (id, data) => {
  const r = await http.patch(`/er/jobs/${id}`, data);
  // console.log('updateJobById result: ', r.data);
  return r;
};

export const postJob = async data => {
  console.log('job item : ', data);
  const r = await http.post('/er/jobs', data);
  // console.log('postJob result: ', r);
  return r;
};

export const deleteJobById = async id => {
  const r = await http.delete(`/er/jobs/${id}`);
  // console.log('deleteJobById result: ', r);
  return r;
};
