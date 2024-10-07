import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

interface  Order{
  id: number;
  date: string;
  customer: string;
}
  
const Orders: Order[] = [
  { id: 1, date: '11/2', customer: 'あああ'},
  { id: 2, date: '11/2', customer: 'いいい'},
  { id: 3, date: '11/2', customer: 'ううう'},
];
const Order_index: React.FC = () => {
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
                <TableCell >操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.customer}様</TableCell>
                  <TableCell >
                      <Button variant="contained" color="primary" size="small" sx={{ mr: 1 }} component={Link} to="/order/show">
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