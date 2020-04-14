import React, { useContext } from 'react';
import AnimateHeight from 'react-animate-height';
import clsx from 'clsx';
// import PropTypes from 'prop-types';
import Box from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ClearHeader from '../components/headers/header-clear';
import NavBottom from '../components/navBottom';

import UpdateCriteriaModal from '../components/modals/modal-update-criteria';

import Hammer from 'react-hammerjs';
import GoogleMap from '../components/map-components/google-map';
import TestingLocationListItem from '../components/map-components/testing-location-list-item';
import { mapLocationData } from '../constants';

import ArrowLeft from '../components/svgs/arrow-left';
import ArrowRight from '../components/svgs/arrow-right';
import SettingsSVG from '../components/svgs/svg-settings';
import { useWindowResize } from '../util/helpers';
import ModalService from '../services/modal.service';
import MapPageContext from '../contexts/MapPage.context';

export default function MapPage() {
  const classes = useStyles();

  const { mapPageState, setMapPageState } = useContext(MapPageContext);

  const locations = mapPageState.locations;

  function onWindowResize({ width, height }) {
    if (width <= 768) {
      setMapPageState({
        ...mapPageState,
        anchor: 'bottom',
        isOpen: true,
        drawerHeight: 350,
      });
    } else {
      setMapPageState({
        ...mapPageState,
        anchor: 'left',
        isOpen: true,
      });
    }
  }

  const SwipeHandler = (e) => {
    if (initialState.windowWidth <= 768) {
      if (e.pointerType === 'touch') {
        if (e.deltaY > 0) {
          setMapPageState({
            ...mapPageState,
            drawerHeight: 350,
          });
        } else {
          setMapPageState({
            ...mapPageState,
            drawerHeight: 700,
          });
        }
      }
    }
  };

  const [width, height] = useWindowResize(onWindowResize);
  const initialState = {
    isOpen: true,
    anchor: 'left',
    windowWidth: width,
    windowHeight: height,
  };
  // const [mapState, setMapState] = useState(initialState);
  // const {mapPageState, setMapPageState} = useContext(MapPageContext);

  const touchOptions = {
    touchAction: 'compute',
    recognizers: {
      swipe: {
        time: 600,
        threshold: 100,
      },
    },
  };

  function toggleDrawer(isOpen) {
    setMapPageState({
      ...mapPageState,
      isOpen,
    });
  }

  const { isOpen, anchor } = mapPageState;

  // get modal service so we can toggle it open
  let modalService = ModalService.getInstance();

  return (
    <div className="map-page">
      <ClearHeader isOpen={isOpen}></ClearHeader>
      <Typography component="div" role="tabpanel" aria-labelledby={'simple-tab'}>
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
              onClick={isOpen === false ? () => toggleDrawer(true) : () => toggleDrawer(false)}
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
            style={{ height: mapPageState.drawerHeight, zIndex: 4 }}
          >
            <AnimateHeight duration={500} height={mapPageState.drawerHeight} className="hide-scrollbar">
              <div
                id="side-drawer"
                style={{
                  width: `${drawerWidth}px`,
                  overflowY: 'scroll',
                  height: mapPageState.drawerHeight,
                }}
                className="side-drawer hide-scrollbar wid100-sm"
              >
                <Hammer onSwipe={SwipeHandler} options={touchOptions} direction="DIRECTION_VERTICAL">
                  <div style={{ height: '60px' }} className="geolist-resizer">
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

                <Box>
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
                </Box>

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
                      {...result}
                    ></TestingLocationListItem>
                  ))}

                {locations.length === 0 && (
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
              <GoogleMap {...mapLocationData}></GoogleMap>
            </div>
          </main>
          <NavBottom active={1}></NavBottom>
          <UpdateCriteriaModal></UpdateCriteriaModal>
        </Box>
      </Typography>
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
    // width: drawerWidth,
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
