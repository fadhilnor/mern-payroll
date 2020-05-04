import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';
import { Typography } from '@material-ui/core';

import { logoutUser } from '../../../../services/authServices';
import Logo from '../../../../public/images/logo/logo.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none',
    background: 'linear-gradient(to right bottom, #6200ea, #3f51b5)',
  },
  flexGrow: {
    flexGrow: 1,
  },
  logo: {
    marginLeft: theme.spacing(1),
    fontWeight: 500,
    fontSize: '20px',
  },
  signOutButton: {
    marginLeft: theme.spacing(1),
  },
  signOutLabel: {
    marginRight: theme.spacing(1),
  },
}));

const Topbar = (props) => {
  const { className, onSidebarOpen, ...rest } = props;
  const dispatch = useDispatch();

  const classes = useStyles();

  return (
    <AppBar {...rest} className={clsx(classes.root, className)}>
      <Toolbar>
        <RouterLink to="/dashboard">
          <Logo fill="white" className="logo" width={50} height={40} />
        </RouterLink>
        <Typography className={classes.logo} color="inherit">
          MERN-Payroll
        </Typography>
        <div className={classes.flexGrow} />
        <Hidden smDown>
          <IconButton className={classes.signOutButton} color="inherit" onClick={() => dispatch(logoutUser())}>
            <Typography className={classes.signOutLabel} color="inherit" variant="body2">
              Sign Out
            </Typography>
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden mdUp>
          <IconButton color="inherit" onClick={onSidebarOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func,
};

export default Topbar;
