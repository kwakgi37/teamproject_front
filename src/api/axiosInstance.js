import axios from 'axios';
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

// axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api/auth',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 인터셉터 설정
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // 401 오류 확인 및 재시도 플래그 설정
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        // refresh token을 사용하여 새로운 access token 요청
        const { data } = await axiosInstance.post('/refresh', {
          refreshToken,
        });

        // 새로운 access token 저장
        localStorage.setItem('token', data.accessToken);
        // axios 인스턴스의 기본 헤더 업데이트
        axiosInstance.defaults.headers[
          'Authorization'
        ] = `Bearer ${data.accessToken}`;

        // 원본 요청 재전송
        return axiosInstance(originalRequest);
      } catch (e) {
        console.error('Token refresh failed:', e.message);
        // AuthContext에서 logout 함수 호출
        const { logout } = useContext(AuthContext);
        if (logout) logout();
      }
    }
    return Promise.reject(error);
  }
);

// 최초 요청 시 Authorization 헤더 설정
const token = localStorage.getItem('token');
if (token) {
  axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
}

export default axiosInstance;
