import React, { useState, useEffect } from 'react';
import { Button, Box, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import { Link, useParams, useNavigate } from 'react-router-dom'; // useNavigateフックをインポート
import axios from 'axios';

interface Order {
  id: number;
  date: string;
  customer: string;
  total_amount: number;
  deposit_amount: number;
  change: number;
  memo: string;
}

interface Merchandise {
  id: number;
  merchandise_name: string;
  merchandise_price: number;
  pieces: number;
}

interface Topping {
  id: number;
  topping_name: string;
  topping_price: number;
}

const Order_show: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [merchandises, setMerchandises] = useState<Merchandise[]>([]);
  const [toppings, setToppings] = useState<Topping[]>([]);
  const navigate = useNavigate(); // useNavigateフックの使用
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 注文データの取得
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/orders/${id}`);
        const { order, merchandises, toppings } = response.data;
        setOrder(order);
        setMerchandises(merchandises);
        setToppings(toppings);
      } catch (error) {
        console.error('注文データの取得に失敗しました:', error);
        setErrorMessage('注文データの取得に失敗しました');
      }
    };

    fetchOrderData();
  }, [id]);

  // 削除処理
  const handleDelete = async () => {
    if (!window.confirm('この注文を削除しますか？')) {
      return; // ユーザーがキャンセルを選択した場合は何もしない
    }

    try {
      await axios.delete(`http://localhost:8080/api/orders/${id}`);
      alert('注文が削除されました');
      navigate('/orders'); // 削除後に注文一覧ページに遷移
    } catch (error) {
      console.error('削除に失敗しました:', error);
      setErrorMessage('削除に失敗しました');
    }
  };

  if (!order) {
    return <Box>注文データが読み込まれています...</Box>;
  }

  return (
    <Box sx={{ padding: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      {/* エラーメッセージ表示 */}
      {errorMessage && (
        <Box sx={{ color: 'red', marginBottom: 2 }}>
          {errorMessage}
        </Box>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2, width: '100%', maxWidth: 800 }}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={`/order/edit_1/${order.id}`} // 編集ボタンのリンクにIDを付加
          sx={{ mr: 1 }}
        >
          編集
        </Button>
        <Button variant="contained" color="secondary" size="small" onClick={handleDelete}>
          削除
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ maxWidth: 800 }}>
        <Table>
          <TableBody>
            {/* Order Details */}
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>{order.id}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>日付</TableCell>
              <TableCell>{order.date}</TableCell> {/* 日付の表示 */}
            </TableRow>
            <TableRow>
              <TableCell>お客様</TableCell>
              <TableCell>{order.customer}様</TableCell>
            </TableRow>

            {/* Merchandise Details */}
            <TableRow>
              <TableCell>商品</TableCell>
              <TableCell>
                {merchandises.map((merchandise) => (
                  <Box key={merchandise.id}>
                    {merchandise.merchandise_name} × {merchandise.pieces} - {merchandise.merchandise_price * merchandise.pieces} 円
                  </Box>
                ))}
              </TableCell>
            </TableRow>

            {/* Topping Details */}
            <TableRow>
              <TableCell>トッピング</TableCell>
              <TableCell>
                {toppings.map((topping) => (
                  <Box key={topping.id}>
                    {topping.topping_name} - {topping.topping_price} 円
                  </Box>
                ))}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>合計</TableCell>
              <TableCell>{order.total_amount} 円</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>お預かり金額</TableCell>
              <TableCell>{order.deposit_amount} 円</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>お釣り</TableCell>
              <TableCell>{order.change} 円</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>メモ</TableCell>
              <TableCell>{order.memo}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Order_show;
