import React from "react";
import { connect } from "react-redux";
import "./Header.scss";
import logo from "../../../app/assets/logo.png";
// import logo1 from 'src/app/assets/logo1.png';
// import MyCart from "../../../app/partials/layout/MyCart";
// import QuickPanelToggler from "./QuickPanelToggle";
// import LanguageSelector from "../../../app/partials/layout/LanguageSelector";
import UserProfile from "../../../app/partials/layout/UserProfile";
import * as authDuck from "../../store/ducks/auth.duck";
import * as jobDuck from "../../store/ducks/job.duck";
// import { toAbsoluteUrl } from "../../../_metronic/utils/utils";

import { Link } from "react-router-dom";
class Header extends React.Component {
  state = {
    isAuthorized: this.props.auth.user != null,
    showHeight: "0%",
  };
  handleOpen = () => {
    this.setState({ showHeight: "100%" });
  };
  handleAddClick = () => {
    this.props.setCurJob({});
    // setAdd(true)
  };
  handleClose = () => {
    this.setState({ showHeight: "0%" });
  };

  render() {
    console.log("dddd", this.state.showHeight);
    console.log("logo", logo);

    return (
      <>
        {!this.state.isAuthorized ? (
          <div className="header_section">
            <div className=" desktop_header">
              <nav
                className="navbar navbar-inverse"
                style={{ width: "100%", height: "auto" }}
              >
                <div className="container-fluid">
                  {/* <div className="navbar-header">
                          <div className="logo ">
                              <Link  to='/'>
                                    <span className="logo-main">
                                        <img width="431" height="133" src={logo}alt=""/>                
                                    </span>
                              </Link>
                          </div>
                          <a className="navbar-brand" href="#">WebSiteName</a>
                        </div> */}
                  <ul className="nav normal-nav navbar-">
                    <li className="logo ">
                      {" "}
                      <Link to="/">
                        <span className="logo-main">
                          <img width="431" height="133" src={logo} alt="" />
                        </span>
                      </Link>
                    </li>
                    <li style={{ lineHeight: "93px" }}>
                      <Link to="/home">Home</Link>
                    </li>
                    <li style={{ lineHeight: "93px" }}>
                      <Link to="/how-it-works">How it Works</Link>
                    </li>

                    {/* <li style={{lineHeight:'93px'}}><Link to='/Jobs'>Jobs</Link></li> */}

                    <li style={{ lineHeight: "93px" }}>
                      <Link to="/aboutus">About Us</Link>
                    </li>
                    <li style={{ lineHeight: "93px" }}>
                      <Link to="/contactus">Contact Us</Link>
                    </li>
                    {/* <li><Link to='/messages'>Messages</Link></li> */}
                  </ul>
                  <ul className="nav navbar-right">
                    {/* <MyCart
                            iconType=""
                            useSVG="true"
                            bgImage={toAbsoluteUrl("/media/misc/bg-1.jpg")}
                          /> */}
                    {/* <QuickPanelToggler /> */}
                    {/* <LanguageSelector iconType="" /> */}
                    {this.state.isAuthorized ? (
                      <UserProfile
                        showAvatar={true}
                        showHi={true}
                        showBadge={false}
                      />
                    ) : (
                      <>
                        <li>
                          <Link to="/login" className="btn-login">
                            <i className="fas fa-pencil-alt"></i>LOGIN
                          </Link>
                        </li>
                        <li>
                          <Link to="/register" className="btn-register">
                            <i className="	far fa-edit"></i>Register
                          </Link>
                        </li>
                      </>
                    )}
                    {/* <li><a href="#" className="btn-register"><i className="	far fa-edit"></i>Register</a></li> */}
                  </ul>
                </div>
              </nav>
            </div>
            <div
              id="myNav"
              className={"overlay"}
              style={{ height: this.state.showHeight }}
            >
              <a href="#" className="closebtn" onClick={this.handleClose}>
                &times;
              </a>
              <div className="overlay-content">
                {/* <a href="#">About</a>
              <a href="#">Services</a>
              <a href="#">Clients</a>
              <a href="#">Contact</a> */}
                <Link to="/home">Home</Link>
                <Link to="/how-it-works">How it works</Link>
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
                {/* <Link to='/Jobs'>Jobs</Link> */}
                <Link to="/aboutus">About Us</Link>
                <Link to="/contactus">Contact Us</Link>
                {/* <Link to='/messages'>Messages</Link> */}
              </div>
            </div>
            <div className="container mobile_header">
              <div className="row">
                <div className="flex-middle" style={{ width: "100%" }}>
                  <div className="col-3">
                    <a
                      href="#"
                      className="btn btn-showmenu btn-theme"
                      onClick={this.handleOpen}
                    >
                      <i className="fa fa-bars"></i>
                    </a>
                  </div>
                  <div className="col-6 text-center">
                    <div className="logo logo-theme">
                      <a href="#">
                        <img src={logo} alt="Workio" />
                      </a>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="top-wrapper-menu pull-right">
                      <Link className="drop-dow btn-menu-account" to="/login">
                        <i className="far fa-user"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="header_section_nurse">
            <div
              id="myNav1"
              className={"overlay"}
              style={{ height: this.state.showHeight }}
            >
              <a href="#" className="closebtn" onClick={this.handleClose}>
                &times;
              </a>
              <div className="overlay-content">
                {/* <a href="#">About</a>
              <a href="#">Services</a>
              <a href="#">Clients</a>
              <a href="#">Contact</a> */}
                {this.props.role === 2 ? (
                  <Link to="/Jobs" onClick={this.handleClose}>
                    Jobs
                  </Link>
                ) : (
                  <div />
                )}

                {this.props.role === 2 ? (
                  <Link
                    to="/myprofile/current-working-nurse"
                    onClick={this.handleClose}
                  >
                    Current Jobs
                  </Link>
                ) : (
                  <div />
                )}

                {/* {this.props.role===2 ? <Link to='/search-client' onClick={this.handleClose}>Client Directory</Link> :<div/> } */}

                {this.props.role === 1 ? (
                  <Link to="/myprofile/create-edit-job">
                    <span onClick={(this.handleAddClick, this.handleClose)}>
                      Post New Job
                    </span>
                  </Link>
                ) : (
                  <div />
                )}
                {this.props.role === 1 ? (
                  // {/* <Link to='/search-nurse' onClick={this.handleClose}><span>Nurse Directory</span></Link> */}
                  <a href="/search-nurse">
                    <span>Nurse Directory</span>
                  </a>
                ) : (
                  <div />
                )}
                {this.props.role === 1 ? (
                  // {/* <Link to='/search-nurse' onClick={this.handleClose}><span>Nurse Directory</span></Link> */}
                  <a href="/nurses">
                    <span>Search Nurses</span>
                  </a>
                ) : (
                  <div />
                )}

                {/* <Link to='/myprofile/personal-info'>Personal Info</Link> */}
                {/* <Link to='/myprofile/change-password'>Change Password</Link> */}
                <Link to="/myprofile/overview" onClick={this.handleClose}>
                  My Profile
                </Link>
                {this.props.role === 1 ? (
                  <Link
                    to="/myprofile/current-working"
                    onClick={this.handleClose}
                  >
                    Current Jobs
                  </Link>
                ) : (
                  <div />
                )}

                {/* <Link to='/myprofile/current-working' onClick={this.handleClose}>Current Jobs</Link> */}
                {/* <Link to='/aboutus'>Privacy Policy</Link> */}
                <Link to="/messages" onClick={this.handleClose}>
                  Messages
                </Link>
                {/* <a href='/messages'>Messages</a> */}
              </div>
            </div>
            <div className="container mobile_header" style={{ height: "82px" }}>
              <div className="row" style={{ height: "82px" }}>
                <div className="flex-middle" style={{ width: "100%" }}>
                  <div className="col-3">
                    <a
                      href="#"
                      className="btn btn-showmenu btn-theme"
                      onClick={this.handleOpen}
                    >
                      <i className="fa fa-bars"></i>
                    </a>
                  </div>
                  <div className="col-6 text-center">
                    <div className="logo logo-theme">
                      <a href="#">
                        <img src={logo} alt="Workio" />
                      </a>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="top-wrapper-menu pull-right">
                      {/* <Link className="drop-dow btn-menu-account" to="/login-register">
                    <i className="far fa-user"></i>
                  </Link> */}
                      <UserProfile
                        showAvatar={true}
                        showHi={true}
                        showBadge={false}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  role: state.auth.role,
});
export default connect(mapStateToProps, {
  ...authDuck.actions,
  ...jobDuck.actions,
})(Header);
// export default Header;
