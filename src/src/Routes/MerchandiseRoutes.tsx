import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Merchandise_index from '../view/merchandise/index';
import Merchandise_create from '../view/merchandise/create';
import Merchandise_edit from '../view/merchandise/edit';

const MerchandiseRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Merchandise_index />} />
      <Route path="/create" element={<Merchandise_create />} />
      {/* 商品IDをURLパラメータとして渡す */}
      <Route path="/edit/:id" element={<Merchandise_edit />} />
    </Routes>
  );
};

export default MerchandiseRoutes;
