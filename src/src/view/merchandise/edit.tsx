import React, { useState} from 'react';
import { TextField, Button, Box, Typography, Container, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

interface Merchandise {
  id: number;
  merchandise_name: string;
  merchandise_price: string;
  stock: string;
  merchandise_display: string;
}

const Merchandise_edit: React.FC<{ merchandise: Merchandise }> = ({ merchandise }) => {
    const [merchandise_name, setMerchandiseName] = useState(merchandise.merchandise_name);
    const [merchandise_price, setMerchandisePrice] = useState(merchandise.merchandise_price);
    const [stock, setStock] = useState(merchandise.stock);
    const [merchandise_display, setMerchandiseDisplay] = useState(merchandise.merchandise_display);
  
    const handleEdit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      // 商品編集処理のロジックをここに追加
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
            商品編集
          </Typography>
          <Box component="form" onSubmit={handleEdit} sx={{ mt: 1 }}>
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
                onChange={(e) => setMerchandiseDisplay(e.target.value)}
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
export default Merchandise_edit;