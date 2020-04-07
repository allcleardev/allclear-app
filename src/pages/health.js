
import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import ProfileCard from '../components/profile-card';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  profile: {
    marginTop: theme.spacing(2)
  }
}));

export default function Health() {
  const styles = useStyles();

  return (
    <Container>
      <Box className={styles.profile}>
        <ProfileCard />
      </Box>
    </Container>
  );
}