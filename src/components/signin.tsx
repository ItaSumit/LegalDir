import * as React from "react";
import { connect } from "react-redux";

import { TokenDetail } from "../redux/models/tokenDetail";
import { Signin } from "../redux/models/asignin";
import { AppState } from "../redux/reducers/initialState";
import { signinActionCreator } from "../redux/actions/signinActions";
import { AUTH } from "../redux/actions/actionTypes";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { withStyles, Divider } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { AppError } from "../redux/models/appError";
import userData from "../api/users.json";

const styles = (theme: any) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      width: 300
    },

    main: {
      width: "auto",
      display: "block", // Fix IE 11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 400,
        marginLeft: "auto",
        marginRight: "auto"
      }
    },
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: theme.spacing.unit * 30
    },
    button: {
      marginTop: theme.spacing(2),
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3)
    }
  });

interface IProps {
  signin: (signinDetail: Signin) => any;
  tokenDetail?: TokenDetail;
  signinError?: AppError;
  isLoggedIn: boolean;
  history: any;
  classes: any;
}

const SigninComponent: React.FC<IProps> = ({
  signin,
  tokenDetail,
  signinError,
  isLoggedIn,
  history,
  classes
}) => {
  const [signinDetail, setSigninDetail] = React.useState<Signin>({
    email: "",
    password: "12345678"
  });

  function handleChange(event: any) {
    const { name, value } = event.target;
    setSigninDetail(si => ({
      ...si,
      [name]: value
    }));
  }

  function handleSignin(event: any) {
    event.preventDefault();
    signin(signinDetail).then(() => {
      console.log(signinDetail);
      history.push("/home");
    });
  }

  return (
    <React.Fragment>
      {!isLoggedIn && (
        <form className={classes.main} autoComplete="off">
          <div className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-helper">Users</InputLabel>
              <Select
                onChange={handleChange}
                value={signinDetail.email}
                name="email"
              >
                {userData.users.map(user => (
                  <MenuItem key={user.email} value={user.email}>
                    {user.email}
                  </MenuItem>
                ))}
              </Select>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={handleSignin}
              >
                Sign in
              </Button>
            </FormControl>
          </div>
        </form>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (store: AppState) => {
  return {
    tokenDetail: store.signinState.token,
    signinError: store.signinState.error,
    isLoggedIn: store.signinState.isLoggedin
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    signin: (signinDetail: Signin) =>
      dispatch(signinActionCreator(signinDetail))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SigninComponent));
