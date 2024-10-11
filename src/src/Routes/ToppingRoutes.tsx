import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Topping_index from '../view/topping/index';
import Topping_create from '../view/topping/create';
import Topping_edit from '../view/topping/edit';

const ToppingRoutes: React.FC = () => {
  return (
    <Routes>
        <Route path="/" element={<Topping_index />} />
        <Route path="/create" element={<Topping_create />} />
        <Route path="/edit/:id" element={<Topping_edit />} />
    </Routes>
  );
};

export default ToppingRoutes;