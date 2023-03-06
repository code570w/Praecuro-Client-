import React from "react";
import Header from "../../nurse/layout/Header";
import Footer from "../../nurse/layout/Footer";
import './CurrentJob.scss'
import BreadCrumb from "../layout/BreadCrumb";
import MenuItem from '@material-ui/core/MenuItem';
import {
    TextField,
  } from "@material-ui/core";
import {
    makeStyles,
} from "@material-ui/core/styles";
export default function CurrentJob() {
//   const [advanceflag,setAdvanceflag] = React.useState(false);
  const [values, setValues] = React.useState({
        name: 'Cat in the Hat',
        age: '',
        multiline: 'Controlled',
        currency: 'EUR',
      });
    
    const useStyles = makeStyles(theme => ({
        container: {
          display: "flex",
          flexWrap: "wrap"
        },
        textField1:{
            marginLeft:'5px',
            marginRight:'5px'
        },
        textField: {
          marginLeft: theme.spacing(0),
          marginRight: theme.spacing(0),
          marginTop: '8px',
          marginBottom: '8px',
        },
        dense: {
          marginTop: theme.spacing(2)
        },
        menu: {
          width: 200
        },
        termps_check:{
          marginRight:'3px'
        }
      }));
      const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
      };
    const classes = useStyles();
    return (
    <>
     <Header/>
     <BreadCrumb title="Current Jobs" base="Home" background="2.jpg"/>
     <section style={{backgroundColor:'white'}}>
            <div className="container currentjob">
            <div className="row">
                    <div className="jobs-alert-ordering-wrapper" style={{width:'100%'}}>
                        <div className="results-count">
                            Current Jobs 3 things
                        </div>
                    {/* <div className="job-rss-btn margin-left-15">
                            <a className="job-rss-link" href="https://www.demoapus-wp1.com/workio/?feed=job_listing_feed&amp;filter-title&amp;filter-category&amp;filter-location=52&amp;filter-center-location&amp;filter-center-latitude&amp;filter-center-longitude&amp;filter-type&amp;filter-salary-from=1200&amp;filter-salary-to=8000&amp;filter-date-posted=all&amp;filter-custom-industry&amp;filter-custom-qualification&amp;filter-custom-level&amp;filter-custom-experience" target="_blank">
                                <i className="fas fa-rss-square"></i>
                                RSS Feed
                            </a>
                    </div> */}
                    <div className="jobs-ordering-wrapper" style={{display:'flex'}}>
                            <TextField
                                    id="outlined-select-currency"
                                    select
                                    placeholder="Category"
                                    className={classes.textField1}
                                    value='Default'
                                    margin="normal"
                                    variant="outlined"
                                >
                                    <MenuItem key='Default' value='Default'>
                                        Default
                                    </MenuItem>
                                    <MenuItem key='Newest' value='Newest'>
                                    Newest
                                    </MenuItem>
                                    <MenuItem key='Oldest' value='Oldest'>
                                    Oldest
                                    </MenuItem>
                                </TextField>
                            {/* <TextField
                                    id="outlined-select-currency"
                                    select
                                    placeholder="Category"
                                    className={classes.textField1}
                                    value='9 Per Page'
                                    margin="normal"
                                    variant="outlined"
                                >
                                    <MenuItem key='9 Per Page' value='9 Per Page'>
                                    9 Per Page
                                    </MenuItem>
                                    <MenuItem key='All' value='All'>
                                    All
                                    </MenuItem>
                                </TextField> */}
                    </div>
                    </div>
                </div>
                <div className="row">
                    <div className="jobs-wrapper items-wrapper">
                        <div className="style-list-jobs">
						    <article id="post-549" className="job-list map-item job-style-inner post-549 job_listing type-job_listing status-publish has-post-thumbnail hentry job_listing_type-internship job_listing_category-retail job_listing_location-new-york job_listing_tag-digital job_listing_tag-interviews job_listing_tag-jobs job_listing_tag-media" data-latitude="40.776629" data-longitude="-73.952531">
                                {/* <div className="featured-urgent-label">
                                    <span className="urgent">Urgent</span>
                                </div> */}
                                <div className="flex-middle-sm job-list-container">
                                    <div className="job-employer-logo">
                                        <div className="employer-logo">
                                            <a href="https://www.demoapus-wp1.com/workio/job/python-3-bootcamp/">
                                                <div className="image-wrapper image-loaded">
                                                    <img width="180" height="180" src="https://www.demoapus-wp1.com/workio/wp-content/uploads/2020/01/employer-logo-4.jpg" className="attachment-workio-logo-size size-workio-logo-size unveil-image" alt=""/>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="job-information">
                                        <div className="title-wrapper">
                                            <h2 className="job-title">
                                                <a href="https://www.demoapus-wp1.com/workio/job/python-3-bootcamp/" rel="bookmark">Python 3 Bootcamp</a>
                                            </h2>                
                                        </div>
                                        <div className="job-employer-info-wrapper">
                                            <h3 className="employer-title">
                                                <a href="https://www.demoapus-wp1.com/workio/employer/skype/">
                                                    Skype	
                                                </a>
                                            </h3>
                                            <div className="job-salary">
                                                $<span className="price-text">2000</span> - $<span className="price-text">2500</span> / month
                                            </div>    
                                            <div className="job-types">
                    							<div className="job-type with-title">
						            	            <a className="type-job" href="https://www.demoapus-wp1.com/workio/job-type/internship/" style={{color: '#63ace5'}}>
                                                        Internship
                                                    </a>
                		        		    	</div>
	                                        </div>
                                      </div>            
                                    </div>
                                    <div className="job-location with-icon">
                                        <i className="ti-location-pin"></i>
                                        <a href="//maps.google.com/maps?q=1620-1628+2nd+Ave+New+York%2C+NY+10028+USA+&amp;zoom=14&amp;size=512x512&amp;maptype=roadmap&amp;sensor=false" target="_blank">
                                            1628 2nd Ave New York
                                        </a>
                                    </div>            
                                    <div className="deadline-time">Application ends: <strong>October 1, 2025</strong></div>
									<a href="#" className="btn btn-apply btn-apply-job-internal-required">Apply Now<i className="next flaticon-right-arrow"></i></a>
                                    <div className="job-apply-internal-required-wrapper" style={{display:'none'}}>
		                                <div className="msg-inner">Please login with "Candidate" to apply</div>
                                    </div>
                                </div>
                            </article>  
					    </div>
                        <div className="style-list-jobs">
						    <article id="post-348" className="job-list map-item job-style-inner post-348 job_listing type-job_listing status-publish has-post-thumbnail hentry job_listing_type-freelance job_listing_category-media job_listing_location-new-york job_listing_tag-interviews job_listing_tag-resumes" data-latitude="40.7689298" data-longitude="-73.931603">
                                {/* <div className="featured-urgent-label">
                                    <span className="featured label-no-icon">Featured</span>
                        	    	<span className="urgent">Urgent</span>
                                </div> */}
                                <div className="flex-middle-sm job-list-container">
                                    <div className="job-employer-logo">
                                        <div className="employer-logo">
                                            <a href="https://www.demoapus-wp1.com/workio/job/digital-masterclass/">
                                                <div className="image-wrapper image-loaded">
                                                    <img width="180" height="180" src="https://www.demoapus-wp1.com/workio/wp-content/uploads/2020/01/employer-logo-7.jpg" className="attachment-workio-logo-size size-workio-logo-size unveil-image" alt="" />
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="job-information">
                                        <div className="title-wrapper">
                                            <h2 className="job-title"><a href="https://www.demoapus-wp1.com/workio/job/digital-masterclass/" rel="bookmark">Digital Masterclass</a></h2>                
                                        </div>
                                        <div className="job-employer-info-wrapper">
                                            <h3 className="employer-title">
                                                <a href="https://www.demoapus-wp1.com/workio/employer/cadillac-2/">
                                                                        Cadillac	            </a>
                                            </h3>
                                            <div className="job-salary">$<span className="price-text">2500</span> - $<span className="price-text">7000</span> / month</div> 
                                            <div className="job-types">
                                                <div className="job-type with-title">
                                                    <a className="type-job" href="https://www.demoapus-wp1.com/workio/job-type/freelance/" style={{color: '#468499'}}>Freelance</a>
                                                </div>
                                            </div> 
                                        </div>            
                                    </div>
                                    <div className="job-location with-icon">
                                        <i className="ti-location-pin"></i>
                                        <a href="//maps.google.com/maps?q=3074+14th+St%2C+Astoria%2C+NY&amp;zoom=14&amp;size=512x512&amp;maptype=roadmap&amp;sensor=false" target="_blank">14th St, Astoria, NY</a>
                                    </div>            
        				            <div className="deadline-time">Application ends: <strong>October 1, 2025</strong></div>
									<a href="#" className="btn btn-apply btn-apply-job-internal-required">Apply Now<i className="next flaticon-right-arrow"></i></a>
                                    <div className="job-apply-internal-required-wrapper" style={{display:'none'}}>
                                        <div className="msg-inner">Please login with "Candidate" to apply</div>
                                    </div>
                                </div>
                            </article>
                        </div>
                        <div className="style-list-jobs">
						    <article id="post-2176" className="job-list map-item job-style-inner post-2176 job_listing type-job_listing status-publish has-post-thumbnail hentry job_listing_type-part-time job_listing_category-digital-creative job_listing_location-new-york job_listing_tag-app-work job_listing_tag-css3 job_listing_tag-php job_listing_tag-sass" data-latitude="40.762165" data-longitude="-73.911104">
                                {/* <div className="featured-urgent-label">
                                    <span className="featured label-no-icon">Featured</span>
                                </div> */}
                                <div className="flex-middle-sm job-list-container">
                                    <div className="job-employer-logo">
                                        <div className="employer-logo">
                                            <a href="https://www.demoapus-wp1.com/workio/job/developers-full-stack/">
                                                <div className="image-wrapper image-loaded">
                                                    <img width="180" height="180" src="https://www.demoapus-wp1.com/workio/wp-content/uploads/2020/01/employer-logo-9.jpg" className="attachment-workio-logo-size size-workio-logo-size unveil-image" alt="" />
                                                </div>  
                                            </a>
                                        </div>
                                    </div>
                                    <div className="job-information">
                                        <div className="title-wrapper">
                                            <h2 className="job-title"><a href="https://www.demoapus-wp1.com/workio/job/developers-full-stack/" rel="bookmark">Developers Full Stack</a></h2>                
                                        </div>
                                        <div className="job-employer-info-wrapper">
                                            <h3 className="employer-title">
                                                <a href="https://www.demoapus-wp1.com/workio/employer/oscar-wilde/">
                                                                    Oscar Wilde	            </a>
                                            </h3>
                                            <div className="job-salary">$<span className="price-text">5500</span> - $<span className="price-text">7500</span> / month</div>          
                                            <div className="job-types">
                                                <div className="job-type with-title">
                                                    <a className="type-job" href="https://www.demoapus-wp1.com/workio/job-type/part-time/" style={{color: '#dd3333'}}>Part Time</a>
                                                </div>
                                            </div>   
                                        </div>            
                                    </div>
                                    <div className="job-location with-icon">
                                        <i className="ti-location-pin"></i>
                                        <a href="//maps.google.com/maps?q=4417+30th+Ave%2C+Long+Island+City%2C+NY&amp;zoom=14&amp;size=512x512&amp;maptype=roadmap&amp;sensor=false" target="_blank">30th Ave, Long Island, NY</a>
                                    </div>            
                                    <div className="deadline-time">Application ends: <strong>December 1, 2025</strong></div>
									<a href="#" className="btn btn-apply btn-apply-job-internal-required">Apply Now
                                        <i className="next flaticon-right-arrow"></i></a>
						            <div className="job-apply-internal-required-wrapper" style={{display:'none'}}>
                                        <div className="msg-inner">Please login with "Candidate" to apply</div>
                                    </div>
                                </div>
                            </article>
					    </div>
                    </div>
                   {/* <div className="jobs-pagination-wrapper main-pagination-wrapper" style={{margin:'auto'}}>
	                    <ul className="pagination">
                            <li><span className="page-numbers current">1</span></li>
                            <li><a className="page-numbers" href="https://www.demoapus-wp1.com/workio/jobs-list/page/2/">2</a></li>
                            <li><a className="next page-numbers" href="https://www.demoapus-wp1.com/workio/jobs-list/page/2/"><i className="fas fa-chevron-right"></i></a></li>
                        </ul>
                    </div> */}
                </div>
            </div>
     </section>
     <Footer/>
    </>
  );
}
