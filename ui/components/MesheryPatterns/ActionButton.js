import * as React from 'react';
import {
  Button,
  ButtonGroup,
  Paper,
  Popper,
  MenuItem,
  MenuList,
  ClickAwayListener,
} from '@material-ui/core';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function ActionButton({ options }) {
  const [open, setOpen] = React.useState(false);
  const [descriptiveOpen, setDescriptiveOpen] = React.useState(false);

  const anchorRef = React.useRef(null);

  const handleMenuItemClick = () => {
    setOpen(false);
    setDescriptiveOpen(false);
  };

  const handleToggle = (event) => {
    event.stopPropagation();
    setOpen((prevOpen) => {
      if (!prevOpen) setDescriptiveOpen(false);
      return !prevOpen;
    });
  };

  const handleDescriptiveToggle = (event) => {
    event.stopPropagation();
    setDescriptiveOpen((prevOpen) => {
      if (!prevOpen) setOpen(false);
      return !prevOpen;
    });
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleDescriptiveClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setDescriptiveOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup
        variant="contained"
        style={{ boxShadow: 'none' }}
        ref={anchorRef}
        aria-label="Button group with a nested menu"
      >
        <Button onClick={handleDescriptiveToggle} variant="contained">
          Action
        </Button>
        <Button size="small" onClick={handleToggle} variant="contained">
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>

      <Popper
        sx={{
          zIndex: 1,
        }}
        open={descriptiveOpen}
        anchorEl={anchorRef.current}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Paper>
          <ClickAwayListener onClickAway={handleDescriptiveClose}>
            <MenuList id="split-button-menu" autoFocusItem>
              {options.map((option, index) => (
                <MenuItem
                  disabled={option.disabled}
                  key={option}
                  onClick={(event) => {
                    handleMenuItemClick(event);
                    option.onClick(event, index, true);
                  }}
                >
                  <div style={{ marginRight: '0.5rem' }}>{option.icon}</div>
                  {option.label}
                </MenuItem>
              ))}
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>

      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        placement={'bottom-end'}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Paper>
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList id="split-button-menu" autoFocusItem>
              {options.map((option, index) => (
                <MenuItem
                  disabled={option.disabled}
                  key={option}
                  onClick={(event) => {
                    option.onClick(event, index, false);
                  }}
                >
                  <div>{option.icon}</div>
                </MenuItem>
              ))}
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </React.Fragment>
  );
}
