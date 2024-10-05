import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Cooking from '../view/reception/cooking';
import Preparation from '../view/reception/preparation';
import Receiving_customer from '../view/reception/receiving_customer';
import Receiving_staff from '../view/reception/receiving_staff';

const ReceptionRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="cooking" element={<Cooking />} />
      <Route path="preparation" element={<Preparation />} />
      <Route path="receiving_customer" element={<Receiving_customer />} />
      <Route path="receiving_staff" element={<Receiving_staff />} />
    </Routes>
  );
};

export default ReceptionRoutes;
