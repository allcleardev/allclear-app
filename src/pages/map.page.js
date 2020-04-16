import React, { useState, useContext } from 'react';
import clsx from 'clsx';
import SwipeableBottomSheet from 'react-swipeable-bottom-sheet';
// import PropTypes from 'prop-types';
import Box from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { get } from 'lodash';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';

import ClearHeader from '../components/headers/header-clear';
import NavBottom from '../components/navBottom';
import UpdateCriteriaModal from '../components/modals/modal-update-criteria';
import GoogleMap from '../components/map-components/google-map';
import TestingLocationListContainer from '../components/testingLocationListContainer';
import ArrowLeft from '../components/svgs/arrow-left';
import ArrowRight from '../components/svgs/arrow-right';
import { useWindowResize } from '../util/helpers';
// import ModalService from '../services/modal.service';
// import MapPageContext from '../contexts/MapPage.context';
import { AppContext } from '../contexts/App.context';

export default function MapPage() {
  // constants
  const classes = useStyles();

  // state & global state
  const { appState, setAppState } = useContext(AppContext);
  const [width, height] = useWindowResize(onWindowResize);
  const initialState = {
    anchor: 'left',
    windowWidth: width,
    windowHeight: height,
  };
  const [mapState, setMapState] = useState(initialState);
  const [drawerHeight, setDrawerHeight] = useState(350);
  const isOpen = get(appState, 'map.isOpen');

  // callback handlers
  function onWindowResize({ width, height }) {
    if (width <= 768) {
      setMapState({
        ...mapState,
        anchor: 'bottom',
      });
      setAppState({
        ...appState,
        map: {
          ...appState.map,
          isOpen,
        },
      });
      // setDrawerHeight(350);
    } else {
      setMapState({
        ...mapState,
        anchor: 'left',
      });
      setDrawerHeight(height);
    }
  }

  function onDrawerToggle(isOpen) {
    setAppState({
      ...appState,
      map: {
        ...appState.map,
        isOpen,
      },
    });
  }

  const { anchor } = mapState;
  const isMobile = initialState.windowWidth <= 768;

  return (
    <div className="map-page">
      <ClearHeader isOpen={isOpen}></ClearHeader>
      <Box p={3}>
        <AppBar
          className={
            'btn-hide-nav ' +
            clsx(classes.appBar, {
              [classes.appBarShift]: isOpen,
            })
          }
          style={{ zIndex: '2' }}
        >
          <IconButton
            disableRipple
            aria-label="open drawer"
            onClick={isOpen === false ? () => onDrawerToggle(true) : () => onDrawerToggle(false)}
            className={clsx(classes.menuButton, isOpen)}
          >
            {isOpen === true ? <ArrowLeft /> : <ArrowRight />}
          </IconButton>
        </AppBar>
        <Drawer
          className={classes.drawer + ' nav-left-location'}
          variant="persistent"
          anchor={anchor}
          open={isOpen}
          style={{ height: drawerHeight, zIndex: 4 }}
        >
          {isMobile ? (
            <SwipeableBottomSheet
              overflowHeight={350}
              overlay="false"
              marginTop={170}
              overlayStyle={{ backgroundColor: 'white', height: 0 }}
            >
              <TestingLocationListContainer></TestingLocationListContainer>
            </SwipeableBottomSheet>
          ) : (
            <TestingLocationListContainer></TestingLocationListContainer>
          )}
          {/* </AnimateHeight> */}
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: isOpen,
          })}
        >
          <div className="map-fullscreen">
            <GoogleMap></GoogleMap>
          </div>
        </main>
        <NavBottom active={1}></NavBottom>
        <UpdateCriteriaModal></UpdateCriteriaModal>
      </Box>
    </div>
  );
}

// export default connect((state) => {
//   return { locations: state.locations };
// })(MapPage);

const drawerWidth = 400;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    flexShrink: 0,
  },
  content: {
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

// todo: might still be useful at some point just not now
// function TabPanel(props) {
//   const {children, value, index} = props;
//   return (
//     <Typography
//       component="div"
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//     >
//       {value === index && <Box p={3}>{children}</Box>}
//     </Typography>
//   );
// }
//
// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.any.isRequired,
//   value: PropTypes.any.isRequired,
// };
