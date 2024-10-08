import React, { useState } from 'react';
import { Box, Button, Typography, Grid, Paper, IconButton, TextField, FormControl, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface Flavor {
  name: string;
  stock: number;
  price: number;
}

interface Topping {
  name: string;
  price: number;
}

const initialFlavors: Flavor[] = [
  { name: 'プレーン', stock: 1, price: 100 },
  { name: 'チョコレート', stock: 40, price: 120 },
  { name: '抹茶', stock: 40, price: 130 },
  { name: 'ストロベリー', stock: 40, price: 150 },
  { name: 'キャラメル', stock: 40, price: 140 },
  { name: 'チーズ', stock: 40, price: 160 }
];

const toppings: Topping[] = [
  { name: 'チョコチップ', price: 50 },
  { name: 'ホイップクリーム', price: 70 },
  { name: 'ナッツ', price: 60 },
  { name: 'メープルシロップ', price: 80 }
];

const Order_create_1: React.FC = () => {
  const [flavors, setFlavors] = useState<Flavor[]>(initialFlavors);
  const [quantities, setQuantities] = useState<number[]>(Array(flavors.length).fill(0));
  const [selectedToppings, setSelectedToppings] = useState<Topping[]>([]);
  const [name, setName] = useState<string>('');
  const [memo, setMemo] = useState<string>('');

  const navigate = useNavigate();

  const calculateTotal = () => {
    const flavorTotal = flavors.reduce(
      (sum, flavor, index) => sum + flavor.price * quantities[index],
      0
    );
    const toppingTotal = selectedToppings.reduce((sum, topping) => sum + topping.price, 0);

    return flavorTotal + toppingTotal;
  };

  const handleIncrement = (index: number) => {
    const newQuantities = [...quantities];
    const newFlavors = [...flavors];

    if (newQuantities.reduce((sum, val) => sum + val, 0) < 6 && newFlavors[index].stock > 0) {
      newQuantities[index] += 1;
      newFlavors[index].stock -= 1;
      setQuantities(newQuantities);
      setFlavors(newFlavors);
    }
  };

  const handleDecrement = (index: number) => {
    const newQuantities = [...quantities];
    const newFlavors = [...flavors];

    if (newQuantities[index] > 0) {
      newQuantities[index] -= 1;
      newFlavors[index].stock += 1;
      setQuantities(newQuantities);
      setFlavors(newFlavors);
    }
  };

  const handleToppingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const topping = toppings.find(t => t.name === event.target.name);
    if (event.target.checked && topping) {
      setSelectedToppings([...selectedToppings, topping]);
    } else {
      setSelectedToppings(selectedToppings.filter(t => t.name !== event.target.name));
    }
  };

  const handleSubmit = () => {
    const orderData = {
      flavors: flavors.map((flavor, index) => ({
        name: flavor.name,
        quantity: quantities[index],
        price: flavor.price,
      })),
      toppings: selectedToppings,
      name,
      memo,
      total: calculateTotal(),
    };

    // `navigate` を使用して次の画面にデータを渡す
    navigate('/order/create_2', { state: { orderData } });
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h6" gutterBottom>
        最大6個
        合計金額: {calculateTotal()} 円
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {flavors.map((flavor, index) => (
          <Grid item xs={6} sm={4} key={flavor.name}>
            <Paper sx={{ padding: 2, textAlign: 'center', backgroundColor: '#d3d3d3' }}>
              <Typography variant="h6">{flavor.name}</Typography>
              <Typography variant="body1">価格: {flavor.price} 円</Typography>
              {flavor.stock === 0 ? (
                <Typography variant="h6" color="error">
                  SOLD OUT
                </Typography>
              ) : (
                <Typography variant="body1">在庫: {flavor.stock} 個</Typography>
              )}
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
                <IconButton onClick={() => handleDecrement(index)} disabled={quantities[index] === 0}>
                  <Remove />
                </IconButton>
                <Typography variant="h5" sx={{ margin: '0 16px' }}>
                  {quantities[index]}
                </Typography>
                <IconButton onClick={() => handleIncrement(index)} disabled={quantities.reduce((sum, val) => sum + val, 0) >= 6 || flavor.stock === 0}>
                  <Add />
                </IconButton>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <FormControl component="fieldset">
          <FormGroup row sx={{ justifyContent: 'center' }}>
            {toppings.map(topping => (
              <FormControlLabel
                control={<Checkbox checked={selectedToppings.some(t => t.name === topping.name)} onChange={handleToppingChange} name={topping.name} />}
                label={`${topping.name} (${topping.price} 円)`}
                key={topping.name}
              />
            ))}
          </FormGroup>
        </FormControl>
      </Box>

      <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <TextField
          label="名前"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
          sx={{ width: '300px' }}
        />
        <TextField
          label="メモ"
          variant="outlined"
          multiline
          rows={3}
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          margin="normal"
          sx={{ width: '300px' }}
        />
      </Box>

      <Box sx={{ textAlign: 'center', marginTop: 4 }}>
        
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={quantities.reduce((sum, val) => sum + val, 0) === 0 || name.trim() === ''}
          sx={{ padding: '10px 20px', fontSize: '16px' }}
        >
          注文確認画面へ
        </Button>
      </Box>
    </Box>
  );
};

export default Order_create_1;
