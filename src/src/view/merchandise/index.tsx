import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Merchandise {
  id: number;
  merchandise_name: string;
  merchandise_price: number;
  stock: number;
  merchandise_display: boolean; // 表示/非表示フラグを追加
}

const Merchandise_index: React.FC = () => {
  const [merchandises, setMerchandises] = useState<Merchandise[]>([]);

  //URLを環境変数から読み込み
  const url = import.meta.env.VITE_APP_URL;

  //取得したURLとルーティングを組み合わせてエンドポイントを作成
  const EndPoint1 = `${url}/api/merchandises`;

  useEffect(() => {
    // LaravelのAPIからデータを取得
    axios
      .get(EndPoint1)
      .then((response) => {
        setMerchandises(response.data);
      })
      .catch((error) => {
        console.error('データ取得エラー:', error);
      });
  }, []);

  // 削除機能
  const handleDelete = (id: number) => {
    const EndPoint2 = `${url}/api/merchandises/${id}`;
    if (window.confirm('本当に削除しますか？')) {
      axios
        .delete(EndPoint2)
        .then(() => {
          // 削除後、UI上でも削除するために状態を更新
          setMerchandises((prevMerchandises) => prevMerchandises.filter((merchandise) => merchandise.id !== id));
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
                <TableCell>商品名</TableCell>
                <TableCell>値段</TableCell>
                <TableCell>在庫</TableCell>
                <TableCell>表示</TableCell> {/* 新しく追加 */}
                <TableCell>操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {merchandises.map((merchandise) => (
                <TableRow key={merchandise.id}>
                  <TableCell>{merchandise.id}</TableCell>
                  <TableCell>{merchandise.merchandise_name}</TableCell>
                  <TableCell>{merchandise.merchandise_price}</TableCell>
                  <TableCell>{merchandise.stock}</TableCell>
                  <TableCell>{merchandise.merchandise_display ? '表示' : '非表示'}</TableCell> {/* 新しく追加 */}
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{ mr: 1 }}
                      component={Link}
                      to={`/merchandise/edit/${merchandise.id}`}
                    >
                      編集
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={() => handleDelete(merchandise.id)}
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
        <Button variant="contained" color="primary" component={Link} to="/merchandise/create">
          登録
        </Button>
      </Box>
    </Box>
  );
};

export default Merchandise_index;
