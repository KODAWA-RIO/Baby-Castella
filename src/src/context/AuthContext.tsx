import React, { createContext, useContext, useState, ReactNode } from 'react';

// ユーザー権限の型
type Role = 'admin' | 'general' | null;

interface AuthContextType {
  isAuthenticated: boolean;
  role: Role;
  login: (role: Role) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 認証状態を提供するコンポーネント
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // ページロード時に localStorage から認証状態を取得
    const savedAuthState = localStorage.getItem('isAuthenticated');
    return savedAuthState === 'true';
  });
  
  const [role, setRole] = useState<Role>(() => {
    // ページロード時に localStorage からロール情報を取得
    const savedRole = localStorage.getItem('role');
    return savedRole === 'admin' || savedRole === 'general' ? savedRole : null;
  });

  const login = (userRole: Role) => {
    setIsAuthenticated(true);
    setRole(userRole);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('role', userRole ?? ''); // role が null の場合には空文字列を保存
  };

  const logout = () => {
    setIsAuthenticated(false);
    setRole(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('role'); // ロールも削除
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 認証状態を使うためのカスタムフック
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
