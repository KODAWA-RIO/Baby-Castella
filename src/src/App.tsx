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
// 認証とPrivateRouteをインポート
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

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
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* 各セクションに固有のベースパスを指定 */}
            <Route path="/user/*" element={<UserRoutes />} />
            {/* 認証が必要なルートにはPrivateRouteを使用 */}
            <Route path="/order/*" element={<PrivateRoute element={<OrderRoutes />} allowedRoles={['admin', 'general']} />} />
            <Route path="/reception/*" element={<PrivateRoute element={<ReceptionRoutes />} allowedRoles={['admin', 'general']} />} />
            {/* 管理者のみアクセスできるルート */}
            <Route path="/merchandise/*" element={<PrivateRoute element={<MerchandiseRoutes />} allowedRoles={['admin']} />} />
            <Route path="/topping/*" element={<PrivateRoute element={<ToppingRoutes />} allowedRoles={['admin']} />} />
            <Route path="/sales/*" element={<PrivateRoute element={<SalesRoutes />} allowedRoles={['admin']} />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;
