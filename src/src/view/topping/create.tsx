import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const Topping_create: React.FC = () => {
  const [topping_name, settopping_name] = useState('');
  const [topping_price, settopping_price] = useState('');
  const [topping_display, settopping_display] = useState('');

  const handleCreate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 商品登録処理のロジックをここに追加
    console.log('トッピング名:', topping_name);
    console.log('値段:', topping_price);
    console.log('表示:', topping_display);
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
        <Box component="form" onSubmit={handleCreate} sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="merchandiseName"
            label="トッピング名"
            name="merchandiseName"
            autoComplete="merchandise-name"
            autoFocus
            value={topping_name}
            onChange={(e) => settopping_name(e.target.value)}
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
            value={topping_price}
            onChange={(e) => settopping_price(e.target.value)}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="role-label">表示</InputLabel>
            <Select
              labelId="role-label"
              id="role"
              value={topping_display}
              onChange={(e) => settopping_display(e.target.value)}
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

export default Topping_create;