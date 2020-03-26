import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import SimpleBottomNavigation from './components/navigation'

export default function App() {
  return (
    <Box>
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            All-Clear App
          </Typography>
        </Box>
      </Container>
      <SimpleBottomNavigation />
    </Box>
  );
}
