import axios from './axios';
import { useContext } from 'react';
import { LoadingContext } from './LoadingContext';

export const useAxiosSetup = () => {
  const { setLoading } = useContext(LoadingContext);
  const notProtectedRoutes = ['/login', '/register'];
const getToken = () => {
    return localStorage.getItem('userToken'); // Replace 'token' with your actual key
};
  axios.interceptors.request.use(  (config) => {
    let token = getToken();
    if(!notProtectedRoutes.includes(config.url)){
        config.headers.Authorization = `Bearer ${token}`;
    }
    setLoading(true);
    return config;
  }, (error) => {
    setLoading(false);
    return Promise.reject(error);
  });

  axios.interceptors.response.use((response) => {
    setLoading(false);
    return response;
  }, (error) => {
    setLoading(false);
    return Promise.reject(error);
  });
};
