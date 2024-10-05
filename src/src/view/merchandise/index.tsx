import React from 'react';
import { Link } from 'react-router-dom';

const Merchandise_index: React.FC = () => {
    return(
        <>
            <h2>トッピング一覧</h2>
            <Link to="/merchandise/edit">トッピング編集</Link>
            <br/>
            <Link to="/merchandise/create">トッピング作成</Link>
        </>
    ); 
};

export default Merchandise_index;