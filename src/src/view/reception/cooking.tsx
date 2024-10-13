import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Paper, Divider } from '@mui/material';
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

  // APIからデータを取得
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/orders/situation/1'); // 調理中の注文を取得
        setOrders(response.data);
      } catch (error) {
        console.error('データの取得に失敗しました:', error);
      }
    };

    fetchOrders();
  }, []);

  // situationを+1して更新する関数
  const handleUpdateSituation = async (orderId: number, currentSituation: number) => {
    console.log('Update situation triggered', orderId, currentSituation); // デバッグ用ログ
    try {
      // situationを+1するリクエストをバックエンドに送信
      const response = await axios.put(`http://localhost:8080/api/orders/${orderId}`, {
        situation: currentSituation + 1, // 現在のsituationに+1
      });
      
      console.log('API response', response.data); // レスポンスのログ
      
      // 成功したら、注文リストを更新
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId ? { ...order, situation: response.data.order.situation } : order
        )
      );
    } catch (error) {
      console.error('situationの更新に失敗しました:', error);
    }
  };
  

  return (
    <Box sx={{ padding: 4 }}>
      {/* 画面タイトル */}
      <Typography variant="h6" gutterBottom textAlign="center">
        調理中
      </Typography>

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
                  onClick={() => handleUpdateSituation(order.id, order.situation)} // ボタンが押されたらsituationを+1する
                >
                  調理完了
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
