import React from 'react';
import { Box } from '@mui/material';
import Sidenav from './Sidenav';

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#000000' }}>
      <Sidenav />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${240}px)` },
          ml: { sm: `${240}px` },
          backgroundColor: '#000000',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout; 