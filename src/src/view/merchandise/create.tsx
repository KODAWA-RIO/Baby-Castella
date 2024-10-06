import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const MerchandiseCreate: React.FC = () => {
  const [merchandise_name, setmerchandise_name] = useState('');
  const [merchandise_price, setmerchandise_price] = useState('');
  const [stock, setStock] = useState('');
  const [merchandise_display, setmerchandise_display] = useState('');

  const handleCreate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 商品登録処理のロジックをここに追加
    console.log('商品名:', merchandise_name);
    console.log('値段:', merchandise_price);
    console.log('在庫:', stock);
    console.log('表示:', merchandise_display);
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
            onChange={(e) => setmerchandise_name(e.target.value)}
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
            onChange={(e) => setmerchandise_price(e.target.value)}
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
          <FormControl fullWidth margin="normal">
            <InputLabel id="role-label">表示</InputLabel>
            <Select
              labelId="role-label"
              id="role"
              value={merchandise_display}
              onChange={(e) => setmerchandise_display(e.target.value)}
              label="役割"
            >
              <MenuItem value="admin">表示</MenuItem>
              <MenuItem value="staff">非表示</MenuItem>
            </Select>
          </FormControl>
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
