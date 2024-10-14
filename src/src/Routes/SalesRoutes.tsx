import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sales_index from '../view/sales/index';
import Sales_show from '../view/sales/show';

const SalesRoutes: React.FC = () => {
  return (
    <Routes>
      {/* セール一覧画面 */}
      <Route path="/" element={<Sales_index />} />
      
      {/* セール詳細画面（日付をパラメータとして受け取る） */}
      <Route path="/show/:date" element={<Sales_show />} />
    </Routes>
  );
};

export default SalesRoutes;
