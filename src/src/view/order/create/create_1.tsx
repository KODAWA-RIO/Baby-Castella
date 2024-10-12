import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Grid, Paper, IconButton, TextField, FormControl, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Flavor {
  merchandise_name: string;  // 商品名
  stock: number;             // 在庫
  merchandise_price: number; // 商品価格
  merchandise_display: boolean; // 商品の表示/非表示
}

interface Topping {
  topping_name: string;   // トッピング名
  topping_price: number;  // トッピング価格
  topping_display: boolean; // トッピングの表示/非表示
}

const Order_create_1: React.FC = () => {
  const [flavors, setFlavors] = useState<Flavor[]>([]);
  const [quantities, setQuantities] = useState<number[]>([]);
  const [toppings, setToppings] = useState<Topping[]>([]);
  const [selectedToppings, setSelectedToppings] = useState<Topping[]>([]);
  const [name, setName] = useState<string>('');
  const [memo, setMemo] = useState<string>('');

  const navigate = useNavigate();

  // フレーバー（merchandises）とトッピング（toppings）のデータを取得
  useEffect(() => {
    const fetchData = async () => {
      try {
        // フレーバーのデータを取得し、表示に設定されているものだけを残す
        const flavorResponse = await axios.get('http://localhost:8080/api/merchandises');
        const displayedFlavors = flavorResponse.data.filter((flavor: Flavor) => flavor.merchandise_display); // 表示されるものだけ
        setFlavors(displayedFlavors);
        setQuantities(Array(displayedFlavors.length).fill(0)); // フレーバーに対応した数量配列を設定

        // トッピングのデータを取得し、表示に設定されているものだけを残す
        const toppingResponse = await axios.get('http://localhost:8080/api/toppings');
        const displayedToppings = toppingResponse.data.filter((topping: Topping) => topping.topping_display); // 表示されるものだけ
        setToppings(displayedToppings);
      } catch (error) {
        console.error('データの取得エラー:', error);
      }
    };

    fetchData();
  }, []);

  const calculateTotal = () => {
    const flavorTotal = flavors.reduce(
      (sum, flavor, index) => sum + flavor.merchandise_price * quantities[index],
      0
    );
    const toppingTotal = selectedToppings.reduce((sum, topping) => sum + topping.topping_price, 0);

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
    const topping = toppings.find(t => t.topping_name === event.target.name);
    if (event.target.checked && topping) {
      setSelectedToppings([...selectedToppings, topping]);
    } else {
      setSelectedToppings(selectedToppings.filter(t => t.topping_name !== event.target.name));
    }
  };

  const handleSubmit = () => {
    const orderData = {
      flavors: flavors.map((flavor, index) => ({
        name: flavor.merchandise_name,
        quantity: quantities[index],
        price: flavor.merchandise_price,
      })),
      toppings: selectedToppings,  // トッピングのデータを渡す
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
          <Grid item xs={6} sm={4} key={flavor.merchandise_name}>
            <Paper sx={{ padding: 2, textAlign: 'center', backgroundColor: '#d3d3d3' }}>
              <Typography variant="h6">{flavor.merchandise_name}</Typography>
              <Typography variant="body1">価格: {flavor.merchandise_price} 円</Typography>
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
                control={<Checkbox checked={selectedToppings.some(t => t.topping_name === topping.topping_name)} onChange={handleToppingChange} name={topping.topping_name} />}
                label={`${topping.topping_name} (${topping.topping_price} 円)`}
                key={topping.topping_name}
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
