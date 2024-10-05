import React from 'react';
import { Link } from 'react-router-dom';

const Order_index: React.FC = () => {
    return(
        <>
            <h2>注文履歴</h2>
            <Link to="/order/show">Order_show</Link>
        </>
    ); 
};

export default Order_index;