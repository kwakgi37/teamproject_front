// Sidebar.js
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { FaHome, FaBell, FaUser, FaQuestionCircle, FaSignInAlt } from 'react-icons/fa';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  // 로그아웃 버튼 대신 로그인 버튼을 눌렀을 때 login 페이지로 이동하도록 설정
  const handleLoginClick = () => {
    navigate('/login'); // 로그인 페이지로 이동
  };

  return (
    <div className="sidebar">
      <h3 className="sidebar-title">Quick Access</h3>
      <ul className="sidebar-section">
        <li className={isActive('/') ? 'active' : ''}>
          <Link to="/" className="sidebar-link">
            <FaHome className="sidebar-icon" />
            Dashboard
          </Link>
        </li>
      </ul>

      <h3 className="sidebar-title">Service</h3>
      <ul className="sidebar-section">
        <li className={isActive('/') ? 'active' : ''}>
          <Link to="/" className="sidebar-link">
            Dashboard <span className="notification-badge">3</span>
          </Link>
        </li>
        <li className={isActive('/problems') ? 'active' : ''}>
          <Link to="/problems" className="sidebar-link">문제풀이 화면</Link>
        </li>
        <li className={isActive('/solutions') ? 'active' : ''}>
          <Link to="/solutions" className="sidebar-link">문제 해설 화면</Link>
        </li>
        <li className={isActive('/retry') ? 'active' : ''}>
          <Link to="/retry" className="sidebar-link">문제 다시 풀기 화면</Link>
        </li>
        <li className={isActive('/analysis') ? 'active' : ''}>
          <Link to="/analysis" className="sidebar-link">분석 or 피드백 화면</Link>
        </li>
        <li className={isActive('/records') ? 'active' : ''}>
          <Link to="/records" className="sidebar-link">학습 기록</Link>
        </li>
        <li className={isActive('/comparison') ? 'active' : ''}>
          <Link to="/comparison" className="sidebar-link">친구와 성적 비교</Link>
        </li>
        <li className={isActive('/etc') ? 'active' : ''}>
          <Link to="/etc" className="sidebar-link">기타</Link>
        </li>
      </ul>

      <h3 className="sidebar-title">계정</h3>
      <ul className="sidebar-section">
        <li className={isActive('/alerts') ? 'active' : ''}>
          <Link to="/alerts" className="sidebar-link"><FaBell className="sidebar-icon" /> 알림</Link>
        </li>
        <li className={isActive('/settings') ? 'active' : ''}>
          <Link to="/settings" className="sidebar-link"><FaUser className="sidebar-icon" /> 사용자 설정</Link>
        </li>
        <li className={isActive('/help') ? 'active' : ''}>
          <Link to="/help" className="sidebar-link"><FaQuestionCircle className="sidebar-icon" /> 도움말</Link>
        </li>
      </ul>

      {/* 로그아웃 버튼 대신 로그인 버튼으로 변경 */}
      <div className="logout-section">
        <button className="logout-button" onClick={handleLoginClick}>
          <FaSignInAlt className="sidebar-icon" />
          로그인
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
