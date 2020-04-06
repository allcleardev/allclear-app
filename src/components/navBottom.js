import React from 'react';

import {BottomNavigation, BottomNavigationAction, SvgIcon} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {Link} from 'react-router-dom';

const useStyles = makeStyles({
  root: {},

  bottomNavAction: {
    fontSize: '11px !important',
  },
});

export default function NavBottom({active}) {
  const classes = useStyles();

  return (
    <BottomNavigation value={active} showLabels className="nav-bottom">
      <BottomNavigationAction
        className={classes.bottomNavAction}
        label="Home"
        icon={
          <Link to="/complete-profile">
            <SvgIcon>
              <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.72217 20.5933V10.5933H12.7222V20.5933M0.722168
                  7.59326L9.72217 0.593262L18.7222 7.59326V18.5933C18.7222 19.1237 18.5115 19.6324 18.1364
                  20.0075C17.7613 20.3825 17.2526 20.5933 16.7222 20.5933H2.72217C2.19173 20.5933 1.68303
                  20.3825 1.30795 20.0075C0.932882 19.6324 0.722168 19.1237 0.722168 18.5933V7.59326Z"
                  stroke={active === 0 ? '#007AFF' : '#929292'}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </SvgIcon>
          </Link>
        }
      />

      <BottomNavigationAction
        label="Tests"
        icon={
          <Link to="/location">
            <SvgIcon>
              <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.7334 0.593384H2.7334C2.20297 0.593384 1.69426 0.804097 1.31918
                  1.17917C0.944112 1.55424 0.733398 2.06295 0.733398 2.59338V18.5934C0.733398 19.1238 0.944112
                  19.6325 1.31918 20.0076C1.69426 20.3827 2.20297 20.5934 2.7334 20.5934H14.7334C15.2638 20.5934
                  15.7725 20.3827 16.1476 20.0076C16.5227 19.6325 16.7334 19.1238 16.7334 18.5934V6.59338M10.7334
                  0.593384L16.7334 6.59338M10.7334 0.593384V6.59338H16.7334M12.7334 11.5934H4.7334M12.7334
                  15.5934H4.7334M6.7334 7.59338H4.7334"
                  stroke={active === 1 ? '#007AFF' : '#929292'}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </SvgIcon>
          </Link>
        }
      />

      <BottomNavigationAction
        label="Tracing"
        icon={
          <SvgIcon>
            <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8.49463 16.5933L1.49463 20.5933V4.59326L8.49463 0.593262M8.49463 16.5933L16.4946 20.5933M8.49463
                16.5933V0.593262M16.4946 20.5933L23.4946 16.5933V0.593262L16.4946 4.59326M16.4946
                20.5933V4.59326M16.4946 4.59326L8.49463 0.593262"
                stroke={active === 2 ? '#007AFF' : '#929292'}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </SvgIcon>
        }
      />
      <BottomNavigationAction
        label="Friends"
        icon={
          <SvgIcon>
            <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16.7429 18.5154V16.5154C16.7429 15.4545 16.3215 14.4371 15.5713 13.687C14.8212 12.9368
                13.8038 12.5154 12.7429 12.5154H4.74292C3.68205 12.5154 2.66464 12.9368 1.91449 13.687C1.16435
                14.4371 0.74292 15.4545 0.74292 16.5154V18.5154M22.7429 18.5154V16.5154C22.7423 15.6291 22.4473
                14.7682 21.9043 14.0677C21.3613 13.3672 20.601 12.8669 19.7429 12.6454M15.7429 0.645381C16.6033
                0.865682 17.366 1.36608 17.9106 2.06769C18.4552 2.7693 18.7508 3.63221 18.7508 4.52038C18.7508
                5.40855 18.4552 6.27146 17.9106 6.97307C17.366 7.67468 16.6033 8.17508 15.7429 8.39538M12.7429
                4.51538C12.7429 6.72452 10.9521 8.51538 8.74292 8.51538C6.53378 8.51538 4.74292 6.72452 4.74292
                4.51538C4.74292 2.30624 6.53378 0.515381 8.74292 0.515381C10.9521 0.515381
                12.7429 2.30624 12.7429 4.51538Z"
                stroke={active === 3 ? '#007AFF' : '#929292'}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </SvgIcon>
        }

      />
      <BottomNavigationAction
        label="Profile"
        icon={
          <Link to="/profile-view">
            <SvgIcon>
              <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M16.7671 19.1006V17.1006C16.7671 16.0397 16.3457 15.0223 15.5955 14.2722C14.8454 13.522
                  13.828 13.1006 12.7671 13.1006H4.76709C3.70622 13.1006 2.68881 13.522 1.93866 14.2722C1.18852
                  15.0223 0.76709 16.0397 0.76709 17.1006V19.1006M12.7671 5.10059C12.7671 7.30972 10.9762 9.10059
                  8.76709 9.10059C6.55795 9.10059 4.76709 7.30972 4.76709 5.10059C4.76709 2.89145 6.55795 1.10059
                  8.76709 1.10059C10.9762 1.10059 12.7671 2.89145 12.7671 5.10059Z"
                  stroke={active === 4 ? '#007AFF' : '#929292'}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </SvgIcon>
          </Link>
        }
      />
    </BottomNavigation>
  );
}
