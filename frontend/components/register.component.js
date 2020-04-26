import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
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
});

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      emailErrorText: '',
      showPassword: false,
      showPasswordConfirm: false,
      serverError: [],
    };
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePasswordConfirm = this.onChangePasswordConfirm.bind(this);
    this.onToggleShowPassword = this.onToggleShowPassword.bind(this);
    this.onToggleShowPasswordConfrim = this.onToggleShowPasswordConfrim.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeName(e) {
    e.persist();
    this.setState({
      name: e.target.value,
    });
  }

  onChangeEmail(e) {
    e.persist();
    if (
      e.target.value.length == 0 ||
      e.target.value.match(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      this.setState({
        errors: this.state.errors.filter((e) => e !== 'email'),
        email: e.target.value,
        emailErrorText: '',
      });
    } else {
      this.setState({
        errors: [...this.state.errors, 'email'],
        email: e.target.value,
        emailErrorText: 'Email address is not vaild',
      });
    }
  }

  onChangePassword(e) {
    e.persist();
    this.setState({
      password: e.target.value,
    });
  }

  onChangePasswordConfirm(e) {
    e.persist();
    this.setState({
      passwordConfirm: e.target.value,
    });
  }

  onToggleShowPassword() {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  }

  onToggleShowPasswordConfrim() {
    this.setState({
      showPasswordConfirm: !this.state.showPasswordConfirm,
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

    const newUser = this.state;
    let self = this;
    axios
      .post('http://localhost:5000/users/register', newUser)
      .then((res) => {
        console.log(res.data);
        self.setState({
          errors: [],
          name: '',
          email: '',
          password: '',
          passwordConfirm: '',
          emailErrorText: '',
          showPassword: false,
          showPasswordConfirm: false,
          serverError: [],
        });
      })
      .catch((error) => {
        if (error.response) {
          this.setState({
            serverError: [...error.response.data.error],
          });
        }
      });
  }

  render() {
    const self = this.state;
    const disabled = self.errors.length > 0 || !self.name || !self.email || !self.password || !self.passwordConfirm;
    return (
      <Container component="main" className={this.props.classes.root}>
        <CssBaseline />
        <div className={this.props.classes.paper}>
          <Avatar className={this.props.classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form className={this.props.classes.form} noValidate onSubmit={this.onSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="fname"
                  name="name"
                  value={self.name}
                  onChange={this.onChangeName}
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Username"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  value={self.email}
                  onChange={this.onChangeEmail}
                  error={!!self.emailErrorText}
                  helperText={self.emailErrorText}
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  value={self.password}
                  onChange={this.onChangePassword}
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  value={self.passwordConfirm}
                  onChange={this.onChangePasswordConfirm}
                  fullWidth
                  name="passwordConfirm"
                  label="Confirm Password"
                  id="passwordConfirm"
                  autoComplete="current-password"
                  type={self.showPasswordConfirm ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton aria-label="toggle password visibility" onClick={this.onToggleShowPasswordConfrim}>
                          {self.showPasswordConfirm ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            {self.serverError.length > 0 && (
              <List dense className={this.props.classes.list}>
                {this._renderServerErrors()}
              </List>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={disabled}
              className={this.props.classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="#" variant="body2" component={RouterLink} to="/">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

export default withStyles(styles)(Register);
