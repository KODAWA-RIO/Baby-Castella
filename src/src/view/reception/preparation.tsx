import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Paper, Divider, CircularProgress } from '@mui/material';
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

  // APIからデータを取得
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/orders/situation/2'); // 調理中の注文を取得
        setOrders(response.data);
      } catch (error) {
        console.error('データの取得に失敗しました:', error);
        setErrorMessage('データの取得に失敗しました');
      }
    };

    fetchOrders();
    const interval = setInterval(fetchOrders, 5000); // 5秒ごとにデータを再取得

    return () => clearInterval(interval); // コンポーネントのアンマウント時にクリーンアップ
  }, []);

  // situationを指定した値に更新する関数
  const handleUpdateSituation = async (orderId: number, newSituation: number) => {
    setLoadingOrderId(orderId); // ローディング状態を設定
    try {
      await axios.put(`http://localhost:8080/api/orders/${orderId}`, {
        situation: newSituation, // newSituationの値を代入
      });

      // 更新後に画面をリロード
      window.location.reload();
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
        準備中
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
                {/* 調理に戻るボタン: situationを1に更新 */}
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ mr: 1 }}
                  onClick={() => handleUpdateSituation(order.id, 1)}
                  disabled={loadingOrderId === order.id} // ローディング中は無効にする
                >
                  {loadingOrderId === order.id ? (
                    <CircularProgress size={24} />
                  ) : (
                    '調理に戻る'
                  )}
                </Button>

                {/* 準備完了ボタン: situationを3に更新 */}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleUpdateSituation(order.id, 3)}
                  disabled={loadingOrderId === order.id} // ローディング中は無効にする
                >
                  {loadingOrderId === order.id ? (
                    <CircularProgress size={24} />
                  ) : (
                    '準備完了'
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
