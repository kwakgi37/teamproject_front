import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import Sidebar from '../components/Sidebar'; // Sidebar 컴포넌트 임포트
import TopNav from '../components/TopNav';
import DashboardMenu from '../components/DashboardMenu';
function MainPage() {
  return (
    <div style={{ display: 'flex' }}>
      {/* 사이드바 */}
      <Sidebar />

      <div style={{ flex: 1 }}>
        {/* 상단 네비게이션 바 */}
        <TopNav />

{/* Dashboard 메뉴 */}
<Box sx={{ mt: 2, ml: 3 }}>
          <DashboardMenu />
        </Box>

      {/* 메인 콘텐츠 */}
      <Container maxWidth="md" sx={{ mt: 4, ml: 2 }}>
        <Box textAlign="center" mt={4}>
          <Typography variant="h3" gutterBottom>
            환영합니다!
          </Typography>
          <Typography variant="body1">
            MyApp에 오신 것을 환영합니다. 로그인하거나 회원가입을 통해 더 많은 기능을 이용해보세요!
          </Typography>
        </Box>
      </Container>
    </div>
    </div>
  );
}

export default MainPage;
