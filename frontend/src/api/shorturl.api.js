import axios from 'axios';

export const createShortUrl= async (url) => {
  const { data }= await axios.post('http://localhost:4000/api/create',
    { url },
    { withCredentials: true });
  return data.short_url;
};
