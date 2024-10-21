import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Topping {
  id: number;
  topping_name: string;
  topping_price: number;
  topping_display: boolean; // 表示/非表示の追加
}

const Topping_index: React.FC = () => {
  const [toppings, setToppings] = useState<Topping[]>([]);
  const url = import.meta.env.VITE_APP_URL;
  const EndPoint1 = `http://${url}/api/toppings`;
  // トッピングデータを取得
  useEffect(() => {
    axios.get(EndPoint1)
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
    const EndPoint2 = `http://${url}/api/toppings/${id}`;

    if (window.confirm('本当に削除しますか？')) {
      axios.delete(EndPoint2)
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
                <TableCell>表示</TableCell> {/* 新しく追加 */}
                <TableCell>操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {toppings.map((topping) => (
                <TableRow key={topping.id}>
                  <TableCell>{topping.id}</TableCell>
                  <TableCell>{topping.topping_name}</TableCell>
                  <TableCell>{topping.topping_price}</TableCell>
                  <TableCell>{topping.topping_display ? '表示' : '非表示'}</TableCell> {/* 新しく追加 */}
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
