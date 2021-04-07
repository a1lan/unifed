/*
 * CS3099 Group A3
 */

import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import {
  Person as PersonIcon,
  Settings as SettingsIcon,
  ExitToApp as ExitToAppIcon,
} from "@material-ui/icons";

import {
  ClickAwayListener,
  Grow,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@material-ui/core";

import { UserIcon } from "../../../components";
import { UserContext } from "../../../contexts";

export function AccountMenu(): ReactElement {
  const user = React.useContext(UserContext);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  if (!user.details) return <React.Fragment />;

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  return (
    <div>
      <IconButton
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <UserIcon inHeader username={user.details.username} small />
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-end"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === "bottom" ? "center top" : "center bottom" }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  <MenuItem
                    component={Link}
                    dense
                    to={"/user/" + user.details?.username}
                    onClick={handleClose}
                  >
                    <PersonIcon style={{ marginRight: "10px" }} fontSize="small" />
                    Profile
                  </MenuItem>
                  <MenuItem component={Link} dense to={"/account"} onClick={handleClose}>
                    <SettingsIcon style={{ marginRight: "10px" }} fontSize="small" />
                    Settings
                  </MenuItem>
                  <MenuItem dense onClick={user.logout}>
                    <ExitToAppIcon style={{ marginRight: "10px" }} fontSize="small" />
                    Logout
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}