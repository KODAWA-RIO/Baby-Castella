import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

// サンプルデータ
const cookingOrders = ['田中 三郎', '佐藤 次郎'];
const preparationOrders = ['山田 太郎', '鈴木 一郎'];
const readyForPickupOrders = ['佐藤 花子', '田中 一郎'];

const OrderStatusDisplay: React.FC = () => {
  return (
    <Box sx={{ padding: 4 }}>
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
