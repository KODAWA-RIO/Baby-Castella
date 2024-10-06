import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const NavBar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#ffffff' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1,color: '#965042'}}>
          MyApp
        </Typography>
        <IconButton
          edge="start"
          sx={{ color: '#000000' }}
          aria-label="menu"
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose} component={Link} to="/user">ユーザー一覧</MenuItem>
          <MenuItem onClick={handleMenuClose} component={Link} to="/order">注文履歴</MenuItem>
          <MenuItem onClick={handleMenuClose} component={Link} to="/order/create_1">注文</MenuItem>
          <MenuItem onClick={handleMenuClose}>
            進行状況
            <Box sx={{ ml: 2 }}>
              <MenuItem onClick={handleMenuClose} component={Link} to="/reception/cooking">調理中</MenuItem>
              <MenuItem onClick={handleMenuClose} component={Link} to="/reception/preparation">準備中</MenuItem>
              <MenuItem onClick={handleMenuClose} component={Link} to="/reception/receiving_customer">受け取り可能</MenuItem>
              <MenuItem onClick={handleMenuClose} component={Link} to="/reception/receiving_staff">受け取り画面</MenuItem>
            </Box>
          </MenuItem>
          <MenuItem onClick={handleMenuClose} component={Link} to="/merchandise">メニュー一覧</MenuItem>
          <MenuItem onClick={handleMenuClose} component={Link} to="/topping">トッピング一覧</MenuItem>
          <MenuItem onClick={handleMenuClose} component={Link} to="/sales">売り上げ</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
