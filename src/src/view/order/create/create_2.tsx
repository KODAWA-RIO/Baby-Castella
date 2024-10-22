import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // useNavigate をインポート
import { Box, Button, Typography, TextField, Paper, List, ListItem, ListItemText, Grid } from '@mui/material';
import axios from 'axios'; // axiosをインポート

const Order_create_2: React.FC = () => {
  const location = useLocation();
  const { orderData } = location.state || {};

  const [deposit, setDeposit] = useState<number | string>(''); // お預かり金額
  const [change, setChange] = useState<number>(0); // お釣り
  const navigate = useNavigate(); // navigateフック
  const url = import.meta.env.VITE_APP_URL;

  useEffect(() => {
    if (typeof deposit === 'number' && deposit >= orderData.total) {
      setChange(deposit - orderData.total);
    } else {
      setChange(0);
    }
  }, [deposit, orderData.total]);

  const handleDepositChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = parseFloat(value);
    setDeposit(!isNaN(numericValue) ? numericValue : value);
  };

  const handlePaymentComplete = async () => {
    const EndPoint = `https://${url}/api/orders`;
    try {
      // 支払いデータをバックエンドに送信
      const response = await axios.post(EndPoint, {
        customer: orderData.name,
        total_amount: orderData.total,
        deposit_amount: deposit,
        change: change,
        memo: orderData.memo,
        situation: 1, // 進捗状況を 1（新規注文など）で固定
        flavors: orderData.flavors,
        toppings: orderData.toppings,
      });

      alert('支払いが完了しました！注文ID: ' + response.data.order_id);

      // 支払い完了後に /order/create_1 にリダイレクト
      navigate('/order/create_1'); // 支払い完了後のリダイレクト先
    } catch (error) {
      console.error('支払いエラー:', error);
      alert('支払いに失敗しました。再度お試しください。');
    }
  };

  return (
    <Box sx={{ padding: 4, maxWidth: 800, margin: '0 auto' }}>
      <Paper sx={{ padding: 4 }}>
        {orderData ? (
          <Grid container spacing={4}>
            {/* 左側のコンテンツ */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                名前: {orderData.name}
              </Typography>

              <Typography variant="h6" gutterBottom>
                選択された商品
              </Typography>
              <List>
                {orderData.flavors
                  .filter((flavor: any) => flavor.quantity > 0) // 数量が0でない商品をフィルタリング
                  .map((flavor: any, index: number) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={`${flavor.name}: ${flavor.quantity}個 - ${flavor.price * flavor.quantity} 円`}
                      />
                    </ListItem>
                  ))}
              </List>

              {orderData.toppings && orderData.toppings.length > 0 ? (
                <>
                  <Typography variant="h6" gutterBottom>
                    選択されたトッピング
                  </Typography>
                  <List>
                    {orderData.toppings.map((topping: any, index: number) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={`${topping.topping_name || topping.name}: ${
                            topping.topping_price || topping.price
                          } 円`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </>
              ) : (
                <Typography variant="body1">選択されたトッピングがありません。</Typography>
              )}
            </Grid>

            {/* 右側のコンテンツ */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                メモ
              </Typography>
              <Typography variant="body1" paragraph>
                {orderData.memo || 'なし'}
              </Typography>

              <Typography variant="h6" gutterBottom>
                合計金額: {orderData.total} 円
              </Typography>

              {/* お預かり金額の入力フォーム */}
              <TextField
                label="お預かり金額"
                variant="outlined"
                fullWidth
                value={deposit}
                onChange={handleDepositChange}
                placeholder="金額を入力"
                sx={{ marginBottom: 2 }}
                type="number"
              />

              {/* お釣りの表示 */}
              <Typography variant="h6" gutterBottom>
                お釣り: {change} 円
              </Typography>

              {/* 支払い完了ボタン */}
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handlePaymentComplete}
                sx={{ marginTop: 2 }}
                disabled={change < 0 || deposit === ''}
              >
                支払い完了
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Typography variant="body1">注文データがありません。</Typography>
        )}
      </Paper>
    </Box>
  );
};

export default Order_create_2;
