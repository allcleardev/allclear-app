// external
import React, { useState, useContext } from 'react';
import clsx from 'clsx';
import AnimateHeight from 'react-animate-height';
import { makeStyles } from '@material-ui/core/styles';
import { get } from 'lodash';

// components / icons
import SolidHeader from '@general/headers/header-solid';
import UpdateCriteriaModal from '@general/modals/update-criteria-modal';
import GoogleMap from '@components/map-components/google-map';
import TestingLocationListItem from '@components/map-components/testing-location-list-item';
import VerticalCollapseIcon from '@svg/vert-collapse';
import VerticalExpandIcon from '@svg/vert-expand';
import SettingsSVG from '@svg/svg-settings';
import Box from '@material-ui/core/Container';
import { CircularProgress } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import MobileMenu from '@general/headers/mobile-menu';

// other
import ModalService from '@services/modal.service';
import { AppContext } from '@contexts/app.context';
import { useWindowResize } from '@hooks/general.hooks';
import { getNumActiveFilters, getActiveFilters } from '@util/general.helpers';
import GAService, { MAP_PAGE_GA_EVENTS, GA_EVENT_MAP } from '@services/ga.service';
import GoogleMapsAutocomplete from '@general/inputs/google-maps-autocomplete';
import MapService from '@services/map.service';

