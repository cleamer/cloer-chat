import axios from 'axios';

const APIResponse = (response) => ({ isError: false, ...response });
const APIErrorResponse = (response) => ({ isError: true, ...response });

const axiosAPI = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
  withCredentials: process.env.REACT_APP_ENV !== 'production',
  headers: { 'content-type': 'application/json' },
});

export const useHTTP = () => {
  const cancelSource = axios.CancelToken.source();
  return [
    cancelSource,
    async (method, ...args) => {
      console.log(`[${method.toUpperCase()}] ${args[0]}: request`);
      try {
        const { data } = await axiosAPI[method](...args, { cancelToken: cancelSource.token });
        console.log(data);
        if (data.code === 4000 || data.code >= 5000) return APIErrorResponse(data);
        return APIResponse(data);
      } catch (error) {
        console.log(`[${method.toUpperCase()}] ${args[0]}: Error`);
        console.error(error);
        if (error.message !== 'unmount') return APIErrorResponse({ message: 'API Server connection error.' });
      }
    },
  ];
};
