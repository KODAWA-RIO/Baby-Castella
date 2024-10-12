import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Order {
  id: number;
  updated_at: string;
  customer: string;
}

const Order_index: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // LaravelのAPIからデータを取得
    axios.get('http://localhost:8080/api/orders')
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error('データ取得エラー:', error);
      });
  }, []);

  // 日付のフォーマット関数
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // ロケールに基づいた日付のフォーマット
  };

  return (
    <Box sx={{ padding: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2, width: '100%', maxWidth: 800 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>日付</TableCell>
                <TableCell>お客様名</TableCell>
                <TableCell>操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{formatDate(order.updated_at)}</TableCell> {/* 日付をフォーマットして表示 */}
                  <TableCell>{order.customer}様</TableCell>
                  <TableCell>
                    {/* 詳細ボタンのリンク先を注文ID付きに変更 */}
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{ mr: 1 }}
                      component={Link}
                      to={`/order/show/${order.id}`}
                    >
                      詳細
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Order_index;
