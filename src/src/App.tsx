import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// ヘッダーパッケージをインポート
import NavBar from './view/header/NavBar';
// ルーティングパッケージをインポート
import UserRoutes from './Routes/UserRoutes';
import OrderRoutes from './Routes/OrderRoutes';
import ReceptionRoutes from './Routes/ReceptionRoutes';
import MerchandiseRoutes from './Routes/MerchandiseRoutes';
import ToppingRoutes from './Routes/ToppingRoutes';
import SalesRoutes from './Routes/SalesRoutes';

const App: React.FC = () => {
  return (
    <Router>
      <NavBar />

      <Routes>
        {/* 各セクションに固有のベースパスを指定 */}
        <Route path="/user/*" element={<UserRoutes />} />
        <Route path="/order/*" element={<OrderRoutes />} />
        <Route path="/reception/*" element={<ReceptionRoutes />} />
        <Route path="/merchandise/*" element={<MerchandiseRoutes />} />
        <Route path="/topping/*" element={<ToppingRoutes />} />
        <Route path="/sales/*" element={<SalesRoutes />} />
      </Routes>
    </Router>
  );
};

export default App;
