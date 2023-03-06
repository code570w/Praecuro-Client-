import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import swal from 'sweetalert';
import { Alert } from "react-bootstrap";
import clsx from 'clsx';
import { useHistory } from "react-router-dom";

import * as actions from '../../../../../app/actions';
import * as authDuck from '../../../../../app/store/ducks/auth.duck';
import * as activityDuck from '../../../../../app/store/ducks/activity.duck';
import * as jobDuck from '../../../../../app/store/ducks/job.duck';
import * as categoryDuck from '../../../../../app/store/ducks/category.duck';

import {storage} from './../../../../../app/firebase';
import default_img from './../../../../assets/default_profile.png';
import { Link } from "react-router-dom";
import useGeolocation from 'react-hook-geolocation';
import moment from 'moment';
import TimePicker from 'react-bootstrap-time-picker';
function CurrentEdit(props) {
  const [status, setStatus] = useState('');
  const [id, setId] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [title, setTitle] = useState('');
  const [budget, setBudget] = useState(10);
  const [deadline, setDeadline] = useState(5);
  const [budgetType, setBudgetType] = useState('Flat Rate');
  const [category, setCategory] = useState('');
  const [summary, setSummary] = useState('');
  const [categoryarr, setCategoryarr]=useState([]);
  const [loading, setLoading] = useState(false);
  const [startTime, setStartTime] = useState('08:00 AM');
  const [jbdate, setJbDate] = useState('');
  const [salary_offer, setSalary] = useState(10);

  const [endTime, setEndTime] = useState('05:00 PM');

  const [loadingButtonStyle, setLoadingButtonStyle] = useState({
    paddingRight: "2.5rem"
  });
  // const [location, setLocation] = useState('US');
  const [address, setAddress] = useState('');

  const history = useHistory();
   const enableLoading = () => {
    setLoading(true);
    setLoadingButtonStyle({ paddingRight: "3.5rem" });
  };

  const disableLoading = () => {
    setLoading(false);
    setLoadingButtonStyle({ paddingRight: "2.5rem" });
  };

  const geolocation = useGeolocation();
  useEffect(() => {
    // console.log('props.cursur')
    // console.log(props.curjob)
    setId(props.curjob._id || '');
    setTitle(props.curjob.title || '')
    setDeadline(props.curjob.deadline || 5)
    setBudget(props.curjob.budget || 10);
    setBudgetType(props.curjob.budgetType || 'Flat Rate');
    setSummary(props.curjob.summary || '');
    setCategoryarr(props.allcategories);
    // setLocation(props.curjob.location || 'US');
    setAddress(props.curjob.address || '');
    setCity(props.curjob.city || '');
    setState(props.curjob.state || '');
    setZipCode(props.curjob.zipCode || '');
    setStartTime(props.curjob.startTime || '08:00 AM');
    setEndTime(props.curjob.endTime || '05:00 PM');
    setJbDate(props.curjob.jbdate || '');
    setSalary(props.curjob.salary_offer || 0);
    

    // if(!props.curjob.location){
    //   setLocation(props.user.location || 'US')
    // }
    if(!props.curjob.address){
      setAddress(props.user.address || '')
    }
    if(props.curjob.category)
      setCategory(props.curjob.category || '');
    if(!props.curjob.category)
      setCategory(props.allcategories[0]._id);
  }, [props])


  // const cancel = () => {
    
    // setPassword(getPassword(props.user.password));
  // }

  const save = () => {
    console.log('1111')
    if(id === '' && props.user.active === 'Pending'){
      setStatus("You can't post Job with out permission from Admin")
      return;
    }
     if(title === '' || summary === '' || address === ''){
      setStatus('You have to input all the correctly info')
      return;
    }
    console.log(title)

    var tempData = {
      title: title,
      category:category,
      budget:budget,
      budgetType:budgetType,
      deadline:deadline,
      summary:summary,
      address:address,
      startTime:startTime,
      endTime:endTime,
      jbdate:jbdate,
      zipCode:zipCode,
      city:city,
      state:state,
      client:props.user._id,
      salary_offer:salary_offer
    };
    if(id != '')
      Object.assign(tempData, {'_id':id});
      // values['latitude']=geolocation.latitude;
      // values['longitude']=geolocation.longitude;

      Object.assign(tempData,{'loc':{
          type:'Point',
          coordinates:[geolocation.longitude,geolocation.latitude]
        }})
   
        // console.log('tempData33',tempData);

      handleSave(tempData)
  }
  const handleSave=(result)=>{

     enableLoading();
    setTimeout(() => {
       if(id === ''){

        // console.log('title2222',result);
      actions.addJob(result).then(res=>{
        // console.log('title3333',result);
        disableLoading();
        let {data} = res;
        if(!data.success){
          setStatus(data.errMessage);
          return;
        }else{
          setStatus('');
          console.log('succesfull')
          props.allJobs(data.jobs);
          history.push("/myprofile/current-working");
          return;
        }
      }).catch((err) => {
        console.log('===  err  == ' ,err)
        disableLoading();
        setStatus(
          'Error!!! you have to check your Database or Connection11'
        );
      });
    }else{
      actions.updateJob(result).then(res=>{
        disableLoading();
        let {data} = res;
        if(!data.success){
          setStatus(data.errMessage);
          return;
        }else{
          console.log('succesfull')
          props.allJobs(data.jobs);
          history.push("/myprofile/current-working");
          return;
         }
      }).catch(() => {
        //console.log('===  data2  == ')
        disableLoading();
        setStatus(
          'Error!!! you have to check your Database or Connection'
        );
      });
    }
    }, 1000);

   
  }

  const jobDate =  moment(jbdate).format('YYYY-MM-DD');
  return (
    <div className="row" style={{backgroundColor: "white", padding: "40px 20px 40px 20px"}}>
      <div className="col-md-2">
      </div>
      <div className="col-md-8">
        <div className="col-md-12">
          <span className="col-md-6 cold-sm-12" style={{fontSize: "1.275rem", fontWeight: 600 }}>{id===''?'New':'Edit'} Job ( Job Details )</span>
          <div className="col-md-6 col-sm-12 pull-right">
            <Link to="/myprofile/current-working"><button className="btn btn-secondary pull-right">Cancel</button></Link>
            <button className="" style={{marginRight: 10, }} onClick={save}className={`btn btn-primary pull-right ${clsx(
                      {
                        "kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light": loading
                      }
                    )}`}>
                      {id===''?'Add':'Update'}
              </button>
          </div>
        </div>
        <div className="col-md-12" style={{marginTop: 60}}>
        {status !=='' ?<div className="col-md-12">
              <Alert variant='danger'>
                  {status}
              </Alert>
          </div>:<div></div>}
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">Job Title</label>
            <div className="col-lg-9 col-xl-6">
              <input className="form-control" type="text" value={title} onChange={ (e) => setTitle(e.target.value) }/>
            </div>
          </div>
          <div className="form-group row">
              <label className="col-xl-3 col-lg-3 col-form-label">Nurse Type</label>
              <div className="col-lg-9 col-xl-6">
                {/* <select className="form-control" id="exampleSelectl" value={category} onChange={ (e) => setCategory(e.target.value) } multiple={true}> */}
                <select className="form-control" id="exampleSelectl" value={category} onChange={ (e) => setCategory(e.target.value) }>
                  {categoryarr.map((row,index) => (
                    <option key={row._id} value={row._id}>{row.name}</option>
                  ))}
                </select>
              </div>
            </div>
          
            <div className="form-group row">
              <label className="col-xl-3 col-lg-3 col-form-label">Job Location</label>
              <div className="col-lg-9 col-xl-6">
                <input className="form-control" type="text" value={address} onChange={ (e) => setAddress(e.target.value) }/>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-xl-3 col-lg-3 col-form-label">City</label>
              <div className="col-lg-9 col-xl-6">
                <input className="form-control" type="text" value={city} onChange={ (e) => setCity(e.target.value) }/>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-xl-3 col-lg-3 col-form-label">State</label>
              <div className="col-lg-9 col-xl-6">
                <input className="form-control" type="text" value={state} onChange={ (e) => setState(e.target.value) }/>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-xl-3 col-lg-3 col-form-label">Zip Code</label>
              <div className="col-lg-9 col-xl-6">
                <input className="form-control" type="text" value={zipCode} onChange={ (e) => setZipCode(e.target.value) }/>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-xl-3 col-lg-3 col-form-label">Job Summary</label>
              <div className="col-lg-9 col-xl-6">
                <textarea className="form-control"  rows="4"value={summary} onChange={ (e) => setSummary(e.target.value) }></textarea>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-xl-3 col-lg-3 col-form-label">Budget Type</label>
              <div className="col-lg-9 col-xl-6">
                {/* <select className="form-control" id="exampleSelectl" value={category} onChange={ (e) => setCategory(e.target.value) } multiple={true}> */}
                <select className="form-control" id="exampleSelectl" value={budgetType} onChange={ (e) => setBudgetType(e.target.value) }>
                    <option valuel="Flat Rate">Flat Rate</option>
                    <option valuel="Hourly">Hourly</option>
                </select>
              </div>
            </div>
            <div className="form-group  row">
                <label className="col-xl-3 col-lg-3 col-form-label">Budget</label>
                <div className="col-lg-9 col-xl-6">
                  <div className="input-group">
                    <input type="number" className="form-control" value={budget} onChange={ (e) => setBudget(e.target.value) }/>
                    <div className="input-group-append"><span className="input-group-text">$</span></div>
                  </div>
                </div>
            </div>
            <div className="form-group  row">
                <label className="col-xl-3 col-lg-3 col-form-label">Duration</label>
                <div className="col-lg-9 col-xl-6">
                  <div className="input-group">
                    <input type="number" className="form-control" value={deadline} onChange={ (e) => setDeadline(e.target.value) }/>
                    <div className="input-group-append"><span className="input-group-text">Hr</span></div>
                  </div>
                </div>
            </div>
            <div className="form-group row">
              <label className="col-xl-3 col-lg-3 col-form-label">Start Time</label>
              <div className="col-lg-9 col-xl-6">
              {/* <TimePicker start="10:00" end="21:00" id="exampleSelectl" value={startTime} onChange={ (e) => setStartTime(e.target.value) }/> */}
                <select className="form-control" id="exampleSelectl" value={startTime} onChange={ (e) => setStartTime(e.target.value) }>
                <option value="08:00 AM">08:00 AM</option>
                <option value="08:30 AM">08:30 AM</option>
                <option value="09:00 AM">09:00 AM</option>
                <option value="09:30 AM">09:30 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="10:30 AM">10:30 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="11:30 AM">11:30 AM</option>
                <option value="12:00 PM">12:00 PM</option>
                <option value="12:30 PM">12:30 PM</option>
                <option value="01:00 PM">01:00 PM</option>
                <option value="01:30 PM">01:30 PM</option>
                <option value="02:00 PM">02:00 PM</option>
                <option value="02:30 PM">02:30 PM</option>
                <option value="03:00 PM">03:00 PM</option>
                <option value="03:30 PM">03:30 PM</option>
                <option value="04:00 PM">04:00 PM</option>
                <option value="04:30 PM">04:30 PM</option>
                <option value="05:00 PM">05:00 PM</option>
                <option value="05:30 PM">05:30 PM</option>
                <option value="06:00 PM">06:00 PM</option>
                <option value="06:30 PM">06:30 PM</option>
                <option value="07:00 PM">07:00 PM</option>
                <option value="07:30 PM">07:30 PM</option>
                <option value="08:00 PM">08:00 PM</option>
                <option value="08:30 PM">08:30 PM</option>
                <option value="09:00 PM">09:00 PM</option>
                </select>
              </div>
            </div>

            <div className="form-group row">
              <label className="col-xl-3 col-lg-3 col-form-label">End Time</label>
              <div className="col-lg-9 col-xl-6">
                <select className="form-control" id="exampleSelectl2" value={endTime} onChange={ (e) => setEndTime(e.target.value) }>
                <option value="08:00 AM">08:00 AM</option>
                <option value="08:30 AM">08:30 AM</option>
                <option value="09:00 AM">09:00 AM</option>
                <option value="09:30 AM">09:30 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="10:30 AM">10:30 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="11:30 AM">11:30 AM</option>
                <option value="12:00 PM">12:00 PM</option>
                <option value="12:30 PM">12:30 PM</option>
                <option value="01:00 PM">01:00 PM</option>
                <option value="01:30 PM">01:30 PM</option>
                <option value="02:00 PM">02:00 PM</option>
                <option value="02:30 PM">02:30 PM</option>
                <option value="03:00 PM">03:00 PM</option>
                <option value="03:30 PM">03:30 PM</option>
                <option value="04:00 PM">04:00 PM</option>
                <option value="04:30 PM">04:30 PM</option>
                <option value="05:00 PM">05:00 PM</option>
                <option value="05:30 PM">05:30 PM</option>
                <option value="06:00 PM">06:00 PM</option>
                <option value="06:30 PM">06:30 PM</option>
                <option value="07:00 PM">07:00 PM</option>
                <option value="07:30 PM">07:30 PM</option>
                <option value="08:00 PM">08:00 PM</option>
                <option value="08:30 PM">08:30 PM</option>
                <option value="09:00 PM">09:00 PM</option>
                 
                  {/* <option value="AM">AM</option>
                  <option value="PM">PM</option> */}
                </select>
              </div>
            </div>

            <div className="form-group  row">
                <label className="col-xl-3 col-lg-3 col-form-label">Date</label>
                <div className="col-lg-9 col-xl-6">
                  <div className="input-group">
                    <input type="date" className="form-control" value={jobDate} onChange={ (e) => setJbDate(e.target.value) }/>
                    <div className="input-group-append"></div>
                  </div>
                </div>
            </div>

            <div className="form-group  row">
                <label className="col-xl-3 col-lg-3 col-form-label">Salary Offer</label>
                <div className="col-lg-9 col-xl-6">
                  <div className="input-group">
                    <input type="number" className="form-control" value={salary_offer} onChange={ (e) => setSalary(e.target.value) }/>
                    <div className="input-group-append"></div>
                  </div>
                </div>
            </div>
        </div>
      </div>
    </div>

    
  );
}

const mapStateToProps = (state) => ({
  allcategories: state.category.allcategories,
  user:state.auth.user,
  curjob: state.job.curjob,
})

export default connect(
    mapStateToProps,
    {...authDuck.actions, ...activityDuck.actions, ...jobDuck.actions, ...categoryDuck.actions}
)(CurrentEdit);
