import React from 'react';
import { Box, Button, Typography, Paper, Divider } from '@mui/material';

interface Order {
  name: string;
  items: { flavor: string, quantity: number }[];
  toppings: string[];
  memo: string;
}

// サンプルデータ
const orders: Order[] = [
  {
    name: '山田 太郎',
    items: [
      { flavor: 'プレーン', quantity: 2 },
      { flavor: 'チョコ', quantity: 1 },
      { flavor: 'ストロベリー', quantity: 3 }
    ],
    toppings: ['チョコチップ', 'シナモン'],
    memo: 'お持ち帰り希望',
  },
  {
    name: '鈴木 一郎',
    items: [
      { flavor: 'プレーン', quantity: 1 },
      { flavor: '抹茶', quantity: 2 }
    ],
    toppings: ['ホイップクリーム'],
    memo: '店内で飲食',
  },
  {
    name: '佐藤 花子',
    items: [
      { flavor: 'バニラ', quantity: 2 },
      { flavor: 'ブルーベリー', quantity: 1 }
    ],
    toppings: ['カラメルソース', 'ナッツ'],
    memo: 'なし',
  },
  {
    name: '高橋 一子',
    items: [
      { flavor: 'プレーン', quantity: 1 },
      { flavor: 'チーズ', quantity: 1 }
    ],
    toppings: ['ナッツ', 'メープルシロップ'],
    memo: '誕生日用ケーキ',
  },
  {
    name: '伊藤 次郎',
    items: [
      { flavor: 'チョコ', quantity: 2 },
      { flavor: '抹茶', quantity: 1 }
    ],
    toppings: ['ホイップクリーム', 'チョコチップ'],
    memo: 'テイクアウト',
  },
  {
    name: '田中 三郎',
    items: [
      { flavor: 'キャラメル', quantity: 2 },
      { flavor: '抹茶', quantity: 2 }
    ],
    toppings: ['シナモン', 'ナッツ'],
    memo: 'なし',
  },
  {
    name: '中村 四郎',
    items: [
      { flavor: 'プレーン', quantity: 3 },
      { flavor: '抹茶', quantity: 2 }
    ],
    toppings: ['メープルシロップ'],
    memo: '特別仕様で',
  },
  {
    name: '林 五郎',
    items: [
      { flavor: 'ストロベリー', quantity: 1 },
      { flavor: 'バニラ', quantity: 2 }
    ],
    toppings: ['ホイップクリーム'],
    memo: 'お持ち帰り希望',
  },
];

const OrderTicketList: React.FC = () => {
  return (
    <Box sx={{ padding: 4 }}>
      {/* 画面タイトル */}
      <Typography variant="h6" gutterBottom textAlign="center">
        受け取り可能
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
                <Button variant="contained" color="secondary" sx={{ mr: 1 }}>
                  準備中に戻る
                </Button>
                <Button variant="contained" color="primary">
                  受け取り完了
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
