import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  TextField,
  Pagination,
} from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Order {
  id: number;
  updated_at: string;
  customer: string;
}

const OrderIndex: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(1); // 現在のページ番号
  const [totalPages, setTotalPages] = useState(1); // 総ページ数
  const [searchTerm, setSearchTerm] = useState(''); // 検索クエリ

  const url = import.meta.env.VITE_APP_URL;
  const EndPoint = `https://${url}/api/orders`;

  useEffect(() => {
    // LaravelのAPIからデータを取得
    const fetchOrders = async () => {
      try {
        const response = await axios.get(EndPoint, {
          params: { page: currentPage, search: searchTerm }, // ページ番号と検索クエリを送信
        });
        setOrders(response.data.data); // ページ内の注文
        setTotalPages(response.data.last_page); // 総ページ数を設定
      } catch (error) {
        console.error('データ取得エラー:', error);
      }
    };

    fetchOrders();
  }, [currentPage, searchTerm]); // ページ番号か検索クエリが変更されたら再度APIを呼び出す

  // 日付のフォーマット関数
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // ロケールに基づいた日付のフォーマット
  };

  // 検索の処理
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // 検索時は1ページ目にリセット
  };

  // ページ変更の処理（eventは使わないので削除）
  const handlePageChange = (value: number) => {
    setCurrentPage(value);
  };

  return (
    <Box sx={{ padding: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      {/* 検索フィールド */}
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          label="検索"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="お客様名で検索"
          size="small"
        />
      </Box>

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

      {/* ページネーション */}
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(_, value) => handlePageChange(value)} // eventを使わない
        color="primary"
        sx={{ marginTop: 2 }}
      />
    </Box>
  );
};

export default OrderIndex;
