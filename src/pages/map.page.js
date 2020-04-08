import React, {Component, useEffect, useState, useContext} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Container';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ClearHeader from '../components/headers/header-clear';
import NavBottom from '../components/navBottom';
import SearchGoogleMapInput from '../components/searchGoogleMapInput';
import UpdateCriteriaModal from '../components/modals/modal-update-criteria';
import {connect} from 'react-redux';
import Hammer from 'react-hammerjs';
import GoogleMap from '../components/map-components/google-map';
import TestingLocationListItem from '../components/map-components/testing-location-list-item';
import {mapLocationData} from '../constants';
import {MapPageContext} from '../contexts/MapPage.context';
import ArrowLeft from '../components/svgs/arrow-left';
import ArrowRight from '../components/svgs/arrow-right';
import SettingsSVG from '../components/svgs/svg-settings';


function MapPage({locations}) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  // const { setDrawerOpen } = useContext(MapPageContext);

  const [anchor, setAnchor] = useState('left');
  // const [anchor] = useState('left');

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Get Windows width and set the drawer default in responsive mode(width: 375px)
  function getWindowDimensions() {
    const {innerWidth: width, innerHeight: height} = window;
    return {
      width,
      height,
    };
  }

  function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
  }

  const handleSwipe = (evt) => {
    // if (evt.type === 'swipeup') {
    console.log(evt);
    // }
  };

  const options = {
    touchAction: 'compute',
    recognizers: {
      swipe: {
        time: 600,
        threshold: 100,
      },
    },
  };

  const ResizeSpy = () => {
    const {width} = useWindowDimensions();

    if (width <= 576) {
      setAnchor('bottom');
      setOpen(true);
    } else {
      setAnchor('left');
    }

    return <></>;
  };

  return (
    <div className="map-page">
      <ResizeSpy></ResizeSpy>
      <ClearHeader isOpen={open}></ClearHeader>
      <Typography
        component="div"
        role="tabpanel"
        aria-labelledby={'simple-tab'}
      >
        <Box p={3}>
          <AppBar
            className={
              'btn-hide-nav ' +
              clsx(classes.appBar, {
                [classes.appBarShift]: open,
              })
            }
            style={{zIndex: '2'}}
          >
            <IconButton
              aria-label="open drawer"
              onClick={open === false ? handleDrawerOpen : handleDrawerClose}
              className={clsx(classes.menuButton, open)}
            >
              {open === true ? (
                <ArrowLeft/>
              ) : (
                 <ArrowRight/>
               )}
            </IconButton>
          </AppBar>
          <Hammer onSwipe={handleSwipe} option={options} direction="DIRECTION_UP">
            <Drawer className={classes.drawer + ' nav-left-location'} variant="persistent" anchor={anchor} open={open}>
              <div
                style={{width: `${drawerWidth}px`, overflowY: 'scroll'}}
                className="hide-scrollbar wid100-sm height-300-sm"
              >
                <Box>
                  {/*<SearchGoogleMapInput style={{ marginTop: '50px' }}></SearchGoogleMapInput>*/}
                  <div style={{margin: '40px 0'}} className="search-map-filter">
                    <h3 className="body-title" style={{margin: '5px 0', fontSize: '16px'}}>
                      Filters
                    </h3>
                    <p className="grey" style={{fontSize: '16px'}}>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={SettingsSVG()}
                      >
                        Edit Search Filters
                      </Button>
                    </p>
                  </div>

                </Box>
                <Divider className={'hide-mobile-sm ' + classes.divider} orientation="horizontal"/>
                {locations.map((result, index) => (
                  <TestingLocationListItem
                    key={index}
                    index={index}
                    title={result.name}
                    description={result.address}
                    status={result.state}
                    service_time={result.Hours}
                    commute={result['Drive Through']}
                  ></TestingLocationListItem>
                ))}
              </div>
            </Drawer>
          </Hammer>
          <main
            className={clsx(classes.content, {
              [classes.contentShift]: open,
            })}
          >
            <div className="map-fullscreen">
              <GoogleMap {...mapLocationData}></GoogleMap>
            </div>
          </main>
          <NavBottom></NavBottom>
          <UpdateCriteriaModal></UpdateCriteriaModal>
        </Box>
      </Typography>
    </div>
  );
}

export default connect((state) => {
  return {locations: state.locations};
})(MapPage);

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
