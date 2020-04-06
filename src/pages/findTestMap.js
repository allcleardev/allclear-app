import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Container';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import Header from '../components/headerWhite';
import FabBlueBottom from '../components/fabBlueBottom';
import NavBottom from '../components/navBottom';
import SearchGoogleMapInput from '../components/searchGoogleMapInput';

import SimpleMap from '../components/googleMap';
import UpdateCriteria from './updateTestingCriteriaModal';

import { mapLocationData } from '../constants';

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

function CardMapLocation({ index, title, description, status, service_time, commute }) {
  return (
    <div className="card-map-location">
      <Box className="container-location">
        <div className="card-content">
          <h3 className="card-title" style={{ color: '#000' }}>
            <span className="grey" style={{}}>
              {index + 1}.
            </span>{' '}
            {title}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'row', fontSize: '13px' }} className="grey">
            <p style={{ color: status === 'Open' ? '#22AF3A' : 'red' }}>{status}</p>
            <p style={{ padding: '0 30px' }}>{service_time}</p>
            <p style={{ padding: '0 30px' }}>{commute}</p>
          </div>
          <p className="card-description" style={{ color: '#151522' }}>
            {description}
          </p>
          <div className="buttons" style={{ marginTop: '15px' }}>
            <a
              href={'https://www.google.com/maps/dir/?api=1&destination=' + description}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Button className="btn primary-back white">Directions</Button>
            </a>
            <Button className="btn primary-color primary-outline" style={{ marginLeft: '15px' }}>
              Call
            </Button>
          </div>
        </div>
        <div className="btn-arrow">
          <IconButton>
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1 8.59961H15M15 8.59961L8 1.59961M15 8.59961L8 15.5996"
                stroke="#007AFF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </IconButton>
        </div>
      </Box>
    </div>
  );
}

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
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     "aria-controls": `simple-tabpanel-${index}`
//   };
// }

// end get windows width

