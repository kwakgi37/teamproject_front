import React, { createContext, useState, useEffect, useCallback } from 'react';
import { login as apiLogin, signup as apiSignup } from '../api/authApi';
import axiosInstance from '../api/axiosInstance';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem('refreshToken') || ''
  );
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  // 토큰 유효성 검사 함수
  const validateToken = useCallback(async () => {
    if (!token) return false;
    try {
      await axiosInstance.get('/validate');
      return true;
    } catch (error) {
      console.error('토큰 유효성 검사 실패:', error.message);
      return false;
    }
  }, [token]);

  // 로그인 함수
  const login = async (credentials) => {
    try {
      const response = await apiLogin(credentials);
      const { user, token, refreshToken } = response;
      setUser(user);
      setToken(token);
      setRefreshToken(refreshToken);
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('로그인 실패:', error.message);
      throw error;
    }
  };

  // 회원가입 함수
  const signup = async (userData) => {
    try {
      await apiSignup(userData);
    } catch (error) {
      console.error('회원가입 실패:', error.message);
      throw error;
    }
  };

  // 로그아웃 함수
  const logout = () => {
    setUser(null);
    setToken('');
    setRefreshToken('');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    setIsAuthenticated(false);
  };

  // 토큰 갱신 함수
  const refreshAccessToken = useCallback(async () => {
    if (!refreshToken) return false;
    try {
      const response = await axiosInstance.post('/refresh', {
        refreshToken,
      });
      const newAccessToken = response.data.accessToken;
      setToken(newAccessToken);
      localStorage.setItem('token', newAccessToken);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('토큰 갱신 실패:', error.message);
      logout();
      return false;
    }
  }, [refreshToken]);

  // 앱이 처음 시작될 때 로컬 스토리지에서 토큰을 가져와 사용자 상태 복원
  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        const isValid = await validateToken();
        if (isValid) {
          setUser({ name: '사용자', id: 'exampleUser' });
          setIsAuthenticated(true);
        } else {
          const refreshed = await refreshAccessToken();
          if (!refreshed) {
            logout();
          }
        }
      }
    };
    initializeAuth();
  }, [token, validateToken, refreshAccessToken]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, token, login, logout, signup }}
    >
      {children}
    </AuthContext.Provider>
  );
};
