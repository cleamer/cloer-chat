import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RESPONSE = {
  REDIRECT: { isData: false, message: 'Redirect' },
  UNMOUNT: { isData: false, message: 'Unmount' },
};

const apiServer = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: process.env.REACT_APP_ENV !== 'production',
  headers: { 'content-type': 'application/json' },
});

export const useHTTP = () => {
  const cancelSource = axios.CancelToken.source();
  const navigate = useNavigate();
  return [
    cancelSource,
    async (method, ...args) => {
      console.log(`[${method.toUpperCase()}] ${args[0]}: request`);
      try {
        const { data } = await apiServer[method](...args, { cancelToken: cancelSource.token });
        console.log(data);

        // TODO: common validation of response
        if (data.code === 4000) {
          // must be logged in
          const message = data.message;
          navigate('/sign/in', { state: { message } });
          return RESPONSE.REDIRECT;
        }
        return { isData: true, ...data };
      } catch (error) {
        console.log(`[${method.toUpperCase()}] ${args[0]}: Error`);
        console.error(error);
        if (error.message === 'unmount') return RESPONSE.UNMOUNT;
        navigate('/sign/in', { state: { message: 'API Server connection error.' } });
        return RESPONSE.REDIRECT;
      }
    },
  ];
};
