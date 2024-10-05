import React from 'react';
import { Link } from 'react-router-dom';

const User_index: React.FC = () => {
  return(
    <>
        <h2>ユーザー一覧</h2>
        <Link to="/user/signup">ユーザー登録</Link>
    </>
  ); 
};

export default User_index;
