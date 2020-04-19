// external
import React, { useState, useContext, useEffect } from 'react';
import clsx from 'clsx';
import AnimateHeight from 'react-animate-height';
import { makeStyles } from '@material-ui/core/styles';
import { get } from 'lodash';

// components / icons
import BottomNav from '@general/navs/bottom-nav';
import ClearHeader from '@general/headers/header-clear';
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

// other
import ModalService from '@services/modal.service';
import { AppContext } from '@contexts/app.context';
import { useWindowResize } from '@hooks/general.hooks';
import { getNumActiveFilters } from '@util/general.helpers';

export default function MapPage() {
  // constants
  const classes = useStyles();
  const badgeRef = React.createRef();
  const DRAWER_EXPANDED_HEIGHT = '100%';
  const DRAWER_COLLAPSED_HEIGHT = 350;

  // state & global state
  const { setAppState, appState } = useContext(AppContext);
  console.log('appState', appState);
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
  // on mount, check if filter is active
  useEffect(
    checkFilterActive,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [appState.forceRefresh],
  );

  function checkFilterActive() {
    const currFormValues = Object.values(appState.searchCriteria).filter(Boolean);
    // if any selections have anything but 'any' selected, search is active
    // console.log('filterss', currFormValues);
    // console.log(appState.searchCriteria)

    const searchFilterActive = !currFormValues.every((e) => e === 'Any');

    setAppState({
      ...appState,
      map: {
        ...appState.map,
        searchFilterActive,
      },
    });

    // console.log('zzz', searchFilterActive);

    // hide badge when filters are inactive
    if (get(badgeRef, 'current.children[1]')) {
      badgeRef.current.children[1].hidden = !searchFilterActive;
    }
  }

  // callback handlers
  function onWindowResize({ width, height }) {
    if (width <= 768) {
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
    if (initialState.windowWidth <= 768) {
      const nextHeight = drawerHeight === DRAWER_COLLAPSED_HEIGHT ? DRAWER_EXPANDED_HEIGHT : DRAWER_COLLAPSED_HEIGHT;
      if (e.pointerType === 'touch' || e.type === 'click') {
        setDrawerHeight(nextHeight);
      }
    }
  }

  function onEditFiltersBtnClick() {
    // app context needs one more refresh before its ready to populate modal
    setAppState({
      ...appState,
      forceRefresh: !appState.forceRefresh,
    });
    modalService.toggleModal('criteria', true);
  }

  const { isOpen, anchor } = mapState;

  // get modal service so we can toggle it open
  let modalService = ModalService.getInstance();

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
          {/* <IconButton
            disableRipple
            aria-label="open drawer"
            onClick={isOpen === false ? () => onDrawerToggle(true) : () => onDrawerToggle(false)}
            className={clsx(classes.menuButton, isOpen)}
          >
            {isOpen === true ? <ArrowLeft /> : <ArrowRight />}
          </IconButton> */}
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
              {/* <Hammer onSwipe={onDrawerSwipe} options={touchOptions} direction="DIRECTION_VERTICAL">
                <div style={{height: '60px'}} className="geolist-resizer" onClick={onDrawerSwipe}>
                  <svg width="37" height="6" viewBox="0 0 37 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M2.75977 5.18164C1.37905 5.18164 0.259766 4.06235 0.259766 2.68164C0.259766
                      1.30093 1.37905 0.181641 2.75977 0.181641H33.7598C35.1405 0.181641 36.2598 1.30093
                      36.2598 2.68164C36.2598 4.06235 35.1405 5.18164 33.7598 5.18164H2.75977Z"
                      fill="#aaadb3"
                    />
                  </svg>
                </div>
              </Hammer> */}
              {/*<GoogleMapInput style={{ marginTop: '50px' }}></GoogleMapInput>*/}

              {appState.isListLoading === false && (
                <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                  {numActiveFilters > 0 ? (
                    <Badge
                      ref={badgeRef}
                      badgeContent={`${numActiveFilters} Active`}
                      overlap={'rectangle'}
                      style={{ width: anchor === 'bottom' ? '40%' : '100%' }}
                    >
                      <EditFiltersBtn anchor={anchor} onClick={onEditFiltersBtnClick} />
                    </Badge>
                  ) : (
                    <EditFiltersBtn anchor={anchor} onClick={onEditFiltersBtnClick} />
                  )}
                  {anchor === 'bottom' && (
                    <Button
                      className={'view-full-results-btn'}
                      endIcon={drawerHeight === DRAWER_EXPANDED_HEIGHT ? VerticalCollapseIcon() : VerticalExpandIcon()}
                      style={{ width: '50%', color: '#666666', size: 'large', paddingRight: '0px' }}
                      onClick={onDrawerSwipe}
                    >
                      {drawerHeight === DRAWER_EXPANDED_HEIGHT ? 'Map View' : 'Full Results View'}
                    </Button>
                  )}
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
