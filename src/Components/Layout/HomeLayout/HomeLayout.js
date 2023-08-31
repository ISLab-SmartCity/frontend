import React from 'react';
import { Outlet } from 'react-router';
import './home-layout.css';
import HomeHeader from './HomeHeader';

const HomeLayout = () => {
  /* Router */
  /* State */
  /* Functions */
  /* Hooks */
  /* Render */
  return (
    <div className="home-container">
      <HomeHeader />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default HomeLayout;
