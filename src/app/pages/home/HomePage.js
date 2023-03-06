import React, { Suspense, lazy } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Builder from "./Builder";
import Dashboard from "./Dashboard";
import DocsPage from "./docs/DocsPage";
import { LayoutSplashScreen } from "../../../_metronic";
import AdminJob from "./AdminJob/AdminJob";
import NurseManage from "./Nurse/NurseManage";
import ClientManage from "./Client/ClientManage";
import CertificationManage from "./Certification/CertificationManage";
import NotificationManage from "./Notification/NotificationManage";
import HistoryManage from "./History/HistoryManage";
import Category from "./Category/Category";
import Commision_charges from "./Commision_charges/Commision_charges";
import Wallet from "./Wallet/Wallet";
import Paysetting from "./Paysetting/Paysetting";
import EmailTemplate from "./EmailTemplate/EmailTemplate";
import Account from "./Nurse/Account";
import ClientAccount from "./Client/ClientAccount";
import CertificationAccount from "./Certification/CertificationAccount";
import JobDetail from "./Job/JobDetail";
import HistoryDetail from "./History/HistoryDetail";
import JobManagement from "./Job/JobManagement";
import {
  BrowserRouter as Router,
  Link,
  NavLink,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./../../../app/actions";
import * as categoryDuck from "./../../store/ducks/category.duck";
import * as userDuck from "./../../store/ducks/user.duck";
import * as authDuck from "./../../store/ducks/auth.duck";

function HomePage(props) {
  let { path, url } = useRouteMatch();
  // useEffect(() => {
  //   console.log('Home page');
  // }, []) // [] - is required if you need only one call
  // https://reactjs.org/docs/hooks-reference.html#useeffect
  actions
    .getAllCategory()
    .then((res) => {
      let { data } = res;
      if (!data.success) {
        props.allCategories([]);
      } else {
        props.allCategories(data.allcategories);
      }
    })
    .catch((err) => {});
  actions
    .getAllCharges()
    .then((res) => {
      let { data } = res;
      if (!data.success) {
        props.getCharges([]);
      } else {
        props.getCharges(data.charges);
      }
    })
    .catch((err) => {});

  actions
    .getAllNurse()
    .then((res) => {
      let { data } = res;
      if (!data.success) {
        props.allNurses([]);
      } else {
        props.allNurses(data.nurses);
      }
    })
    .catch((err) => {});
  actions
    .getAllCertification()
    .then((res) => {
      console.log("certnifionca ation");
      let { data } = res;
      if (!data.success) {
        props.allCertifications([]);
      } else {
        props.allCertifications(data.certifications);
      }
    })
    .catch((err) => {});
  actions
    .getAllNotifications("admin")
    .then((res) => {
      console.log("certnifionca ationnnn");
      let { data } = res;
      if (!data.success) {
        props.allNotifications([]);
      } else {
        props.allNotifications(data.notifications);
      }
    })
    .catch((err) => {});
  actions
    .getAllClient()
    .then((res) => {
      let { data } = res;
      if (!data.success) {
        props.allClients([]);
      } else {
        props.allClients(data.clients);
      }
    })
    .catch((err) => {});
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/admin" to="/admin/dashboard" />
        }
        <Route path="/admin/builder" component={Builder} />
        <Route path="/admin/dashboard" component={Dashboard} />
        <Route exact path="/admin/nurse" component={NurseManage} />
        <Route exact path="/admin/nurse/create_edit" component={Account} />

        <Route exact path="/admin/client" component={ClientManage} />
        <Route
          exact
          path="/admin/client/create_edit"
          component={ClientAccount}
        />

        <Route
          exact
          path="/admin/certification"
          component={CertificationManage}
        />
        <Route
          exact
          path="/admin/certification/create_edit"
          component={CertificationAccount}
        />
        <Route
          exact
          path="/admin/notifications"
          component={NotificationManage}
        />

        <Route exact path="/admin/job" component={JobManagement} />
        <Route exact path="/admin/job/create-edit" component={JobDetail} />

        <Route exact path="/admin/history" component={HistoryManage} />
        <Route
          exact
          path="/admin/history/create-edit"
          component={HistoryDetail}
        />
        <Route path="/admin/Category">
          <Category></Category>
        </Route>
        <Route path="/admin/commision_charges">
          <Commision_charges></Commision_charges>
        </Route>

        <Route path="/admin/paysetting">
          <Paysetting></Paysetting>
        </Route>
        <Route path="/admin/wallet">
          <Wallet></Wallet>
        </Route>
        <Route path="/admin/email-template">
          <EmailTemplate />
        </Route>

        <Redirect to="/admin/dashboard" />
      </Switch>
    </Suspense>
  );
}
export default connect(null, {
  ...authDuck.actions,
  ...categoryDuck.actions,
  ...userDuck.actions,
})(HomePage);
