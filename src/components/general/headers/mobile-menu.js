import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import IconButton from '@material-ui/core/IconButton';
import Logo from '@assets/images/logo-navy.svg';
import { AppContext } from '@contexts/app.context';
import { IS_LOGGED_IN_HEADER_LINKS, IS_LOGGED_OUT_HEADER_LINKS } from '@util/general.constants';
import { cloneDeep } from 'lodash';

export default function MobileMenu(props) {
  const { appState } = useContext(AppContext);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const isLoggedIn = appState.sessionId ? true : false;
  const loggedOutLinks = cloneDeep(IS_LOGGED_OUT_HEADER_LINKS);
  const links = isLoggedIn ? IS_LOGGED_IN_HEADER_LINKS : loggedOutLinks;
  loggedOutLinks.push({ name: 'Get Alerts', to: '/create-account' });

  function onMenuToggle() {
    setOpen((prevOpen) => !prevOpen);
  }

  function onMenuClosed(event) {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  }

  return (
    <div className={props.btnStyle === 'white' ? 'mobile-menu mobile-menu--white' : 'mobile-menu'}>
      <IconButton
        disableRipple
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-label="menu"
        aria-haspopup="true"
        className={open ? 'icon-button icon-close' : 'icon-button icon-open'}
        size="small"
        onClick={onMenuToggle}
      >
        <span className="icon"></span>
      </IconButton>

      <div className={open ? 'menu menu--opened' : 'menu'}>
        <ClickAwayListener onClickAway={onMenuClosed}>
          <MenuList autoFocusItem={open} className="menu__list" id="menu-list-grow">
            {links.map((link) =>
              link.isExternalURL ? (
                <MenuItem
                  className="menu__item"
                  key={link.name}
                  component={'a'}
                  href={link.to}
                  rel="noopener noreferrer"
                  target="_blank"
                  onClick={onMenuToggle}
                >
                  {link.name}
                </MenuItem>
              ) : (
                <MenuItem className="menu__item" key={link.name} component={Link} to={link.to} onClick={onMenuToggle}>
                  {link.name}
                </MenuItem>
              ),
            )}
          </MenuList>
        </ClickAwayListener>
        <a
          href="https://home.allclear.app"
          className="menu__list"
          rel="noopener noreferrer"
          target="_blank"
          onClick={onMenuToggle}
        >
          <img className="logo" src={Logo} alt="Logo" />
        </a>
      </div>

      <span className={open ? 'circle opened' : 'circle'}></span>
    </div>
  );
}
