import React, {useState, useContext} from 'react';
import clsx from 'clsx';
// import PropTypes from 'prop-types';
import Box from '@material-ui/core/Container';
import {makeStyles} from '@material-ui/core/styles';
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
import {mapLocationData} from '../constants';

import ArrowLeft from '../components/svgs/arrow-left';
import ArrowRight from '../components/svgs/arrow-right';
import SettingsSVG from '../components/svgs/svg-settings';
import {useWindowResize} from '../util/helpers';
import ModalService from '../services/modal.service';
import MapPageContext from '../contexts/MapPage.context';

export default function MapPage() {
  const classes = useStyles();

  const {mapPageState} = useContext(MapPageContext);

  const locations = mapPageState.locations;

  function onWindowResize({width, height}) {
    if (width <= 576) {
      setMapState({
        ...mapState,
        anchor: 'bottom',
        isOpen: true,
      });
    } else {
      setMapState({
        ...mapState,
        anchor: 'left',
      });
    }
  }

  const [width, height] = useWindowResize(onWindowResize);
  const initialState = {
    isOpen: true,
    anchor: 'left',
    windowWidth: width,
    windowHeight: height,
  };
  const [mapState, setMapState] = useState(initialState);
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
    setMapState({
      ...mapState,
      isOpen,
    });
  }

  const {isOpen, anchor} = mapState;

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
            style={{zIndex: '2'}}
          >
            <IconButton
              disableRipple
              aria-label="open drawer"
              onClick={isOpen === false ? () => toggleDrawer(true) : () => toggleDrawer(false)}
              className={clsx(classes.menuButton, isOpen)}
            >
              {isOpen === true ? <ArrowLeft/> : <ArrowRight/>}
            </IconButton>
          </AppBar>
          <Hammer onSwipe={() => {}} option={touchOptions} direction="DIRECTION_UP">
            <Drawer
              className={classes.drawer + ' nav-left-location'}
              variant="persistent"
              anchor={anchor}
              open={isOpen}
            >
              <div
                id="side-drawer"
                style={{width: `${drawerWidth}px`, overflowY: 'scroll'}}
                className="side-drawer hide-scrollbar wid100-sm height-300-sm"
              >
                {/*<SearchGoogleMapInput style={{ marginTop: '50px' }}></SearchGoogleMapInput>*/}

                <Box>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    startIcon={SettingsSVG()}
                    style={{margin: '20px 0'}}
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
              </div>
            </Drawer>
          </Hammer>
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
