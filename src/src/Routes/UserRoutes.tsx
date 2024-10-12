import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../view/user/login';

const UserRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
    </Routes>
  );
};

export default UserRoutes;
