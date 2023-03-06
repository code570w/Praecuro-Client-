import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
// import swal from 'sweetalert';
import { Alert } from "react-bootstrap";
import clsx from 'clsx';
import { useHistory } from "react-router-dom";

import * as actions from '../../../../../app/actions';
import * as authDuck from '../../../../../app/store/ducks/auth.duck';
import * as categoryDuck from '../../../../../app/store/ducks/category.duck';
// import * as activityDuck from '../../../../app/store/ducks/activity.duck';
import * as userDuck from '../../../../../app/store/ducks/user.duck';
import * as bidDuck from '../../../../../app/store/ducks/bid.duck';

import {storage} from './../../../../../app/firebase';
import default_img from './../../../../assets/default_profile.png';
import { Link } from "react-router-dom";

function BidDetail(props) {
  const dispatch = useDispatch();
  const[bidBudget,setBudget] = useState(0);
  const[content,setContent] = useState('');
  const [status, setStatus] = useState('');
  const [id, setId] = useState('');
  const [avatar, setAvatar] = useState('');
  // const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [name, setFirst] = useState('');
  // const [location, setLocation] = useState('');
  // const [address, setAddress] = useState('');
  // const [phone, setPhone] = useState('');
  const [salary, setSalary] = useState(10);
  const [summary, setSummary] = useState('');
  const [category, setCategory] = useState('');
  const [categoryarr, setCategoryarr]=useState([]);
//   const [password, setPassword] = useState('');
  // const [uploadInput, setUploadInput] = useState(null);
  const [showImage, setShowImage] = useState("");
  const [file, setFile] = useState(null);
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
    console.log(props.user)
    setBudget(props.curbid.bidBudget)
    setContent(props.curbid.content  )
    // setId(props.user._id || '');
    setAvatar(props.curbid.nurse.profilePhoto || '');
    setTitle(props.curbid.nurse.title || '')
    // setEmail(props.user.email || '');
    setFirst(props.curbid.nurse.firstName + ' ' + props.curbid.nurse.lastName || '');
    // setLocation(props.user.location || '');
    // setAddress(props.user.address || '');
    // setPhone(props.user.phoneNumber || '');
    setSalary(props.user.salary || 1);
	setSummary(props.user.summary || '');
	if(props.role === 2){
		setCategoryarr(props.allcategories);
		if(props.user.category)
			setCategory(props.user.category || '');
		else
			setCategory(props.allcategories[0]._id);
	}

  }, [props])
  function handleChatNow(){
    dispatch({type: 'CREATE_ROOM', counterpart: props.curbid.job.client ||props.curbid.job.client._id })

  }

  return (
	<div className="kt-grid__item kt-grid__item--fluid kt-app__content">
    <div className="row" style={{backgroundColor: "white"}}>
        <div className="col-md-12">
			<div className="kt-portlet">
				<div className="kt-portlet__head">
					<div className="kt-portlet__head-label">
						<h3 className="kt-portlet__head-title">Bid Detail Info</h3>
					</div>
				</div>
          {/* <span className="col-md-6 cold-sm-12" style={{fontSize: "1.275rem", fontWeight: 600 }}>Client Information</span> */}
          {/* <div className="col-md-6 col-sm-12 pull-right"> */}
		  		<div className="kt-form kt-form--label-right">
					<div className="kt-portlet__body">
						<div className="kt-section kt-section--first">
 							<div className="kt-section__body">
								 <div className ='row'>
									 {status !=='' ?<div className="col-md-12">
										<Alert variant='danger'>
											{status}
										</Alert>
									</div>:<div></div>}
								 </div>
								<div className="form-group row">
									<label className="col-xl-3 col-lg-3 col-form-label">Avatar</label>
									<div className="col-lg-9 col-xl-6">
										<div className="kt-avatar kt-avatar--outline" id="kt_user_avatar" style={{backgroundImage: showImage !== "" ? `url(${showImage})` : ( avatar === "" ? `url(${default_img})` : `url(${avatar})` ), backgroundSize: "cover"}}>
											<div className="kt-avatar__holder"></div>
                							{/* <label className="kt-avatar__upload" data-toggle="kt-tooltip" title="" data-original-title="Change avatar">
												<i className="fa fa-pen"></i>
												<input type="file" name="profile_avatar" accept=".png, .jpg, .jpeg"  onChange={handleFileChange} required={true}/>
											</label>
							                <span className="kt-avatar__cancel" data-toggle="kt-tooltip" title="" data-original-title="Cancel avatar" onClick={cancelAvatar}>
												<i className="fa fa-times"></i>
											</span> */}
										</div>
										{/* <span className="form-text text-muted">Allowed file types: png, jpg, jpeg.</span> */}
									</div>
								</div>
								{props.role === 2 ?
								<div className="form-group row">
									<label className="col-xl-3 col-lg-3 col-form-label">Category</label>
									<div className="col-lg-9 col-xl-6">
										<select className="form-control" id="exampleSelectl" value={category} onChange={ (e) => setCategory(e.target.value) }>
										{categoryarr.map((row,index) => (
											<option key={row._id} value={row._id}>{row.name}</option>
										))}
										</select>
									</div>
								</div> : <></>}
                <div className="form-group row">
									<label className="col-xl-3 col-lg-3 col-form-label">Budget</label>
									<div className="col-lg-9 col-xl-6">
									<input className="form-control" type="text" value={bidBudget} disabled />
									</div>
								</div>
                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">Cover letter</label>
                  <div className="col-lg-9 col-xl-6">
                    <textarea className="form-control"  rows="4"value={content} disabled></textarea>
                  </div>
								</div>
                <div className="row">
                  <label className="col-xl-3"></label>
                  <div className="col-lg-9 col-xl-6">
                    <h3 className="kt-section__title kt-section__title-sm">Nurse Info:</h3>
                  </div>
                </div>
								<div className="form-group row">
									<label className="col-xl-3 col-lg-3 col-form-label">Title</label>
									<div className="col-lg-9 col-xl-6">
									<input className="form-control" type="text" value={title} disabled />
									</div>
								</div>
								<div className="form-group row">
									<label className="col-xl-3 col-lg-3 col-form-label">Name</label>
									<div className="col-lg-9 col-xl-6">
									<input className="form-control" type="text" value={name} disabled/>
									</div>
								</div>
								{/* <div className="form-group row">
								<label className="col-xl-3 col-lg-3 col-form-label">Phone</label>
								<div className="col-lg-9 col-xl-6">
									<div className="input-group">
									<div className="input-group-prepend"><span className="input-group-text"><i className="la la-phone"></i></span></div>
									<input type="text" className="form-control" placeholder="Phone" aria-describedby="basic-addon1" value={phone} onChange={ (e) => setPhone(e.target.value) }/>
									</div>
									<span className="form-text text-muted">We'll never share your email with anyone else.</span>
								</div>
								</div>
								<div className="form-group row">
								<label className="col-xl-3 col-lg-3 col-form-label">Email Address</label>
								<div className="col-lg-9 col-xl-6">
									<div className="input-group">
									<div className="input-group-prepend"><span className="input-group-text"><i className="la la-at"></i></span></div>
									<input type="text" className="form-control" placeholder="Email" aria-describedby="basic-addon1"value={email} onChange={ (e) => setEmail(e.target.value) }/>
									</div>
								</div>
								</div> */}
								{/* <div className="form-group row">
              <label className="col-xl-3 col-lg-3 col-form-label">Location</label>
              <div className="col-lg-9 col-xl-6">
                <select className="form-control" id="exampleSelectl1" value={location} onChange={ (e) => setLocation(e.target.value) }>
                    <option value=''>Select Location</option>
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
            </div>
								<div className="form-group row">
								<label className="col-xl-3 col-lg-3 col-form-label">Address</label>
								<div className="col-lg-9 col-xl-6">
									<input className="form-control" type="text" value={address} onChange={ (e) => setAddress(e.target.value) }/>
								</div>
								</div> */}
								<div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">Summary</label>
                  <div className="col-lg-9 col-xl-6">
                    <textarea className="form-control"  rows="4"value={summary} disabled></textarea>
                  </div>
								</div>
								<div className="form-group  row">
									<label className="col-xl-3 col-lg-3 col-form-label">Salary</label>
									<div className="col-lg-9 col-xl-6">
									<div className="input-group">
										<input type="number" className="form-control" min="1" value={salary} disabled/>
										<div className="input-group-append"><span className="input-group-text">$</span></div>
									</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="kt-portlet__foot">
						<div className="kt-form__actions">
							<div className="row">
 								<div className="col-lg-3 col-xl-3">
 								</div>
 								<div className="col-lg-9 col-xl-9">
									<Link to="/myprofile/bid-list"><button className="btn btn-secondary pull-right">Back</button></Link>
                  <button className="" style={{marginRight: 10}} onClick={()=>handleChatNow()} className={`btn btn-primary pull-right`}>
										Chat now
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
            {/* <div className="form-group form-group-last row">
            <label className="col-xl-3 col-lg-3 col-form-label">Password</label>
            <div className="col-lg-9 col-xl-6">
              <input className="form-control" type="password" value={password} onChange={ (e) => setPassword(e.target.value) }/>
            </div>
          </div> */}
          {/* <div className="row ProfileOneRow">
            <div className="col-md-12">
              <label htmlFor="recipient-name" className="col-md-3 ProfileLeftLabel" >Income Ledger</label>
              <input type="number" className="col-md-5 ProfileRightLabel" value={incomeLedger} onChange={ (e) => setIncomeLedger(e.target.value) } maxLength={40} />
            </div>
          </div>

          <div className="row ProfileOneRow">
            <div className="col-md-12">
              <label htmlFor="recipient-name" className="col-md-3 ProfileLeftLabel" >Expensive Ledger</label>
              <input type="number" className="col-md-5 ProfileRightLabel" value={expensiveLedger} onChange={ (e) => setExpensiveLedger(e.target.value) } maxLength={40} />
            </div>
          </div> */}

        </div>
      </div>
    </div>
	</div>
  );
}

const mapStateToProps = (state) => ({
  user:state.auth.user,
  role:state.auth.role,
  allcategories:state.category.allcategories,
  curbid:state.bid.curbid
})

export default connect(
    mapStateToProps,
    {...authDuck.actions, ...userDuck.actions,...categoryDuck.actions, ...bidDuck.actions}
)(BidDetail);
