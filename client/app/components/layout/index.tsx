'use client';

import { Box, Container } from '@mui/material';
import Header from '../header';

interface IProps {
  sx?: any;
  children: React.ReactNode;
}

function Layout({ sx, children }: IProps) {
  return (
    <>
      <Header />
      <Container sx={sx}>
        <Box sx={{ mt: 2 }}>{children}</Box>
      </Container>
    </>
  );
}

export default Layout;
