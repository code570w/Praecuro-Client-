import React from "react";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import ProfileAside from './ProfileAside';
import Overview from './sub/overview';
import History from './sub/History';
import HistoryNurse from './sub/HistoryNurse';
import NurseOverview from './sub/NurseOverview';
import ChangePassword from './sub/changepassword';
import CurrentWorking from './sub/current-working/CurrentWorking';
import CurrentWorkingNurse from './sub/current-working/CurrentWorkingNurse';


import BidList from './sub/current-working/BidList';
import BidDetail from './sub/current-working/BidDetail';
import PaymentSetting from './sub/PaymentSetting';
import { Redirect, Route, Switch,
    useRouteMatch } from "react-router-dom";
import'./MyProfile.scss';
import BreadCrumb from "../layout/BreadCrumb";
import PersonalInfo from "./sub/personalinfo";
import AddCertification from './sub/addCertifcation';
import { connect} from "react-redux";
import * as authDuck from "./../../store/ducks/auth.duck";
import CurrentEdit from "./sub/current-working/CurrentEdit";
import bacImage from "../../assets/Global-Nursing-Education-Market.jpg"

import CurrentNurseWorking from './sub/current-working-nurse/CurrentNurseWorking';
function MyProfile(props) {
    let { path } = useRouteMatch();
    return (
    <>
        <Header/>
        {/* <BreadCrumb title="My Profile" base="Home"/> */}

        <section className="apus-breadscrumb" style={{backgroundImage:`url(${bacImage})`}}>
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
                        <h2 className="bread-title">My Profile</h2>
                    </div>
                </div>
            </div>
        </section>


        <div className="kt-container  kt-grid__item kt-grid__item--fluid">
            {/* <div className="alert alert-solid-danger alert-bold fade show kt-margin-t-20 kt-margin-b-40" role="alert">
                <div className="alert-icon"><i className="fa fa-exclamation-triangle"></i></div>
                <div className="alert-text">You have to complete Profile all the fileds and add Payment method also !   </div>
            </div> */}
            <div className="kt-grid kt-grid--desktop kt-grid--ver kt-grid--ver-desktop kt-app ">
                {/* <button className="kt-app__aside-close" id="kt_user_profile_aside_close">
                    <i className="la la-close"></i>
                </button> */}
                
                {props.role===1 ?<ProfileAside/>:<></>}
                <Switch>
                    {
                    <Redirect exact from={path} to={`${path}/overview`} />
                    }
                    <Route exact path={`${path}/overview`}>
                        {props.role===1 ?<Overview />:<NurseOverview/>}
                    </Route>
                    <Route exact path={`${path}/personal-info`}>
                        <PersonalInfo />
                    </Route>
                    <Route exact path={`${path}/add-certification`}>
                        <AddCertification />
                    </Route>
                    <Route exact path={`${path}/history`}>
                        <History />
                    </Route>
                    <Route exact path={`${path}/history-nurse`}>
                        <HistoryNurse />
                    </Route>
                    <Route exact path={`${path}/payment-setting`}>
                        <PaymentSetting />
                    </Route>
                    <Route exact path={`${path}/current-working`}>
                    <div className="kt-grid__item kt-grid__item--fluid kt-app__content">
                        <div className="row">
                        <CurrentWorking />
                        </div></div>
                    </Route>

                    <Route exact path={`${path}/current-working-nurse`}>
                    <div className="kt-grid__item kt-grid__item--fluid kt-app__content">
                        <div className="row">
                        < CurrentWorkingNurse />
                        </div></div>
                    </Route>

                   
                    <Route exact path={`${path}/create-edit-job`}>
                    <div className="kt-grid__item kt-grid__item--fluid kt-app__content">
                        <div className="row">
                        <CurrentEdit />
                        </div></div>
                    </Route>
                    <Route exact path={`${path}/bid-list`}>
                    <div className="kt-grid__item kt-grid__item--fluid kt-app__content">
                        <div className="row">
                        <BidList />
                        </div></div>
                    </Route>
                    <Route exact path={`${path}/bid-detail`}>
                    {/* <div className="kt-grid__item kt-grid__item--fluid kt-app__content"> */}
                        {/* <div className="row"> */}
                        <BidDetail />
                        {/* </div></div> */}
                    </Route>
                    <Route path={`${path}/change-password`}>
                        <ChangePassword/>
                    </Route>
                    {/* nurse current bid */}
                    <Route exact path={`${path}/current-nurse-bidding`}>
                        <div className="kt-grid__item kt-grid__item--fluid kt-app__content">
                            <div className="row">
                            <CurrentNurseWorking />
                            </div>
                        </div>
                    </Route>
                </Switch>
                
            </div>
        </div>
        <Footer/>
    </>
  );
}
const mapStateToProps = (state) => ({
     role:state.auth.role
  })
export default connect(
    mapStateToProps,
    {...authDuck.actions}
)(MyProfile);