import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Paper, Divider, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // React Routerのインポート
import axios from 'axios';

interface Order {
  id: number;
  name: string;
  items: { flavor: string, quantity: number }[];
  toppings: string[];
  memo: string;
  situation: number; // situationの状態を追跡
}

const OrderTicketList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrderId, setLoadingOrderId] = useState<number | null>(null); // ローディング状態管理
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate(); // useNavigateフックの使用

  // APIからデータを取得
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/orders/situation/1'); // 調理中の注文を取得
        setOrders(response.data);
      } catch (error) {
        console.error('データの取得に失敗しました:', error);
        setErrorMessage('データの取得に失敗しました');
      }
    };

    fetchOrders();
  }, []);

  // situationを2に更新する関数を定義
  const handleUpdateSituation = async (orderId: number) => {
    try {
      await axios.put(`http://localhost:8080/api/orders/${orderId}`, {
        situation: 2, // 常に2を代入
      });
  
      // 成功したら、注文リストを更新
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId ? { ...order, situation: 2 } : order
        )
      );
      // 調理完了後に /reception/cooking に遷移
      navigate('/reception/cooking');
    } catch (error) {
      const err = error as any;
      setErrorMessage('進捗の更新に失敗しました。');
      if (err.response && err.response.status === 422) {
        console.error('バリデーションエラー:', err.response.data.errors);
        setErrorMessage('バリデーションエラーが発生しました。');
      } else {
        console.error('situationの更新に失敗しました:', err);
      }
    } finally {
      setLoadingOrderId(null); // ローディング状態解除
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      {/* 画面タイトル */}
      <Typography variant="h6" gutterBottom textAlign="center">
        調理中
      </Typography>

      {/* エラーメッセージ表示 */}
      {errorMessage && (
        <Typography variant="body1" color="error" gutterBottom textAlign="center">
          {errorMessage}
        </Typography>
      )}

      {/* 横スクロール可能なボックス */}
      <Box sx={{ overflowX: 'auto' }}>
        <Box sx={{ display: 'flex', gap: 2, minWidth: '800px' }}>
          {orders.map((order, index) => (
            <Paper key={index} sx={{ padding: 2, minWidth: '250px' }}>
              <Typography variant="h6" gutterBottom>
                名前: {order.name}
              </Typography>

              <Divider />

              <Typography variant="h6" gutterBottom sx={{ marginTop: 2 }}>
                商品
              </Typography>
              {order.items.map((item, i) => (
                <Typography key={i} variant="body1">
                  {item.flavor} {item.quantity}個
                </Typography>
              ))}

              <Divider sx={{ marginTop: 2, marginBottom: 2 }} />

              <Typography variant="h6" gutterBottom>
                トッピング
              </Typography>
              {order.toppings.length > 0 ? (
                order.toppings.map((topping, i) => (
                  <Typography key={i} variant="body1">
                    {topping}
                  </Typography>
                ))
              ) : (
                <Typography variant="body1">なし</Typography>
              )}

              <Divider sx={{ marginTop: 2, marginBottom: 2 }} />

              <Typography variant="h6" gutterBottom>
                メモ
              </Typography>
              <Typography variant="body1">{order.memo}</Typography>

              <Divider sx={{ marginTop: 2, marginBottom: 2 }} />

              <Box sx={{ textAlign: 'center', marginTop: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleUpdateSituation(order.id)}
                  disabled={loadingOrderId === order.id} // ローディング中は無効にする
                >
                  {loadingOrderId === order.id ? (
                    <CircularProgress size={24} />
                  ) : (
                    '調理完了'
                  )}
                </Button>
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default OrderTicketList;
