import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // 認証コンテキストをインポート

interface PrivateRouteProps {
  element: React.ReactElement;
  allowedRoles: ('admin' | 'general')[]; // 許可されたロール
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, allowedRoles }) => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/user/login" />; // 未認証の場合はログインページにリダイレクト
  }

  if (!allowedRoles.includes(role!)) {
    return <Navigate to="/unauthorized" />; // 権限がない場合はリダイレクト
  }

  return element;
};

export default PrivateRoute;
