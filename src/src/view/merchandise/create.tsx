import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // useNavigateをインポート
import axios from 'axios';

const MerchandiseCreate: React.FC = () => {
  const [merchandise_name, setMerchandiseName] = useState('');
  const [merchandise_price, setMerchandisePrice] = useState('');
  const [stock, setStock] = useState('');
  const navigate = useNavigate(); // useNavigateフックを呼び出し

  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 送信データの作成
    const formData = {
      merchandise_name: merchandise_name,
      merchandise_price: parseFloat(merchandise_price), // 値段を数値に変換
      stock: parseInt(stock, 10), // 在庫を数値に変換
    };

    try {
      // Laravel APIにPOSTリクエスト
      const response = await axios.post('http://localhost:8080/api/merchandises/store', formData);
      console.log(response.data);

      // 登録が成功した場合、一覧画面にリダイレクト
      navigate('/merchandise');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // AxiosErrorの場合の処理
        console.error('Axios error response:', error.response?.data);
      } else {
        // その他のエラー
        console.error('Unexpected error:', error);
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          商品登録
        </Typography>
        <Box component="form" onSubmit={handleCreate} sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="merchandiseName"
            label="商品名"
            name="merchandiseName"
            autoComplete="merchandise-name"
            autoFocus
            value={merchandise_name}
            onChange={(e) => setMerchandiseName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="price"
            label="値段"
            name="price"
            autoComplete="price"
            value={merchandise_price}
            onChange={(e) => setMerchandisePrice(e.target.value)}
            type="number" // 入力を数値に限定
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="stock"
            label="在庫"
            name="stock"
            autoComplete="stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            type="number" // 入力を数値に限定
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            登録
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default MerchandiseCreate;
