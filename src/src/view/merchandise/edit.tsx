import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const MerchandiseEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // URLから商品IDを取得
  const [merchandiseName, setMerchandiseName] = useState('');
  const [merchandisePrice, setMerchandisePrice] = useState('');
  const [stock, setStock] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // 商品データを取得してフォームにセット
  useEffect(() => {
    axios.get(`http://localhost:8080/api/merchandises/${id}`)
      .then(response => {
        const merchandise = response.data;
        setMerchandiseName(merchandise.merchandise_name);
        setMerchandisePrice(merchandise.merchandise_price);
        setStock(merchandise.stock);
      })
      .catch(error => {
        console.error('Error fetching merchandise:', error);
        setErrorMessage('商品データの取得に失敗しました');
      });
  }, [id]);

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updatedData = {
      merchandise_name: merchandiseName,
      merchandise_price: merchandisePrice,
      stock: stock,
    };

    try {
      // 更新リクエストを送信
      await axios.put(`http://localhost:8080/api/merchandises/${id}`, updatedData);
      navigate('/merchandise'); // 更新後、商品一覧ページにリダイレクト
    } catch (error) {
      console.error('Error updating merchandise:', error);
      setErrorMessage('商品の更新に失敗しました');
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
          商品編集
        </Typography>
        {errorMessage && (
          <Typography color="error" sx={{ mt: 2 }}>
            {errorMessage}
          </Typography>
        )}
        <Box component="form" onSubmit={handleUpdate} sx={{ mt: 1 }}>
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
            value={merchandiseName}
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
            value={merchandisePrice}
            onChange={(e) => setMerchandisePrice(e.target.value)}
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
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            更新
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default MerchandiseEdit;
