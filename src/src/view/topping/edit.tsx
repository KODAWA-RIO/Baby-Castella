import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

interface Topping {
  id: number;
  topping_name: string;
  topping_price: string;
  topping_display: string;
}

const Topping_edit: React.FC<{ topping: Topping }> = ({ topping }) => {
    const [topping_name, setToppingName] = useState(topping.topping_name);
    const [topping_price, setToppingPrice] = useState(topping.topping_price);
    const [topping_display, setToppingDisplay] = useState(topping.topping_display);
  
    const handleEdit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      // トッピング編集処理のロジックをここに追加
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
            トッピング編集
          </Typography>
          <Box component="form" onSubmit={handleEdit} sx={{ mt: 1 }}>
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
              value={topping_name}
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
              value={topping_price}
              onChange={(e) => setToppingPrice(e.target.value)}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="role-label">表示</InputLabel>
              <Select
                labelId="role-label"
                id="role"
                value={topping_display}
                onChange={(e) => setToppingDisplay(e.target.value)}
                label="表示"
              >
                <MenuItem value="true">表示</MenuItem>
                <MenuItem value="false">非表示</MenuItem>
              </Select>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              保存
            </Button>
          </Box>
        </Box>
      </Container>
    );
};

export default Topping_edit;