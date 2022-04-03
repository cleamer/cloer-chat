import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const apiServer = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: process.env.REACT_APP_ENV !== 'production',
  headers: { 'content-type': 'application/json' },
});
export const useHTTP = () => {
  const navigate = useNavigate();
  return async (method, ...args) => {
    console.log(`request: [${method.toUpperCase()}] ${args[0]}`);
    try {
      const { data } = await apiServer[method](...args);
      console.log(data);

      // TODO: common validation of response
      if (data.code === 4000) {
        // must be logged in
        const message = data.message;
        console.log('request: must be logged in');
        return navigate('/sign/in', { state: { message } });
      }
      return data;
    } catch (error) {
      console.log('request: error!');
      // return { isSuccess: false, code: 6000, message: 'API Server connection error.' };
      return navigate('/sign/in', { state: { message: 'API Server connection error.' } });
    }
  };
};
