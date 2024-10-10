import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // useNavigateをインポート
import axios from 'axios';

const ToppingCreate: React.FC = () => {
  const [toppingName, setToppingName] = useState('');
  const [toppingPrice, setToppingPrice] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // エラーメッセージを表示するための状態
  const navigate = useNavigate(); // useNavigateフックを呼び出し

  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // 送信前のバリデーション（toppingPriceが数値かどうかチェック）
    const parsedPrice = parseFloat(toppingPrice);
    if (isNaN(parsedPrice)) {
      setErrorMessage('値段は数値で入力してください。');
      return;
    }

    // 送信データの作成
    const formData = {
      topping_name: toppingName,
      topping_price: parsedPrice, // 値段を数値に変換
    };

    try {
      // Laravel APIにPOSTリクエスト
      const response = await axios.post('http://localhost:8080/api/toppings/store', formData);
      console.log(response.data);

      // 登録が成功した場合、一覧画面にリダイレクト
      navigate('/topping');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // AxiosErrorの場合の処理
        setErrorMessage('登録に失敗しました: ' + (error.response?.data.message || '不明なエラー'));
      } else {
        // その他のエラー
        setErrorMessage('予期しないエラーが発生しました。');
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
            autoComplete="price"
            value={toppingPrice}
            onChange={(e) => setToppingPrice(e.target.value)}
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

export default ToppingCreate;
