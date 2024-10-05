import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Order_index from '../view/order/index';
import Order_show from '../view/order/show';
import Order_create_1 from '../view/order/create/create_1';
import Order_create_2 from '../view/order/create/create_2';
import Order_edit_1 from '../view/order/edit/edit_1';
import Order_edit_2 from '../view/order/edit/edit_2';

const OrderRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Order_index />} />
      <Route path="show" element={<Order_show />} />
      <Route path="create_1" element={<Order_create_1 />} />
      <Route path="create_2" element={<Order_create_2 />} />
      <Route path="edit_1" element={<Order_edit_1 />} />
      <Route path="edit_2" element={<Order_edit_2 />} />
    </Routes>
  );
};

export default OrderRoutes;
