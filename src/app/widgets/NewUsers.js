/* eslint-disable jsx-a11y/anchor-has-content,no-script-url,jsx-a11y/anchor-is-valid */
import React, { useEffect} from "react";
import { toAbsoluteUrl } from "../../_metronic/utils/utils";
import { connect} from "react-redux";
import * as actions from '../../app/actions';
import * as userDuck from "../../app/store/ducks/user.duck";
import * as jobDuck from "../../app/store/ducks/user.duck";
// import PortletHeaderDropdown from "../partials/content/CustomDropdowns/PortletHeaderDropdown";

function NewUsers(props) {
  const [allNurseinfo,setAllNurseinfo] = React.useState([]);
  useEffect(() => {
    var arr = props.nurses;
    arr = arr.sort((a, b) => b.modifyDate - a.modifyDate)
    console.log('1',arr)
    setAllNurseinfo(arr);
  }, [props])
  return (
    <>
      <div className="kt-portlet kt-portlet--height-fluid">
        <div className="kt-portlet__head">
          <div className="kt-portlet__head-label">
            <h3 className="kt-portlet__head-title">New Nurses</h3>
          </div>
          {/* <PortletHeaderDropdown /> */}
        </div>
        <div className="kt-portlet__body">
          <div className="kt-widget4">
          {allNurseinfo.slice(0,5).map((item) =>
            <div className="kt-widget4__item ">
              <div className="kt-widget4__pic kt-widget4__pic--pic ">
                <img alt="" src={item.profilePhoto} />
              </div>
              <div className="kt-widget4__info ">
                <a
                  className="kt-widget4__username"
                  href="#"
                >
                  {item.firstName + ' '+ item.lastName}
                </a>
                <a
                  className="kt-widget4__title"
                  href="#"
                />
                <p className="kt-widget4__text ">
                  {item.title}
                </p>
              </div>
              <a className="btn btn-sm btn-label-dark">Follow</a>
            </div>
          )}
          </div>
        </div>
      </div>
    </>
  );
}
const mapStateToProps = (state) => ({
  nurses: state.user.nurses
})
export default connect(
  mapStateToProps,
  {...userDuck.actions}
)(NewUsers)
