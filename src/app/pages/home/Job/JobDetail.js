import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import clsx from 'clsx';
import { useHistory } from "react-router-dom";
import * as actions from '../../../../app/actions';
import * as authDuck from '../../../../app/store/ducks/auth.duck';
import * as activityDuck from '../../../../app/store/ducks/activity.duck';
import * as jobDuck from '../../../../app/store/ducks/job.duck';
import * as categoryDuck from '../../../../app/store/ducks/category.duck';

import {storage} from './../../../../app/firebase';
import default_img from './../../../assets/default_profile.png';
import { Link } from "react-router-dom";

function JobDetail(props) {
  const [status, setStatus] = useState('');
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  // const [location, setLocation] = useState('US');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [budget, setBudget] = useState(10);
  const [deadline, setDeadline] = useState(5);
  const [startTime, setStartTime] = useState('AM');
  const [budgetType, setBudgetType] = useState('Flat Rate');
  const [category, setCategory] = useState('');
  const [summary, setSummary] = useState('');
  const [categoryarr, setCategoryarr]=useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingButtonStyle, setLoadingButtonStyle] = useState({
    paddingRight: "2.5rem"
  });
  const history = useHistory();
   const enableLoading = () => {
    setLoading(true);
    setLoadingButtonStyle({ paddingRight: "3.5rem" });
  };

  const disableLoading = () => {
    setLoading(false);
    setLoadingButtonStyle({ paddingRight: "2.5rem" });
  };
  useEffect(() => {
    console.log('props.cursur')
    console.log(props.curjob)
    setId(props.curjob._id || '');
    setTitle(props.curjob.title || '')
    setStartTime(props.curjob.startTime || 'AM')
    // setLocation(props.curjob.location || 'US')
    setZipCode(props.curjob.zipCode || '')
    setCity(props.curjob.city || '')
    setState(props.curjob.state || '')
    setAddress(props.curjob.address || '')
    setDeadline(props.curjob.deadline || 5)
    setBudget(props.curjob.budget || 10);
    setBudgetType(props.curjob.budgetType || 'Flat Rate');
    setSummary(props.curjob.summary || '');
    setCategoryarr(props.allcategories);
    if(props.curjob.category)
      setCategory(props.curjob.category || '');
    else
      setCategory(props.allcategories[0]._id);
  }, [props])


  // const cancel = () => {
    
    // setPassword(getPassword(props.user.password));
  // }

  const save = () => {
     if(title === '' || summary === '' || address === ''){
      setStatus('You have to input all the correctly info')
      return;
    }
    var tempData = {
      title: title,
      address:address, 
      budget:budget,
      budgetType:budgetType,
      startTime:startTime,
      deadline:deadline,
      summary:summary,
      state:state,
      zipCode:zipCode,
      city:city,
      category:category
    };
    if(id != '')
      Object.assign(tempData, {'_id':id});
    handleSave(tempData)
  }
  const handleSave=(result)=>{

     enableLoading();
    setTimeout(() => {
       if(id === ''){
      actions.addJob(result).then(res=>{
        disableLoading();
        let {data} = res;
        if(!data.success){
          setStatus(data.errMessage);
          return;
        }else{
          setStatus('');
          console.log('succesfull')
          props.allJobs(data.jobs);
          history.push("/admin/job");
          return;
        }
      }).catch(() => {
        //console.log('===  data2  == ')
        disableLoading();
        setStatus(
          'Error!!! you have to check your Database or Connection'
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
          history.push("/admin/job");
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

  return (
    <div className="row" style={{backgroundColor: "white", padding: "40px 20px 40px 20px"}}>
      <div className="col-md-2">
      </div>
      <div className="col-md-8">
        <div className="col-md-12">
          <span className="col-md-6 cold-sm-12" style={{fontSize: "1.275rem", fontWeight: 600 }}>{id===''?'New':'Edit'} Job ( Job Details )</span>
          <div className="col-md-6 col-sm-12 pull-right">
            <Link to="/admin/job"><button className="btn btn-secondary pull-right">Cancel</button></Link>
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
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">Job Title</label>
            <div className="col-lg-9 col-xl-6">
              <input className="form-control" type="text" value={title} onChange={ (e) => setTitle(e.target.value) }/>
            </div>
          </div>
          <div className="form-group row">
              <label className="col-xl-3 col-lg-3 col-form-label">Category</label>
              <div className="col-lg-9 col-xl-6">
                {/* <select className="form-control" id="exampleSelectl" value={category} onChange={ (e) => setCategory(e.target.value) } multiple={true}> */}
                <select className="form-control" id="exampleSelectl" value={category} onChange={ (e) => setCategory(e.target.value) }>
                  {categoryarr.map((row,index) => (
                    <option key={row._id} value={row._id}>{row.name}</option>
                  ))}
                </select>
              </div>
            </div>
          {/* <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">Location</label>
            <div className="col-lg-9 col-xl-6">
              <select className="form-control" id="exampleSelectl1" value={location} onChange={ (e) => setLocation(e.target.value) }>
                  <option value=''>All Locations</option>
                  <option value="AF">Afghanistan</option>
                              <option value="AX">Åland Islands</option>
                              <option value="AL">Albania</option>
                              <option value="DZ">Algeria</option>
                              <option value="AS">American Samoa</option>
                              <option value="AD">Andorra</option>
                              <option value="AO">Angola</option>
                              <option value="AI">Anguilla</option>
                              <option value="AQ">Antarctica</option>
                              <option value="AG">Antigua and Barbuda</option>
                              <option value="AR">Argentina</option>
                              <option value="AM">Armenia</option>
                              <option value="AW">Aruba</option>
                              <option value="AU">Australia</option>
                              <option value="AT">Austria</option>
                              <option value="AZ">Azerbaijan</option>
                              <option value="BS">Bahamas</option>
                              <option value="BH">Bahrain</option>
                              <option value="BD">Bangladesh</option>
                              <option value="BB">Barbados</option>
                              <option value="BY">Belarus</option>
                              <option value="BE">Belgium</option>
                              <option value="BZ">Belize</option>
                              <option value="BJ">Benin</option>
                              <option value="BM">Bermuda</option>
                              <option value="BT">Bhutan</option>
                              <option value="BO">Bolivia, Plurinational State of</option>
                              <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
                              <option value="BA">Bosnia and Herzegovina</option>
                              <option value="BW">Botswana</option>
                              <option value="BV">Bouvet Island</option>
                              <option value="BR">Brazil</option>
                              <option value="IO">British Indian Ocean Territory</option>
                              <option value="BN">Brunei Darussalam</option>
                              <option value="BG">Bulgaria</option>
                              <option value="BF">Burkina Faso</option>
                              <option value="BI">Burundi</option>
                              <option value="KH">Cambodia</option>
                              <option value="CM">Cameroon</option>
                              <option value="CA">Canada</option>
                              <option value="CV">Cape Verde</option>
                              <option value="KY">Cayman Islands</option>
                              <option value="CF">Central African Republic</option>
                              <option value="TD">Chad</option>
                              <option value="CL">Chile</option>
                              <option value="CN">China</option>
                              <option value="CX">Christmas Island</option>
                              <option value="CC">Cocos (Keeling) Islands</option>
                              <option value="CO">Colombia</option>
                              <option value="KM">Comoros</option>
                              <option value="CG">Congo</option>
                              <option value="CD">Congo, the Democratic Republic of the</option>
                              <option value="CK">Cook Islands</option>
                              <option value="CR">Costa Rica</option>
                              <option value="CI">Côte d'Ivoire</option>
                              <option value="HR">Croatia</option>
                              <option value="CU">Cuba</option>
                              <option value="CW">Curaçao</option>
                              <option value="CY">Cyprus</option>
                              <option value="CZ">Czech Republic</option>
                              <option value="DK">Denmark</option>
                              <option value="DJ">Djibouti</option>
                              <option value="DM">Dominica</option>
                              <option value="DO">Dominican Republic</option>
                              <option value="EC">Ecuador</option>
                              <option value="EG">Egypt</option>
                              <option value="SV">El Salvador</option>
                              <option value="GQ">Equatorial Guinea</option>
                              <option value="ER">Eritrea</option>
                              <option value="EE">Estonia</option>
                              <option value="ET">Ethiopia</option>
                              <option value="FK">Falkland Islands (Malvinas)</option>
                              <option value="FO">Faroe Islands</option>
                              <option value="FJ">Fiji</option>
                              <option value="FI">Finland</option>
                              <option value="FR">France</option>
                              <option value="GF">French Guiana</option>
                              <option value="PF">French Polynesia</option>
                              <option value="TF">French Southern Territories</option>
                              <option value="GA">Gabon</option>
                              <option value="GM">Gambia</option>
                              <option value="GE">Georgia</option>
                              <option value="DE">Germany</option>
                              <option value="GH">Ghana</option>
                              <option value="GI">Gibraltar</option>
                              <option value="GR">Greece</option>
                              <option value="GL">Greenland</option>
                              <option value="GD">Grenada</option>
                              <option value="GP">Guadeloupe</option>
                              <option value="GU">Guam</option>
                              <option value="GT">Guatemala</option>
                              <option value="GG">Guernsey</option>
                              <option value="GN">Guinea</option>
                              <option value="GW">Guinea-Bissau</option>
                              <option value="GY">Guyana</option>
                              <option value="HT">Haiti</option>
                              <option value="HM">Heard Island and McDonald Islands</option>
                              <option value="VA">Holy See (Vatican City State)</option>
                              <option value="HN">Honduras</option>
                              <option value="HK">Hong Kong</option>
                              <option value="HU">Hungary</option>
                              <option value="IS">Iceland</option>
                              <option value="IN">India</option>
                              <option value="ID">Indonesia</option>
                              <option value="IR">Iran, Islamic Republic of</option>
                              <option value="IQ">Iraq</option>
                              <option value="IE">Ireland</option>
                              <option value="IM">Isle of Man</option>
                              <option value="IL">Israel</option>
                              <option value="IT">Italy</option>
                              <option value="JM">Jamaica</option>
                              <option value="JP">Japan</option>
                              <option value="JE">Jersey</option>
                              <option value="JO">Jordan</option>
                              <option value="KZ">Kazakhstan</option>
                              <option value="KE">Kenya</option>
                              <option value="KI">Kiribati</option>
                              <option value="KP">Korea, Democratic People's Republic of</option>
                              <option value="KR">Korea, Republic of</option>
                              <option value="KW">Kuwait</option>
                              <option value="KG">Kyrgyzstan</option>
                              <option value="LA">Lao People's Democratic Republic</option>
                              <option value="LV">Latvia</option>
                              <option value="LB">Lebanon</option>
                              <option value="LS">Lesotho</option>
                              <option value="LR">Liberia</option>
                              <option value="LY">Libya</option>
                              <option value="LI">Liechtenstein</option>
                              <option value="LT">Lithuania</option>
                              <option value="LU">Luxembourg</option>
                              <option value="MO">Macao</option>
                              <option value="MK">Macedonia, the former Yugoslav Republic of</option>
                              <option value="MG">Madagascar</option>
                              <option value="MW">Malawi</option>
                              <option value="MY">Malaysia</option>
                              <option value="MV">Maldives</option>
                              <option value="ML">Mali</option>
                              <option value="MT">Malta</option>
                              <option value="MH">Marshall Islands</option>
                              <option value="MQ">Martinique</option>
                              <option value="MR">Mauritania</option>
                              <option value="MU">Mauritius</option>
                              <option value="YT">Mayotte</option>
                              <option value="MX">Mexico</option>
                              <option value="FM">Micronesia, Federated States of</option>
                              <option value="MD">Moldova, Republic of</option>
                              <option value="MC">Monaco</option>
                              <option value="MN">Mongolia</option>
                              <option value="ME">Montenegro</option>
                              <option value="MS">Montserrat</option>
                              <option value="MA">Morocco</option>
                              <option value="MZ">Mozambique</option>
                              <option value="MM">Myanmar</option>
                              <option value="NA">Namibia</option>
                              <option value="NR">Nauru</option>
                              <option value="NP">Nepal</option>
                              <option value="NL">Netherlands</option>
                              <option value="NC">New Caledonia</option>
                              <option value="NZ">New Zealand</option>
                              <option value="NI">Nicaragua</option>
                              <option value="NE">Niger</option>
                              <option value="NG">Nigeria</option>
                              <option value="NU">Niue</option>
                              <option value="NF">Norfolk Island</option>
                              <option value="MP">Northern Mariana Islands</option>
                              <option value="NO">Norway</option>
                              <option value="OM">Oman</option>
                              <option value="PK">Pakistan</option>
                              <option value="PW">Palau</option>
                              <option value="PS">Palestinian Territory, Occupied</option>
                              <option value="PA">Panama</option>
                              <option value="PG">Papua New Guinea</option>
                              <option value="PY">Paraguay</option>
                              <option value="PE">Peru</option>
                              <option value="PH">Philippines</option>
                              <option value="PN">Pitcairn</option>
                              <option value="PL">Poland</option>
                              <option value="PT">Portugal</option>
                              <option value="PR">Puerto Rico</option>
                              <option value="QA">Qatar</option>
                              <option value="RE">Réunion</option>
                              <option value="RO">Romania</option>
                              <option value="RU">Russian Federation</option>
                              <option value="RW">Rwanda</option>
                              <option value="BL">Saint Barthélemy</option>
                              <option value="SH">Saint Helena, Ascension and Tristan da Cunha</option>
                              <option value="KN">Saint Kitts and Nevis</option>
                              <option value="LC">Saint Lucia</option>
                              <option value="MF">Saint Martin (French part)</option>
                              <option value="PM">Saint Pierre and Miquelon</option>
                              <option value="VC">Saint Vincent and the Grenadines</option>
                              <option value="WS">Samoa</option>
                              <option value="SM">San Marino</option>
                              <option value="ST">Sao Tome and Principe</option>
                              <option value="SA">Saudi Arabia</option>
                              <option value="SN">Senegal</option>
                              <option value="RS">Serbia</option>
                              <option value="SC">Seychelles</option>
                              <option value="SL">Sierra Leone</option>
                              <option value="SG">Singapore</option>
                              <option value="SX">Sint Maarten (Dutch part)</option>
                              <option value="SK">Slovakia</option>
                              <option value="SI">Slovenia</option>
                              <option value="SB">Solomon Islands</option>
                              <option value="SO">Somalia</option>
                              <option value="ZA">South Africa</option>
                              <option value="GS">South Georgia and the South Sandwich Islands</option>
                              <option value="SS">South Sudan</option>
                              <option value="ES">Spain</option>
                              <option value="LK">Sri Lanka</option>
                              <option value="SD">Sudan</option>
                              <option value="SR">Suriname</option>
                              <option value="SJ">Svalbard and Jan Mayen</option>
                              <option value="SZ">Swaziland</option>
                              <option value="SE">Sweden</option>
                              <option value="CH">Switzerland</option>
                              <option value="SY">Syrian Arab Republic</option>
                              <option value="TW">Taiwan, Province of China</option>
                              <option value="TJ">Tajikistan</option>
                              <option value="TZ">Tanzania, United Republic of</option>
                              <option value="TH">Thailand</option>
                              <option value="TL">Timor-Leste</option>
                              <option value="TG">Togo</option>
                              <option value="TK">Tokelau</option>
                              <option value="TO">Tonga</option>
                              <option value="TT">Trinidad and Tobago</option>
                              <option value="TN">Tunisia</option>
                              <option value="TR">Turkey</option>
                              <option value="TM">Turkmenistan</option>
                              <option value="TC">Turks and Caicos Islands</option>
                              <option value="TV">Tuvalu</option>
                              <option value="UG">Uganda</option>
                              <option value="UA">Ukraine</option>
                              <option value="AE">United Arab Emirates</option>
                              <option value="GB">United Kingdom</option>
                              <option value="US">United States</option>
                              <option value="UM">United States Minor Outlying Islands</option>
                              <option value="UY">Uruguay</option>
                              <option value="UZ">Uzbekistan</option>
                              <option value="VU">Vanuatu</option>
                              <option value="VE">Venezuela, Bolivarian Republic of</option>
                              <option value="VN">Viet Nam</option>
                              <option value="VG">Virgin Islands, British</option>
                              <option value="VI">Virgin Islands, U.S.</option>
                              <option value="WF">Wallis and Futuna</option>
                              <option value="EH">Western Sahara</option>
                              <option value="YE">Yemen</option>
                              <option value="ZM">Zambia</option>
                              <option value="ZW">Zimbabwe</option>
              </select>
            </div>
          </div>  */}
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">Address</label>
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
              <select className="form-control" id="exampleSelectl1" value={startTime} onChange={ (e) => setStartTime(e.target.value) }>
                  <option value='AM'>AM</option>
                  <option value="PM">PM</option>
              </select>
            </div>
          </div> 
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  allcategories: state.category.allcategories,
  curjob: state.job.curjob,
})

export default connect(
    mapStateToProps,
    {...authDuck.actions, ...activityDuck.actions, ...jobDuck.actions, ...categoryDuck.actions}
)(JobDetail);
