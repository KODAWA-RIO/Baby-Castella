import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MerchandiseCreate: React.FC = () => {
  const [merchandise_name, setMerchandiseName] = useState('');
  const [merchandise_price, setMerchandisePrice] = useState('');
  const [stock, setStock] = useState('');
  const [merchandise_display, setMerchandiseDisplay] = useState('1'); // デフォルトは表示に設定
  const navigate = useNavigate();

  //URLを環境変数から読み込み
  const url = import.meta.env.VITE_APP_URL;

  //取得したURLとルーティングを組み合わせてエンドポイントを作成
  const EndPoint = `http://${url}/api/merchandises/store`;

  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = {
      merchandise_name: merchandise_name,
      merchandise_price: parseFloat(merchandise_price), // 値段を数値に変換
      stock: parseInt(stock, 10), // 在庫を数値に変換
      merchandise_display: merchandise_display === '1', // 選択された値をbooleanに変換
    };

    try {
      // const response = await axios.post('http://localhost:8080/api/merchandises/store', formData);
      const response = await axios.post(EndPoint, formData);
      console.log(response.data);

      navigate('/merchandise'); // 登録後に商品一覧へリダイレクト
    } catch (error) {
      console.error('Error creating merchandise:', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
            value={merchandise_price}
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
              value={merchandise_display}
              label="表示設定"
              onChange={(e) => setMerchandiseDisplay(e.target.value)}
            >
              <MenuItem value="1">表示</MenuItem>
              <MenuItem value="0">非表示</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
            登録
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default MerchandiseCreate;
