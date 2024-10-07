import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Button, Typography, TextField, Paper, List, ListItem, ListItemText } from '@mui/material';

const Order_create_2: React.FC = () => {
  const location = useLocation();
  const { orderData } = location.state || {};

  const [deposit, setDeposit] = useState<number | string>('');  // お預かり金額
  const [change, setChange] = useState<number>(0);  // お釣り

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

  const handlePaymentComplete = () => {
    // 支払い完了の処理をここに追加
    alert('支払いが完了しました！');
  };

  return (
    <Box sx={{ padding: 4, maxWidth: 600, margin: '0 auto' }}>
      <Paper sx={{ padding: 4 }}>
        {orderData ? (
          <>
            <Typography variant="h6" gutterBottom>
              名前: {orderData.name}
            </Typography>

            <Typography variant="h6" gutterBottom>
              選択された商品
            </Typography>
            <List>
              {orderData.flavors
                .filter((flavor: any) => flavor.quantity > 0)  // 数量が0でない商品をフィルタリング
                .map((flavor: any, index: number) => (
                  <ListItem key={index}>
                    <ListItemText primary={`${flavor.name}: ${flavor.quantity}個 - ${flavor.price * flavor.quantity} 円`} />
                  </ListItem>
                ))}
            </List>

            {orderData.toppings.length > 0 && (
              <>
                <Typography variant="h6" gutterBottom>
                  選択されたトッピング
                </Typography>
                <List>
                  {orderData.toppings.map((topping: any, index: number) => (
                    <ListItem key={index}>
                      <ListItemText primary={`${topping.name}: ${topping.price} 円`} />
                    </ListItem>
                  ))}
                </List>
              </>
            )}

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
          </>
        ) : (
          <Typography variant="body1">注文データがありません。</Typography>
        )}
      </Paper>
    </Box>
  );
};

export default Order_create_2;
