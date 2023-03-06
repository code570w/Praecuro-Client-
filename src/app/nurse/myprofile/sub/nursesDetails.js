import React, { useEffect, useState }  from "react";
import { useSelector, useDispatch } from 'react-redux';
import  {Link} from "react-router-dom";
import { connect} from "react-redux";
import * as authDuck from "./../../../store/ducks/auth.duck";
import * as activityDuck from '../../../../app/store/ducks/activity.duck';
import * as jobDuck from "./../../../store/ducks/job.duck";
import * as categoryDuck from '../../../../app/store/ducks/category.duck';
import * as userDuck from "./../../../store/ducks/user.duck";
import * as nursesDetailsDuck from "../../../../app/store/ducks/nurses_details.duck";
import Footer from "../../../nurse/layout/Footer";
import * as bidDuck from "./../../../store/ducks/bid.duck";
import * as actions from './../../../actions';
import proImg from '../../../assets/default_profile.png'
import certificationImg from './../../../assets/certificationlogo.png';
import reviewImg from '../../../../app/assets/feed.png';


import Header from "../../../nurse/layout/Header";
import BreadCrumb from "../../layout/BreadCrumb";

function nursesDetails(props){

   console.log('propspropspropsprops11',props.nurses_details);


    return(
        <>
        <Header/>
        <BreadCrumb title="Nurse Profile" base="Home"/>
         <div className=" kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">
            <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="kt-portlet kt-portlet--height-fluid">
                            <div className="kt-portlet__body">
                                <div className="kt-widget kt-widget--user-profile-3">
                                    <div className="kt-widget__top">
                                        <div className="kt-widget__media kt-hidden-">
                                             {/* <img  style={{wideth:'auto',height:'140px'}}src={props.nurses_details.profilePhoto === '' ?proImg:props.nurses_details.profilePhoto} alt="image"/> */}
                                             <img  style={{width:'100%',maxWidth: '120px',height:'120px'}}
                                             src={ props.nurses_details.profilePhoto === '' ?proImg:props.nurses_details.profilePhoto}
                                              alt="image"/>
                                        </div>
                                        <div className="kt-widget__pic kt-widget__pic--danger kt-font-danger kt-font-boldest kt-font-light kt-hidden">
                                            JM
                                        </div>
                                        <div className="kt-widget__content">
                                            <div className="kt-widget__head">
                                                <a href="#" className="kt-widget__username">
                                                    {props.nurses_details.firstName + ' ' + props.nurses_details.lastName}
                                                    <i className="flaticon2-correct"></i>
                                                </a>
                                                <div className="kt-widget__action">
                                                    {/* <Link to={`change-password`}><button type="button" className="btn btn-label-success btn-sm btn-upper">Change Password</button></Link>&nbsp; */}
                                                    {/* <Link to={`personal-info`}><button type="button" className="btn btn-brand btn-sm btn-upper">Edit Profile</button></Link> */}
                                                    {/* <Link to={`payment-setting`}><button type="button" className="btn btn-outline-info btn-sm btn-upper">Payment Setting</button></Link> */}
                                                    {/* <Link to={`change-password`}><button type="button" className="btn btn-brand btn-sm btn-upper">Edit Profile</button></Link> */}
                                                </div>
                                            </div>
                                            <div className="kt-widget__subhead">
                                                <a href="#"><i className="flaticon2-new-email"></i>
                                                {props.nurses_details.email}
                                                </a>
                                                <a href="#"><i className="flaticon2-calendar-3"></i>
                                                {props.nurses_details.title}
                                                </a>
                                                <a href="#"><i className="flaticon2-placeholder"></i>
                                                {props.nurses_details.address ? props.nurses_details.address :'Melbourne'}
                                                </a>
                                            </div>
                                            <div className="kt-widget__info">
                                                <div className="kt-widget__desc">
                                                    {props.nurses_details.summary}
                                                </div>
                                                {/* <div className="kt-widget__progress">
                                                    <div className="kt-widget__text">
                                                        Progress
                                                    </div>
                                                    <div className="progress" style={{height: '5px',width: '100%'}}>
                                                        <div className="progress-bar kt-bg-success" role="progressbar" style={{width: '65%'}} aria-valuenow="65" aria-valuemin="0" aria-valuemax="100"></div>
                                                    </div>
                                                    <div className="kt-widget__stats">
                                                        78%
                                                    </div>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="kt-widget__bottom">
                                        <div className="kt-widget__item">
                                            <div className="kt-widget__icon">
                                                <i className="flaticon-piggy-bank"></i>
                                            </div>
                                            <div className="kt-widget__details">
                                                <span className="kt-widget__title">Earnings</span>
                                                <span className="kt-widget__value"><span>$</span>NaN</span>
                                                {/* <span className="kt-widget__value"><span>$</span>{earning}</span> */}
                                            </div>
                                        </div>
                                        <div className="kt-widget__item">
                                            <div className="kt-widget__icon">
                                                <i className="flaticon-confetti"></i>
                                            </div>
                                            <div className="kt-widget__details">
                                            <span className="kt-widget__title">0 Payments</span>
                                                {/* <span className="kt-widget__title">{earningLength} Payments</span> */}
                                                <Link className="kt-widget__value kt-font-brand" to='/myprofile/history-nurse'>View</Link>
                                            {/* <span className="kt-widget__value"><span></span>{allNurseReivewInfo.length}</span> */}
                                            </div>
                                        </div>
                                        <div className="kt-widget__item">
                                            <div className="kt-widget__icon">
                                                <i className="flaticon-file-2"></i>
                                            </div>
                                            <div className="kt-widget__details">
                                            <span className="kt-widget__title">0 Tasks</span>
                                                {/* <span className="kt-widget__title">{allNurseJobInfo.length} Tasks</span> */}
                                                <Link className="kt-widget__value kt-font-brand" to='/myprofile/current-nurse-bidding'>View</Link>
                                            </div>
                                        </div>
                                        <div className="kt-widget__item">
                                            <div className="kt-widget__icon">
                                                <i className="flaticon-pie-chart"></i>
                                            </div>
                                            <div className="kt-widget__details">
                                                <span className="kt-widget__title">Awarded Jobs</span>
                                            {/* <span className="kt-widget__value"><span></span>{allAwarded.length}</span> */}
                                            </div>
                                        </div>
                                        {/* <div className="kt-widget__item">
                                            <div className="kt-widget__icon">
                                                <i className="flaticon-chat-1"></i>
                                            </div>
                                            <div className="kt-widget__details">
                                                <span className="kt-widget__title">648 Comments</span>
                                                <a href="#" className="kt-widget__value kt-font-brand">View</a>
                                            </div>
                                        </div> */}
                                        {/* <div className="kt-widget__item">
                                            <div className="kt-widget__icon">
                                                <i className="flaticon-network"></i>
                                            </div>
                                            <div className="kt-widget__details">
                                                <div className="kt-section__content kt-section__content--solid">
                                                    <div className="kt-media-group">
                                                        <a href="#" className="kt-media kt-media--sm kt-media--circle" data-toggle="kt-tooltip" data-skin="brand" data-placement="top" title="" data-original-title="John Myer">
                                                            <img src="assets/media/users/100_1.jpg" alt="image"/>
                                                        </a>
                                                        <a href="#" className="kt-media kt-media--sm kt-media--circle" data-toggle="kt-tooltip" data-skin="brand" data-placement="top" title="" data-original-title="Alison Brandy">
                                                            <img src="assets/media/users/100_10.jpg" alt="image"/>
                                                        </a>
                                                        <a href="#" className="kt-media kt-media--sm kt-media--circle" data-toggle="kt-tooltip" data-skin="brand" data-placement="top" title="" data-original-title="Selina Cranson">
                                                            <img src="assets/media/users/100_11.jpg" alt="image"/>
                                                        </a>
                                                        <a href="#" className="kt-media kt-media--sm kt-media--circle" data-toggle="kt-tooltip" data-skin="brand" data-placement="top" title="" data-original-title="Luke Walls">
                                                            <img src="assets/media/users/100_2.jpg" alt="image"/>
                                                        </a>
                                                        <a href="#" className="kt-media kt-media--sm kt-media--circle" data-toggle="kt-tooltip" data-skin="brand" data-placement="top" title="" data-original-title="Micheal York">
                                                            <img src="assets/media/users/100_3.jpg" alt="image"/>
                                                        </a>
                                                        <a href="#" className="kt-media kt-media--sm kt-media--circle" data-toggle="kt-tooltip" data-skin="brand" data-placement="top" title="" data-original-title="Micheal York">
                                                            <span>+3</span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-12">
                        <div className="kt-portlet kt-portlet--tabs kt-portlet--height-fluid">
                            <div className="kt-portlet__head">
                                <div className="kt-portlet__head-label">
                                    <h3 className="kt-portlet__head-title">
                                        History
                                    </h3>
                                </div>
                            </div>
                            <div className="kt-portlet__body">
                                {/* {allNurseReivewInfo.length > 0 ? */}
                                {/* allNurseReivewInfo.slice(0,5).map(sub=> ( */}
                                <div className="tab-content">
                                     <div className="tab-pane active" id="kt_widget2_tab1_content">
                                        <div className="kt-widget2">
                                            <div className="kt-widget2__item">
                                                <div id="comment-61" className="comment-list the-comment" style={{width:'100%'}}>
                                                    <div className="avatar">
                                                        {/* <img src={sub.fromClient && sub.fromClient.profilePhoto?sub.fromClient.profilePhoto:'https://secure.gravatar.com/avatar/?s=80&amp;d=mm&amp;r=g'} width="80" height="80" alt="Avatar" className="avatar avatar-80 wp-user-avatar wp-user-avatar-80 photo avatar-default"/> */}
                                                    </div>
                                                    <div className="comment-box">
                                                        <div className="flex-middle-sm clearfix">
                                                            <div className="meta comment-author">
                                                                <div className="info-meta">
                                                                    <strong>
                                                                        {/* {sub.fromClient && sub.fromClient.firstName + ' '+ sub.fromClient.lastName}	 */}
                                                                    </strong>
                                                                <div className="entry-date">
                                                                    <i className="flaticon-event"></i>
                                                                        {/* {sub.reviewDate} */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="star-rating clear ali-right" title="Rated 5 out of 5">
                                                            <span className="review-avg">
                                                                {/* {sub.reviewOverallRating} */}
                                                                </span>
                                                            <div className="review-stars-rated-wrapper">
                                                                <div className="review-stars-rated">
                                                                    <ul className="review-stars">
                                                                        <li><span className="fa fa-star"></span></li>
                                                                        <li><span className="fa fa-star"></span></li>
                                                                        <li><span className="fa fa-star"></span></li>
                                                                        <li><span className="fa fa-star"></span></li>
                                                                        <li><span className="fa fa-star"></span></li>
                                                                    </ul>
                                                                    
                                                                    <ul className="review-stars filled" style={{width: '100%'}}>
                                                                        {/* {parseInt(sub.reviewOverallRating)>0?<li><span className="fa fa-star"></span></li>:<></>} */}
                                                                        {/* {parseInt(sub.reviewOverallRating)>1?<li><span className="fa fa-star"></span></li>:<></>} */}
                                                                        {/* {parseInt(sub.reviewOverallRating)>2?<li><span className="fa fa-star"></span></li>:<></>} */}
                                                                        {/* {parseInt(sub.reviewOverallRating)>3?<li><span className="fa fa-star"></span></li>:<></>} */}
                                                                        {/* {parseInt(sub.reviewOverallRating)>4?<li><span className="fa fa-star"></span></li>:<></>} */}
                                                                        {/* {sub.reviewOverallRating.indexOf('.') !== -1 ?<li><span className="fa fa-star-half"></span></li>:<></>} */}
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        </div>
                                                        <div itemProp="description" className="comment-text">
                                                            {/* <p>{sub.reviewWrite}</p> */}
                                                        </div>
                                                    </div>
                                                </div>  
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* )) */}
                            {/* :<div className="tab-content" style={{margin:'auto'}}> */}
                            {/* <img src={reviewImg} style={{width:'150px'}}></img> */}
                            {/* <p style={{textAlign:'center'}}>No Reviews</p> */}
                                {/* </div>} */}
                            </div>
                    </div>
                </div>
                </div>
                {/* <div className="row"> */}
                {/* <div className="row"> */}
                    {/* <div className = "col-xl-12"> */}
                        {/* <div className="kt-portlet kt-portlet--height-fluid"> */}
                            {/* <div className="kt-portlet__head"> */}
                                {/* <div className="kt-portlet__head-label">
                                    <h3 className="kt-portlet__head-title">
                                        {/* Certifications */}
                                        {/* Certifications, Background Check and Drug Screening */}
                                    {/* </h3> */}
                                {/* </div>  */}
                               
                                {/* <div className="kt-widget__action" style={{lineHeight:'4.5'}}>
                                    <Link to={`add-certification`}><button type="button" className="btn btn-label-success btn-sm btn-upper">Add Documents</button></Link>&nbsp;
                                </div> */}
                            {/* </div> */}
                            {/* <div className="kt-portlet__body"> */}
                                {/* {allCertifications.length === 0? */}
                                    {/* <div className="kt-widget4" style={{margin:'auto'}}> */}
                                     {/* <img src={certificationImg} style={{width:'100px'}}></img> */}
                                        {/* <p>No Certications</p>
                                    </div>: */}
                                   {/* allCertifications.slice(0,7).map(subCert=> { */}

                                 {/* if(subCert.active=="Active"){ */}

                                {/* //    return( */}
                                    {/* <div className="kt-widget4"> 
                                        <div className="kt-widget4__item">
                                            <span className="kt-widget4__icon">
                                                <i className="flaticon2-line-chart"></i>
                                            </span>
                                            <a href="#" className="kt-widget4__title kt-widget4__title--light"> */}
                                                {/* {subCert.name} */}
                                            {/* </a>
                                            <span className="kt-widget4__number kt-font-info"> */}
                                            {/* <button type="button" className={subCert.active==='Pending'?'btn btn-label-success btn-sm btn-upper':'btn btn-label-warning btn-sm btn-upper'}>
                                                {subCert.active}
                                             </button> */}
                                            {/* </span>
                                        </div>
                                    </div>  */}
                                    {/* // ) */}
                                    {/* //   }  */}

                                    {/* // })} */}
                                {/* </div> */}
                            {/* </div> */}
                        {/* </div> */}
                    {/* </div> */}
                {/* </div> */}
            </div>
        </div>
        <Footer/>
        </>
    )
 
}

const mapStateToProps = (state) => ({
    nurses: state.user.nurses,
    allcategories:state.category.allcategories,
    user:state.auth.user,
    bids:state.bid.bids,
    nurses_details:state.nurses_details.nurses_details.nurses_details[0],
})

export default connect(
    mapStateToProps,
    {...authDuck.actions, ...activityDuck.actions, ...userDuck.actions, ...categoryDuck.actions, ...nursesDetailsDuck.actions}
)(nursesDetails);
