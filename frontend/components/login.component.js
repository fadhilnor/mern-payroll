import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  list: {
    marginTop: theme.spacing(1),
    backgroundColor: '#fffde7',
    color: 'red',
  },
  success: {
    marginTop: theme.spacing(1),
    backgroundColor: '#fffde7',
    color: 'green',
  },
});

class LoginComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: [],
      email: '',
      password: '',
      showPassword: false,
      serverError: [],
      loginSuccess: '',
    };

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onToggleShowPassword = this.onToggleShowPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangePassword(e) {
    e.persist();
    this.setState({
      password: e.target.value,
    });
  }

  onChangeEmail(e) {
    e.persist();
    this.setState({
      email: e.target.value,
    });
  }

  onToggleShowPassword() {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  }

  _renderServerErrors() {
    return this.state.serverError.map((el) => {
      return (
        <ListItem key={el.msg}>
          <ListItemText primary={el.msg} />
        </ListItem>
      );
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    axios
      .post('http://localhost:5000/users/login', user)
      .then((res) => {
        this.setState({
          errors: [],
          email: '',
          password: '',
          showPassword: false,
          serverError: [],
          loginSuccess: res.data,
        });
      })
      .catch((error) => {
        if (error.response) {
          this.setState({
            loginSuccess: '',
            serverError: [...error.response.data.error],
          });
        }
      });
  }

  render() {
    const self = this.state;
    return (
      <Container component="main" className={this.props.classes.root}>
        <CssBaseline />
        <div className={this.props.classes.paper}>
          <Avatar className={this.props.classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={this.props.classes.form} noValidate onSubmit={this.onSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              value={self.email}
              onChange={this.onChangeEmail}
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              value={self.password}
              onChange={this.onChangePassword}
              required
              fullWidth
              name="password"
              label="Password"
              id="password"
              autoComplete="current-password"
              type={self.showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={this.onToggleShowPassword}>
                      {self.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
            {self.serverError.length > 0 && (
              <List dense className={this.props.classes.list}>
                {this._renderServerErrors()}
              </List>
            )}
            {!!self.loginSuccess && (
              <List dense className={this.props.classes.success}>
                <ListItem>
                  <ListItemText primary={self.loginSuccess} />
                </ListItem>
              </List>
            )}
            <Button type="submit" fullWidth variant="contained" color="primary" className={this.props.classes.submit}>
              Sign In
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="#" variant="body2" component={RouterLink} to="/register">
                  {"Don't have an account? Register now"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

export default withStyles(styles)(LoginComponent);
