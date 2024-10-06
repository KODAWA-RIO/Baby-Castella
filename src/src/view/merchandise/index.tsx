import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

interface  Merchandise{
    id: number;
    merchandise_name: string;
    merchandise_price: number;
    stock: number;
    merchandise_display: boolean;
}
  
const merchandises: Merchandise[] = [
    { id: 1, merchandise_name: 'プレーン', merchandise_price: 50, stock: 100, merchandise_display: true},
    { id: 2, merchandise_name: 'カスタード', merchandise_price: 60, stock: 50, merchandise_display: true},
    { id: 3, merchandise_name: 'あんこ', merchandise_price: 70, stock: 60, merchandise_display: false},
];

const Merchandise_index: React.FC = () => {
    return (
        <Box sx={{ padding: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/merchandise/create"
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
                  <TableCell>在庫</TableCell>
                  <TableCell>表示</TableCell>
                  <TableCell >操作</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {merchandises.map((merchandise) => (
                  <TableRow key={merchandise.id}>
                    <TableCell>{merchandise.id}</TableCell>
                    <TableCell>{merchandise.merchandise_name}</TableCell>
                    <TableCell>{merchandise.merchandise_price}</TableCell>
                    <TableCell>{merchandise.stock}</TableCell>
                    <TableCell>{merchandise.merchandise_display ? '表示' : '非表示'}</TableCell>
                    <TableCell >
                        <Button variant="contained" color="primary" size="small" sx={{ mr: 1 }} component={Link} to="/merchandise/edit">
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

export default Merchandise_index;