import React from 'react';
import { useHistory } from 'react-router-dom';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { isLoggedInHeaderLinks, isLoggedOutHeaderLinks } from '@util/general.constants';
import CloseIcon from '@material-ui/icons/Close';
import { Fab } from '@material-ui/core';
import { cloneDeep } from 'lodash';

export default function MobileMenu(props) {
  console.log('PROPS:', props);

  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  let loggedOutLinks = cloneDeep(isLoggedOutHeaderLinks);
  loggedOutLinks.push({ name: 'Get Alerts', to: '/create-account' });
  const links = props.isLoggedIn ? isLoggedInHeaderLinks : loggedOutLinks;

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
    <div className="mobile-menu">
      <IconButton
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-label="menu"
        aria-haspopup="true"
        className="icon-button"
        size="small"
        style={{ backgroundColor: 'white', padding: '10px' }}
        onClick={onMenuToggle}
      >
        <MenuIcon style={{ color: 'black' }} />
      </IconButton>

      <div className={open ? 'menu menu--opened' : 'menu menu--closed'} id="menu-list-grow">
        <ClickAwayListener onClickAway={onMenuClosed}>
          <MenuList autoFocusItem={open} className="menu__list">
            {/* TODO: handle external links */}
            {links.map((link) => (
              <MenuItem className="menu__item" onClick={() => history.push(link.to)}>
                {link.name}
              </MenuItem>
            ))}
          </MenuList>
        </ClickAwayListener>
        <div class="circle circle--1"></div>
        <div class="circle circle--2"></div>
        <div class="circle circle--3">
          <Fab className="circle__close-button" color="secondary" aria-label="close">
            <CloseIcon />
          </Fab>
        </div>
      </div>
    </div>
  );
}
