import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ToppingEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [toppingName, setToppingName] = useState('');
  const [toppingPrice, setToppingPrice] = useState('');
  const [toppingDisplay, setToppingDisplay] = useState('1'); // デフォルトは表示
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const url = import.meta.env.VITE_APP_URL;
  const EndPoint1 = `https://${url}/api/toppings/${id}`;

  useEffect(() => {
    axios
      .get(EndPoint1)
      .then((response) => {
        const topping = response.data;
        setToppingName(topping.topping_name);
        setToppingPrice(topping.topping_price);
        setToppingDisplay(topping.topping_display ? '1' : '0');
      })
      .catch((error) => {
        console.error('トッピングデータの取得エラー:', error);
        setErrorMessage('トッピングデータの取得に失敗しました');
      });
  }, [id]);

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updatedData = {
      topping_name: toppingName,
      topping_price: toppingPrice,
      topping_display: toppingDisplay === '1', // 表示/非表示をbooleanに変換
    };

    const EndPoint2 = `https://${url}/api/toppings/${id}`;

    try {
      await axios.put(EndPoint2, updatedData);
      navigate('/topping');
    } catch (error) {
      setErrorMessage('トッピングの更新に失敗しました');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          トッピング編集
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
            id="toppingName"
            label="トッピング名"
            name="toppingName"
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
            保存
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ToppingEdit;
