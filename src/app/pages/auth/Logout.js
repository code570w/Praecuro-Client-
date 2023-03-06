import React, { Component } from "react";
import * as auth from "../../store/ducks/auth.duck";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { LayoutSplashScreen } from "../../../_metronic";

class Logout extends Component {
  componentDidMount() {
    this.props.logout();
  }

  render() {
    const { hasAuthToken,role } = this.props;

    return hasAuthToken ? <LayoutSplashScreen /> : (role === 0?<Redirect to="/admin/auth" />:<Redirect to="/home" />);
  }
}

export default connect(
  ({ auth }) => ({ hasAuthToken: Boolean(auth.authToken) ,role:auth.role}),
  auth.actions
)(Logout);
