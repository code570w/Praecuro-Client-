/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { connect } from "react-redux";
import { toAbsoluteUrl } from "../../../_metronic";
import HeaderDropdownToggle from "../content/CustomDropdowns/HeaderDropdownToggle"; 
import Avatar from '@material-ui/core/Avatar';
import defaultImg from "./../../assets/default_profile.png"
import * as authDuck from "../../store/ducks/auth.duck";
import * as jobDuck from "../../store/ducks/job.duck";
import * as viewDuck from "../../store/ducks/view.duck";
import * as roomDuck from "../../store/ducks/room.duck";
class UserProfile extends React.Component {
  handleAddClick = () => {
    this.props.setCurJob({})
    // setAdd(true)
  }
  handleLogout  = ()  => { 
    // const { dispatch } = this.props;             
   this.props.logout();
}
  render() {
    const { user, showHi,showBadge } = this.props;
    // const {  showHi, showAvatar, showBadge } = this.props;

    return (
      <Dropdown className="kt-header__topbar-item kt-header__topbar-item--user" drop="down" alignRight>
        <Dropdown.Toggle
          as={HeaderDropdownToggle}
          id="dropdown-toggle-user-profile"
        >
          <div className="kt-header__topbar-user">
            {/* {showHi && (
              <span className="kt-header__topbar-welcome kt-hidden-mobile">
                Hi,
              </span>
            )} */}

            {showHi && (
              <span className="kt-header__topbar-username kt-hidden-mobile">
                {user.firName}
                {/* Punch */}
              </span>
            )}
            <Avatar alt={user.firstName?user.firstName:'Noone'} src={user.profilePhoto?user.profilePhoto:defaultImg} />

            {/* <img alt="Pic" src={user.profilePhoto?user.profilePhoto:defaultImg} /> */}

            {showBadge && (
              <span className="kt-badge kt-badge--username kt-badge--unified-success kt-badge--lg kt-badge--rounded kt-badge--bold">
                {/* TODO: Should get from currentUser */}
                John Doe
              </span>
            )}
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround dropdown-menu-xl">
          {/** ClassName should be 'dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround dropdown-menu-xl' */}
          <div
            className="kt-user-card kt-user-card--skin-dark kt-notification-item-padding-x"
            style={{
              backgroundImage: `url(${toAbsoluteUrl("/media/misc/bg-1.jpg")})`
            }}
          >
            <div className="kt-user-card__avatar">
              {user.profilePhoto !== '' ?<img alt="Pic" className="kt-hidden" src={user.profilePhoto} />:
              <span className="kt-badge kt-badge--lg kt-badge--rounded kt-badge--bold kt-font-success">
                {user.firstName.slice(0,1)}
              </span>}
            </div>
            <div className="kt-user-card__name">
              {user.firstName}
              {/* Punch */}
              </div>
            {/* <div className="kt-user-card__badge">
              <span className="btn btn-success btn-sm btn-bold btn-font-md">
                23 messages
              </span>
            </div> */}
          </div>
          <div className="kt-notification">
            {this.props.role!==0 ?<><Link to="/myprofile" className="kt-notification__item">
              <div className="kt-notification__item-icon">
                <i className="flaticon2-calendar-3 kt-font-success" />
              </div>
              <div className="kt-notification__item-details">
                <div className="kt-notification__item-title kt-font-bold">
                  My Profile
                </div>
                <div className="kt-notification__item-time">
                  Account settings and more
                </div>
              </div>
            </Link>
            <Link to="/messages" className="kt-notification__item">
              <div className="kt-notification__item-icon">
                <i className="flaticon2-mail kt-font-warning" />
              </div>
              <div className="kt-notification__item-details">
                <div className="kt-notification__item-title kt-font-bold">
                  My Messages
                </div>
                <div className="kt-notification__item-time">
                  Inbox and tasks
                </div>
              </div>
            </Link>
            <Link to="/notifications/" className="kt-notification__item">
              <div className="kt-notification__item-icon">
                <i className="flaticon2-bell kt-font-warning" />
              </div>
              <div className="kt-notification__item-details">
                <div className="kt-notification__item-title kt-font-bold">
                  Notifications
                </div>
                <div className="kt-notification__item-time">
                  User Notifications
                </div>
              </div>
            </Link>
            </>:<></>}
            {this.props.role === 1 ?<Link to="/myprofile/create-edit-job" className="kt-notification__item">
              <div className="kt-notification__item-icon">
                <i className="flaticon2-rocket-1 kt-font-danger" />
              </div>
              <div className="kt-notification__item-details" onClick={this.handleAddClick}>
                <div className="kt-notification__item-title kt-font-bold">
                Post New Job
                </div>
                {/* <div className="kt-notification__item-time">
                  Logs and notifications
                </div> */}
              </div>
            </Link>: <div/> }
            {/* <Link to="/currentjob" className="kt-notification__item">
                <div className="kt-notification__item-icon">
                  <i className="flaticon2-hourglass kt-font-brand" />
                </div>
                <div className="kt-notification__item-details">
                  <div className="kt-notification__item-title kt-font-bold">
                    My Tasks
                  </div>
                  
                  <div className="kt-notification__item-time">
                    latest tasks and projects
                  </div>
                </div>
            </Link> */}
            <div className="kt-notification__custom">
              <Link
                to="/logout"
                onClick={this.handleLogout}
                className="btn btn-label-brand btn-sm btn-bold"
              >
                Sign Out
              </Link>
            </div>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  role:state.auth.role
});

export default connect(mapStateToProps,
  {...authDuck.actions, ...jobDuck.actions, ...viewDuck.actions, ...roomDuck.actions})(UserProfile);
// export default UserProfile;
