import HomeLayout from 'Components/Layout/HomeLayout/HomeLayout';
import React from 'react';
import { Route, Routes } from 'react-router';
import { Admin, Device, Home, Provider } from './Pages';

const IndexRouter = () => {
  /* Router */
  /* State */
  /* Functions */
  /* Hooks */
  /* Render */
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/provider" element={<Provider />} />
        <Route path="/device" element={<Device />} />
        <Route path="/admin" element={<Admin />} />
      </Route>
    </Routes>
  );
};

export default IndexRouter;
