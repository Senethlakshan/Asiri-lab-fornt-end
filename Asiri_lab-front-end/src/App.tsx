import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import LoginAdmin from './pages/Dashboard/LoginAdmin';
import ForgotPasswodAdmin from './pages/Dashboard/ForgotPasswodAdmin';
import ResetPassword from './pages/Dashboard/ResetPassword';
import DefaultLayout from './layout/DefaultLayout';
import HomePage from './pages/Home/HomePage';
import Register from './pages/Dashboard/Register';

import Loader from './common/Loader';
import routes from './routes';
// import React from 'react';
import TestPage from './pages/TestPage';

import { useDispatch } from 'react-redux';
import { setUserID } from '../src/routes/userSlice';
// import axios from 'axios';


function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);


  const dispatch = useDispatch();

  useEffect(() => {
   
    const sessionData = sessionStorage.getItem('userSession');
    if (sessionData) {
      const userData = JSON.parse(sessionData);
      if (userData && userData.isLoggedIn) {
        
        dispatch(setUserID(userData.userID));
       
      }
    }
  }, [dispatch]);


  // axios.interceptors.response.use(response => {
  //   return response;
  // }, async error => {
  //   const originalRequest = error.config;
  //   if (error.response.status === 401 && !originalRequest._retry) {
  //     originalRequest._retry = true; 
  //     try {
  //       const refreshResponse = await axios.post('http://localhost:5000/api/auth/refresh');
  //       const { accessToken } = refreshResponse.data;
  //       axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  //       return axios(originalRequest); 
  //     } catch (refreshError) {
  //       return Promise.reject(refreshError);
  //     }
  //   }
  //   return Promise.reject(error);
  // });
  

  return loading ? (
    <Loader />
  ) : (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
      <Routes>
        <Route index element={<HomePage/>} />
        <Route path="/login" element={<LoginAdmin/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/forgot-password" element={<ForgotPasswodAdmin />} />
        <Route path="/reset-password" element={<ResetPassword />} />
       
       {/* test case******* */}
       <Route path="/test" element={<TestPage />} />

        {/* test page */}
        {/* <Route path="/CreateProfile" element={<CreateProfile />} /> */}

        <Route path="/dashboard" element={<DefaultLayout />}>
        {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<route.component />}
            />
          ))}
        </Route>
      </Routes>
    </>
  );
}

export default App;
