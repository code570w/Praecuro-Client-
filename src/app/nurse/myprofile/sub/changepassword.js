import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import { connect } from "react-redux";
import * as actions from "../../../../app/actions";
import * as authDuck from "../../../../app/store/ducks/auth.duck";
import * as userDuck from "../../../../app/store/ducks/user.duck";
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";

function ChangePassword(props) {
  console.log("PROPS", props);
  const history = useHistory();
  const [status, setStatus] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingButtonStyle, setLoadingButtonStyle] = useState({
    paddingRight: "2.5rem",
  });
  const enableLoading = () => {
    setLoading(true);
    setLoadingButtonStyle({ paddingRight: "3.5rem" });
  };

  const disableLoading = () => {
    setLoading(false);
    setLoadingButtonStyle({ paddingRight: "2.5rem" });
  };
  useEffect(() => {
    setId(props.user._id || "");
  }, [props]);

  const save = () => {
    if (password === "") {
      setStatus("You have to input all the correctly info");
      return;
    } else if (password !== confirmpassword) {
      setStatus("You have to input same value ");
      return;
    }
    var tempData = {
      _id: id,
      role: props.role,
      password: password,
    };
    enableLoading();
    setTimeout(() => {
      actions
        .passUpdate(tempData)
        .then((res) => {
          disableLoading();
          debugger;
          let { data } = res;
          if (!data.success) {
            setStatus(data.errMessage);
            return;
          } else {
            console.log("succesfull");
            props.allClients(data.clients);
            props.passUpdate(data.curuser);
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
  return (
    <div className="kt-grid__item kt-grid__item--fluid kt-app__content">
      <div className="row">
        <div className="col-xl-12">
          <div className="kt-portlet kt-portlet--height-fluid">
            <div className="kt-portlet__head">
              <div className="kt-portlet__head-label">
                <h3 className="kt-portlet__head-title">
                  Change Password<small>Reset your account password</small>
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
                        <div
                          className="alert alert-solid-danger alert-bold fade show kt-margin-t-20 kt-margin-b-40"
                          role="alert"
                        >
                          <div className="alert-icon">
                            <i className="fa fa-exclamation-triangle"></i>
                          </div>
                          <div className="alert-text">
                            Configure user passwords to expire periodically.
                            Users will need warning that their passwords are
                            going to expire, <br />
                            or they might inadvertently get locked out of the
                            system!
                          </div>
                          <div className="alert-close">
                            <button
                              type="button"
                              className="close"
                              data-dismiss="alert"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">
                                <i className="la la-close"></i>
                              </span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    {/*  */}
                    {/* <div className="row">
                                            <label className="col-xl-3"></label>
                                            <div className="col-lg-9 col-xl-6">
                                                <h3 className="kt-section__title kt-section__title-sm">Change Or Recover Your Password:</h3>
                                            </div>
                                        </div> */}
                    {/* <div className="form-group row">
                                            <label className="col-xl-3 col-lg-3 col-form-label">Current Password</label>
                                            <div className="col-lg-9 col-xl-6">
                                                <input type="password" className="form-control"laceholder="Current password"/>
                                                <a href="#" className="kt-link kt-font-sm kt-font-bold kt-margin-t-5">Forgot password ?</a>
                                            </div>
                                        </div> */}
                    <div className="form-group row">
                      <label className="col-xl-3 col-lg-3 col-form-label">
                        New Password
                      </label>
                      <div className="col-lg-9 col-xl-6">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="New password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-group form-group-last row">
                      <label className="col-xl-3 col-lg-3 col-form-label">
                        Verify Password
                      </label>
                      <div className="col-lg-9 col-xl-6">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Verify password"
                          value={confirmpassword}
                          onChange={(e) => setConfirmpassword(e.target.value)}
                        />
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
                      <button
                        style={{ marginRight: 10 }}
                        onClick={save}
                        className={`btn btn-primary pull-right ${clsx({
                          "kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light": loading,
                        })}`}
                      >
                        Change Password
                      </button>
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
})(ChangePassword);
