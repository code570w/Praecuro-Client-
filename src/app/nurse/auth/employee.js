import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { connect } from "react-redux";
import { useHistory, Link } from "react-router-dom";

import { injectIntl } from "react-intl";
import clsx from "clsx";
import Snackbar from "@material-ui/core/Snackbar";
import MySnackbarContentWrapper from "./../../pages/home/MySnackBar";
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
import * as categoryDuck from "../../store/ducks/category.duck";
import MenuItem from "@material-ui/core/MenuItem";
import { storage } from "../../../app/firebase";
import useGeolocation from "react-hook-geolocation";
import bacImage from "../../assets/regn.jpg";
// import {
//     Link
//   } from "react-router-dom";
const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

function AuthPageRegister(props) {
  // const { intl } = props;
  const history = useHistory();
  const [category, setCategory] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState();
  const [categoryarr, setCategoryarr] = useState([]);
  const [addsnack, setAddsnack] = React.useState(false);
  const [account, setAccount] = React.useState("Nurse");
  const [snackcontent, setSnackcontent] = React.useState("Added Succesfully!");
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

  const [file, setFile] = useState(null);
  const [showImage, setShowImage] = useState("");

  const handleFileChange = (event) => {
    console.log("event", event.target.files[0]);
    setFile(event.target.files[0]);
    event.target.files[0] !== undefined
      ? setShowImage(URL.createObjectURL(event.target.files[0]))
      : setShowImage("");
  };

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

  const disableLoading = () => {
    setLoading(false);
    setLoadingButtonStyle({ paddingRight: "2.5rem" });
  };
  const handleChange = (name) => (event) => {
    setState({ ...state, [name]: event.target.checked });
  };

  const geolocation = useGeolocation();
  useEffect(() => {
    setCategoryarr(props.allcategories);
    setCategory(props.allcategories[0]._id);
  }, [props]);

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

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmpassword: "",
    phoneNumber: "",
    dateOfBirth: "",
    city: "",
    state: "",
    zipCode: "",
    EINNumber: "",
  };

  return (
    <>
      <Header />
      {/* <BradCrumb title="Register" base="Home"/> */}
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
              <h2 className="bread-title">Register</h2>
            </div>
          </div>
        </div>
      </section>
      <section style={{ backgroundColor: "white" }} className="authPage">
        <div className="container">
          <div className="row">
            <div className="col-md-6  mx-auto register-form">
              <h3 className="title">Create an Account</h3>
              {/* <FormGroup row> */}
              <Formik
                initialValues={initialValues}
                validate={(values) => {
                  const errors = {};
                  if (!values.firstName) {
                    errors.firstName =
                      "You have to input all the fields correctly";
                  }
                  if (!values.lastName) {
                    errors.lastName =
                      "You have to input all the fields correctly";
                  }

                  if (account !== "Nurse") {
                    if (!values.city) {
                      errors.city =
                        "You have to input all the fields correctly";
                    }
                    if (!values.zipCode) {
                      errors.zipCode =
                        "You have to input all the fields correctly";
                    }
                    if (!values.EINNumber) {
                      errors.EINNumber =
                        "You have to input all the fields correctly";
                    }

                    if (!values.state) {
                      errors.state =
                        "You have to input all the fields correctly";
                    }
                  }

                  if (!values.email) {
                    errors.email = "You have to input all the fields correctly";
                  }
                  if (!values.password) {
                    errors.password =
                      "You have to input all the fields correctly";
                  }
                  if (!values.phoneNumber) {
                    errors.phoneNumber =
                      "You have to input all the fields correctly";
                  }
                  if (values.confirmpassword !== values.password) {
                    errors.password =
                      "You have to input same Password & Confirm";
                    errors.confirmpassword =
                      "You have to input same Password & Confirm";
                  }
                  return errors;
                }}
                onSubmit={(values, { setStatus, setSubmitting, resetForm }) => {
                  if (file !== null) {
                    const uploadTask = storage
                      .ref(`images/${file.name}`)
                      .put(file)
                      .then((url) => {
                        storage
                          .ref(`images/${file.name}`)
                          .getDownloadURL()
                          .then((url) => {
                            console.log("-- file certification --");
                            console.log(url);
                            Object.assign(values, {
                              uploadCertificate_file: url,
                            });
                            // handleSave(tempData)
                          });
                      });
                  }

                  // console.log('setSubmitting',setSubmitting);
                  //console.log('===  data 1 == ')
                  enableLoading();
                  setTimeout(() => {
                    if (account !== "Nurse") {
                      actions
                        .addNurse(values)
                        .then((res) => {
                          disableLoading();
                          let { data } = res;
                          //console.log('===  data  == ')
                          //console.log(res)
                          if (!data.success) {
                            setSubmitting(false);
                            setStatus(data.errMessage);
                            return;
                          } else {
                            setStatus("");
                            setSubmitting(false);
                            setSnackcontent("Added Succesfully!");
                            handleAddsnackClick();
                            props.allNurses(data.nurses);
                            resetForm({ values: initialValues });
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
                    } else {
                      values["latitude"] = geolocation.latitude;
                      values["longitude"] = geolocation.longitude;
                      // values['role']=1;
                      actions
                        .addClient(values)
                        .then((res) => {
                          disableLoading();
                          let { data } = res;
                          // debugger;
                          console.log("===  data  == ", data);
                          //console.log(res)
                          if (!data.success) {
                            setSubmitting(false);
                            setStatus(data.errMessage);
                            return;
                          } else {
                            setStatus("");
                            setSubmitting(false);
                            setSnackcontent("Added Succesfully!");
                            handleAddsnackClick();
                            props.allClients(data.clients);
                            resetForm({ values: initialValues });
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
                    }
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
                    {status ? (
                      <div role="alert" className="alert alert-danger">
                        <div className="alert-text">{status}</div>
                      </div>
                    ) : (
                      <div></div>
                    )}
                    <div className="text-center row">
                      <ul className="role-tabs flex-middle">
                        <li className="Square">
                          <input
                            id="cadidate"
                            type="radio"
                            name="role"
                            value="wp_job_board_candidate"
                            defaultChecked
                          />
                          <Link to="/register" style={{ color: "white" }}>
                            <label htmlFor="cadidate">Nurse</label>
                          </Link>
                        </li>
                        {/* <li className={`Square ${account =='Nurse' ? "active" : ""}`} onClick={() => {
                                    setAccount('Nurse');
                                  }}>
                                <input id="cadidate" type="radio" name="role" value="wp_job_board_candidate" defaultChecked/><label htmlFor="cadidate">Nurse</label></li> */}

                        <li className="Square active">
                          <input
                            type="radio"
                            id="employer"
                            name="role"
                            value="wp_job_board_employer"
                          />
                          <Link to="/employee">
                            <label htmlFor="employer">Employer</label>
                          </Link>
                        </li>

                        {/* <li className={`Square ${account !='Nurse' ? "active" : ""}`} onClick={() => {
                                    setAccount('Vendor');
                                }}>
                                <input type="radio" id="employer" name="role" value="wp_job_board_employer"/><label htmlFor="employer">Employer</label></li> */}
                      </ul>
                    </div>
                    {account !== "Nurse" ? (
                      <TextField
                        id="outlined-select-currency"
                        select
                        className={classes.textField}
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        SelectProps={{
                          MenuProps: {
                            className: classes.menu,
                          },
                        }}
                        helperText="Please select your currency"
                        margin="normal"
                        variant="outlined"
                      >
                        {categoryarr.map((option) => (
                          <MenuItem key={option._id} value={option._id}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    ) : (
                      <></>
                    )}
                    {/* {(account === 'Nurse') ? values.firstName :(account != 'Nurse') ? values.firstName :''} */}

                    <TextField
                      id="standard-bare"
                      className={classes.textField}
                      margin="normal"
                      variant="outlined"
                      placeholder={
                        account == "Nurse" ? "Firstname *" : "First Name"
                      }
                      inputProps={{ "aria-label": "bare" }}
                      name="firstName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.firstName}
                      helperText={touched.firstName && errors.firstName}
                      error={Boolean(touched.firstName && errors.firstName)}
                    />
                    <TextField
                      id="none"
                      className={classes.textField}
                      margin="normal"
                      variant="outlined"
                      placeholder={
                        account == "Nurse" ? "Last Name *" : "Last Name"
                      }
                      inputProps={{ "aria-label": "bare" }}
                      name="lastName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lastName}
                      helperText={touched.lastName && errors.lastName}
                      error={Boolean(touched.lastName && errors.lastName)}
                    />

                    <TextField
                      id="standard-bare"
                      className={classes.textField}
                      margin="normal"
                      variant="outlined"
                      placeholder={
                        account !== "Nurse" ? "Firstname *" : "Facility Name *"
                      }
                      inputProps={{ "aria-label": "bare" }}
                      name="firstName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.firstName}
                      helperText={touched.firstName && errors.firstName}
                      error={Boolean(touched.firstName && errors.firstName)}
                    />

                    {account != "Nurse" ? (
                      <>
                        <TextField
                          id="standard-bare"
                          className={classes.textField}
                          margin="normal"
                          variant="outlined"
                          placeholder="Facility Location"
                          inputProps={{ "aria-label": "bare" }}
                          name="facilitylocation"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.facilitylocation}
                          helperText={touched.city && errors.facilitylocation}
                          error={Boolean(
                            touched.city && errors.facilitylocation
                          )}
                        />

                        <TextField
                          id="standard-bare"
                          className={classes.textField}
                          margin="normal"
                          variant="outlined"
                          placeholder="What services are you looking for? *"
                          inputProps={{ "aria-label": "bare" }}
                          name="EINNumber"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.EINNumber}
                          helperText={touched.EINNumber && errors.EINNumber}
                          error={Boolean(touched.EINNumber && errors.EINNumber)}
                        />
                      </>
                    ) : (
                      <></>
                    )}
                    <TextField
                      id="standard-bare"
                      className={classes.textField}
                      margin="normal"
                      variant="outlined"
                      placeholder="Email *"
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
                      placeholder="Phone Number"
                      inputProps={{ "aria-label": "bare" }}
                      name="phoneNumber"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.phoneNumber}
                      helperText={touched.phoneNumber && errors.phoneNumber}
                      error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                    />
                    {account == "Nurse" ? (
                      <TextField
                        id="standard-bare"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        type="date"
                        placeholder="BirthDay *"
                        inputProps={{ "aria-label": "bare" }}
                        name="dateOfBirth"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.dateOfBirth}
                      />
                    ) : (
                      <></>
                    )}
                    <TextField
                      id="standard-bare"
                      className={classes.textField}
                      margin="normal"
                      variant="outlined"
                      type="password"
                      placeholder="Password *"
                      inputProps={{ "aria-label": "bare" }}
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
                      helperText={touched.password && errors.password}
                      error={Boolean(touched.password && errors.password)}
                    />
                    <TextField
                      id="standard-bare"
                      className={classes.textField}
                      margin="normal"
                      variant="outlined"
                      type="password"
                      placeholder="Confirm Password *"
                      inputProps={{ "aria-label": "bare" }}
                      name="confirmpassword"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.confirmpassword}
                      helperText={
                        touched.confirmpassword && errors.confirmpassword
                      }
                      error={Boolean(
                        touched.confirmpassword && errors.confirmpassword
                      )}
                    />

                    {/* <lable><b>Upload Certification : </b></lable>
                        <TextField
                          accept=".png, .jpg, .jpeg"
                          capture="camcorder"
                          name="uploadCertificate_file"
                          className={classes.textField}
                          id="standard-bare"
                          onChange={handleFileChange}
                          type="file"
                          required={true}
                      /> */}

                    <FormControlLabel
                      control={
                        <GreenCheckbox
                          checked={state.checkedB}
                          onChange={handleChange("checkedB")}
                          value="checkedB"
                          color="primary"
                        />
                      }
                      label="You accept our"
                      className={classes.termps_check}
                    />
                    <a
                      className="terms_link"
                      href="#forgot-password-form-wrapper"
                      title="Forgot Password"
                    >
                      Terms and Conditions and Privacy Policy
                    </a>
                    <div className="row login-form-submit">
                      <input
                        type="submit"
                        className={`btn btn-theme-second btn-block ${clsx({
                          "kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light": loading,
                        })}`}
                        style={loadingButtonStyle}
                        name="submit"
                        value="Register Now"
                      />
                    </div>
                    <div className="row">
                      <div
                        className="create-account text-center"
                        style={{ width: "100%" }}
                      >
                        Already Have an Account?{" "}
                        <Link to="/login" className="create">
                          Sign In
                        </Link>
                      </div>
                    </div>
                  </form>
                )}
              </Formik>
              {/* </FormGroup> */}
            </div>
          </div>
        </div>
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
  allcategories: state.category.allcategories,
});
export default injectIntl(
  connect(
    mapStateToProps,
    { ...authDuck.actions, ...userDuck.actions, ...categoryDuck.actions }
    // auth.actions
  )(AuthPageRegister)
);
