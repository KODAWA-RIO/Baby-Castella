import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

interface  Topping{
    id: number;
    topping_name: string;
    topping_price: number;
    topping_display: boolean;
}
  
const merchandises: Topping[] = [
    { id: 1, topping_name: 'ハチミツ', topping_price: 50, topping_display: true},
    { id: 2, topping_name: 'チョコ', topping_price: 50, topping_display: true},
];

const Topping_index: React.FC = () => {
    return (
        <Box sx={{ padding: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/topping/create"
            >
              登録
            </Button>
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>商品名</TableCell>
                  <TableCell>値段</TableCell>
                  <TableCell>表示</TableCell>
                  <TableCell >操作</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {merchandises.map((topping) => (
                  <TableRow key={topping.id}>
                    <TableCell>{topping.id}</TableCell>
                    <TableCell>{topping.topping_name}</TableCell>
                    <TableCell>{topping.topping_price}</TableCell>
                    <TableCell>{topping.topping_display ? '表示' : '非表示'}</TableCell>
                    <TableCell >
                        <Button variant="contained" color="primary" size="small" sx={{ mr: 1 }} component={Link} to="/topping/edit">
                            編集
                        </Button>
                        <Button variant="contained" color="secondary" size="small">
                            削除
                        </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      );
};

export default Topping_index;