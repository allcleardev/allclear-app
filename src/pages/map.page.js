import React, { useState, useContext } from 'react';
import AnimateHeight from 'react-animate-height';
import clsx from 'clsx';
import Hammer from 'react-hammerjs';
import Box from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import { get } from 'lodash';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import BottomNav from '@general/navs/bottom-nav';
import ClearHeader from '@general/headers/header-clear';
import UpdateCriteriaModal from '@general/modals/modal-update-criteria';
import GoogleMap from '@components/map-components/google-map';
import TestingLocationListItem from '@components/map-components/testing-location-list-item';

import ArrowLeft from '@svg/arrow-left';
import ArrowRight from '@svg/arrow-right';
import SettingsSVG from '@svg/svg-settings';
import ModalService from '@services/modal.service';
import { AppContext } from '@contexts/app.context';
import { useWindowResize } from '@hooks/general.hooks';

export default function MapPage() {
  // constants
  const touchOptions = {
    touchAction: 'compute',
    recognizers: {
      swipe: {
        time: 600,
        threshold: 100,
      },
    },
  };
  const classes = useStyles();

  // state & global state
  const { appState } = useContext(AppContext);
  const [width, height] = useWindowResize(onWindowResize);
  const initialState = {
    isOpen: true,
    anchor: 'left',
    windowWidth: width,
    windowHeight: height,
  };
  const [mapState, setMapState] = useState(initialState);
  const [drawerHeight, setDrawerHeight] = useState(350);
  const locations = get(appState, 'map.locations') || [];

  // callback handlers
  function onWindowResize({ width, height }) {
    if (width <= 768) {
      setMapState({
        ...mapState,
        anchor: 'bottom',
        isOpen: true,
      });
      setDrawerHeight(350);
    } else {
      setMapState({
        ...mapState,
        anchor: 'left',
        isOpen: true,
      });
      setDrawerHeight(height);
    }
  }

  function onDrawerSwipe(e) {
    if (initialState.windowWidth <= 768) {
      const nextHeight = drawerHeight === 350 ? 750 : 350;
      if (e.pointerType === 'touch' || e.type === 'click') {
        setDrawerHeight(nextHeight);
      }
    }
  }

  function onDrawerToggle(isOpen) {
    setMapState({
      ...mapState,
      isOpen,
    });
  }

  const { isOpen, anchor } = mapState;

  // get modal service so we can toggle it open
  let modalService = ModalService.getInstance();

  console.log('locations', locations);

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
          <AnimateHeight duration={500} height={drawerHeight}>
            <div
              id="side-drawer"
              style={{
                width: `${drawerWidth}px`,
                overflowY: 'scroll',
                height: drawerHeight,
              }}
              className="side-drawer hide-scrollbar wid100-sm"
            >
              <Hammer onSwipe={onDrawerSwipe} options={touchOptions} direction="DIRECTION_VERTICAL">
                <div style={{ height: '60px' }} className="geolist-resizer" onClick={onDrawerSwipe}>
                  <svg width="37" height="6" viewBox="0 0 37 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M2.75977 5.18164C1.37905 5.18164 0.259766 4.06235 0.259766 2.68164C0.259766
                      1.30093 1.37905 0.181641 2.75977 0.181641H33.7598C35.1405 0.181641 36.2598 1.30093
                      36.2598 2.68164C36.2598 4.06235 35.1405 5.18164 33.7598 5.18164H2.75977Z"
                      fill="#aaadb3"
                    />
                  </svg>
                </div>
              </Hammer>
              {/*<GoogleMapInput style={{ marginTop: '50px' }}></GoogleMapInput>*/}

              {appState.isListLoading === false && (
                <Box>
                  <Badge
                    badgeContent={''}
                    overlap={'rectangle'}
                    style={{ width: '100%' }}
                    invisible={!appState.map.searchFilterActive}
                  >
                    <Button
                      className={'edit-filters-btn'}
                      variant="contained"
                      color="primary"
                      fullWidth
                      startIcon={SettingsSVG()}
                      onClick={() => {
                        modalService.toggleModal('criteria', true);
                      }}
                    >
                      Edit Search Filters
                    </Button>
                  </Badge>
                </Box>
              )}

              {appState.isListLoading === true && (
                <div
                  style={{
                    height: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  className="mt-4 mt-md-0 vh100-lg"
                >
                  <CircularProgress color="primary" size={70} />
                  <p className="mt-3">Loading Results</p>
                </div>
              )}

              {locations &&
                locations.map((result, index) => (
                  <TestingLocationListItem
                    key={index}
                    index={index}
                    title={result.name}
                    description={result.address}
                    city_state={result.city + ', ' + result.state}
                    service_time={result.hours}
                    driveThru={result.driveThru}
                    phone={result.phone}
                    website={result.url}
                    {...result}
                  ></TestingLocationListItem>
                ))}

              {locations.length === 0 && appState.isListLoading === false && (
                <h2 style={{ display: 'flex', justifyContent: 'center' }}>No Results Found </h2>
              )}
            </div>
          </AnimateHeight>
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
        <BottomNav active={1}></BottomNav>
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

// .MuiBadge-anchorOriginTopRightCircle {
//     top: 35%;
//     right: 2%;
//     transform: scale(1) translate(50%, -50%);
//     transform-origin: 100% 0%;
// }

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
