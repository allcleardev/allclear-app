// external
import React, {useState, useContext, useEffect,Fragment} from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import { get, pick} from 'lodash';
import qs from 'qs';

// components / icons
import SolidHeader from '@general/headers/header-solid';
import UpdateCriteriaModal from '@general/modals/update-criteria-modal';
import GoogleMap from '@components/map-components/google-map';
import TestingLocationListItem from '@components/map-components/testing-location-list-item';
import MobileTopBar from '@components/map-components/mobile-top-bar';
import Container from '@material-ui/core/Container';
import EditFiltersBtn from '@components/map-components/edit-filters-btn';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';

// other
import ModalService from '@services/modal.service';
import { AppContext } from '@contexts/app.context';
import { useWindowResize } from '@hooks/general.hooks';
import {getNumActiveFilters, getActiveFilters, getRouteQueryParams} from '@util/general.helpers';
import GAService, { MAP_PAGE_GA_EVENTS, GA_EVENT_MAP } from '@services/ga.service';
import GoogleMapsAutocomplete from '@general/inputs/google-maps-autocomplete';
import MapService from '@services/map.service';
import ListLoadingSpinner from '../components/map-components/list-loading-spinner';
import {useHistory} from 'react-router';

export default function MapPage() {
  const mapService = MapService.getInstance();
  const gaService = GAService.getInstance();
  gaService.setScreenName('map');

  // constants
  const classes = useStyles();

  // state & global state
  const {setAppState, appState} = useContext(AppContext);
  const history = useHistory();
  const [width, height] = useWindowResize(onWindowResize);
  const initialState = {
    windowWidth: width,
    windowHeight: height,
    searchFilterActive: false,
    didInitSearch: false,
    didClear: false,
    mobileView: false,
  };
  const [mapState, setMapState] = useState(initialState);
  const [drawerOpen, setDrawerOpenState] = useState(false);
  const locations = get(appState, 'map.locations') || [];
  const numActiveFilters = getNumActiveFilters(get(appState, 'searchCriteria'));
  const isLoggedIn = appState.sessionId ? true : false;
  let initialSearchVal;

  // get modal service so we can toggle it open
  let modalService = ModalService.getInstance();
  let searchParams = getRouteQueryParams(history.location);

  // for setting initial search in autocomplete
  initialSearchVal = get(searchParams, 'search.description');
  initialSearchVal = (mapState.didInitSearch) ? undefined : initialSearchVal;


  /******************************************************************
   * LIFECYCLE HOOKS
   ******************************************************************/
  useEffect(() => {
    const mobileView = (window.innerWidth < 960);
    setMapState({
      ...mapState,
      mobileView,
      didInitSearch: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // to reset URL params after the waterfall of URL updates (this will be the final update in the chain)
  useEffect(() => {
    const mobileView = (window.innerWidth < 960);
    if(mapState.didClear){

      history.replace({
        pathname: '/map',
        search: qs.stringify({})
      });

      setMapState({
        ...mapState,
        mobileView,
        didClear: false,
      });

    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appState]);



  // callback handlers
  function onWindowResize({ width }) {

    if (width < 960) {
      setMapState({
        ...mapState,
        mobileView: true,
      });
    } else {
      setMapState({
        ...mapState,
        mobileView: false,
      });
    }
  }

  async function onLocationSelected(bool, newLocation) {

    const search = pick(newLocation, ['description', 'latitude', 'longitude', 'id']);
    history.push({
      pathname: '/map',
      search: qs.stringify({
        ...appState.route.params,
        search
      }),
    });

    if (get(newLocation, 'description')) {
      const {latitude, longitude} = newLocation;

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

    // set a temp flag for lifecycle hook to know a clear happened
    setMapState({
      ...mapState,
      didClear: true,
    });

    // clear route app state
    setAppState({
      ...appState,
      route: {
        params: {}
      }
    });


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

  function onMapClick() {
    if (mobileView && drawerOpen) {
      handleToggleView();
    }
  }

  function handleToggleView() {
    setDrawerOpenState(!drawerOpen);
  }

  /******************************************************************
   * ANALYTICS
   ******************************************************************/

  function onActionClick(action, itemId, itemIndex, itemName) {
    handleGAEvent(action, itemId, itemIndex, itemName);
  }

  function onTestingLocationExpand(itemId, itemIndex, itemName, drawerOpen) {
    const eventKey = drawerOpen ? 'expand' : 'contract';
    handleGAEvent(eventKey, itemId, itemIndex, itemName);
    const selection = itemName;
    history.push({
      pathname: '/map',
      search: qs.stringify({
        ...appState.route.params,
        selection
      }),
    });
  }

  function handleGAEvent(eventKey, itemId, itemIndex, itemName) {
    const eventName = GA_EVENT_MAP[eventKey];
    const enabledFilters = getActiveFilters(get(appState, ['searchCriteria'], {}));
    const additionalParams = MAP_PAGE_GA_EVENTS(itemId, itemName, itemIndex, enabledFilters);
    gaService.sendEvent(eventName, additionalParams);
  }

  const { mobileView } = mapState;
  return (
    <div className={clsx(classes.root, 'map-page')}>
      {mobileView ? (
        <MobileTopBar
          isLoggedIn={isLoggedIn}
          onLocationSelected={onLocationSelected}
          onLocationCleared={onLocationCleared}
          onFilterClick={onEditFiltersBtnClick}
        ></MobileTopBar>
      ) : (
         <SolidHeader isLoggedIn={isLoggedIn}></SolidHeader>
       )}
      <Drawer
        anchor={mobileView ? 'bottom' : 'left'}
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: drawerOpen,
          [classes.drawerClose]: !drawerOpen,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: drawerOpen,
            [classes.drawerClose]: !drawerOpen,
          }),
        }}
      >
        {mobileView && (
          <Button variant="contained" className="map-list-button" onClick={handleToggleView}>
            {drawerOpen ? 'Map' : 'List'}
          </Button>
        )}
        <div className={clsx(classes.drawer, 'drawer-content', 'hide-scrollbar')}>
          {!mobileView && (
            <Fragment>
              <GoogleMapsAutocomplete
                searchIconColor={'lightgray'}
                focusOnRender={true}
                locationSelected={onLocationSelected}
                initialValue={initialSearchVal}
                onClear={onLocationCleared}
                noOptionsText={'Please Enter a Search Term to View Results'}
              ></GoogleMapsAutocomplete>

              <Container>
                <EditFiltersBtn numActiveFilters={numActiveFilters} onClick={onEditFiltersBtnClick} />
              </Container>
            </Fragment>
          )}
          {appState.map.isListLoading === true ? (
            <ListLoadingSpinner />
          ) : (
             <Fragment>
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
             </Fragment>
           )}
          {locations.length === 0 && appState.map.isListLoading === false && (
            <p style={{ margin: 20, textAlign: 'center', fontSize: '1.7em' }}>No Results Found</p>
          )}
        </div>
      </Drawer>
      <main className={classes.content}>
        <GoogleMap onMapClick={onMapClick}></GoogleMap>
      </main>
      <UpdateCriteriaModal></UpdateCriteriaModal>
    </div>
  );
}

const collapseHeight = 40;
const expandHeight = 85;
const expandWidth = 400;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column-reverse',
    width: '100%',
    height: '100%',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  },
  drawer: {
    flexShrink: 0,
    zIndex: 1,
    height: ' 100%',
    overflowY: 'auto',
    [theme.breakpoints.up('md')]: {
      marginTop: 70, // height of desktop header
    },
  },
  drawerOpen: {
    transition: theme.transitions.create('height', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflow: 'visible',
    height: `${expandHeight}%`,
    [theme.breakpoints.up('md')]: {
      height: '100%',
    },
  },
  drawerClose: {
    transition: theme.transitions.create('height', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflow: 'visible',
    height: `${collapseHeight}%`,
    [theme.breakpoints.up('md')]: {
      width: expandWidth,
      boxShadow: '5px 0px 20px rgba(0, 0, 0, 0.1)',
      height: 'calc(100% - 70px)',
    },
  },
  content: {
    flexGrow: 1,
    height: '100%',
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

// useEffect(() => {
//
//   const latitude = get(appState, 'route.params.search.latitude');
//   const longitude = get(appState, 'route.params.search.longitude');
//
//   if (latitude && longitude && !mapState.didInitMap) {
//     mapService.onLocationAccepted({
//       coords: {
//         latitude, longitude
//       }
//     }, true);
//     setMapState({
//       ...mapState,
//       didInitMap: true,
//     });
//   }
//
//
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [appState]);