export default function FindTestMap() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [anchor, setAnchor] = React.useState('left');

  const handleDrawerOpen = () => {
    console.log(open);
    setOpen(true);
  };

  const handleDrawerClose = () => {
    console.log(open);
    setOpen(false);
  };

  const [value] = React.useState(0);

  // const handleChange = (e, newValue) => {
  //   setValue(newValue);
  // };

  // Get Windows width and set the drawer default in responsive mode(width: 375px)
  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
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

  const Component = () => {
    const { width } = useWindowDimensions();

    if (width <= 576) {
      setAnchor('bottom');
      setOpen(true);
    } else {
      setAnchor('left');
    }

    return <div></div>;
  };

  function UpdateCriteriaModal() {
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const handleClickOpen = (scrollType) => () => {
      setOpen(true);
      setScroll(scrollType);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
      if (open) {
        const { current: descriptionElement } = descriptionElementRef;
        if (descriptionElement !== null) {
          descriptionElement.focus();
        }
      }
    }, [open]);

    return (
      <div>
        <Link to="/update-criteria" className="hide-desktop">
          <FabBlueBottom handle_name={handleClickOpen('body')} class_name="btn-blue-bottom">
            <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3.99841 19.6816V12.6816M3.99841 8.68164V1.68164M11.9984 19.6816V10.6816M11.9984
                6.68164V1.68164M19.9984 19.6816V14.6816M19.9984 10.6816V1.68164M0.998413 12.6816H6.99841M8.99841
                6.68164H14.9984M16.9984 14.6816H22.9984"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </FabBlueBottom>
        </Link>
        <FabBlueBottom handle_name={handleClickOpen('body')} class_name="btn-blue-bottom hide-mobile">
          <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M3.99841 19.6816V12.6816M3.99841 8.68164V1.68164M11.9984
              19.6816V10.6816M11.9984 6.68164V1.68164M19.9984 19.6816V14.6816M19.9984
              10.6816V1.68164M0.998413 12.6816H6.99841M8.99841 6.68164H14.9984M16.9984 14.6816H22.9984"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </FabBlueBottom>
        <Dialog
          open={open}
          onClose={handleClose}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
          style={{ zIndex: '5' }}
        >
          <DialogTitle id="scroll-dialog-title">Update Testing Center Criteria</DialogTitle>
          <DialogContent dividers={scroll === 'paper'}>
            <UpdateCriteria></UpdateCriteria>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="test-map-page">
      <Component></Component>
      <Header></Header>
      <TabPanel value={value} index={0}>
        <AppBar
          className={
            'btn-hide-nav ' +
            clsx(classes.appBar, {
              [classes.appBarShift]: open,
            })
          }
          style={{ zIndex: '2' }}
        >
          <IconButton
            aria-label="open drawer"
            onClick={open === false ? handleDrawerOpen : handleDrawerClose}
            className={clsx(classes.menuButton, open)}
          >
            {open === true ? (
              <svg width="89" height="87" viewBox="0 0 89 87" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d)">
                  <path
                    d="M12.6566 12.7188H42.9841C58.4481 12.7188 70.9841 25.2548 70.9841 40.7188C70.9841 56.1827
                    58.4481 68.7188 42.9841 68.7188H12.6566V12.7188Z"
                    fill="#F1F1F2"
                  />
                </g>
                <path
                  d="M48.8204 40.7188H34.8204M34.8204 40.7188L41.8204 47.7188M34.8204 40.7188L41.8204 33.7188"
                  stroke="#333333"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <defs>
                  <filter
                    id="filter0_d"
                    x="0.656616"
                    y="0.71875"
                    width="88.3275"
                    height="86"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                    <feOffset dx="3" dy="3" />
                    <feGaussianBlur stdDeviation="7.5" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                  </filter>
                </defs>
              </svg>
            ) : (
              <svg width="89" height="86" viewBox="0 0 89 86" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d)">
                  <path
                    d="M12.0138 12H42.3413C57.8053 12 70.3413 24.536 70.3413 40V40C70.3413 55.464 57.8053 68 42.3413 68H12.0138V12Z"
                    fill="#F1F1F2"
                  />
                </g>
                <path
                  d="M34 40H48M48 40L41 33M48 40L41 47"
                  stroke="#333333"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <filter
                    id="filter0_d"
                    x="0.0137939"
                    y="0"
                    width="88.3275"
                    height="86"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                    <feOffset dx="3" dy="3" />
                    <feGaussianBlur stdDeviation="7.5" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                  </filter>
                </defs>
              </svg>
            )}
          </IconButton>
        </AppBar>
        <Drawer className={classes.drawer + ' nav-left-location'} variant="persistent" anchor={anchor} open={open}>
          <div
            style={{ width: `${drawerWidth}px`, overflowY: 'scroll' }}
            className="hide-scrollbar wid100-sm height-300-sm"
          >
            <Box>
              <SearchGoogleMapInput style={{ marginTop: '50px' }}></SearchGoogleMapInput>
              <div style={{ margin: '40px 0' }} className="search-map-filter">
                <h3 className="body-title" style={{ margin: '5px 0', fontSize: '16px' }}>
                  Filters
                </h3>
                <p className="grey" style={{ fontSize: '16px' }}>
                  Filters would go there.
                </p>
              </div>
            </Box>
            <Divider className={classes.divider} orientation="horizontal" />
            {mapLocationData.data.map((result, index) => (
              <CardMapLocation
                key={index}
                index={index}
                title={result.Name}
                description={result.Address}
                status={result.status}
                service_time={result.Hours}
                commute={result['Drive Through']}
              ></CardMapLocation>
            ))}
          </div>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className="map-fullscreen">
            <SimpleMap {...mapLocationData}></SimpleMap>
          </div>
        </main>
        <NavBottom></NavBottom>
        <UpdateCriteriaModal></UpdateCriteriaModal>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <FabBlueBottom
          style={{
            position: 'fixed',
            bottom: 70,
            right: 20,
          }}
        >
          <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M3.99841 19.6816V12.6816M3.99841 8.68164V1.68164M11.9984 19.6816V10.6816M11.9984
              6.68164V1.68164M19.9984 19.6816V14.6816M19.9984 10.6816V1.68164M0.998413 12.6816H6.99841M8.99841
              6.68164H14.9984M16.9984 14.6816H22.9984"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </FabBlueBottom>
        <NavBottom></NavBottom>
      </TabPanel>
    </div>
  );
}
