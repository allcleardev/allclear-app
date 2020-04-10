import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import NavBottom from '../components/navBottom';
import HomescreenHeader from '../components/headers/header-homescreen';

import React, { useState } from 'react';
import MapComponent from '../components/map';
import VirtualizedList from '../components/dynamic-list-window';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={1}>{children}</Box>}
    </Typography>
  );
}

export default function Location() {
  const [currTab, setTabValue] = useState(1);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container>
      <HomescreenHeader>
        <p>Allclear</p>
      </HomescreenHeader>
      <Paper elevation={0} square>
        <Tabs
          value={currTab}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          centered
          aria-label="disabled tabs example"
        >
          <Tab label="List View" />
          <Tab label="Map" />
        </Tabs>
      </Paper>

      <TabPanel value={currTab} index={0}>
        <VirtualizedList changeTab={{ otherTabIdx: 1, changeTabFn: setTabValue }} />
      </TabPanel>
      <TabPanel value={currTab} index={1}>
        <Container>
          <MapComponent changeTab={{ otherTabIdx: 0, changeTabFn: setTabValue }} />
        </Container>
      </TabPanel>
      <NavBottom></NavBottom>
    </Container>
  );
}
