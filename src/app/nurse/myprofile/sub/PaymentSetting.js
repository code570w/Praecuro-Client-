import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { TextField } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import CircularProgress from "@material-ui/core/CircularProgress";
import PropTypes from "prop-types";
import { lighten, makeStyles } from "@material-ui/core/styles";
import * as authDuck from "./../../../store/ducks/auth.duck";
import * as userDuck from "./../../../store/ducks/user.duck";
import "./overview.scss";
import { Tab, Tabs, Nav, Col, Row } from "react-bootstrap";
import reviewImg from "./../../../assets/feed.png";
import certificationImg from "./../../../assets/certificationlogo.png";
import Button from "@material-ui/core/Button";
import * as actions from "./../../../actions";
import { Link } from "react-router-dom";
import FormGroup from "@material-ui/core/FormGroup";
import clsx from "clsx";
import { Alert } from "react-bootstrap";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    overflowX: "auto",
  },
}));

function PaymentSetting(props) {
  const history = useHistory();
  const [status, setStatus] = useState("");
  const [id, setId] = useState("");
  const [flag, setFlag] = useState(0);
  const [country, setCountry] = useState("US");
  const [success, setSuccess] = React.useState(false);
  const [currency, setCurrency] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");
  const [accountHolderType, setAccountHolderType] = useState("");
  const [loading, setLoading] = useState(false);
  const [dialogopenDollar, setDialogOpenDollar] = React.useState(false);
  const [paymentAmount, setPaymentAmount] = React.useState(0);
  const classes = useStyles();
  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });
  const [loadingButtonStyle, setLoadingButtonStyle] = useState({
    paddingRight: "2.5rem",
  });

  const enableLoading = () => {
    setLoading(true);
    setLoadingButtonStyle({ paddingRight: "3.5rem" });
  };
  const handlePaymentAmount = (event) => {
    setPaymentAmount(event.target.value);
  };
  const disableLoading = () => {
    setLoading(false);
    setLoadingButtonStyle({ paddingRight: "2.5rem" });
  };
  useEffect(() => {
    if (props.user.paymentToken) {
      setFlag(1);
    }
    setId(props.user._id || "");
    setCountry(props.user.country || "US");
    setCurrency(props.user.currency || "USD");
    setRoutingNumber(props.user.routingNumber || "");
    setAccountNumber(props.user.accountNumber || "");
    setAccountHolderName(props.user.accountHolderName || "");
    setAccountHolderType(props.user.accountHolderType || "");
  }, [props]);
  function handleDialogDollarClose() {
    setDialogOpenDollar(false);
  }
  function handleDollar() {
    if (paymentAmount === 0) return;
    var tempData = {
      _id: id,
      role: props.user.role,
      customer: props.user.customerSource.id,
      user: props.user,
      amount: paymentAmount,
    };
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      setTimeout(() => {
        actions
          .paymentCharge(tempData)
          .then((res) => {
            disableLoading();
            let { data } = res;
            if (!data.success) {
              setStatus(data.errMessage);
              return;
            } else {
              console.log("succesfull");
              props.getCharges(data.charges);
              setSuccess(true);
              setLoading(false);
              handleDialogDollarClose();
              history.push("/myprofile/overview");
              return;
            }
          })
          .catch(() => {
            disableLoading();
            setStatus("Error!!! you have to check your Database or Connection");
          });
      }, 1000);
    }
  }
  function handleDialogOpenDollar(row) {
    setDialogOpenDollar(true);
    // setCompleteInfo(row)
  }
  console.log("tempData_", props);

  const verify = () => {
    var tempData = {
      _id: id,
      role: props.user.role,
      customer: props.user.customerSource.id,
      bank: props.user.paymentToken.bank_account.id,
    };

    // console.log('tempData_',props.user);
    enableLoading();
    setTimeout(() => {
      actions
        .paymentVerify(tempData)
        .then((res) => {
          disableLoading();
          let { data } = res;
          if (!data.success) {
            setStatus(data.errMessage);
            return;
          } else {
            console.log("succesfull");
            if (props.role == 1) props.allClients(data.users);
            else props.allNurses(data.users);
            props.paymentinfoUpdate(data.curuser);
            history.push("/myprofile/overview");
            return;
          }
        })
        .catch(() => {
          disableLoading();
          setStatus("Error!!! you have to check your Database or Connection");
        });
    }, 1000);
  };
  const save = () => {
    if (
      country === "" ||
      currency === "" ||
      routingNumber === "" ||
      accountNumber === "" ||
      accountHolderName === "" ||
      accountHolderType === ""
    ) {
      setStatus("You have to input all the correctly info");
      return;
    }
    var tempData = {
      _id: id,
      email: props.user.email,
      role: props.role,
      country: country,
      currency: currency,
      routingNumber: routingNumber,
      accountNumber: accountNumber,
      accountHolderName: accountHolderName,
      accountHolderType: accountHolderType,
      flag: flag,
    };

    // console.log('hiiii');
    enableLoading();
    setTimeout(() => {
      // console.log(tempData)
      actions
        .paymentinfoUpdate(tempData)
        .then((res) => {
          // console.log('hiiii111');
          disableLoading();
          let { data } = res;
          if (!data.success) {
            setStatus(data.errMessage);
            return;
          } else {
            console.log("succesfull");
            if (props.role == 1) props.allClients(data.users);
            else props.allNurses(data.users);
            props.paymentinfoUpdate(data.curuser);
            history.push("/myprofile/overview");
            return;
          }
        })
        .catch(() => {
          disableLoading();
          setStatus("Error!!! you have to check your Database or Connection");
        });
    }, 1000);
  };
  // console.log('props.user.paymentVerify',props.user.paymentVerify);
  return (
    <div className="kt-grid__item kt-grid__item--fluid kt-app__content">
      <div className="row">
        <div className="col-xl-12">
          <div className="kt-portlet kt-portlet--height-fluid">
            <div className="kt-portlet__head">
              <div className="kt-portlet__head-label">
                <h3 className="kt-portlet__head-title">
                  Payment Setting<small>(Bank Account)</small>
                </h3>
              </div>
              {/* <div className="kt-portlet__head-toolbar kt-hidden"> 
                                <div className="kt-portlet__head-toolbar">
                                    <div className="dropdown dropdown-inline">
                                        <button type="button" className="btn btn-clean btn-sm btn-icon btn-icon-md" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="la la-sellsy"></i>
                                        </button>
                                        <div className="dropdown-menu dropdown-menu-right">
                                            <ul className="kt-nav">
                                                <li className="kt-nav__section kt-nav__section--first">
                                                    <span className="kt-nav__section-text">Quick Actions</span>
                                                </li>
                                                <li className="kt-nav__item">
                                                    <a href="#" className="kt-nav__link">
                                                        <i className="kt-nav__link-icon flaticon2-graph-1"></i>
                                                        <span className="kt-nav__link-text">Statistics</span>
                                                    </a>
                                                </li>
                                                <li className="kt-nav__item">
                                                    <a href="#" className="kt-nav__link">
                                                        <i className="kt-nav__link-icon flaticon2-calendar-4"></i>
                                                        <span className="kt-nav__link-text">Events</span>
                                                    </a>
                                                </li>
                                                <li className="kt-nav__item">
                                                    <a href="#" className="kt-nav__link">
                                                        <i className="kt-nav__link-icon flaticon2-layers-1"></i>
                                                        <span className="kt-nav__link-text">Reports</span>
                                                    </a>
                                                </li>
                                                <li className="kt-nav__item">
                                                    <a href="#" className="kt-nav__link">
                                                        <i className="kt-nav__link-icon flaticon2-bell-1o"></i>
                                                        <span className="kt-nav__link-text">Notifications</span>
                                                    </a>
                                                </li>
                                                <li className="kt-nav__item">
                                                    <a href="#" className="kt-nav__link">
                                                        <i className="kt-nav__link-icon flaticon2-file-1"></i>
                                                        <span className="kt-nav__link-text">Files</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
            </div>
            <div className="kt-form kt-form--label-right">
              <div className="kt-portlet__body">
                <div className="kt-section kt-section--first">
                  <div className="kt-section__body">
                    <div className="row">
                      {status !== "" ? (
                        <div className="col-md-12">
                          <Alert variant="danger">{status}</Alert>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>

                    <div className="form-group row">
                      <label className="col-xl-3 col-lg-3 col-form-label">
                        Routing Number
                      </label>
                      <div className="col-lg-9 col-xl-6">
                        <input
                          type="text"
                          className="form-control"
                          disabled={flag === 1}
                          placeholder="Routing Number"
                          value={routingNumber}
                          onChange={(e) => setRoutingNumber(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-xl-3 col-lg-3 col-form-label">
                        Account Number
                      </label>
                      <div className="col-lg-9 col-xl-6">
                        <input
                          type="text"
                          className="form-control"
                          disabled={flag === 1}
                          placeholder="Account Number"
                          value={accountNumber}
                          onChange={(e) => setAccountNumber(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-xl-3 col-lg-3 col-form-label">
                        Account Holder Name
                      </label>
                      <div className="col-lg-9 col-xl-6">
                        <input
                          type="text"
                          className="form-control"
                          disabled={flag === 1}
                          placeholder="Account Holder Name"
                          value={accountHolderName}
                          onChange={(e) => setAccountHolderName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-group form-group-last row">
                      <label className="col-xl-3 col-lg-3 col-form-label">
                        Account Holder Type
                      </label>
                      <div className="col-lg-9 col-xl-6">
                        <select
                          className="form-control"
                          disabled={flag === 1}
                          id="exampleSelectl1"
                          value={accountHolderType}
                          onChange={(e) => setAccountHolderType(e.target.value)}
                        >
                          <option value="">Select Type</option>
                          <option value="individual">Personal</option>
                          <option value="company">Business</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="kt-portlet__foot">
                <div className="kt-form__actions">
                  <div className="row">
                    <div className="col-lg-3 col-xl-3"></div>
                    <div className="col-lg-9 col-xl-9">
                      <Link to="/myprofile/overview">
                        <button className="btn btn-secondary pull-right">
                          Cancel
                        </button>
                      </Link>
                      {flag === 0 ? (
                        <button
                          className=""
                          style={{ marginRight: 10 }}
                          onClick={save}
                          className={`btn btn-primary pull-right ${clsx({
                            "kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light": loading,
                          })}`}
                        >
                          Set Bank Account
                        </button>
                      ) : (
                        <>
                          {props.user.paymentVerify ? (
                            <>
                              <Button
                                variant="contained"
                                className={clsx({
                                  [classes.buttonSuccess]: true,
                                })}
                              >
                                Verified
                              </Button>
                              {/* <button style={{marginRight: 10, }} onClick={()=>handleDialogOpenDollar()} className={`btn btn-primary pull-right`}>Charge</button> */}
                              {/* <Dialog
                            open={dialogopenDollar}
                            onClose={handleDialogDollarClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <DialogTitle id="alert-dialog-title">{"Charge"}</DialogTitle>
                            <DialogContent>
                              <div className="row">
                                <div className="col-12">
                                <FormGroup row>
                                              <TextField
                                        id="paymentAmount"
                                        type="number"
                                        label="Pay Amount"
                                        margin="normal"
                                        variant="outlined"
                                        value={paymentAmount}
                                        onChange={handlePaymentAmount}
                                    />
                                   
                                  </FormGroup>
                                </div>
                              </div>
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handleDialogDollarClose} color="primary">
                                Cancel
                              </Button>
                              <div className={classes.wrapper}>
                              <Button variant="contained"  className={buttonClassname} onClick={handleDollar} color="primary" autoFocus disabled={loading}>
                                Pay
                                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                              </Button> 
                              </div>

                            </DialogActions>
                          </Dialog> */}
                            </>
                          ) : (
                            <button
                              className=""
                              style={{ marginRight: 10 }}
                              onClick={verify}
                              className={`btn btn-primary pull-right ${clsx({
                                "kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light": loading,
                              })}`}
                            >
                              Verify Bank
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  user: state.auth.user,
  role: state.auth.role,
});
export default connect(mapStateToProps, {
  ...authDuck.actions,
  ...userDuck.actions,
})(PaymentSetting);
