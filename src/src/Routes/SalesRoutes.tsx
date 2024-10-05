import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sales from '../view/sales/sales';

const SalesRoutes: React.FC = () => {
  return (
    <Routes>
        <Route path="/" element={<Sales />} />
    </Routes>
  );
};

export default SalesRoutes;