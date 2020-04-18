// **************************************************** //
//                                                      //
// TODO: Make this the one and only header component    //
//                                                      //
// ____________________________________________________ //

import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Logo from '../../../assets/images/logo-green-back.svg';
import Fab from '@material-ui/core/Fab';
import Container from '@material-ui/core/Container';

export default function Header({
  enableBackBtn = false,
  navItems = [{ route: '', name: '', absolutePath: false }],
  children,
}) {
  const history = useHistory();

  return (
    <div className="header main">
      <div className="shape"></div>
      {enableBackBtn ? (
        <div className="mobile-content">
          <Fab
            size="small"
            aria-label="add"
            className={enableBackBtn ? 'btn-back-fab' : 'btn-back-fab btn-back-fab--hidden'}
            elevation={0}
            onClick={() => history.goBack()}
          >
            <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7.59375 13.1428L1.59375 7.14282L7.59375 1.14282"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Fab>
        </div>
      ) : (
        ''
      )}

      <Container className="desktop-content" maxWidth="xl">
        <img src={Logo} alt="Logo" className="logo" />
        <nav className="menu">
          {navItems.map((item) => {
            if (item.absolutePath) {
              return (
                <a
                  href={`https://${item.route}`}
                  className="menu__item"
                  key={item.route}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {item.name}
                </a>
              );
            } else {
              return (
                <Link to={item.route} className="menu__item" key={item.route}>
                  {item.name}
                </Link>
              );
            }
          })}
        </nav>
      </Container>

      {children}
    </div>
  );
}
