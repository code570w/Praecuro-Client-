import React, { useMemo } from "react";
import Header from "./../../../nurse/layout/Header";
import Footer from "./../../../nurse/layout/Footer";
import './jobdetail.scss'
export default function JobDetail() {
    return (
    <>
        <Header/>
        <div className="job-detail-header v1">
            <div className="inner-v1">
            <div className="container">
                <div className="row flex-bottom-sm">
                    <div className="col-md-8 col-sm-7 col-xs-12">
                        <div className="flex-middle employer-logo-wrapper">
                            <div className="job-detail-thumbnail">
                                <div className="employer-logo">
                                    <a href="https://www.demoapus-wp1.com/workio/job/the-ultimate-drawing-course/">
                                        <div className="image-wrapper image-loaded">
                                            <img width="180" height="180" src="https://www.demoapus-wp1.com/workio/wp-content/uploads/2020/01/employer-logo-4.jpg" className="attachment-workio-logo-size size-workio-logo-size unveil-image" alt="" />
                                        </div>  
                                    </a>
                                </div>
                            </div>
                            <div className="inner-info">
                                <div className="title-wrapper">
                                    <h1 className="job-title">Digital Sketching</h1>  
                                    <span className="featured" data-toggle="tooltip" title="" data-original-title="Featured">
                                        <i className="fa fa-star"></i>
                                    </span>
                                </div>
                                <div className="category-job">
                                    <div className="job-category">
                                        <a className="category-job" href="https://www.demoapus-wp1.com/workio/job-category/sales-marketing/">Sales &amp; Marketing</a>
                                    </div>
                                </div>                   
                                <div className="job-detail-header-meta">
                                    <div className="job-phone">
                                        <i className="fa fa-phone"></i> <a href="tel:+084 123 456 789">+084 123 456 789</a>
                                    </div>                            
                                    <div className="job-location with-icon">
                                        <i className="ti-location-pin"></i>
                                        <a href="//maps.google.com/maps?q=3874+10th+St+Long+Island+City%2C+NY&amp;zoom=14&amp;size=512x512&amp;maptype=roadmap&amp;sensor=false" target="_blank">10th St Long Island, NY</a>
                                    </div>  
                                </div>                                    
                            </div>
                        </div>
                    </div>
                    <div className="job-detail-buttons col-md-4 col-sm-5 col-xs-12">
                        <div className="job-detail-header-container">
                            <div className="action">
                                <div className="deadline-time">Application ends: <strong>October 1, 2025</strong></div>
                                    <a href="#" className="btn btn-apply btn-apply-job-internal-required">Apply Now<i className="next flaticon-right-arrow"></i></a>
                                    <div className="job-apply-internal-required-wrapper" style={{display: 'none'}}>
                                        <div className="msg-inner">Please login with "Candidate" to apply</div>
                                    </div>
                                    <a href="#" className="btn btn-add-job-shortlist btn btn-block btn-shortlist" data-job_id="320" data-nonce="33a781eddc"><i className="pre flaticon-favorites"></i><span>Shortlist</span></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       <Footer/>
    </>
  );
}
