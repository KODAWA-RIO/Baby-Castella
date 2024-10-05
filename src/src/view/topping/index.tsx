import React from 'react';
import { Link } from 'react-router-dom';

const Topping_index: React.FC = () => {
    return(
        <>
            <h2>トッピング一覧</h2>
            <Link to="/topping/edit">トッピング編集</Link>
            <br/>
            <Link to="/topping/create">トッピング作成</Link>
        </>
    ); 
};

export default Topping_index;