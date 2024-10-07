import React from 'react';
import { Button, Box, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

interface Order {
  id: number;
  date: string;
  customer: string;
  total_amount: number;
  deposit_amount: number;
  change: number;
  memo: string;
}
interface User {
  id: number;
  name: string;
}
interface Merchandise {
  id: number;
  merchandise_name: string;
  merchandise_price: number;
  pieces: number;
}

interface Topping {
  id: number;
  topping_name: string;
  topping_price: number;
}

const Orders: Order[] = [
  { id: 1, date: '11/2', customer: 'ワリオ', total_amount: 400, deposit_amount: 500, change: 100, memo: 'にんにくマシマシで' },
];
const Users: User[] = [
  { id: 1, name: '山田 太郎'}
];

const Merchandises: Merchandise[] = [
  { id: 1, merchandise_name: '商品A', merchandise_price: 50 ,pieces: 1},
  { id: 2, merchandise_name: '商品B', merchandise_price: 100 ,pieces: 2},
  { id: 3, merchandise_name: '商品C', merchandise_price: 150 ,pieces: 3},
];

const Toppings: Topping[] = [
  { id: 1, topping_name: 'トッピングA', topping_price: 50 },
  { id: 2, topping_name: 'トッピングB', topping_price: 75 },
  { id: 3, topping_name: 'トッピングC', topping_price: 100 },
];

const Order_show: React.FC = () => {
  return (
    <Box sx={{ padding: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2, width: '100%', maxWidth: 800 }}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/order/edit_1"
          sx={{ mr: 1 }}
        >
          編集
        </Button>
        <Button variant="contained" color="secondary" size="small">
          削除
        </Button>
      </Box>
      <TableContainer component={Paper} sx={{ maxWidth: 800 }}>
        <Table>
          <TableBody>
            {/* Order Details */}
            {Orders.map((order) => (
              <React.Fragment key={order.id}>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>{order.id}</TableCell>
                </TableRow>
                <TableRow>
                <TableCell>担当</TableCell>
                <TableCell>
                  {Users.map((user) => (
                    <Box key={user.id}>{user.name}</Box>
                  ))}
                </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>日付</TableCell>
                  <TableCell>{order.date}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>お客様</TableCell>
                  <TableCell>{order.customer}様</TableCell>
                </TableRow>
                {/* Merchandise Details */}
                <TableRow>
                  <TableCell>商品</TableCell>
                  <TableCell>
                    {Merchandises.map((merchandise) => (
                      <Box key={merchandise.id}>{merchandise.merchandise_name} × {merchandise.pieces} - {merchandise.merchandise_price * merchandise.pieces} 円</Box>
                    ))}
                  </TableCell>
                </TableRow>

                {/* Topping Details */}
                <TableRow>
                  <TableCell>トッピング</TableCell>
                  <TableCell>
                    {Toppings.map((topping) => (
                      <Box key={topping.id}>{topping.topping_name} - {topping.topping_price} 円</Box>
                    ))}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>合計</TableCell>
                  <TableCell>{order.total_amount} 円</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>お預かり金額</TableCell>
                  <TableCell>{order.deposit_amount} 円</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>お釣り</TableCell>
                  <TableCell>{order.change} 円</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>メモ</TableCell>
                  <TableCell>{order.memo}</TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Order_show;
