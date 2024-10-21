import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import axios from 'axios';

const OrderStatusDisplay: React.FC = () => {
  const [cookingOrders, setCookingOrders] = useState<string[]>([]);
  const [preparationOrders, setPreparationOrders] = useState<string[]>([]);
  const [readyForPickupOrders, setReadyForPickupOrders] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const url = import.meta.env.VITE_APP_URL;

  // APIからデータを取得
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // 調理中の注文を取得
        const EndPoint1 = `http://${url}/api/orders/situation/1`;
        const cookingResponse = await axios.get(EndPoint1);
        setCookingOrders(cookingResponse.data.map((order: any) => order.name));

        // 準備中の注文を取得
        const EndPoint2 = `http://${url}/api/orders/situation/2`;
        const preparationResponse = await axios.get(EndPoint2);
        setPreparationOrders(preparationResponse.data.map((order: any) => order.name));

        // 受け取り可の注文を取得
        const EndPoint3 = `http://${url}/api/orders/situation/3`
        const readyForPickupResponse = await axios.get(EndPoint3);
        setReadyForPickupOrders(readyForPickupResponse.data.map((order: any) => order.name));
      } catch (error) {
        console.error('データの取得に失敗しました:', error);
        setErrorMessage('データの取得に失敗しました');
      }
    };

    fetchOrders();
    const interval = setInterval(fetchOrders, 5000); // 5秒ごとにデータを再取得

    return () => clearInterval(interval); // コンポーネントのアンマウント時にクリーンアップ
  }, []);

  return (
    <Box sx={{ padding: 4 }}>
      {/* エラーメッセージ表示 */}
      {errorMessage && (
        <Typography variant="body1" color="error" gutterBottom textAlign="center">
          {errorMessage}
        </Typography>
      )}

      {/* 3カラムのレイアウト */}
      <Grid container spacing={4}>
        {/* 左側 - 調理中 */}
        <Grid item xs={4}>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
            調理中
          </Typography>
          {cookingOrders.map((name, index) => (
            <Typography key={index} variant="h4">
              {name}
            </Typography>
          ))}
        </Grid>

        {/* 中央 - 準備中 */}
        <Grid item xs={4}>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
            準備中
          </Typography>
          {preparationOrders.map((name, index) => (
            <Typography key={index} variant="h4">
              {name}
            </Typography>
          ))}
        </Grid>

        {/* 右側 - 受け取り可 */}
        <Grid item xs={4}>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
            受け取り可
          </Typography>
          {readyForPickupOrders.map((name, index) => (
            <Typography key={index} variant="h4">
              {name}
            </Typography>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderStatusDisplay;
