import React from 'react';
import { useHistory } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, SvgIcon } from '@material-ui/core';

export default function BottomNav({ active }) {
  const history = useHistory();

  const routeChange = (route) => {
    history.push(route);
  };

  return (
    <nav className="bottom-navigation">
      <div className="gradient-mat"></div>
      <BottomNavigation value={active} showLabels className="bottom-navigation__menu">
        <BottomNavigationAction
          onClick={() => routeChange('/map')}
          label="Find Tests"
          icon={
            <SvgIcon>
              <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0
                  9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5
                  1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                  stroke={active === 1 ? '#007AFF' : '#929292'}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </SvgIcon>
          }
        />
        <BottomNavigationAction
          onClick={() => routeChange('/contact-tracing')}
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
          onClick={() => routeChange('/profile')}
          label="Profile"
          icon={
            <SvgIcon>
              <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M16.7671 19.1006V17.1006C16.7671 16.0397 16.3457 15.0223 15.5955 14.2722C14.8454 13.522
                  13.828 13.1006 12.7671 13.1006H4.76709C3.70622 13.1006 2.68881 13.522 1.93866 14.2722C1.18852
                  15.0223 0.76709 16.0397 0.76709 17.1006V19.1006M12.7671 5.10059C12.7671 7.30972 10.9762 9.10059
                  8.76709 9.10059C6.55795 9.10059 4.76709 7.30972 4.76709 5.10059C4.76709 2.89145 6.55795 1.10059
                  8.76709 1.10059C10.9762 1.10059 12.7671 2.89145 12.7671 5.10059Z"
                  stroke={active === 3 ? '#007AFF' : '#929292'}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </SvgIcon>
          }
        />
      </BottomNavigation>
    </nav>
  );
}
