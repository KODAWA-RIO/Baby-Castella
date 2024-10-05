import React from 'react';
import { Link } from 'react-router-dom';

const Order_create_1: React.FC = () => {
  return(
    <>
        <h2>注文</h2>
        <Link to="/order/create_2">注文確認</Link>
    </>
  ); 
};

export default Order_create_1;