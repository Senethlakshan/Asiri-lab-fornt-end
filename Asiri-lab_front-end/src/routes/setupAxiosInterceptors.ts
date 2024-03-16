import axios from 'axios';

const setupAxiosInterceptors = (onUnauthenticated: () => void) => {
  const onResponseFailure = (error: { status: any; response: { status: any; }; }) => {
    const status = error.status || (error.response ? error.response.status : 0);
    if (status === 401) {
      // Token expired or user not authenticated
      onUnauthenticated();
    }
    return Promise.reject(error);
  };

  axios.interceptors.response.use((response) => response, onResponseFailure);
};

export default setupAxiosInterceptors;
