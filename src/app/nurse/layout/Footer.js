import React from "react";
import './Footer.scss';
import logo from '../../assets/logo1.png';
import {
  Link,
} from "react-router-dom";
class Footer extends React.Component {
  componentDidMount() {
  }
  render() {
    return (
      <div  className="footerPart"style={{backgroundColor:"white", marginTop:'10px'}}>
        <section className="container">
          <div className="row">
          <nav className="navbar navbar-inverse" style={{width:'100%',height:'auto'}}>
              <div className="container-fluid">
                <div className="navbar-header">
                  <div className="logo ">
                      <a href="#">
                          <span className="logo-main">
                              <img width="431" height="133" src={logo}alt=""/>                
                          </span>
                      </a>
                  </div>
                </div>
                <ul className="nav navbar-right">
		 <li><Link to='/home'>Home</Link></li>
                  <li><Link to='/how-it-works'>How it Works</Link></li>
                  <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                  <li><Link to="/aboutus">About</Link></li>
                  <li><Link to="/contactus">Contact</Link></li>
		 <li><Link to="/TOS">Terms of Service</Link></li>
                </ul>
              </div>
            </nav>
          </div>
        </section>
        <section className="footer_second">
          <div className="container ">
              <div className="row">
                  <div className="col-md-4">
                    <h3 className="elementor-heading-title elementor-size-default">About Nurse</h3>
                    {/* <div className="elementor-text-editor elementor-clearfix">Lorem ipsum dolor sit amet, consectetur adipiscing elit</div> */}
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                          <div className="item">
                            <div className="item-inner">
                              <div className="features-box-content">
                                  <h3 className="title">Add:</h3>
                                  <div className="description">42 Broadway, 12-263, New York, NY</div></div>
                              </div>
                            </div>
                          </div>
                          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                              <div className="item">
                                <div className="item-inner">
                                  <div className="features-box-content">
                                    <h3 className="title">Email:</h3>
                                    <div className="description">praecuroapp@gmail.com</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                              <div className="item">
                                <div className="item-inner">
                                  <div className="features-box-content">
                                    {/* <h3 className="title">Call:</h3> */}
                                    {/* <div className="description">555-555-1234</div> */}
                                  </div>
                                  </div>
                                </div>
                              </div>
                        </div>
                        <div className="elementor-widget-container">
			                     <div className="widget-socials">
                              <div className="socials  square">
                                {/* <ul className="social list-inline">
                                    <li>
                                        <a href="https://facebook.com">
                                            <i className="fab fa-facebook"></i>
                                        </a>
                                    </li>
                                    <li>
                                      <a href="https://twitter.com/">
                                      <i className="fab fa-twitter"></i>
                                      </a>
                                     </li>
                                    <li>
                                        <a href="https://www.instagram.com">
                                      <i className="fab fa-instagram"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.pinterest.com/">
                                      <i className="fab fa-pinterest"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                      <i className="fab fa-google-plus"></i>
                                        </a>
                                    </li>
                                 </ul> */}
                             </div>
                        </div> 
                     </div>
                  </div>
                  <div className="col-md-4">
                    <h3 className="elementor-heading-title elementor-size-default">Contact </h3>
                    <div className="elementor-text-editor elementor-clearfix"><Link to='/how-it-works'>How it works</Link></div>
                    <div className="elementor-text-editor elementor-clearfix"><Link to='/aboutus'>About Us</Link></div>
                    <div className="elementor-text-editor elementor-clearfix"><Link to='/contactus'>Contact Us</Link></div>
                    {/* <div className="elementor-text-editor elementor-clearfix">Jobs Featured</div> */}
                    {/* <div className="elementor-text-editor elementor-clearfix">Jobs Urgent</div> */}
                    {/* <div className="elementor-text-editor elementor-clearfix">Candidate List</div> */}
                    {/* <div className="elementor-text-editor elementor-clearfix">Candidates Grid</div> */}
                    
                  </div>
                  {/* <div className="col-md-2">
                    <h3 className="elementor-heading-title elementor-size-default">For Employers</h3>
                    <div className="elementor-text-editor elementor-clearfix">Post New</div>
                    <div className="elementor-text-editor elementor-clearfix">Employer List</div>
                    <div className="elementor-text-editor elementor-clearfix">Employers Grid</div>
                    <div className="elementor-text-editor elementor-clearfix">Job Packages</div>
                    <div className="elementor-text-editor elementor-clearfix">Jobs Listing</div>
                    <div className="elementor-text-editor elementor-clearfix">Jobs Listing</div>
                  </div> */}
                  <div className="col-md-4">
                    <h3 className="elementor-heading-title elementor-size-default">Join Our Newsletter</h3>
                    <div className="elementor-text-editor elementor-clearfix">Subscribe to get the latest jobs posted, candidates...</div>
                    <form id="mc4wp-form-1" className="mc4wp-form mc4wp-form-160" method="post" data-id="160" data-name="Newsletter 1">
                        <div className="mc4wp-form-fields">
                          <p>	
                            <label>
                              <input type="email" name="EMAIL" placeholder="Your email address" required=""/>
                            </label>
                          </p>
                          <p>  	
                              <button type="submit" value="Sign up"><i className="fa fa-paper-plane-o"></i>Sign up</button>   	
                          </p>
                        </div>
                    </form>
                  </div>
              </div>
          </div>
        </section>
        <section className="footer_third">
          <div className="elementor-text-editor elementor-clearfix">Copyright Praecuro © 2021. All Rights Reserved</div>
        </section>
      </div>
    );
  }
}


export default Footer;
// 