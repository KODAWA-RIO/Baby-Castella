import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../view/user/login';
import Signup from '../view/user/signup';
import User_index from '../view/user/index';

const UserRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="/" element={<User_index />} /> {/* ベースパス */}
    </Routes>
  );
};

export default UserRoutes;
