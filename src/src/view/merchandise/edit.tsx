import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Container, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const MerchandiseEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [merchandiseName, setMerchandiseName] = useState('');
  const [merchandisePrice, setMerchandisePrice] = useState('');
  const [stock, setStock] = useState('');
  const [merchandiseDisplay, setMerchandiseDisplay] = useState('1');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  //URLを環境変数から読み込み
  const url = import.meta.env.VITE_APP_URL;
  
  //取得したURLとルーティングを組み合わせてエンドポイントを作成
  const EndPoint = `http://${url}/api/merchandises/${id}`;

  useEffect(() => {
    axios.get(EndPoint)
      .then(response => {
        const merchandise = response.data;
        setMerchandiseName(merchandise.merchandise_name);
        setMerchandisePrice(merchandise.merchandise_price);
        setStock(merchandise.stock);
        setMerchandiseDisplay(merchandise.merchandise_display ? '1' : '0');
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
      merchandise_display: merchandiseDisplay === '1',
    };

    try {
      await axios.put(EndPoint, updatedData);
      navigate('/merchandise');
    } catch (error) {
      console.error('Error updating merchandise:', error);
      setErrorMessage('商品の更新に失敗しました');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
            value={merchandisePrice}
            onChange={(e) => setMerchandisePrice(e.target.value)}
            type="number"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="stock"
            label="在庫"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            type="number"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="display-select-label">表示設定</InputLabel>
            <Select
              labelId="display-select-label"
              id="merchandiseDisplay"
              value={merchandiseDisplay}
              label="表示設定"
              onChange={(e) => setMerchandiseDisplay(e.target.value)}
            >
              <MenuItem value="1">表示</MenuItem>
              <MenuItem value="0">非表示</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
            更新
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default MerchandiseEdit;
