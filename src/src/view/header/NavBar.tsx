import React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/user/login">ログイン</Link></li>
        <li><Link to="/user">ユーザー一覧</Link></li>
        <li><Link to="/order">注文履歴</Link></li>
        <li><Link to="/order/create_1">注文</Link></li>
        <li>進行状況
          <ul><Link to="/reception/cooking">調理中</Link></ul>
          <ul><Link to="/reception/preparation">準備中</Link></ul>
          <ul><Link to="/reception/receiving_customer">受け取り可能</Link></ul>
          <ul><Link to="/reception/receiving_staff">受け取り画面</Link></ul>
        </li>
        <li><Link to="/merchandise">メニュー一覧</Link></li>
        <li><Link to="/topping">トッピング一覧</Link></li>
        <li><Link to="/sales">売り上げ</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;
