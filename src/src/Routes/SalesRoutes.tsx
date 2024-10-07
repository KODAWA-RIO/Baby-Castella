import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sales_index from '../view/sales/index';
import Sales_show from '../view/sales/show';

const SalesRoutes: React.FC = () => {
  return (
    <Routes>
        <Route path="/" element={<Sales_index />} />
        <Route path="/show" element={<Sales_show />} />
    </Routes>
  );
};

export default SalesRoutes;