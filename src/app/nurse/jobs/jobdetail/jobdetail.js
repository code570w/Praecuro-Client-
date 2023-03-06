import React , {useState, useEffect} from "react";
import Header from "./../../../nurse/layout/Header";
import Footer from "./../../../nurse/layout/Footer";
import { connect } from "react-redux";
import default_img from './../../../assets/users/work.png';
import * as actions from '../../../../app/actions';
import * as authDuck from '../../../../app/store/ducks/auth.duck';
import * as activityDuck from '../../../../app/store/ducks/activity.duck';
import * as jobDuck from '../../../../app/store/ducks/job.duck';
import * as bidDuck from '../../../../app/store/ducks/bid.duck';
import * as categoryDuck from '../../../../app/store/ducks/category.duck';
import './jobdetail.scss'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';
import Snackbar from '@material-ui/core/Snackbar';
import MenuItem from '@material-ui/core/MenuItem';
function JobDetail(props) {
    const [state, setState] = React.useState({
        openState: false,
        vertical: 'bottom',
        horizontal: 'center',
        content:'successfully bid'
      });
      const [budgetType, setBudgetType] = useState('Flat Rate');

      console.log('bid_props',props)
      const [flag,setFlag]= React.useState(false);
      const { vertical, horizontal, openState,content } = state;
    const [values, setValues] = React.useState({
        budget: 0,
        coverLetter: '',
        budgetType:''
      });
      function handleStateClose() {
        setState({ ...state, openState: false });
      }
      const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
      };
    const [open, setOpen] = React.useState(false);
    function handleClickOpen() {
        if(props.user.active !== 'Pending')
            setOpen(true);
        else
            alert('You have to solve permission firstly from Admin !')
      }
    function handleClose() {
        setOpen(false);
    }
    function handleBid(){
        if(values.budget === 0 || values.coverLetter === ''){
            setState({ ...state, openState: true, content:'You have to input all the correctly info' });
            return;
        }

        console.log('bid_value',values)

        var tempData = {
            nurse:props.user._id,
            job:props.curjob._id,
            content:values.coverLetter,
            bidBudget:values.budget,
            budgetType:values.budgetType,
        };
        setTimeout(() => {
        actions.addBid(tempData).then(res=>{


            let {data} = res;
            if(!data.success){
                setState({ ...state, openState: true, content:data.errMessage });
                handleClose();
                return;
            }else{
                setFlag(true)
            setState({ ...state, openState: true, content:'Successfully Bid !!!' });
            console.log('succesfull')
            props.allBids(data.bids);
            handleClose();
            return;
            }
        }).catch(() => {
            setState({ ...state, openState: true, content: 'Error!!! you have to check your Database or Connection'});
            handleClose();
        });
        }, 1000);
    }
    useEffect(() => {
        setBudgetType(props.curjob.budgetType || 'Flat Rate');
        console.log('curjob',props.curjob)
        var tempBidArr = props.bids;
        tempBidArr = tempBidArr.filter(sub=>{
            if(sub.job?._id === props.curjob?._id && sub.nurse?._id === props.user?._id)
                return true;
            return false;
        })
        if(tempBidArr[0])
            setFlag(true)
        else
            setFlag(false);
      }, [props])  
      
      
    return (
    <>
        <Header/>
        <div className="jobdetailSecond job-detail-header v1">
            <div className="inner-v1">
                <div className="container">
                    <div className="row flex-bottom-sm">
                        <div className="col-md-8 col-sm-7 col-xs-12">
                            <div className="flex-middle employer-logo-wrapper">
                                <div className="job-detail-thumbnail">
                                    <div className="employer-logo">
                                        <a href="https://www.demoapus-wp1.com/workio/job/the-ultimate-drawing-course/">
                                            <div className="image-wrapper image-loaded">
                                                <img width="180" height="180" src={default_img}alt="" sizes="(max-width: 180px) 100vw, 180px"/>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div className="inner-info">
                                    <div className="title-wrapper">
                                        <h1 className="job-title">{props.curjob.title}</h1>                          
                                        <span className="featured" data-toggle="tooltip" title="" data-original-title="Featured"><i className="fa fa-star"></i></span>
                                    </div>
                                    {/* <div className="category-job">
                                        <div className="job-category">
                                            <a className="category-job" href="https://www.demoapus-wp1.com/workio/job-category/sales-marketing/">Sales &amp; Marketing</a>
                                        </div>
                                    </div> */}
                                    {/* <div className="job-detail-header-meta">
                                        <div className="job-phone">
                                            <i className="fa fa-phone"></i> <a href="tel:+084 123 456 789">+084 123 456 789</a>
                                        </div>    
                                        <div className="job-location with-icon">
                                            <i className="ti-location-pin"></i>
                                            <a href="#">10th St Long Island, NY</a>
                                        </div>  
                                    </div>                                     */}
                                </div>
                            </div>
                        </div>
                        <div className="job-detail-buttons col-md-4 col-sm-5 col-xs-12">
                            <div className="job-detail-header-container">
                                <div className="action">
                                <div className="deadline-time">Job starts: <strong>{props.curjob.startDate}</strong></div>
                                    {flag==false?<a href="#" onClick={handleClickOpen} className="btn btn-apply btn-apply-job-internal-required">Bid Now
                                        <i className="next flaticon-right-arrow"></i>
                                    </a>:<a/>}
                                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                                        <DialogTitle id="form-dialog-title">Bid Propsal Form</DialogTitle>
                                        <DialogContent>
                                        <DialogContentText>
                                            To bid to this job, please enter your budget and cover letter about this job. Thank you!
                                        </DialogContentText>

                                        {/* <div className="form-group row"> */}
                                        {/* <label className="col-form-label">Budget Type</label> */}
                                        {/* <div className=""> */}
                                        {/* value={budgetType} onChange={ (e) => setBudgetType(e.target.value) } */}
                                            {/* <select className="form-control" id="exampleSelectl" value={category} onChange={ (e) => setCategory(e.target.value) } multiple={true}> */}
                                            {/* <select className="form-control" id="exampleSelectl" >
                                                <option valuel="Flat Rate">Flat Rate</option>
                                                <option valuel="Hourly">Hourly</option>
                                            </select> */}
                                        {/* </div> */}
                                        {/* </div> */}
                                       
                                        <TextField
                                    id="outlined-adornment-amount"
                                    select
                                    placeholder="Budget Type"
                                    label="Budget Type"
                                    value={values.budgetType}
                                    // onChange={ (e) => setBudgetType(e.target.value) }
                                    onChange={handleChange('budgetType')}
                                    margin="normal"
                                    variant="outlined">
                                    <MenuItem key='Flat Rate' value='Flat Rate'>
                                    Flat Rate
                                    </MenuItem>
                                    <MenuItem key='Hourly' value='Hourly'>
                                    Hourly
                                    </MenuItem>
                                    
                                </TextField>




                                        <TextField
                                            id="outlined-adornment-amount"
                                            // className={clsx(classes.margin, classes.textField)}
                                            variant="outlined"
                                            label="Budget"
                                            value={values.budget}
                                            onChange={handleChange('budget')}
                                            type="number"
                                            InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                            }}
                                        />
                                        <TextField
                                            id="outlined-multiline-static"
                                            label="Comments"
                                            multiline
                                            rows="4"
                                            value={values.coverLetter}
                                            onChange={handleChange('coverLetter')}
                                            // className={classes.textField}
                                            margin="normal"
                                            variant="outlined"
                                        />
                                        </DialogContent>
                                        <DialogActions>
                                        <Button onClick={handleClose} color="primary">
                                            Cancel
                                        </Button>
                                        <Button onClick={handleBid} color="primary">
                                            Bid now
                                        </Button>
                                        </DialogActions>
                                    </Dialog>
                                    <Snackbar
                                        anchorOrigin={{ vertical, horizontal }}
                                        key={`${vertical},${horizontal}`}
                                        open={openState}
                                        onClose={handleStateClose}
                                        ContentProps={{
                                        'aria-describedby': 'message-id',
                                        }}
                                        message={<span id="message-id">{content}</span>}
                                    />
                                    {/* <a href="#" className="btn btn-add-job-shortlist  btn-shortlist">Chat Now
                                    </a> */}
                                    {/* <div className="job-apply-internal-required-wrapper" style={{display:'none'}}>
                                        <div className="msg-inner">Please login with "Candidate" to apply</div>
                                    </div> */}
                                    {/* <a href="#" className="btn btn-add-job-shortlist btn btn-block btn-shortlist" data-job_id="320" data-nonce="6c2d932975"><i className="pre flaticon-favorites"></i>
                                        <span>Shortlist</span>
                                    </a> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <section className="jobdetailSecond" style={{backgroundColor:'white'}}>
            <div className="container" > 
            {/* style={{padding:'40px 10px'}} */}
                {/* <a href="#" className="mobile-sidebar-btn hidden-lg hidden-md space-20"> 
                        <i className="fa fa-bars"></i> 
                </a>
                <div className="mobile-sidebar-panel-overlay"></div> */}
                <div className="row">
                    <div className="col-xs-12 list-content-candidate col-md-12">
        				<div id="job-candidate-description" className="job-detail-description">
					        {/* <h3 className=""><i class="fa fa-check-square" aria-hidden="true"></i> Job Title & Summary</h3> */}
                                {/* <p><b>Title: </b>{props.curjob.title}</p> */}
                                {/* <p><b>Summary: </b>{props.curjob.summary}</p> */}
                            {/* <h3 className=""><i class="fa fa-check-square" aria-hidden="true"></i> Job Owner</h3> */}
                            {/* <p></p> */}
                            {/* {props.curjob.client?<ol> */}
                                {/* <li><b>Name: </b>{ props.curjob.client.firstName + ' ' + props.curjob.client.lastName }</li> */}
                                {/* <li>{'Title: ' + props.curjob.client.title}</li> */}
                                {/* <li><b>Address:  </b> */}
                                      {/* {props.curjob.client.address} */}
                                     {/* <span>, {props.curjob.city} - {props.curjob.zipCode}, {props.curjob.state}</span> */}
                                {/* </li> */}
                                {/* <li><b>Time :  </b>{props.curjob.startTime} - {props.curjob.endTime}</li> */}
                                {/* <li><b>Salary</b>{ props.curjob.client.salary + ' $ '}</li> */}
                            {/* </ol>:'None'} */}
                            {/* <p>Sed felis eget velit aliquet sagittis. Sodales ut etiam sit amet nisl  purus in mollis nunc. Aliquam eleifend mi in nulla posuere sollicitudin  aliquam. Nibh cras pulvinar mattis nunc sed blandit libero.</p> */}
                            <div className="col-md-12 sidebar sidebar-job">
                            <aside className="widget widget_apus_candidate_contact_info">  
                                <div className="job_maps_sidebar">
                                    
                                    <div className="candidate-detail-location info-member-widget">
                                        <h2 className="widget-title"><span> <h3 className=""><i className="fa fa-check-square" aria-hidden="true"></i> Job Details & Summary</h3></span></h2>
                                       
                                           <p><b>Title : </b>{props.curjob.title}</p>
                                           <p><b>Nurse Type : </b>{props.curjob.category.name}</p>
                                           <p><b>City : </b>{props.curjob.city}</p>
                                           <p><b>State : </b>{props.curjob.state}</p>
                                           <p><b>Zip Code : </b>{props.curjob.zipCode}</p>
                                           <p><b>Start Time : </b>{props.curjob.startTime}</p>
                                           <p><b>End Time : </b>{props.curjob.endTime}</p>
                                           <p><b>Start Date : </b>{props.curjob.startDate}</p>
                                           <p><b>Summary : </b>{props.curjob.summary}</p>
                                        {/* <ul className="list-info-member">
                                            <li>
                                                <div className="text">Phone: </div>
                                                <div className="value">+015 123 456 789</div>
                                            </li>
                                            <li>
                                                <div className="text">Email: </div>
                                                <div className="value">fatah@apus.com</div>
                                            </li>
                                            <li>
                                                <div className="text">Location: </div>
                                                <div className="value">4 Rue Taine, Paris</div>
                                            </li>
                                        </ul> */}
                                    </div>
                                </div>
                            </aside>
                            
                            <aside className="widget widget_apus_candidate_contact_info">  
                                <div className="job_maps_sidebar">
                                    
                                    <div className="candidate-detail-location info-member-widget">
                                    <h3 className="widget-title"><i className="fa fa-check-square" aria-hidden="true"></i> Job Owner</h3>
                                        {/* <h2 className="widget-title"><span>Contact Information</span></h2> */}

                                          {props.curjob.client?<ul className="list-info-member">
                                          <li><b>Nurse Type : </b>{props.curjob.category.name}</li>
                                                <li><b>Name: </b>{ props.curjob.client.firstName + ' ' + props.curjob.client.lastName }</li>
                                                {/* <li>{'Title: ' + props.curjob.client.title}</li> */}
                                                <li><b>Address:  </b>
                                                    {props.curjob.client.address}
                                                    <span>, {props.curjob.city} - {props.curjob.zipCode}, {props.curjob.state}</span>
                                                </li>
                                                <li><b>Time :  </b>{props.curjob.startTime} - {props.curjob.endTime}</li>

                                                <li><b>Pay Rate :  </b>$ {props.curjob.salary_offer}</li>
                                                <li><b>Budget Type :  </b>{props.curjob.budgetType}</li>
                                                
                                                {/* <li><b>Salary</b>{ props.curjob.client.salary + ' $ '}</li> */}
                                            </ul>:'None'}


                                        {/* <ul className="list-info-member">
                                            <li>
                                                <div className="text">Phone: </div>
                                                <div className="value">+015 123 456 789</div>
                                            </li>
                                            <li>
                                                <div className="text">Email: </div>
                                                <div className="value">fatah@apus.com</div>
                                            </li>
                                            <li>
                                                <div className="text">Location: </div>
                                                <div className="value">4 Rue Taine, Paris</div>
                                            </li>
                                        </ul> */}
                                    </div>
                                </div>
                            </aside> 
                            </div>
                           
                           
                            {/* <div id="job-candidate-education" className="candidate-detail-education my_resume_eduarea">
                                <h4 className="title">Education</h4>
                                <div className="candidate-detail-resume">
                                <dl className="content">
                                    <dt className="heading-detail-info">
                                        <span>Masters in Fine Arts</span>
                                        <span className="year">2002 - 2004</span>
                                    </dt>
                                     <dd>
                                        <h3 className="title-detail-info">Walters University</h3>
                                        <p className="mb0 candidate-detail-description">Ex scripta eripuit eos, audire partiendo est ex. Usu ut justo epicurei, facer zril sapientem usu id. Ubique quaeque eligendi pro ad, vis populo adolescens.</p>
                                    </dd>                
                                </dl>            
                                <dl className="content">
                                    <dt className="heading-detail-info">
                                        <span>Tommers College</span>
                                        <span className="year">2012 - 2015</span>
                                    </dt>
                                    <dd>
                                        <h3 className="title-detail-info">Bachlors in Fine Arts</h3>
                                        <p className="mb0 candidate-detail-description">Ex scripta eripuit eos, audire partiendo est ex. Usu ut justo epicurei, facer zril sapientem usu id. Ubique quaeque eligendi pro ad, vis populo adolescens.</p>
                                    </dd>                
                                </dl>            
                                <dl className="content">
                                    <dt className="heading-detail-info">
                                        <span>Diploma in Fine Arts</span>
                                        <span className="year">2014 - 2015</span>
                                    </dt>
                                    <dd>
                                        <h3 className="title-detail-info">Imperieal Institute of Art Direction</h3>
                                        <p className="mb0 candidate-detail-description">Ex scripta eripuit eos, audire partiendo est ex. Usu ut justo epicurei, facer zril sapientem usu id. Ubique quaeque eligendi pro ad, vis populo adolescens.</p>
                                    </dd>                
                                </dl>            
                            </div> 
                        </div>*/}
                            {/* <div id="job-candidate-experience" className="candidate-detail-experience my_resume_eduarea">
                                <h4 className="title">Work &amp; Experience</h4>
                                <div className="candidate-detail-resume">
                                    <dl className="content">
                                        <dt className="heading-detail-info">
                                            <span>Development Manager</span>
                                            <span className="start_date">07/02/2010 - 07/03/2012</span>
                                        </dt>
                                        <dd>          
                                            <h3 className="title-detail-info">Clothing Store</h3>
                                            <p className="mb0 candidate-detail-description">Ex scripta eripuit eos, audire partiendo est ex. Usu ut justo epicurei, facer zril sapientem usu id. Ubique quaeque eligendi pro ad, vis populo adolescens.</p>                    
                                        </dd>
                                    </dl>
                                    <dl className="content">
                                        <dt className="heading-detail-info">
                                            <span>Senior PHP/Drupal developer</span>
                                            <span className="start_date">07/08/2006 - 07/17/2008</span>
                                        </dt>
                                        <dd>          
                                            <h3 className="title-detail-info">Fashion Store</h3>
                                            <p className="mb0 candidate-detail-description">Ex scripta eripuit eos, audire partiendo est ex. Usu ut justo epicurei, facer zril sapientem usu id. Ubique quaeque eligendi pro ad, vis populo adolescens.</p>                    
                                        </dd>
                                    </dl>
                                    <dl className="content">
                                        <dt className="heading-detail-info">
                                            <span>Self Employed Professional</span>
                                            <span className="start_date">
                                                                        07/23/2002                                                                                                    - 07/17/2004                                                            </span>
                                        </dt>
                                        <dd>          
                                            <h3 className="title-detail-info">Jewelry Store</h3>
                                            <p className="mb0 candidate-detail-description">Ex scripta eripuit eos, audire partiendo est ex. Usu ut justo epicurei, facer zril sapientem usu id. Ubique quaeque eligendi pro ad, vis populo adolescens.</p>                    
                                        </dd>
                                    </dl>
                                </div>     
                            </div>
                            <div id="job-candidate-portfolio" className="candidate-detail-portfolio">
                                <h4 className="title">Portfolio</h4>
                                <div className="row drop-top">
                                    <div className="col-xs-4">
                                        <a className="item" href="https://www.demoapus-wp1.com/workio/wp-content/uploads/2020/01/portfolio-1.jpg" data-elementor-lightbox-slideshow="gallery-portfolio-photos">
                                            <img width="300" height="225" src="https://www.demoapus-wp1.com/workio/wp-content/uploads/2020/01/portfolio-1-300x225.jpg" className="attachment-medium size-medium" alt="" />            
                                        </a>
                                    </div>
                                    <div className="col-xs-4">
                                        <a className="item" href="https://www.demoapus-wp1.com/workio/wp-content/uploads/2020/01/portfolio-2.jpg" data-elementor-lightbox-slideshow="gallery-portfolio-photos">
                                            <img width="300" height="225" src="https://www.demoapus-wp1.com/workio/wp-content/uploads/2020/01/portfolio-2-300x225.jpg" className="attachment-medium size-medium" alt="" />
                                        </a>
                                    </div>
                                    <div className="col-xs-4">
                                        <a className="item" href="https://www.demoapus-wp1.com/workio/wp-content/uploads/2020/01/portfolio-3.jpg" data-elementor-lightbox-slideshow="gallery-portfolio-photos">
                                            <img width="300" height="225" src="https://www.demoapus-wp1.com/workio/wp-content/uploads/2020/01/portfolio-3-300x225.jpg" className="attachment-medium size-medium" alt=""/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div id="job-candidate-skill" className="candidate-detail-skill candidate_resume_skill">
                                <h4 className="title">Skills</h4>
                                <div className="progress-levels">
                                    <div className="progress-box wow animated" data-wow-delay="100ms" data-wow-duration="1500ms">
                                        <h5 className="box-title">Writing</h5>
                                        <div className="inner">
                                            <div className="bar">
                                                <div className="bar-innner">
                                                    <div className="bar-fill ulockd-bgthm" data-percent="55" style={{width:'55%'}}>
                                                        <div className="percent">55%</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="progress-box wow animated" data-wow-delay="200ms" data-wow-duration="1500ms">
                                        <h5 className="box-title">Graphic design theory</h5>
                                        <div className="inner">
                                            <div className="bar">
                                                <div className="bar-innner">
                                                    <div className="bar-fill ulockd-bgthm" data-percent="60" style={{width:'60%'}}>
                                                        <div className="percent">60%</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="progress-box wow animated" data-wow-delay="300ms" data-wow-duration="1500ms">
                                        <h5 className="box-title">Listening</h5>
                                        <div className="inner">
                                            <div className="bar">
                                                <div className="bar-innner">
                                                    <div className="bar-fill ulockd-bgthm" data-percent="75" style={{width:'75%'}}>
                                                        <div className="percent">75%</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="progress-box wow animated" data-wow-delay="400ms" data-wow-duration="1500ms">
                                        <h5 className="box-title">Self-learning</h5>
                                        <div className="inner">
                                            <div className="bar">
                                                <div className="bar-innner">
                                                    <div className="bar-fill ulockd-bgthm" data-percent="98" style={{width:'98%'}}>
                                                        <div className="percent">98%</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="progress-box wow animated" data-wow-delay="500ms" data-wow-duration="1500ms">
                                        <h5 className="box-title">Graphic design</h5>
                                        <div className="inner">
                                            <div className="bar">
                                                <div className="bar-innner">
                                                    <div className="bar-fill ulockd-bgthm" data-percent="85" style={{width:'85%'}}>
                                                        <div className="percent">85%</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="progress-box wow animated" data-wow-delay="600ms" data-wow-duration="1500ms">
                                        <h5 className="box-title">Production in HTML/CSS</h5>
                                        <div className="inner">
                                            <div className="bar">
                                                <div className="bar-innner">
                                                    <div className="bar-fill ulockd-bgthm" data-percent="89" style={{width:'89%'}}>
                                                        <div className="percent">89%</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="progress-box wow animated" data-wow-delay="700ms" data-wow-duration="1500ms">
                                        <h5 className="box-title">Business sense</h5>
                                        <div className="inner">
                                            <div className="bar">
                                                <div className="bar-innner">
                                                    <div className="bar-fill ulockd-bgthm" data-percent="98" style={{width:'98%'}}>
                                                        <div className="percent">98%</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="job-candidate-award" className="my_resume_eduarea">
                                <h4 className="title">Awards</h4>
                                <div className="candidate-detail-resume candidate-detail-awards">
                                    <dl className="content">
                                        <dt className="heading-detail-info">
                                            <span>Distinguished Service Award</span>
                                            <span className="year">1970</span>
                                        </dt>
                                        <dd>
                                            <p className="mb0 candidate-detail-description">Ex scripta eripuit eos, audire partiendo est ex. Usu ut justo epicurei, facer zril sapientem usu id. Ubique quaeque eligendi pro ad, vis populo adolescens.</p>
                                        </dd>
                                    </dl>
                                    <dl className="content">
                                        <dt className="heading-detail-info">
                                            <span>Robin Milner Young Researcher Award</span>
                                            <span className="year">1970</span>
                                        </dt>
                                        <dd>
                                            <p className="mb0 candidate-detail-description">Ex scripta eripuit eos, audire partiendo est ex. Usu ut justo epicurei, facer zril sapientem usu id. Ubique quaeque eligendi pro ad, vis populo adolescens.</p>
                                        </dd>
                                    </dl>
                                    <dl className="content">
                                        <dt className="heading-detail-info">
                                            <span>Doctoral Dissertation Award</span>
                                            <span className="year">1970</span>
                                        </dt>
                                        <dd>
                                            <p className="mb0 candidate-detail-description">Ex scripta eripuit eos, audire partiendo est ex. Usu ut justo epicurei, facer zril sapientem usu id. Ubique quaeque eligendi pro ad, vis populo adolescens.</p>
                                        </dd>
                                    </dl>
                                    <dl className="content">
                                        <dt className="heading-detail-info">
                                            <span>Programming Languages Achievement</span>
                                            <span className="year">1970</span>
                                        </dt>
                                        <dd>
                                            <p className="mb0 candidate-detail-description">Ex scripta eripuit eos, audire partiendo est ex. Usu ut justo epicurei, facer zril sapientem usu id. Ubique quaeque eligendi pro ad, vis populo adolescens.</p>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                            <div className="social-share-bookmak flex-middle-sm">
                                <div className="apus-social-share">
                                    <div className="bo-social-icons bo-sicolor social-radius-rounded">
                                        <span className="title">Share: </span>
                                        <a href="#" data-original-title="facebook" className="bo-social-facebook addthis_button_facebook at300b" title="Facebook"><i className="fa fa-facebook"></i></a>
                                        <a href="#" data-original-title="twitter" className="bo-social-twitter addthis_button_twitter at300b" title="Twitter"><i className="fa fa-twitter"></i></a>
                                        <a href="#" data-original-title="linkedin" className="bo-social-linkedin addthis_button_linkedin at300b" target="_blank" title="LinkedIn"><i className="fa fa-linkedin"></i></a>
                                        <a href="#" data-original-title="pinterest" className="bo-social-pinterest addthis_button_pinterest at300b"><i className="fa fa-pinterest"></i></a>
                                    </div>
                                </div>		        
                                <div className="ali-right">
                                    <a title="Shortlist" href="#" className="btn-action-job btn-add-candidate-shortlist no-text" data-candidate_id="235" data-nonce="5f199128ca">
                                        <i className="fa fa-heart-o"></i>
                                    </a>
                                </div>
                            </div> */}
                            {/* <div id="reviews">
                                <div id="comments">
                                    <ul className="comment-list">
                                        <li className="comment even thread-even depth-1" id="li-comment-13">
                                            <div id="comment-13" className="the-comment ">
                                                <div className="avatar">
                                                    <img src="https://secure.gravatar.com/avatar/?s=80&amp;d=mm&amp;r=g" width="80" height="80" alt="Avatar" className="avatar avatar-80 wp-user-avatar wp-user-avatar-80 photo avatar-default"/>
                                                </div>
                                                <div className="comment-box">
                                                    <div className="flex-middle-sm clearfix">
                                                        <div className="meta comment-author">
                                                            <div className="info-meta">
                                                                <strong>
                                                                    John Ruskin				
                                                                </strong>
                                                            <div className="entry-date">
                                                                <i className="flaticon-event"></i>February 5, 2020							</div>
                                                            </div>
                                                        </div>
                                                        <div className="star-rating clear ali-right" title="Rated 5 out of 5">
                                                            <span className="review-avg">5.0</span>
                                                            <div className="review-stars-rated-wrapper">
                                                                <div className="review-stars-rated">
                                                                    <ul className="review-stars">
                                                                        <li><span className="fa fa-star"></span></li>
                                                                        <li><span className="fa fa-star"></span></li>
                                                                        <li><span className="fa fa-star"></span></li>
                                                                        <li><span className="fa fa-star"></span></li>
                                                                        <li><span className="fa fa-star"></span></li>
                                                                    </ul>
                                                                    <ul className="review-stars filled" style={{width:'100%'}}>
                                                                        <li><span className="fa fa-star"></span></li>
                                                                        <li><span className="fa fa-star"></span></li>
                                                                        <li><span className="fa fa-star"></span></li>
                                                                        <li><span className="fa fa-star"></span></li>
                                                                        <li><span className="fa fa-star"></span></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div itemProp="description" className="comment-text">
                                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div> */}
                                {/* <div id="review_form_wrapper" className="commentform">
                                    <div id="review_form">
                                        <div className="commentform reset-button-default">
                                            <div className="clearfix">
                                                <div id="respond" className="comment-respond">
                                                    <h3 id="reply-title" className="comment-reply-title">
                                                        Add a review 
                                                        <small>
                                                            <a rel="nofollow" id="cancel-comment-reply-link" href="/workio/candidate/tarek-fatah/#respond" style={{display:'none'}}>Cancel reply</a>
                                                        </small>
                                                    </h3>
                                                    <form action="https://www.demoapus-wp1.com/workio/wp-comments-post.php" method="post" id="commentform" className="comment-form" noValidate="">
                                                        <div className="choose-rating clearfix">
                                                            <div className="choose-rating-inner row">
                                                                <div className="col-sm-12 col-xs-12">
                                                                    <div className="form-group yourview">
                                                                        <div className="your-rating">Your Rating for this listing</div>
                                                                        <div className="comment-form-rating">
                                                                            <label for="rating">Your Rating</label>
                                                                            <ul className="review-stars">
                                                                                <li><span className="fa fa-star"></span></li>
                                                                                <li><span className="fa fa-star"></span></li>
                                                                                <li><span className="fa fa-star"></span></li>
                                                                                <li><span className="fa fa-star"></span></li>
                                                                                <li><span className="fa fa-star"></span></li>
                                                                            </ul>
                                                                            <ul className="review-stars filled">
                                                                                <li><span className="fa fa-star"></span></li>
                                                                                <li><span className="fa fa-star"></span></li>
                                                                                <li><span className="fa fa-star"></span></li>
                                                                                <li><span className="fa fa-star"></span></li>
                                                                                <li><span className="fa fa-star"></span></li>
                                                                            </ul>
                                                                            <input type="hidden" value="5" name="rating" id="_input_rating"/>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="group-upload-preview clearfix"></div>
                                                        <div className="row">
                                                            <div className="col-xs-12 col-sm-6">
                                                                <div className="form-group">
                                                                    <label>Name</label>
                                                                    <input id="author" placeholder="Your Name" className="form-control" name="author" type="text" value="" size="30" aria-required="true"/>
                                                                </div>
                                                            </div>
                                                            <div className="col-xs-12 col-sm-6">
                                                                <div className="form-group">
                                                                    <label>Email</label>
                                                                    <input id="email" placeholder="your@mail.com" className="form-control" name="email" type="text" value="" size="30" aria-required="true"/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <p className="comment-form-cookies-consent">
                                                            <input id="wp-comment-cookies-consent" name="wp-comment-cookies-consent" type="checkbox" value="yes"/>
                                                            <label for="wp-comment-cookies-consent">Save my name, email, and website in this browser for the next time I comment.</label>
                                                        </p>
                                                        <div className="form-group space-30">
                                                            <label>Review</label>
                                                            <textarea id="comment" className="form-control" placeholder="Write Comment" name="comment" cols="45" rows="5" aria-required="true"></textarea>
                                                        </div>
                                                        <p className="form-submit">
                                                            <input name="submit" type="submit" id="submit" className="btn btn-theme " value="Submit Review"/>
                                                            <input type="hidden" name="comment_post_ID" value="235" id="comment_post_ID"/>
                                                            <input type="hidden" name="comment_parent" id="comment_parent" value="0"/>
                                                        </p>
                                                    </form>	
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                            </div>					
                            {/* <div className="releated-candidates">
                                <div className="flex-middle top-info">
                                    <h4 className="title">
                                        Related Candidates           
                                    </h4>
                                    <div className="ali-right">
                                        <a href="https://www.demoapus-wp1.com/workio/candidates-grid/" className="view_all">
                                            Browse Full List<i className="ti-arrow-right"></i>
                                        </a>
                                    </div>
                                </div>
                                <div className="widget-content">
                                    <div className="row">
                                        <div className="col-xs-12 col-sm-6 col-md-6 md-clearfix sm-clearfix">
                                            <article id="post-2055" className="map-item post-2055 candidate type-candidate status-publish has-post-thumbnail hentry candidate_category-accounting-finance candidate_location-france candidate_tag-android candidate_tag-angular" data-latitude="48.8400463" data-longitude="2.3952526">
                                                <div className="candidate-grid candidate-archive-layout">
                                                    <a title="Shortlist" href="#" className="btn-action-job btn-add-candidate-shortlist has-text" data-candidate_id="2055" data-nonce="5f199128ca">
                                                        <span>Shortlist</span>
                                                    </a>
                                                    <div className="candidate-logo candidate-thumbnail">
                                                        <a href="https://www.demoapus-wp1.com/workio/candidate/pepetono/">
                                                            <div className="image-wrapper">
                                                                <img width="180" height="180" src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox%3D'0 0 180 180'%2F%3E" className="attachment-workio-logo-size size-workio-logo-size unveil-image" alt="" data-src="https://www.demoapus-wp1.com/workio/wp-content/uploads/2020/02/can-6.jpg" data-srcset="https://www.demoapus-wp1.com/workio/wp-content/uploads/2020/02/can-6.jpg 750w, https://www.demoapus-wp1.com/workio/wp-content/uploads/2020/02/can-6-300x300.jpg 300w, https://www.demoapus-wp1.com/workio/wp-content/uploads/2020/02/can-6-410x410.jpg 410w, https://www.demoapus-wp1.com/workio/wp-content/uploads/2020/02/can-6-600x600.jpg 600w, https://www.demoapus-wp1.com/workio/wp-content/uploads/2020/02/can-6-150x150.jpg 150w, https://www.demoapus-wp1.com/workio/wp-content/uploads/2020/02/can-6-180x180.jpg 180w" data-sizes="(max-width: 180px) 100vw, 180px"/>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div className="inner-bottom">
                                                        <div className="candidate-information">
                                                            <div className="title-wrapper">
                                                                <h2 className="candidate-title">
                                                                    <a href="https://www.demoapus-wp1.com/workio/candidate/pepetono/" rel="bookmark">candidate</a>
                                                                </h2>
                                                            </div>
                                                            <div className="info job-metas clearfix">
                                                                <div className="candidate-job">
                                                                    Start Using Wireshark to Hack
                                                                </div>
                                                                <div className="rating-avg-star">
                                                                    <div className="review-stars-rated-wrapper">
                                                                        <div className="review-stars-rated">
                                                                            <ul className="review-stars">
                                                                                <li><span className="fa fa-star"></span></li>
                                                                                <li><span className="fa fa-star"></span></li>
                                                                                <li><span className="fa fa-star"></span></li>
                                                                                <li><span className="fa fa-star"></span></li>
                                                                                <li><span className="fa fa-star"></span></li>
                                                                            </ul>
                                                                            <ul className="review-stars filled" style={{width:'100%'}}>
                                                                                <li><span className="fa fa-star"></span></li>
                                                                                <li><span className="fa fa-star"></span></li>
                                                                                <li><span className="fa fa-star"></span></li>
                                                                                <li><span className="fa fa-star"></span></li>
                                                                                <li><span className="fa fa-star"></span></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="job-tags">
                                                                <div className="with-title">
                                                                    <a className="tag-job" href="https://www.demoapus-wp1.com/workio/candidate-tag/android/">Android</a>
                                                                    <a className="tag-job" href="https://www.demoapus-wp1.com/workio/candidate-tag/angular/">Angular</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="candidate-btns">
                                                            <a className="view-detail text-theme" href="https://www.demoapus-wp1.com/workio/candidate/pepetono/">View Profile<i className="fa fa-angle-double-right"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </article>
                                        </div>
                                        <div className="col-xs-12 col-sm-6 col-md-6  ">
                                            <article id="post-408" className="map-item post-408 candidate type-candidate status-publish has-post-thumbnail hentry candidate_category-accounting-finance candidate_location-france candidate_tag-android candidate_tag-css" data-latitude="48.8360099" data-longitude="2.3985248">
                                                <div className="candidate-grid candidate-archive-layout">
                                                    <div className="featured-urgent-label">
                                                        <span className="featured">featured</span>
                                                    </div>
                                                    <a title="Shortlist" href="#" className="btn-action-job btn-add-candidate-shortlist has-text" data-candidate_id="408" data-nonce="5f199128ca">
                                                        <span>Shortlist</span>
                                                    </a>
                                                    <div className="candidate-logo candidate-thumbnail">
                                                        <a href="https://www.demoapus-wp1.com/workio/candidate/john-locke/">
                                                        <div className="image-wrapper">
                                                            <img width="180" height="180" src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox%3D'0 0 180 180'%2F%3E" className="attachment-workio-logo-size size-workio-logo-size unveil-image" alt="" data-src="https://www.demoapus-wp1.com/workio/wp-content/uploads/2020/02/can-9.jpg" data-srcset="https://www.demoapus-wp1.com/workio/wp-content/uploads/2020/02/can-9.jpg 750w, https://www.demoapus-wp1.com/workio/wp-content/uploads/2020/02/can-9-300x300.jpg 300w, https://www.demoapus-wp1.com/workio/wp-content/uploads/2020/02/can-9-410x410.jpg 410w, https://www.demoapus-wp1.com/workio/wp-content/uploads/2020/02/can-9-600x600.jpg 600w, https://www.demoapus-wp1.com/workio/wp-content/uploads/2020/02/can-9-150x150.jpg 150w, https://www.demoapus-wp1.com/workio/wp-content/uploads/2020/02/can-9-180x180.jpg 180w" data-sizes="(max-width: 180px) 100vw, 180px"/>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div className="inner-bottom">
                                                        <div className="candidate-information">
                                                            <div className="title-wrapper">
                                                                <h2 className="candidate-title">
                                                                    <a href="https://www.demoapus-wp1.com/workio/candidate/john-locke/" rel="bookmark">John Locke</a>
                                                                </h2>
                                                            </div>
                                                            <div className="info job-metas clearfix">
                                                                <div className="candidate-job">
                                                                    iOS Expert + Node Dev        
                                                                </div>
                                                                <div className="rating-avg-star">
                                                                    <div className="review-stars-rated-wrapper">
                                                                        <div className="review-stars-rated">
                                                                            <ul className="review-stars">
                                                                                <li><span className="fa fa-star"></span></li>
                                                                                <li><span className="fa fa-star"></span></li>
                                                                                <li><span className="fa fa-star"></span></li>
                                                                                <li><span className="fa fa-star"></span></li>
                                                                                <li><span className="fa fa-star"></span></li>
                                                                            </ul>
                                                                            <ul className="review-stars filled" style={{width:'80%'}}>
                                                                                <li><span className="fa fa-star"></span></li>
                                                                                <li><span className="fa fa-star"></span></li>
                                                                                <li><span className="fa fa-star"></span></li>
                                                                                <li><span className="fa fa-star"></span></li>
                                                                                <li><span className="fa fa-star"></span></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="job-tags">
                                                                <div className="with-title">
                                                                    <a className="tag-job" href="https://www.demoapus-wp1.com/workio/candidate-tag/android/">Android</a>
                                                                    <a className="tag-job" href="https://www.demoapus-wp1.com/workio/candidate-tag/css/">Css</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="candidate-btns">
                                                            <a className="view-detail text-theme" href="https://www.demoapus-wp1.com/workio/candidate/john-locke/">View Profile<i className="fa fa-angle-double-right"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </article>
                                        </div>
                                    </div>
                                </div>
                             </div> */}
    				    </div>
                    </div>
                    {/* <div className="sidebar-wrapper"> */}
                    <div className="col-xs-12 col-md-4 sidebar sidebar-job">
				   		    {/* <aside className="widget widget_apus_candidate_info">   
                                <h2 className="widget-title">
                                    <span>Job Overview</span>
                                </h2>
                                <div className="employer-detail-detail">
                                    <div className="candidate_profile">
                                        <ul className="list">
                                            <li>
                                                <div className="icon">                        
                                                    <i className="flaticon-reaction"></i>
                                                </div>
                                                <div className="details">
                                                    <div className="text">Categories: </div>
                                                    <div className="value">
                                                        <a href="#">{props.curjob.category['name']}</a>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="icon">                        
                                                    <i className="flaticon-save-money"></i>
                                                </div>
                                                <div className="details">
                                                    <div className="text">Budget: </div>
                                                    <div className="value">$<span className="price-text">{props.curjob.minBudget}</span> ~ $<span className="price-text">{props.curjob.maxBudget}</span> </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="icon">
                                                    <i className="flaticon-tools"></i>
                                                </div>
                                                <div className="details">
                                                    <div className="text">Experience: </div>
                                                    <div className="value">5 Years</div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="icon">
                                                    <i className="flaticon-manual"></i>
                                                </div>
                                                <div className="details">
                                                    <div className="text">Languages: </div>
                                                    <div className="value"> English, Turkish, Japanese</div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="icon">
                                                    <i className="flaticon-gender-equality"></i>
                                                </div>
                                                <div className="details">
                                                    <div className="text">Gender: </div>
                                                    <div className="value">Both</div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="icon">
                                                    <i className="flaticon-birthday"></i>
                                                </div>
                                                <div className="details">
                                                    <div className="text">Age: </div>
                                                    <div className="value">30-35</div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="icon">
                                                    <i className="flaticon-policy"></i>
                                                </div>
                                                <div className="details">
                                                    <div className="text">Qualification: </div>
                                                    <div className="value"> Certificate, Associate Degree</div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="icon">
                                                    <i className="flaticon-visibility"></i>
                                                </div>
                                                <div className="details">
                                                    <div className="text">Views: </div>
                                                    <div className="value">1538</div>
                                                </div>
                                            </li>
                                        </ul>
                                        <div className="space-10">  
                                            <a className="btn btn-theme btn-block btn-candidate-private-message btn-loading" href="#" data-candidate_id="235" data-nonce="5fe2b87bb2">Contact Me</a>
                                        </div> 
                                        <div className="action">
                                            <a href="#" className="btn btn-block btn-add-candidate-shortlist" data-candidate_id="235" data-nonce="5f199128ca">Shortlist</a>
                                            <a href="https://www.demoapus-wp1.com/workio/wp-admin/admin-ajax.php?action=wp_job_board_ajax_download_resume_cv&amp;post_id=235" className="btn btn-theme btn-block btn-download-cv cannot-download-cv-btn " data-msg="Please login with &quot;Employer&quot; to download CV.">Download CV</a>
                                        </div>
                                    </div>
                                </div>
                            </aside>
                            <aside className="widget widget_apus_candidate_contact_info">  
                                <div className="job_maps_sidebar">
                                    
                                    <div className="candidate-detail-location info-member-widget">
                                        <h2 className="widget-title"><span>Contact Information</span></h2>
                                        <ul className="list list-info-member">
                                            <li>
                                                <div className="text">Phone: </div>
                                                <div className="value">+015 123 456 789</div>
                                            </li>
                                            <li>
                                                <div className="text">Email: </div>
                                                <div className="value">fatah@apus.com</div>
                                            </li>
                                            <li>
                                                <div className="text">Location: </div>
                                                <div className="value">4 Rue Taine, Paris</div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </aside> */}
                            {/* <aside className="widget widget_apus_candidate_cv">
                                <h2 className="widget-title"><span>Download Resume</span></h2>
                                <div id="candidate-cv" className="candidate-cv">
                                    <a href="https://www.demoapus-wp1.com/workio/wp-admin/admin-ajax.php?action=wp_job_board_ajax_download_cv&amp;file_id=425" className="candidate-detail-cv">
                                        <span className="icon_type">
                                        <i className="flaticon-document"></i>
                                        </span>
                                        <div className="filename">cv_candidate</div>
                                        <div className="extension">pdf</div>
                                        </a>
                                    <a href="https://www.demoapus-wp1.com/workio/wp-admin/admin-ajax.php?action=wp_job_board_ajax_download_cv&amp;file_id=424" className="candidate-detail-cv">
                                        <span className="icon_type">
                                            <i className="flaticon-document-1"></i>
                                        </span>
                                        <div className="filename">cv_candidate</div>
                                        <div className="extension">docx</div>
                                    </a>
                                </div>
                            </aside>	 */}
                        {/* </div>   */}
                    {/* </div>   */}
                </div>
            </div>
        </section>
        <Footer/>
    </>
  );
}
const mapStateToProps = (state) => ({
    allcategories: state.category.allcategories,
    curjob: state.job.curjob,
    user:state.auth.user,
    bids:state.bid.bids
  })
  
export default connect(
      mapStateToProps,
      {...bidDuck.actions,...authDuck.actions, ...activityDuck.actions, ...jobDuck.actions, ...categoryDuck.actions}
  )(JobDetail);
  