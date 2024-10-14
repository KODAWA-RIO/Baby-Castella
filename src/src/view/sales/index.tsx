import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Order {
  date: string;
  total_orders: number;
}

const Sales_index: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // APIから日付ごとの注文データを取得
    axios.get('http://localhost:8080/api/sales/dates')
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error('データ取得エラー:', error);
      });
  }, []);

  return (
    <Box sx={{ padding: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2, width: '100%', maxWidth: 800 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>日付</TableCell>
                <TableCell>注文数</TableCell>
                <TableCell>操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order, index) => (
                <TableRow key={index}>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.total_orders}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" size="small" sx={{ mr: 1 }} component={Link} to={`/sales/show?date=${order.date}`}>
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

export default Sales_index;
