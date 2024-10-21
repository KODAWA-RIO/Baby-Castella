import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // useNavigateをインポート
import axios from 'axios';

const ToppingCreate: React.FC = () => {
  const [toppingName, setToppingName] = useState('');
  const [toppingPrice, setToppingPrice] = useState('');
  const [toppingDisplay, setToppingDisplay] = useState('1'); // デフォルトは表示
  const [errorMessage, setErrorMessage] = useState(''); 
  const navigate = useNavigate();
  const url = import.meta.env.VITE_APP_URL;

  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = {
      topping_name: toppingName,
      topping_price: parseFloat(toppingPrice), // 値段を数値に変換
      topping_display: toppingDisplay === '1', // 表示/非表示の変換
    };

    const EndPoint = `http://${url}/api/toppings/store`;

    try {
      const response = await axios.post(EndPoint, formData);
      console.log(response.data);

      // 登録が成功した場合、一覧画面にリダイレクト
      navigate('/topping');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMessage('登録に失敗しました: ' + (error.response?.data.message || '不明なエラー'));
      } else {
        setErrorMessage('予期しないエラーが発生しました。');
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          トッピング登録
        </Typography>
        {errorMessage && (
          <Typography color="error" sx={{ mt: 2 }}>
            {errorMessage}
          </Typography>
        )}
        <Box component="form" onSubmit={handleCreate} sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="toppingName"
            label="トッピング名"
            name="toppingName"
            autoComplete="topping-name"
            autoFocus
            value={toppingName}
            onChange={(e) => setToppingName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="price"
            label="値段"
            name="price"
            value={toppingPrice}
            onChange={(e) => setToppingPrice(e.target.value)}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="display-select-label">表示設定</InputLabel>
            <Select
              labelId="display-select-label"
              id="toppingDisplay"
              value={toppingDisplay}
              onChange={(e) => setToppingDisplay(e.target.value)}
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

export default ToppingCreate;
