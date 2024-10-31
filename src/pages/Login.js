import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/authApi';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
} from '@mui/material';

function Login() {
  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(''); // 로그인 시 메시지 초기화

    try {
      // login 함수 호출: 토큰이 자동으로 저장됩니다.
      const response = await login({ userId, userPw });

      // 토큰을 로컬 스토리지에 저장
      localStorage.setItem('token', response.token);
      localStorage.setItem('refreshToken', response.refreshToken); // 리프레시 토큰도 저장

      if (response && response.token) {
        console.log('로그인 성공:', response);
        setMessage('로그인에 성공하였습니다.');
        navigate('/'); // 로그인 성공 시 메인 페이지로 이동
      } else {
        setMessage('응답이 올바르지 않습니다. 나중에 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('로그인 실패:', error.message);
      // 예외 처리: 서버 연결 실패 시 메시지 설정
      if (error.message.includes('Network Error')) {
        setMessage('서버와 연결할 수 없습니다. 나중에 다시 시도해주세요.');
      } else {
        setMessage(
          '로그인에 실패하였습니다. 아이디와 비밀번호를 확인해주세요.'
        );
      }
    }
  };

  const handleSignupNavigation = () => {
    navigate('/signup'); // 회원가입 페이지로 이동
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8} p={4} boxShadow={3} borderRadius={2}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          로그인
        </Typography>
        <form onSubmit={handleLogin}>
          <Box mb={3}>
            <TextField
              fullWidth
              label="아이디"
              variant="outlined"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
              inputProps={{ 'aria-label': '아이디 입력' }} // 접근성 고려
            />
          </Box>
          <Box mb={3}>
            <TextField
              fullWidth
              label="비밀번호"
              type="password"
              variant="outlined"
              value={userPw}
              onChange={(e) => setUserPw(e.target.value)}
              required
              inputProps={{ 'aria-label': '비밀번호 입력' }} // 접근성 고려
            />
          </Box>
          <Box textAlign="center" mb={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              로그인
            </Button>
          </Box>
        </form>
        {message && (
          <Box mt={3}>
            <Alert severity={message.includes('성공') ? 'success' : 'error'}>
              {message}
            </Alert>
          </Box>
        )}
        <Box textAlign="center" mt={2}>
          <Button
            variant="text"
            color="secondary"
            onClick={handleSignupNavigation}
          >
            회원가입으로 이동
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
