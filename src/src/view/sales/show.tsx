import React, { useState, useEffect } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface MerchandiseSale {
  hour: number;
  merchandise_name: string;
  total_sales: number;
}

interface ToppingSale {
  hour: number;
  topping_name: string;
  total_sales: number;
}

interface GroupedSales {
  hour: number;
  [key: string]: number; // 商品名やトッピング名をキーとする動的プロパティ
}

const Sales_show: React.FC = () => {
  const { date } = useParams<{ date: string }>();
  const [merchandiseSales, setMerchandiseSales] = useState<MerchandiseSale[]>([]);
  const [groupedMerchandiseSales, setGroupedMerchandiseSales] = useState<GroupedSales[]>([]);
  const [toppingSales, setToppingSales] = useState<ToppingSale[]>([]);
  const [groupedToppingSales, setGroupedToppingSales] = useState<GroupedSales[]>([]);
  const url = import.meta.env.VITE_APP_URL;

  // データを時間帯ごとにグループ化する関数
  const groupSalesByHour = (sales: { hour: number; [key: string]: any }[], nameKey: string) => {
    const grouped: { [key: number]: GroupedSales } = {};

    sales.forEach((sale) => {
      if (!grouped[sale.hour]) {
        grouped[sale.hour] = { hour: sale.hour };
      }
      grouped[sale.hour][sale[nameKey]] = sale.total_sales;
    });

    return Object.values(grouped);
  };

  // 指定された日付の商品とトッピングの売り上げデータを取得
  const EndPoint1 = `http://${url}/api/sales/merchandise/${date}`
  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const merchandiseResponse = await axios.get(EndPoint1);
        const merchandiseData = merchandiseResponse.data;
        setMerchandiseSales(merchandiseData);
        setGroupedMerchandiseSales(groupSalesByHour(merchandiseData, 'merchandise_name'));

        const EndPoint2 = `http://${url}/api/sales/topping/${date}`
        const toppingResponse = await axios.get(EndPoint2);
        const toppingData = toppingResponse.data;
        setToppingSales(toppingData);
        setGroupedToppingSales(groupSalesByHour(toppingData, 'topping_name'));
      } catch (error) {
        console.error('売り上げデータの取得に失敗しました:', error);
      }
    };

    fetchSalesData();
  }, [date]);

  // 商品名リストを取得
  const merchandiseNames = Array.from(new Set(merchandiseSales.map(sale => sale.merchandise_name)));
  // トッピング名リストを取得
  const toppingNames = Array.from(new Set(toppingSales.map(sale => sale.topping_name)));

  // 色の配列を用意
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#413ea0', '#ffbb28'];

  return (
    <Box sx={{ padding: 2 }}>
      {/* 商品売り上げテーブル */}
      <Typography variant="h5" gutterBottom>
        {date} の商品売り上げ
      </Typography>
      <TableContainer component={Paper} sx={{ marginBottom: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>時間帯</TableCell>
              {merchandiseNames.map((name) => (
                <TableCell key={name}>{name}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {groupedMerchandiseSales.map((groupedSale, index) => (
              <TableRow key={index}>
                <TableCell>{`${groupedSale.hour}:00 - ${groupedSale.hour + 1}:00`}</TableCell>
                {merchandiseNames.map((name) => (
                  <TableCell key={name}>{groupedSale[name] || 0}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 商品売り上げグラフ */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={groupedMerchandiseSales} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hour" label={{ value: '時間帯', position: 'insideBottomRight', offset: -5 }} />
          <YAxis label={{ value: '売上数', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          {merchandiseNames.map((name, index) => (
            <Bar key={name} dataKey={name} fill={colors[index % colors.length]} name={name} />
          ))}
        </BarChart>
      </ResponsiveContainer>

      {/* トッピング売り上げテーブル */}
      <Typography variant="h5" gutterBottom>
        {date} のトッピング売り上げ
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>時間帯</TableCell>
              {toppingNames.map((name) => (
                <TableCell key={name}>{name}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {groupedToppingSales.map((groupedSale, index) => (
              <TableRow key={index}>
                <TableCell>{`${groupedSale.hour}:00 - ${groupedSale.hour + 1}:00`}</TableCell>
                {toppingNames.map((name) => (
                  <TableCell key={name}>{groupedSale[name] || 0}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* トッピング売り上げグラフ */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={groupedToppingSales} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hour" label={{ value: '時間帯', position: 'insideBottomRight', offset: -5 }} />
          <YAxis label={{ value: '売上数', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          {toppingNames.map((name, index) => (
            <Bar key={name} dataKey={name} fill={colors[index % colors.length]} name={name} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default Sales_show;
