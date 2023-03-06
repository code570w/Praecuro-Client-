/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/pages/auth/AuthPage`, `src/pages/home/HomePage`).
 */

import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import { useLastLocation } from "react-router-last-location";
import HomePage from "../pages/home/HomePage";
// import AdminComponent from "../pages/home/AdminComponent";
// import ErrorsPage from "../pages/errors/ErrorsPage";
import LogoutPage from "../pages/auth/Logout";
import { LayoutContextProvider } from "../../_metronic";
import Layout from "../../_metronic/layout/Layout";
import NurseDashboard from "../nurse/NurseDashboard";
import HowItWorks from "../nurse/HowItWorks";
import PrivacyPolicy from "../nurse/PrivacyPolicy";
import * as routerHelpers from "../router/RouterHelpers";
import AdminAuthPage from "../pages/auth/AdminAuthPage";
import AuthPage from "../nurse/auth/AuthPage";
import AuthPageRegister from "../nurse/auth/AuthPageRegister";
import employee from "../nurse/auth/employee";

import MyProfile from "../nurse/myprofile/MyProfile";
import AboutUs from "../nurse/aboutus/AboutUs";
import ContactUs from "../nurse/contactus/ContactUs";
import Jobs from "../nurse/jobs/Jobs";
import SearchNurse from "../nurse/search/SearchNurse";
import SearchNurses from "../pages/client/SearchNurses";
import SearchClient from "../nurse/search/SearchClient";
import CurrentJob from "../nurse/currentJob/CurrentJob";
// import CurrentWorkingNurse from "../nurse/myprofile/sub/current-working/CurrentWorkingNurse";

import Messages from "../nurse/messages/Messages";
import JobDetail from "../nurse/jobs/jobdetail/jobdetail";
import CurrentHire from "../client/currenthire/CurrentHire";
import Notifications from "../nurse/Notifications/NotificationManage";

import nursesDetails from "../nurse/myprofile/sub/nursesDetails";
import OneSignal from "react-onesignal";

export const Routes = withRouter(({ history }) => {
  const dispatch = useDispatch();
  const lastLocation = useLastLocation();
  // OneSignal.initialize('b4df170a-8043-4bcc-98c6-42de1491a072', {notifyButton:{enable:true}});
  routerHelpers.saveLastLocation(lastLocation);
  const { isAuthorized, role, menuConfig } = useSelector(
    ({ auth, urls, builder: { menuConfig } }) => ({
      menuConfig,
      isAuthorized: auth.user != null,
      role: !(auth.user !== null && auth.user !== undefined)
        ? false
        : auth.role,
      // userLastLocation: routerHelpers.getLastLocation()
    }),
    shallowEqual
  );
  // const user = jwtDecode(token);
  // dispatch({ type: User.USER_LOGIN_SUCCESS, user, token, keep: true });

  // console.log('... route ...')
  // console.log(role)

  return (
    /* Create `LayoutContext` from current `history` and `menuConfig`. */
    <LayoutContextProvider history={history} menuConfig={menuConfig}>
      <Switch>
        {/* {!isAuthorized ? (
          <AuthPage />
        ) : (
          <Redirect from="/auth" to={userLastLocation} />
        )} */}

        {/* <Route path="/error" component={ErrorsPage} /> */}
        <Route path="/logout" component={LogoutPage} />

        {/* {!isAuthorized ? ( */}
        {/* // <Redirect to="/auth/login" /> */}
        {/* // ) : ( */}
        {<Redirect exact from="/" to="/home" />}
        <Route path="/home" component={NurseDashboard} />
        <Route path="/how-it-works" component={HowItWorks} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/login" component={AuthPage} />

        {/* User registration Nurse/Employee */}
        <Route path="/register" component={AuthPageRegister} />

        <Route path="/employee" component={employee} />

        <Route path="/aboutus" component={AboutUs} />
        <Route path="/contactus" component={ContactUs} />
        <Route path="/jobs" component={Jobs} />
        <Route path="/search-nurse" component={SearchNurse} />
        <Route path="/nurses" component={SearchNurses} />
        <Route path="/search-client" component={SearchClient} />
        <Route path="/jobs-details">
          <JobDetail></JobDetail>
        </Route>
        <Route path="/nurses-details" component={nursesDetails} />

        <Route path="/currentjob" component={CurrentJob} />
        <Route path="/messages" component={Messages} />
        <Route path="/notifications" component={Notifications} />

        <Route path="/current-hire" component={CurrentHire} />

        {/* <Route path="/myprofile/current-working-nurse" component={CurrentWorkingNurse} /> */}

        <Route path="/admin">
          {!isAuthorized || role !== 0 ? (
            <AdminAuthPage />
          ) : (
            <Layout>
              <HomePage />
            </Layout>
          )}
        </Route>
        <Route path="/myprofile" component={MyProfile} />
        {/* // )} */}
      </Switch>
    </LayoutContextProvider>
  );
});
