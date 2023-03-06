/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useEffect} from "react";
import { toAbsoluteUrl } from "../../_metronic/utils/utils";
import { connect} from "react-redux";
import * as actions from '../../app/actions';
import * as userDuck from "../../app/store/ducks/user.duck";
import * as jobDuck from "../../app/store/ducks/user.duck";
// import PortletHeaderDropdown from "../partials/content/CustomDropdowns/PortletHeaderDropdown";

function BestSellers(props) {
  const [allJobinfo,setAllJobinfo] = React.useState([]);
  useEffect(() => {
    var arr = props.jobs;
    arr = arr.sort((a, b) => b.count - a.count)
    console.log('1',arr)
    setAllJobinfo(arr);
  }, [props])
  return (
    <>
      <div className="kt-portlet kt-portlet--height-fluid">
        <div className="kt-portlet__head">
          <div className="kt-portlet__head-label">
            <h3 className="kt-portlet__head-title">Best Jobs</h3>
          </div>
          {/* <PortletHeaderDropdown /> */}
        </div>
        <div className="kt-portlet__body">
          <div className="kt-widget5">
              {allJobinfo.slice(0,3).map((item) =>
                <div className="kt-widget5__item ">
                <div className="kt-widget5__content">
                  <div className="kt-widget5__pic">
                    <img
                      alt=""
                      className="kt-widget7__img"
                      src={toAbsoluteUrl("/media/work.png")}
                    />
                  </div>
                  <div className="kt-widget5__section">
                    <a className="kt-widget5__title">{item.title}</a>
                    <p className="kt-widget5__desc">{item.category.name}</p>
                    <div className="kt-widget5__info">
                      <span>Author: </span>
                      <span className="kt-font-info">{item.client ? item.client.firstName + ' '+ item.client.lastName : 'Undefined'}</span>
                      <span>Created: </span>
                      {/* <span className="kt-font-info">{item.modifyDate.toLocaleDateString()}</span> */}
                      <span className="kt-font-info">{item.modifyDate}</span>
                    </div>
                  </div>
                </div>
                <div className="kt-widget5__content">
                  <div className="kt-widget5__stats">
                  <span className="kt-widget5__number">{item.budget}</span>
                    <span className="kt-widget5__sales">Budget</span>
                  </div>
                  <div className="kt-widget5__stats">
                    <span className="kt-widget5__number">{item.count}</span>
                    <span className="kt-widget5__votes">Bids</span>
                  </div>
                </div>
              </div>
            )}
            
            {/* <div className="kt-widget5__item ">
              <div className="kt-widget5__content">
                <div className="kt-widget5__pic">
                  <img
                    alt=""
                    className="kt-widget7__img"
                    src={toAbsoluteUrl("/media/products/product11.jpg")}
                  />
                </div>
                <div className="kt-widget5__section">
                  <a className="kt-widget5__title">Awesome Mobile App</a>
                  <p className="kt-widget5__desc">
                    Metronic admin themes. Lorem Ipsum Amet.
                  </p>
                  <div className="kt-widget5__info">
                    <span>Author:</span>
                    <span className="kt-font-info">Fly themes</span>
                    <span>Released:</span>
                    <span className="kt-font-info">23.08.17</span>
                  </div>
                </div>
              </div>
              <div className="kt-widget5__content">
                <div className="kt-widget5__stats">
                  <span className="kt-widget5__number">210,054</span>
                  <span className="kt-widget5__sales">sales</span>
                </div>
                <div className="kt-widget5__stats">
                  <span className="kt-widget5__number">1103</span>
                  <span className="kt-widget5__votes">votes</span>
                </div>
              </div>
            </div>
            <div className="kt-widget5__item ">
              <div className="kt-widget5__content">
                <div className="kt-widget5__pic">
                  <img
                    alt=""
                    className="kt-widget7__img"
                    src={toAbsoluteUrl("/media/products/product10.jpg")}
                  />
                </div>
                <div className="kt-widget5__section">
                  <a className="kt-widget5__title">Branding Mockup</a>
                  <p className="kt-widget5__desc">Metronic bootstrap themes.</p>
                  <div className="kt-widget5__info">
                    <span>Author:</span>
                    <span className="kt-font-info">Fly themes</span>
                    <span>Released:</span>
                    <span className="kt-font-info">23.08.17</span>
                  </div>
                </div>
              </div>
              <div className="kt-widget5__content">
                <div className="kt-widget5__stats">
                  <span className="kt-widget5__number">24,583</span>
                  <span className="kt-widget5__sales">sales</span>
                </div>
                <div className="kt-widget5__stats">
                  <span className="kt-widget5__number">3809</span>
                  <span className="kt-widget5__votes">votes</span>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
const mapStateToProps = (state) => ({
  jobs: state.job.jobs,
})
export default connect(
  mapStateToProps,
  {...jobDuck.actions}
)(BestSellers)
