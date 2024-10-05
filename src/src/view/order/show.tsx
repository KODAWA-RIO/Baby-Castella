import React from 'react';
import { Link } from 'react-router-dom';

const Order_show: React.FC = () => {
  return(
    <>
        <h2>注文詳細</h2>
        <Link to="/order/edit_1">edit_1</Link>
    </>
  ); 
};

export default Order_show;