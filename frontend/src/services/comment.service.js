import { httpService } from './http.service';
import axios from 'axios';

export const commentService = {
  add,
  query,
  remove,
};

function query(filterBy) {
  const params = new URLSearchParams();
  for (const key in filterBy) {
    const value = typeof filterBy[key] === 'object' ? JSON.stringify(filterBy[key]) : filterBy[key];
    params.append(key, value);
  }
  return httpService.get(`comment?${params.toString()}`);
  // return storageService.query('comment');
}

function remove(commentId) {
  return httpService.delete(`comment/${commentId}`);
  // return storageService.remove('comment', commentId);
}
async function add(email, message) {
  let hashedEmail = await axios.get(`https://api.hashify.net/hash/md5/hex?value=${email.trim().toLowerCase()}`);
  hashedEmail = hashedEmail.data.Digest;
  const comment = { email, hashedEmail, message, timestamp: Date.now() };
  const addedComment = await httpService.post(`comment`, comment);
  // const addedComment = storageService.post('comment', comment);
  return addedComment;
}
