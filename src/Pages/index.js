import HomeLayout from 'Components/Layout/HomeLayout/HomeLayout';
import React from 'react';
import { Route, Routes } from 'react-router';

const IndexRouter = () => {
  /* Router */
  /* State */
  /* Functions */
  /* Hooks */
  /* Render */
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route path="/" element={<div>Home</div>} />
      </Route>
    </Routes>
  );
};

export default IndexRouter;
