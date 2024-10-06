import React, { ReactNode } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
// ヘッダーパッケージをインポート
import NavBar from './view/header/NavBar';
// ルーティングパッケージをインポート
import UserRoutes from './Routes/UserRoutes';
import OrderRoutes from './Routes/OrderRoutes';
import ReceptionRoutes from './Routes/ReceptionRoutes';
import MerchandiseRoutes from './Routes/MerchandiseRoutes';
import ToppingRoutes from './Routes/ToppingRoutes';
import SalesRoutes from './Routes/SalesRoutes';

interface LayoutProps {
  children: ReactNode; // childrenの型を指定
}

// NavBarの表示を制御するためのコンポーネント
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  // NavBarを表示したくないパスを指定
  const hideNavBarPaths = ['/user/login'];

  // 現在のパスが隠したいパスに一致しない場合にNavBarを表示
  const shouldShowNavBar = !hideNavBarPaths.includes(location.pathname);

  return (
    <>
      {shouldShowNavBar && <NavBar />}
      {children}
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* 各セクションに固有のベースパスを指定 */}
          <Route path="/user/*" element={<UserRoutes />} />
          <Route path="/order/*" element={<OrderRoutes />} />
          <Route path="/reception/*" element={<ReceptionRoutes />} />
          <Route path="/merchandise/*" element={<MerchandiseRoutes />} />
          <Route path="/topping/*" element={<ToppingRoutes />} />
          <Route path="/sales/*" element={<SalesRoutes />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
