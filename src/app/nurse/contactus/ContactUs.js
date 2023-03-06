import React, { useState, useEffect } from "react";
import Header from "../layout/Header";
import BradCrumb from '../layout/BreadCrumb';
import Footer from "../layout/Footer";
import { Alert } from "react-bootstrap";
import './ContactUs.scss';
import {
  TextField
} from "@material-ui/core";
import FormGroup from '@material-ui/core/FormGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import * as actions from './../../../app/actions';
import bacImage from "../../assets/cont.jpg"
import {
      makeStyles,
} from "@material-ui/core/styles";
export default function ContactUs(){
  const [status, setStatus] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [subject, setSubject] = useState('');
  const [contactFlag, setContactFlag] = useState(false);
  const useStyles = makeStyles(theme => ({
    textField: {
      marginLeft: theme.spacing(0),
      marginRight: theme.spacing(0),
      marginTop: '8px',
      marginBottom: '8px',
    },
    textMargin:{
      marginBottom:'10px!important'
    }
  }));
  function handleContact(){
    if(name === '' || content === '' || subject === ''|| email === ''){
      setStatus('You have to input all the correctly info')
      return;
    }
    setContactFlag(true);
    var tempData = {
      name: name,
      subject:subject,
      content:content,
      email:email
    };
    setTimeout(() => {
      actions.sendContent(tempData).then(res=>{
        setContactFlag(false);
        let {data} = res;
        if(!data.success){
          setStatus('Unknown errors occurred while new contact sending.');
          return;
        }else{
          setStatus('');
          console.log('succesfull')
          return;
        }
      }).catch(() => {
        setContactFlag(false);
        setStatus(
          'Error!!! you have to check your Database or Connection'
        );
      });
    }, 1000);
  }
  const classes = useStyles();
    return (
      <>
        <Header/>
        {/* <BradCrumb title="Contact Us" base="Home"/> */}

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
                        <h2 className="bread-title">Contact Us</h2>
                    </div>
                </div>
            </div>
        </section>


        <section style={{backgroundColor:'white'}} className="contactPage">
          <div className="container">
            <div className="row" style={{padding:'30px 15px 50px 15px'}}>
                {/* <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                    <div className="item">
                      <div className="item-inner">
                        <div className="features-box-image icon">
                        <i className="fas fa-map-marked-alt"></i>
                        </div>
                      <div className="features-box-content">
                        <h3 className="title">San Francisco</h3>
                        <div className="description">95 Howard Street, San Francisco<br/>contact@yoursite.com<br/>(+68)1221 09876</div>
                      </div>
                    </div>
                  </div>
                </div> */}
                <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                  <div className="item">
                    <div className="item-inner">
                      <div className="features-box-image icon">
                      <i className="fas fa-map-marked-alt"></i>
                      </div>
                      <div className="features-box-content">
                        <h3 className="title">New York</h3>
                        <div className="description">
                        42 Broadway 12-263<br/>praecuroapp@gmail.com<br/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                  <div className="item">
                    <div className="item-inner">
                      <div className="features-box-image icon">
                      <i className="fas fa-map-marked-alt"></i>
                      </div>
                      <div className="features-box-content">
                        <h3 className="title">Chicago</h3>
                        <div className="description">
                          2045 W Grand Ave Ste, Chicago<br/>contact@yoursite.com<br/>(+68)1221 09876
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6" style={{padding:' 0px 170px 60px 15px'}}>
                  <h2 className="elementor-heading-title elementor-size-default reachout-contact">Reach Out, Get in Touch</h2>
                  <h2 className="elementor-heading-title elementor-size-default havequestion-contact">
                    Have questions about <span className="text-theme">Praecuro?</span> We’re here to help. Please reach out. We’d love to hear from you.
                  </h2>
                  <div className="elementor-image">
										<img width="780" height="522" src="https://www.demoapus-wp1.com/workio/wp-content/uploads/2020/02/hero-media-contact.png" className="attachment-full size-full" alt="" style={{height:'200px'}}/>
                  </div>
                  {/* <h2 className="elementor-heading-title elementor-size-default">social media</h2> */}
                  {/* <div className="socials  round">
                    <ul className="social list-inline">
                      <li>
                        <a href="#">
                          <i className="fab fa-facebook-f"></i>
                        </a>
                      </li>
                      <li>
                          <a href="#">
                              <i className="fab fa-twitter"></i>
                          </a>
                      </li>
                      <li>
                          <a href="#">
                              <i className="fab fa-linkedin"></i>
                          </a>
                      </li>
                      <li>
                          <a href="#">
                              <i className="fab fa-instagram"></i>
                          </a>
                      </li>
                    </ul>
                  </div> */}
                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                  <h2 className="elementor-heading-title elementor-size-default havequestionTitle">Have a question?</h2>
                  <div className="loremTitle text-left">Please feel free to ask us anything!</div>
                  <FormGroup row>
                      {status !=='' ?<div className="col-md-12">
                            <Alert variant='danger'>
                                {status}
                            </Alert>
                        </div>:<div></div>}
                        <TextField
                            id="contactIdName"
                            className={classes.textField}
                            label="Name *"
                            margin="normal"
                            value={name}
                            onChange={ (e) => setName(e.target.value) }
                            variant="outlined"
                            inputProps={{ "aria-label": "bare" }}
                        />
                        <TextField
                            id="contactIdEmail"
                            className={classes.textField}
                            label="Email *"
                            value={email}
                            onChange={ (e) => setEmail(e.target.value) }
                            margin="normal"
                            variant="outlined"
                            placeholder="Email *"
                            inputProps={{ "aria-label": "bare" }}
                        />
                        <TextField
                            id="contactIdSubject"
                            className={classes.textField}
                            value={subject}
                            onChange={ (e) => setSubject(e.target.value) }
                            label="Subject"
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="contactIdMsg"
                            label="Your Message"
                            multiline
                            value={content}
                            onChange={ (e) => setContent(e.target.value) }
                            rows="4"
                            className={classes.textField, classes.textMargin}
                            margin="normal"
                            variant="outlined"
                        />
                        <p style={{marginTop:'7px'}}>
                          {/* <input type="submit" value="Send Message" className="wpcf7-form-control wpcf7-submit"/> */}
                          <button  className="wpcf7-form-control wpcf7-submit" onClick={handleContact}>Send Message
                            {contactFlag?<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>:<></>}
                          </button>
                        </p>
                  </FormGroup>
                </div>
              </div>
            </div>
          </section>
        <Footer/>
      </>
    );
}

