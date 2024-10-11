import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Topping {
  id: number;
  topping_name: string;
  topping_price: number;
}

const Topping_index: React.FC = () => {
  const [toppings, setToppings] = useState<Topping[]>([]);

  // トッピングデータを取得
  useEffect(() => {
    axios.get('http://localhost:8080/api/toppings')
      .then((response) => {
        setToppings(response.data);
      })
      .catch((error) => {
        console.error('データ取得エラー:', error);
      });
  }, []);

  // トッピングを削除
  const handleDelete = (id: number) => {
    // 削除リクエストを送信
    if (window.confirm('本当に削除しますか？')) {
      axios.delete(`http://localhost:8080/api/toppings/${id}`)
        .then(() => {
          // 成功したら、削除したトッピングを一覧から除外する
          setToppings((prevToppings) => prevToppings.filter((topping) => topping.id !== id));
        })
        .catch((error) => {
          console.error('削除エラー:', error);
        });
    }
  };

  return (
    <Box sx={{ padding: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2, width: '100%', maxWidth: 800 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>トッピング名</TableCell>
                <TableCell>値段</TableCell>
                <TableCell>操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {toppings.map((topping) => (
                <TableRow key={topping.id}>
                  <TableCell>{topping.id}</TableCell>
                  <TableCell>{topping.topping_name}</TableCell>
                  <TableCell>{topping.topping_price}</TableCell>
                  <TableCell>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      size="small" 
                      sx={{ mr: 1 }} 
                      component={Link} 
                      to={`/topping/edit/${topping.id}`}
                    >
                      編集
                    </Button>
                    <Button 
                      variant="contained" 
                      color="secondary" 
                      size="small" 
                      onClick={() => handleDelete(topping.id)}
                    >
                      削除
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
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
    </Box>
  );
};

export default Topping_index;
