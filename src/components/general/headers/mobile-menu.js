import React from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { isLoggedInHeaderLinks, isLoggedOutHeaderLinks } from '@util/general.constants';

export default function MobileMenu(props) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const links = props.isLoggedIn ? isLoggedInHeaderLinks : isLoggedOutHeaderLinks;
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
        style={{ backgroundColor: 'white' }}
        onClick={onMenuToggle}
      >
        <MenuIcon style={{ color: 'black' }} />
      </IconButton>

      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper className="menu-list">
              <ClickAwayListener onClickAway={onMenuClosed}>
                <MenuList autoFocusItem={open} id="menu-list-grow" style={{ padding: 0 }}>
                  {links.map((link) =>
                    <a style={{ color: 'black' }} href={link.to} key={link.name}>
                      <MenuItem>
                        {link.name}
                      </MenuItem>
                    </a>
                  )}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}