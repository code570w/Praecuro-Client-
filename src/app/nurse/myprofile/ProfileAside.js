import React from "react";
import proImg from '../../assets/default_profile.png'
import {
    BrowserRouter,
    NavLink,
    Link,
    useRouteMatch
  } from "react-router-dom";
import { connect} from "react-redux";
// import * as actions from '../../../actions';
import * as authDuck from "./../../store/ducks/auth.duck";
function  ProfileAside(props){
    
    let { url } = useRouteMatch();

    const NavBarLink = props => {
        return <NavLink {...props} activeClassName="kt-widget__item--active"/>
        }

    return(
        <div className="kt-grid__item kt-app__toggle kt-app__aside" id="kt_user_profile_aside">
                    <div className="kt-portlet kt-portlet--height-fluid-">
                        <div className="kt-portlet__head  kt-portlet__head--noborder">
                            <div className="kt-portlet__head-label">
                                <h3 className="kt-portlet__head-title">
                                </h3>
                            </div>

                            {/* <div className="kt-portlet__head-toolbar">
                                <a href="#" className="btn btn-clean btn-sm btn-icon btn-icon-md" data-toggle="dropdown">
                                    <i className="flaticon-more-1"></i>
                                </a>
                            </div> */}
                    </div>
                    <div className="kt-portlet__body kt-portlet__body--fit-y">
                        <div className="kt-widget kt-widget--user-profile-1">
                            <div className="kt-widget__head">
                                <div className="kt-widget__media">
                                    <img src={props.user.profilePhoto === '' ?proImg:props.user.profilePhoto} alt="image"/>
                                </div>

                                <div className="kt-widget__content">
                                    <div className="kt-widget__section">
                                        <a href="#" className="kt-widget__username">
                                            {props.user.firstName + ' ' + props.user.lastName}
                                            <i className="flaticon2-correct kt-font-success"></i>
                                        </a>
                                        <span className="kt-widget__subtitle">
                                                {props.user.title !== '' ?'Empty':props.user.title}
                                        </span>
                                    </div>
                                    <div className="kt-widget__action">
                                         <Link to="/myprofile/create-edit-job">
                                        <button type="button" className="btn btn-info btn-sm">Post Job</button></Link>&nbsp;
                                        {/* <button type="button" className="btn btn-success btn-sm">follow</button> */}
                                    </div>
                                </div>
                            </div>
                            

                            <div className="kt-widget__body">
                                <div className="kt-widget__content">
                                    <div className="kt-widget__info">
                                        <span className="kt-widget__label">Email:</span>
                                        <a href="#" className="kt-widget__data">{props.user.email}</a>
                                    </div>
                                    <div className="kt-widget__info">
                                        <span className="kt-widget__label">Phone:</span>
                                        <a href="#" className="kt-widget__data">{props.user.phoneNumber}</a>
                                    </div>
                                    <div className="kt-widget__info">
                                        <span className="kt-widget__label">Address:</span>
                                        <span className="kt-widget__data">{props.user.address !== '' ?'Empty':props.user.address}</span>
                                    </div>
                                </div>
                                <div className="kt-widget__items">
                                    <NavBarLink to={`${url}/overview`} className="kt-widget__item ">
                                            <span className="kt-widget__section">
                                                <span className="kt-widget__icon">
                                                <i className="fab fa-buffer"></i>
                                                </span>
                                                <span className="kt-widget__desc">
                                                    Profile Overview
                                                </span>
                                            </span>
                                    </NavBarLink>
                                     <NavBarLink to={`${url}/personal-info`} className="kt-widget__item">
                                            <span className="kt-widget__section">
                                                <span className="kt-widget__icon">
                                                    <i className="far fa-address-card"></i>
                                                </span>
                                                <span className="kt-widget__desc">
                                                    Business Information
                                                </span>
                                            </span>
                                    </NavBarLink>
                                    {/*<NavBarLink to={`${url}/balance`} className="kt-widget__item">
                                            <span className="kt-widget__section">
                                                <span className="kt-widget__icon">
                                                <i className="fas fa-balance-scale"></i>  
                                                </span>
                                                <span className="kt-widget__desc">
                                                    Balance
                                                </span>
                                            </span>
                                    </NavBarLink>
                                    <NavBarLink to={`${url}/offer`} className="kt-widget__item">
                                            <span className="kt-widget__section">
                                                <span className="kt-widget__icon">
                                                    <i className="far fa-handshake"></i>
                                                </span>
                                                <span className="kt-widget__desc">
                                                    Offer
                                                </span>
                                            </span>
                                    </NavBarLink>
                                    <NavBarLink to={`${url}/proposal`} className="kt-widget__item">
                                        <span className="kt-widget__section">
                                            <span className="kt-widget__icon">
                                            <i className="fas fa-list-alt"></i>
                                            </span>
                                            <span className="kt-widget__desc">
                                                Proposal
                                            </span>
                                        </span>
                                    </NavBarLink> */}
                                    <NavBarLink to={`${url}/change-password`} className="kt-widget__item">
                                            <span className="kt-widget__section">
                                                <span className="kt-widget__icon">
                                                    <i className="fas fa-key"></i>
                                                </span>
                                                <span className="kt-widget__desc">
                                                    Change Password
                                                </span>
                                            </span>
                                    </NavBarLink>
                                    {/* <NavBarLink to={`${url}/user-modification`} className="kt-widget__item">
                                            <span className="kt-widget__section">
                                                <span className="kt-widget__icon">
                                                <i className="far fa-file-alt"></i>
                                                </span>
                                                <span className="kt-widget__desc">
                                                    User Modification
                                                </span>
                                            </span>
                                    </NavBarLink> */}
                                    {/* <NavBarLink to={`${url}/messages`} className="kt-widget__item">
                                            <span className="kt-widget__section">
                                                <span className="kt-widget__icon">
                                                    <i className="far fa-envelope-open"></i>
                                                </span>
                                                <span className="kt-widget__desc">
                                                    Messages
                                                </span>
                                            </span>
                                    </NavBarLink> */}
                                    <NavBarLink to={`${url}/payment-setting`} className="kt-widget__item">
                                            <span className="kt-widget__section">
                                                <span className="kt-widget__icon">
                                                     <i className="fas fa-money-check-alt"></i>
                                                </span>
                                                <span className="kt-widget__desc">
                                                    Payment Method
                                                </span>
                                            </span>
                                    </NavBarLink>
                                    <NavBarLink to={`${url}/current-working`} className="kt-widget__item">
                                            <span className="kt-widget__section">
                                                <span className="kt-widget__icon">
                                                    <i className="fas fa-briefcase"></i>
                                                </span>
                                                 <span className="kt-widget__desc">
                                                    Current Jobs
                                                </span>
                                            </span>
                                    </NavBarLink>
                                    <NavBarLink to={`${url}/history`} className="kt-widget__item">
                                            <span className="kt-widget__section">
                                                <span className="kt-widget__icon">
                                                    <i className="fas fa-history"></i>
                                                </span>
                                                <span className="kt-widget__desc">
                                                    History
                                                </span>
                                            </span>
                                    </NavBarLink>
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
     role:state.auth.role
  })
export default connect(
    mapStateToProps,
    {...authDuck.actions}
)(ProfileAside);