import React, { useState } from "react";
import { Formik } from "formik";
import { connect } from "react-redux";
import { useHistory, Link } from "react-router-dom";

import { injectIntl } from "react-intl";
import clsx from "clsx";
import Snackbar from "@material-ui/core/Snackbar";
import MySnackbarContentWrapper from "./../../pages/home/MySnackBar";

// import Popup from 'reactjs-popup';
// import Popup from 'reactjs-popup';

import { TextField } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import {
  //     fade,
  withStyles,
  makeStyles,
  //     createMuiTheme
} from "@material-ui/core/styles";
// import { ThemeProvider } from "@material-ui/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
// import CheckBoxIcon from '@material-ui/icons/CheckBox';
// import Favorite from '@material-ui/icons/Favorite';
// import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import "./AuthPage.scss";
import Header from "../layout/Header";
import BradCrumb from "../layout/BreadCrumb";
import Footer from "../layout/Footer";
import * as actions from "../../actions";
import * as authDuck from "../../store/ducks/auth.duck";
import * as userDuck from "../../store/ducks/user.duck";
import Popup_modal from "../layout/Popup_modal";

import bacImage from "../../assets/loginn.jpg";

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

function AuthPage(props) {
  // const { intl } = props;
  const history = useHistory();
  const [forgotStatus, setForgotStatus] = React.useState("");
  const [fEmail, setFEmail] = React.useState("");
  const [fLoadingFlag, setFLoadingFlag] = React.useState(false);
  const [addsnack, setAddsnack] = React.useState(false);
  const [snackcontent, setSnackcontent] = React.useState("Added Succesfully!");
  const [forgetflag, setForgetflag] = React.useState(false);
  // const [isOpen, setIsOpen] = useState(false);

  const [modalIsOpen, setIsOpen] = React.useState(false);

  {
    /* <div className="modpop">Welcome! Thank you for your time!</div> */
  }
  function openModal() {
    //  alert('hiiii');
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "60%",
    },
  };

  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true,
  });
  const [loading, setLoading] = useState(false);
  const [loadingButtonStyle, setLoadingButtonStyle] = useState({
    paddingRight: "2.5rem",
  });
  const enableLoading = () => {
    setLoading(true);
    setLoadingButtonStyle({ paddingRight: "3.5rem" });
  };
  function handleAddsnackClose() {
    setAddsnack(false);
  }
  function handleAddsnackClick() {
    setAddsnack(true);
  }

  const newPassword = () => {
    if (fEmail === "") {
      setForgotStatus("You have to input all the correctly info");
      return;
    }
    setFLoadingFlag(true);
    var tempData = {
      email: fEmail,
    };
    setTimeout(() => {
      actions
        .getNewPassword(tempData)
        .then((res) => {
          setFLoadingFlag(false);
          let { data } = res;

          console.log("datadata", data);
          if (!data.success) {
            setForgotStatus("Don't Exist User with this Email");
            return;
          } else {
            setForgotStatus("success");
            console.log("succesfull");
            return;
          }
        })
        .catch(() => {
          setFLoadingFlag(false);
          setForgotStatus(
            "Error!!! you have to check your Database or Connection"
          );
        });
    }, 1000);
  };
  const disableLoading = () => {
    setLoading(false);
    setLoadingButtonStyle({ paddingRight: "2.5rem" });
  };
  const handleChange = (name) => (event) => {
    setState({ ...state, [name]: event.target.checked });
  };
  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      marginLeft: theme.spacing(0),
      marginRight: theme.spacing(0),
      marginTop: "8px",
      marginBottom: "8px",
    },
    dense: {
      marginTop: theme.spacing(2),
    },
    menu: {
      width: 200,
    },
    termps_check: {
      marginRight: "3px",
    },
  }));
  const classes = useStyles();
  return (
    <>
      <Header />
      {/* <BradCrumb title="Login" base="Home"/> */}

      <section
        className="apus-breadscrumb"
        style={{ backgroundImage: `url(${bacImage})` }}
      >
        <div className="container">
          <div className="wrapper-breads">
            <div className="left-inner">
              {/* <ol className="breadcrumb">
                            <li><a href="#">{this.props.base}</a>  </li> 
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><span className="active">{this.props.title}</span></li>
                        </ol> */}
            </div>
            <div className="breadscrumb-inner clearfix">
              <h2 className="bread-title">Login</h2>
            </div>
          </div>
        </div>
      </section>

      {/* <button onClick={openModal}>opan</button> */}
      <section style={{ backgroundColor: "white" }} className="authPage">
        <div className="container">
          <div className="row">
            {!forgetflag ? (
              <div className="col-md-6 mx-auto">
                <h3 className="title">Sign In</h3>

                <div className="col-md-12">
                  <Formik
                    initialValues={{
                      email: "",
                      password: "",
                    }}
                    validate={(values) => {
                      const errors = {};
                      if (!values.email) {
                        errors.email =
                          "You have to input all the fields correctly";
                      }
                      if (!values.password) {
                        errors.password =
                          "You have to input all the fields correctly";
                      }
                      return errors;
                    }}
                    onSubmit={(values, { setStatus, setSubmitting }) => {
                      //console.log('===  data 1 == ')
                      enableLoading();
                      setTimeout(() => {
                        actions
                          .userlogin(values)
                          .then((res) => {
                            disableLoading();
                            let { data } = res;
                            // debugger;
                            //console.log('===  data  == ')
                            //console.log(res)
                            if (!data.success) {
                              setSubmitting(false);
                              setStatus(data.errMessage);
                              return;
                            } else {
                              setStatus("");
                              setSnackcontent("Login In Succesfully");
                              setSubmitting(false);
                              handleAddsnackClick();
                              props.userlogin(data);
                              // history.push("/home");
                              if (data.role === 2) {
                                openModal();
                                // history.push("/jobs");
                              } else {
                                history.push("/myprofile/overview");
                                // history.push('/')
                              }
                            }
                          })
                          .catch(() => {
                            //console.log('===  data2  == ')
                            disableLoading();
                            setSubmitting(false);
                            setStatus(
                              "Error!!! you have to check your Database or Connection"
                            );
                          });
                      }, 1000);
                    }}
                  >
                    {({
                      values,
                      status,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                    }) => (
                      <form
                        noValidate={true}
                        autoComplete="off"
                        className="kt-form"
                        onSubmit={handleSubmit}
                      >
                        {/* {status !== '' ?<div className="sign-in-demo-notice">
                          {status}
                        </div>:<div></div>} */}
                        {status ? (
                          <div role="alert" className="alert alert-danger">
                            <div className="alert-text">{status}</div>
                          </div>
                        ) : (
                          <div></div>
                        )}
                        <TextField
                          id="standard-bare"
                          className={classes.textField}
                          margin="normal"
                          variant="outlined"
                          placeholder="Email"
                          inputProps={{ "aria-label": "bare" }}
                          name="email"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.email}
                          helperText={touched.email && errors.email}
                          error={Boolean(touched.email && errors.email)}
                        />
                        <TextField
                          id="standard-bare"
                          className={classes.textField}
                          margin="normal"
                          variant="outlined"
                          type="password"
                          placeholder="Password"
                          inputProps={{ "aria-label": "bare" }}
                          name="password"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.password}
                          helperText={touched.password && errors.password}
                          error={Boolean(touched.password && errors.password)}
                        />
                        <div className="row">
                          <div className="col-md-6">
                            <FormControlLabel
                              control={
                                <GreenCheckbox
                                  checked={state.checkedB}
                                  onChange={handleChange("checkedB")}
                                  value="checkedB"
                                  color="primary"
                                />
                              }
                              label="Keep me signed in"
                            />
                          </div>
                          <div
                            className="col-md-6"
                            style={{ textAlign: "right", margin: "10px 0px" }}
                          >
                            <a
                              className="back-link"
                              title="Forgot Password"
                              onClick={() => {
                                setForgetflag(true);
                              }}
                            >
                              Forgot Password?
                            </a>
                          </div>
                        </div>
                        <div className="row login-form-submit">
                          <input
                            type="submit"
                            className={`btn btn-theme-second btn-block ${clsx({
                              "kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light": loading,
                            })}`}
                            style={loadingButtonStyle}
                            name="submit"
                            value="Sign In"
                          />
                        </div>
                        <div className="row">
                          <div
                            className="create-account text-center"
                            style={{ width: "100%" }}
                          >
                            Don’t Have an Account?{" "}
                            <Link to="/register" className="create">
                              Create
                            </Link>
                          </div>
                        </div>
                      </form>
                    )}
                  </Formik>
                </div>
              </div>
            ) : (
              <div className="col-md-6 reset-password mx-auto">
                <div className="top-info-user text-center">
                  <h3 className="title">Reset Password</h3>
                  <div className="des">Please Enter Email</div>
                </div>
                <FormGroup row>
                  {forgotStatus !== "" ? (
                    <div
                      role="alert"
                      className={
                        forgotStatus === "success"
                          ? "alert alert-success col-12"
                          : "alert alert-danger col-12"
                      }
                    >
                      <div className="alert-text">
                        {forgotStatus === "success"
                          ? "Changed Password Successfully. You can check Password in your email."
                          : forgotStatus}
                      </div>
                    </div>
                  ) : (
                    <div></div>
                  )}
                  <TextField
                    id="standard-bare"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    value={fEmail}
                    onChange={(e) => setFEmail(e.target.value)}
                    placeholder="Email"
                    inputProps={{ "aria-label": "bare" }}
                  />
                  <div
                    className="row login-form-submit"
                    style={{ marginTop: "6px" }}
                  >
                    {/* <input type="submit" className="btn btn-theme-second btn-block" name="submit" value="Get New Password"/> */}
                    <button
                      className="btn btn-theme-second btn-block"
                      onClick={newPassword}
                    >
                      Get New Password
                      {fLoadingFlag ? (
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      ) : (
                        <></>
                      )}
                    </button>
                  </div>
                  <div className="row">
                    <div
                      className="create-account text-center"
                      style={{ width: "100%" }}
                    >
                      <a
                        className="back-link"
                        onClick={() => {
                          setForgetflag(false);
                        }}
                      >
                        Back To Login
                      </a>
                    </div>
                  </div>
                </FormGroup>
              </div>
            )}
          </div>
        </div>
        <Popup_modal
          isOpen={modalIsOpen}
          //  onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        />
      </section>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={addsnack}
        autoHideDuration={6000}
        onClose={handleAddsnackClose}
      >
        <MySnackbarContentWrapper
          onClose={handleAddsnackClose}
          variant={"success"}
          message={snackcontent}
        />
      </Snackbar>
      <Footer />
    </>
  );
}
const mapStateToProps = (state) => ({
  role: state.auth.role,
});
export default injectIntl(
  connect(
    mapStateToProps,
    { ...authDuck.actions, ...userDuck.actions }
    // auth.actions
  )(AuthPage)
);