export default function MapPage() {
  const mapService = MapService.getInstance();
  const gaService = GAService.getInstance();
  gaService.setScreenName('map');

  // constants
  const classes = useStyles();
  const badgeRef = React.createRef();
  const DRAWER_EXPANDED_HEIGHT = '95vh';
  const DRAWER_COLLAPSED_HEIGHT = '40vh';

  // state & global state
  const { setAppState, appState } = useContext(AppContext);
  const [width, height] = useWindowResize(onWindowResize);
  const initialState = {
    isOpen: true,
    anchor: 'left',
    windowWidth: width,
    windowHeight: height,
    searchFilterActive: false,
  };
  const [mapState, setMapState] = useState(initialState);
  const [drawerHeight, setDrawerHeight] = useState(DRAWER_COLLAPSED_HEIGHT);
  const locations = get(appState, 'map.locations') || [];
  const numActiveFilters = getNumActiveFilters(get(appState, 'searchCriteria'));
  const isLoggedIn = appState.sessionId ? true : false;

  const [displayGradient, setDisplayGradient] = useState(false)

  // callback handlers
  function onScrollDrawer(e) {
    e.target.scrollTop > 0 ? setDisplayGradient(true) : setDisplayGradient(false)
  }

  function onWindowResize({ width, height }) {
    if (width <= 960) {
      setMapState({
        ...mapState,
        anchor: 'bottom',
        isOpen: true,
      });
      setDrawerHeight(DRAWER_COLLAPSED_HEIGHT);
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
    if (initialState.windowWidth <= 960) {
      const nextHeight = drawerHeight === DRAWER_COLLAPSED_HEIGHT ? DRAWER_EXPANDED_HEIGHT : DRAWER_COLLAPSED_HEIGHT;
      if (e.pointerType === 'touch' || e.type === 'click') {
        setDrawerHeight(nextHeight);
      }
    }
  }

  async function onLocationSelected(bool, newLocation) {

    if (get(newLocation, 'description')) {
      const { latitude, longitude } = newLocation;

      await mapService.onLocationAccepted({
        coords: {
          latitude, longitude
        }
      }, true);

    }
  }

  async function onLocationCleared() {
    const latitude = get(appState, 'person.latitude');
    const longitude = get(appState, 'person.longitude');
    (latitude && longitude) && await mapService.onLocationAccepted({
      coords: {
        latitude, longitude
      }
    });
  }

  function onEditFiltersBtnClick() {
    // app context needs one more refresh before its ready to populate modal
    setAppState({
      ...appState,
      forceRefresh: !appState.forceRefresh,
    });
    modalService.toggleModal('criteria', true);
  }

  function onMapClick(evt) {
    if (anchor === 'bottom') {
      evt.stopPropagation();
      const nextHeight = drawerHeight === DRAWER_COLLAPSED_HEIGHT ? DRAWER_EXPANDED_HEIGHT : DRAWER_COLLAPSED_HEIGHT;
      if (nextHeight === DRAWER_COLLAPSED_HEIGHT) setDrawerHeight(nextHeight);
    }
  }

  // analytics handlers
  function onActionClick(action, itemId, itemIndex, itemName) {
    handleGAEvent(action, itemId, itemIndex, itemName);
  }

  function onTestingLocationExpand(itemId, itemIndex, itemName, isExpanded) {
    const eventKey = isExpanded ? 'expand' : 'contract';
    handleGAEvent(eventKey, itemId, itemIndex, itemName);
  }

  function handleGAEvent(eventKey, itemId, itemIndex, itemName) {
    const eventName = GA_EVENT_MAP[eventKey];
    const enabledFilters = getActiveFilters(get(appState, ['searchCriteria'], {}));
    const additionalParams = MAP_PAGE_GA_EVENTS(itemId, itemName, itemIndex, enabledFilters);
    gaService.sendEvent(eventName, additionalParams);
  }

  const { isOpen, anchor } = mapState;

  // get modal service so we can toggle it open
  let modalService = ModalService.getInstance();

  return (
    <div className="map-page">
      <MobileMenu isLoggedIn={isLoggedIn}></MobileMenu>
      <SolidHeader isLoggedIn={isLoggedIn} isOpen={isOpen}></SolidHeader>
      <Box p={3}>
        <AppBar
          className={
            'btn-hide-nav ' +
            clsx(classes.appBar, {
              [classes.appBarShift]: isOpen,
            })
          }
          style={{ zIndex: '2' }}
        ></AppBar>

        <Drawer
          className={classes.drawer + ' nav-left-location'}
          variant="persistent"
          anchor={anchor}
          open={isOpen}
          style={{ height: drawerHeight, zIndex: 4 }}
          onScroll={onScrollDrawer}
        >

          {displayGradient && (
            <div className="test-list-gradient"></div>
          )}

          <AnimateHeight
            duration={500}
            height={anchor === 'left' || drawerHeight === DRAWER_EXPANDED_HEIGHT ? '100%' : '40%'}
          >
            <div
              id="side-drawer"
              style={{
                width: anchor === 'left' ? `${drawerWidth}px` : '100%',
                overflowY: 'scroll',
                height: drawerHeight
              }}
              className="side-drawer hide-scrollbar wid100-sm"
            >
              <GoogleMapsAutocomplete
                focusOnRender={true}
                locationSelected={onLocationSelected}
                onClear={onLocationCleared}
              ></GoogleMapsAutocomplete>

              {appState.map.isListLoading === false && (
                <Box
                  className={'button-box'}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  {numActiveFilters > 0 ? (
                    <Badge
                      ref={badgeRef}
                      badgeContent={numActiveFilters}
                      overlap={'rectangle'}
                      style={{ width: anchor === 'bottom' ? '48%' : '100%' }}
                    >
                      <EditFiltersBtn anchor={anchor} onClick={onEditFiltersBtnClick} />
                    </Badge>
                  ) : (
                    <span className="edit-filters-btn-container">
                      <EditFiltersBtn anchor={anchor} onClick={onEditFiltersBtnClick} style />
                    </span>
                  )}
                  {anchor === 'bottom' && (
                    <Button
                      className={'view-full-results-btn'}
                      endIcon={drawerHeight === DRAWER_EXPANDED_HEIGHT ? VerticalCollapseIcon() : VerticalExpandIcon()}
                      style={{ width: '50%', color: '#666666', size: 'large', paddingRight: '0px' }}
                      onClick={onDrawerSwipe}
                    >
                      {drawerHeight === DRAWER_EXPANDED_HEIGHT ? 'Map View' : 'Full List View'}
                    </Button>
                  )}
                </Box>
              )}

              {appState.map.isListLoading === true && (
                <div
                  style={{
                    paddingTop: '100px',
                    height: '80vh !important',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'top',
                  }}
                  className="mt-4 mt-md-0 vh100-lg"
                >
                  <CircularProgress color="primary" size={108} />
                  <p className="mt-3">Loading Results</p>
                </div>
              )}

              {locations &&
              locations.map((result, index) => (
                <TestingLocationListItem
                  id={result.id}
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
                  onActionClick={onActionClick}
                  onTestingLocationExpand={onTestingLocationExpand}
                ></TestingLocationListItem>
              ))}


              {locations.length === 0 && appState.map.isListLoading === false && (
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
            <GoogleMap onMapClick={onMapClick}></GoogleMap>
          </div>
        </main>
        <UpdateCriteriaModal></UpdateCriteriaModal>
      </Box>
    </div>
  );
}

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

function EditFiltersBtn(props) {
  return (
    <Button
      className={'edit-filters-btn'}
      variant="contained"
      color="primary"
      fullWidth
      startIcon={SettingsSVG()}
      onClick={props.onClick}
    >
      {props.anchor === 'bottom' ? 'Edit Filters' : 'Edit Search Filters'}
    </Button>
  );
}


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


// on mount, check if filter is active
// useEffect(
//   checkFilterActive,
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   [appState.forceRefresh],
// );
//
// function checkFilterActive() {
//   const currFormValues = Object.values(appState.searchCriteria).filter(Boolean);
//   // if any selections have anything but 'any' selected, search is active
//   // console.log('filterss', currFormValues);
//   // console.log(appState.searchCriteria)
//
//   const searchFilterActive = !currFormValues.every((e) => e === 'Any');
//
//   setAppState({
//     ...appState,
//     map: {
//       ...appState.map,
//       searchFilterActive,
//     },
//   });
//
//   // hide badge when filters are inactive
//   if (get(badgeRef, 'current.children[1]')) {
//     badgeRef.current.children[1].hidden = !searchFilterActive;
//   }
// }
