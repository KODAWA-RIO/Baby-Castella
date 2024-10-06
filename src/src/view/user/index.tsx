import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

interface User {
  id: number;
  name: string;
  number: string;
  role: string;
}

const users: User[] = [
  { id: 1, name: '山田 太郎', number: '000000', role: '管理者' },
  { id: 2, name: '鈴木 次郎', number: '111111', role: 'スタッフ' },
  { id: 3, name: '佐藤 花子', number: '222222', role: 'ユーザー' },
];

const UserList: React.FC = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/user/signup"
        >
          登録
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>名前</TableCell>
              <TableCell>学籍番号</TableCell>
              <TableCell>役割</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.number}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary" size="small">
                    削除
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserList;
