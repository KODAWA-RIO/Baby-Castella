import React from 'react';
import { Link } from 'react-router-dom';

const Order_edit_1: React.FC = () => {
  return(
    <>
        <h2>注文編集</h2>
        <Link to="/order/edit_2">edit_2</Link>
    </>
  ); 
};

export default Order_edit_1;