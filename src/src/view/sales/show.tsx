import React from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface MerchandiseSale {
  timeSlot: string;
  merchandiseA: number;
  merchandiseB: number;
  merchandiseC: number;
}

interface ToppingSale {
  timeSlot: string;
  toppingA: number;
  toppingB: number;
  toppingC: number;
}

const merchandiseSales: MerchandiseSale[] = [
    { timeSlot: '9:00-10:00', merchandiseA: 3, merchandiseB: 5, merchandiseC: 2 },
    { timeSlot: '10:00-11:00', merchandiseA: 4, merchandiseB: 3, merchandiseC: 6 },
    { timeSlot: '11:00-12:00', merchandiseA: 2, merchandiseB: 7, merchandiseC: 4 },
    { timeSlot: '12:00-13:00', merchandiseA: 6, merchandiseB: 4, merchandiseC: 5 },
    { timeSlot: '13:00-14:00', merchandiseA: 5, merchandiseB: 6, merchandiseC: 3 },
    { timeSlot: '14:00-15:00', merchandiseA: 7, merchandiseB: 3, merchandiseC: 8 },
  ];
  
  const toppingSales: ToppingSale[] = [
    { timeSlot: '9:00-10:00', toppingA: 2, toppingB: 4, toppingC: 5 },
    { timeSlot: '10:00-11:00', toppingA: 5, toppingB: 3, toppingC: 6 },
    { timeSlot: '11:00-12:00', toppingA: 6, toppingB: 2, toppingC: 7 },
    { timeSlot: '12:00-13:00', toppingA: 4, toppingB: 7, toppingC: 3 },
    { timeSlot: '13:00-14:00', toppingA: 3, toppingB: 5, toppingC: 4 },
    { timeSlot: '14:00-15:00', toppingA: 7, toppingB: 6, toppingC: 2 },
  ];
  

const Sales_show: React.FC = () => {
  return (
    <Box sx={{ padding: 2 }}>
      {/* 商品売り上げテーブル */}
      <Typography variant="h5" gutterBottom>
        商品
      </Typography>
      <TableContainer component={Paper} sx={{ marginBottom: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>時間帯</TableCell>
              <TableCell>商品A</TableCell>
              <TableCell>商品B</TableCell>
              <TableCell>商品C</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {merchandiseSales.map((sale) => (
              <TableRow key={sale.timeSlot}>
                <TableCell>{sale.timeSlot}</TableCell>
                <TableCell>{sale.merchandiseA}</TableCell>
                <TableCell>{sale.merchandiseB}</TableCell>
                <TableCell>{sale.merchandiseC}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 商品売り上げグラフ */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={merchandiseSales} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timeSlot" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="merchandiseA" fill="#8884d8" />
          <Bar dataKey="merchandiseB" fill="#82ca9d" />
          <Bar dataKey="merchandiseC" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>

      {/* トッピング売り上げテーブル */}
      <Typography variant="h5" gutterBottom>
        トッピング
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>時間帯</TableCell>
              <TableCell>トッピングA</TableCell>
              <TableCell>トッピングB</TableCell>
              <TableCell>トッピングC</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {toppingSales.map((sale) => (
              <TableRow key={sale.timeSlot}>
                <TableCell>{sale.timeSlot}</TableCell>
                <TableCell>{sale.toppingA}</TableCell>
                <TableCell>{sale.toppingB}</TableCell>
                <TableCell>{sale.toppingC}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* トッピング売り上げグラフ */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={toppingSales} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timeSlot" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="toppingA" fill="#8884d8" />
          <Bar dataKey="toppingB" fill="#82ca9d" />
          <Bar dataKey="toppingC" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default Sales_show;
