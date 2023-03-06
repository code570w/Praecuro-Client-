// import React from "react";
// import { connect} from "react-redux";
// import * as authDuck from "./../../../store/ducks/auth.duck";
// function PersonalInfo(props){
//     return(
//         <div className="kt-grid__item kt-grid__item--fluid kt-app__content">
// 									<div className="row">
// 										<div className="col-xl-12">
// 											<div className="kt-portlet">
// 												<div className="kt-portlet__head">
// 													<div className="kt-portlet__head-label">
// 														<h3 className="kt-portlet__head-title">Personal Information <small>update your personal informaiton</small></h3>
// 													</div>
// 												</div>
// 												<form className="kt-form kt-form--label-right">
// 													<div className="kt-portlet__body">
// 														<div className="kt-section kt-section--first">
// 															<div className="kt-section__body">
// 																<div className="row">
// 																	<label className="col-xl-3"></label>
// 																	<div className="col-lg-9 col-xl-6">
// 																		<h3 className="kt-section__title kt-section__title-sm">Customer Info:</h3>
// 																	</div>
// 																</div>
// 																<div className="form-group row">
// 																	<label className="col-xl-3 col-lg-3 col-form-label">Avatar</label>
// 																	<div className="col-lg-9 col-xl-6">
// 																		<div className="kt-avatar kt-avatar--outline" id="kt_user_avatar">
// 																			<div className="kt-avatar__holder" ></div>
// 																			<label className="kt-avatar__upload" data-toggle="kt-tooltip" title="" data-original-title="Change avatar">
// 																				<i className="fa fa-pen"></i>
// 																				<input type="file" name="profile_avatar" accept=".png, .jpg, .jpeg"/>
// 																			</label>
// 																			<span className="kt-avatar__cancel" data-toggle="kt-tooltip" title="" data-original-title="Cancel avatar">
// 																				<i className="fa fa-times"></i>
// 																			</span>
// 																		</div>
// 																	</div>
// 																</div>
// 																<div className="form-group row">
// 																	<label className="col-xl-3 col-lg-3 col-form-label">First Name</label>
// 																	<div className="col-lg-9 col-xl-6">
// 																		<input className="form-control" type="text"/>
// 																	</div>
// 																</div>
// 																<div className="form-group row">
// 																	<label className="col-xl-3 col-lg-3 col-form-label">Last Name</label>
// 																	<div className="col-lg-9 col-xl-6">
// 																		<input className="form-control" type="text"/>
// 																	</div>
// 																</div>
// 																<div className="form-group row">
// 																	<label className="col-xl-3 col-lg-3 col-form-label">Company Name</label>
// 																	<div className="col-lg-9 col-xl-6">
// 																		<input className="form-control" type="text"/>
// 																		<span className="form-text text-muted">If you want your invoices addressed to a company. Leave blank to use your full name.</span>
// 																	</div>
// 																</div>
// 																<div className="row">
// 																	<label className="col-xl-3"></label>
// 																	<div className="col-lg-9 col-xl-6">
// 																		<h3 className="kt-section__title kt-section__title-sm">Contact Info:</h3>
// 																	</div>
// 																</div>
// 																<div className="form-group row">
// 																	<label className="col-xl-3 col-lg-3 col-form-label">Contact Phone</label>
// 																	<div className="col-lg-9 col-xl-6">
// 																		<div className="input-group">
// 																			<div className="input-group-prepend"><span className="input-group-text"><i className="la la-phone"></i></span></div>
// 																			<input type="text" className="form-control" placeholder="Phone" aria-describedby="basic-addon1"/>
// 																		</div>
// 																		<span className="form-text text-muted">We'll never share your email with anyone else.</span>
// 																	</div>
// 																</div>
// 																<div className="form-group row">
// 																	<label className="col-xl-3 col-lg-3 col-form-label">Email Address</label>
// 																	<div className="col-lg-9 col-xl-6">
// 																		<div className="input-group">
// 																			<div className="input-group-prepend"><span className="input-group-text"><i className="la la-at"></i></span></div>
// 																			<input type="text" className="form-control" placeholder="Email" aria-describedby="basic-addon1"/>
// 																		</div>
// 																	</div>
// 																</div>
// 																<div className="form-group form-group-last row">
// 																	<label className="col-xl-3 col-lg-3 col-form-label">Company Site</label>
// 																	<div className="col-lg-9 col-xl-6">
// 																		<div className="input-group">
// 																			<input type="text" className="form-control" placeholder="Username"/>
// 																			<div className="input-group-append"><span className="input-group-text">.com</span></div>
// 																		</div>
// 																	</div>
// 																</div>
// 															</div>
// 														</div>
// 													</div>
// 													<div className="kt-portlet__foot">
// 														<div className="kt-form__actions">
// 															<div className="row">
// 																<div className="col-lg-3 col-xl-3">
// 																</div>
// 																<div className="col-lg-9 col-xl-9">
// 																	<button type="reset" className="btn btn-success">Submit</button>&nbsp;
// 																	<button type="reset" className="btn btn-secondary">Cancel</button>
// 																</div>
// 															</div>
// 														</div>
// 													</div>
// 												</form>
// 											</div>
// 										</div>
// 									</div>
// 								</div>
//     );
// }
// const mapStateToProps = (state) => ({
//     user: state.auth.user,
//      role:state.auth.role
//   })
// export default connect(
//     mapStateToProps,
//     {...authDuck.actions}
// )(PersonalInfo);


import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
// import swal from 'sweetalert';
import { Alert } from "react-bootstrap";
import clsx from 'clsx';
import { useHistory } from "react-router-dom";

import * as actions from '../../../../app/actions';
import * as authDuck from '../../../../app/store/ducks/auth.duck';
import * as categoryDuck from '../../../../app/store/ducks/category.duck';
// import * as activityDuck from '../../../../app/store/ducks/activity.duck';
import * as userDuck from '../../../../app/store/ducks/user.duck';

import {storage} from './../../../../app/firebase';
import default_img from './../../../assets/default_profile.png';
import { Link } from "react-router-dom";
import moment from 'moment';

// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

function PersonalInfo(props) {
  const [status, setStatus] = useState('');
  const [id, setId] = useState('');
  const [avatar, setAvatar] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  // const [location, setLocation] = useState('');
  // const [location, setLocation] = useState('US');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [phone, setPhone] = useState('');
  const [salary, setSalary] = useState(10);
  const [summary, setSummary] = useState('');
  const [dateOfBirth, setDateOfBirth]=useState(new Date());
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
 
  // const disabled=(props.user.permission==1) ? true:false;
  const [disable, setDisable] = useState(false);


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
    
    
    setId(props.user._id || '');
    setAvatar(props.user.profilePhoto || '');
   

    setTitle(props.user.title || '')
    setEmail(props.user.email || '');
    setFirst(props.user.firstName || '');
    setLast(props.user.lastName || '');
    setDateOfBirth( props.user.dateOfBirth || new Date());
    // setLocation(props.user.location || 'US');
    // setLocation(props.user.location || '');
    setAddress(props.user.address || '');
    setCity(props.user.city || '');
    setState(props.user.state || '');
    setZipCode(props.user.zipCode || '');
    setPhone(props.user.phoneNumber || '');
    setSalary(props.user.salary || 1);
	setSummary(props.user.summary || '');
	if(props.role === 2){
		setCategoryarr(props.allcategories);
		if(props.user.category)
			setCategory(props.user.category || '');
		else
			setCategory(props.allcategories[0]._id);
	}

  setDisable(props.user.permission==0);

  }, [props])

  //  console.log('props',props.user);

  // console.log('props.user',props.user.permission);

  
  // const cancel = () => {
    
    // setPassword(getPassword(props.user.password));
  // }
  // console.log(avatar,'hiii11')
  const save = () => {
     if(email === '' || first === '' || last=== '' || phone=== ''){
      setStatus('You have to input all the correctly info')
      return;
    }
    // if(id=== '' && password === ''){
    //   setStatus('You have to input all the correctly info')
    //   return;
    // }
    var tempData = {
	   email: email,
      firstName: first,
      address:address,
      phoneNumber:phone,
      summary:summary,
    };
    if(id !== '')
	  Object.assign(tempData, {'_id':id});
	if(props.role === 2){
    Object.assign(tempData,{'title':title})
    Object.assign(tempData,{'category':category})
    Object.assign(tempData,{'lastName':last})
    Object.assign(tempData,{'salary':salary})
    Object.assign(tempData,{'dateOfBirth':dateOfBirth})}
  if(props.role == 1){
    Object.assign(tempData,{'city':city})
    Object.assign(tempData,{'zipCode':zipCode})
    Object.assign(tempData,{'state':state})
  }
      if(file !== null){
        const uploadTask  = storage.ref(`images/${file.name}`).put(file).then(
          url=>{
            storage.ref(`images/${file.name}`)
            .getDownloadURL()
            .then(url=>{
              console.log('-- file --')
              console.log(url)
              Object.assign(tempData,{'profilePhoto':url});
              handleSave(tempData)
            })
          }
        );
        // uploadTask.on(
        //   ()=>{
           
        //   }
        // )
      }else{
        handleSave(tempData)
      }
 

    
    // let updateUser = {
    //   email: email,
    //   password: password,
    //   // avatar: uploadInput.files.length > 0 ? uploadInput.files[0].name : avatar,
    //   // incomeLedger: incomeLedger,
    //   // expensiveLedger: expensiveLedger,
    // };
    // var myJSON = JSON.stringify(updateUser)
    // let data = new FormData();
    // data.append('file', uploadInput.files.length > 0 ? uploadInput.files[0] : null);
    // data.append('fileName', avatar);
    // data.append('jsonAdmin',myJSON);

    // if(uploadInput.files.length > 0) {
    //   actions.updateAdminAvatar(data)
    //     .then(res => {
    //       let {data} = res;
    //       if(!data.success) {
    //         swal("", data.errMessage, "error");
    //       }
    //     })
    // }

    // actions.updateAdmin(data)
    //   .then(res => {
    //     let {data} = res;
    //     if(!data.success) {
    //       return;
    //     }
    //     props.updateRealUser(data.admin);
    //     props.allActivities(data.activities);
    //     swal("", "Your profile was updated successfully.", "success");
    //   })
  }
  const handleSave=(result)=>{

     enableLoading();
    setTimeout(() => {
		if(props.role === 1){
				actions.updateClient(result).then(res=>{
			disableLoading();
			let {data} = res;
			if(!data.success){
			setStatus(data.errMessage);
			return;
			}else{
			console.log('succesfull')
			props.allClients(data.clients);
			props.updateRealUser(data.curuser)
			history.push("/myprofile/overview");
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
			actions.updateNurse(result).then(res=>{
				disableLoading();
				let {data} = res;
				if(!data.success){
				setStatus(data.errMessage);
				return;
				}else{
				console.log('succesfull')
				props.allNurses(data.nurses);
				props.updateRealUser(data.curuser)
				history.push("/myprofile/overview");
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
  const handleFileChange = (event) => {
 
    setFile(event.target.files[0])
    event.target.files[0] !== undefined
      ? setShowImage(URL.createObjectURL(event.target.files[0]))
      : setShowImage("")
  }

  const cancelAvatar = (event) => {
    console.log(showImage)
 
    setShowImage("");
    setFile(null);
    setAvatar("");
  }

  

  // console.log(title,'google');

  // console.log(avatar,'ggggggg222');
  // console.log(dateOfBirth,'date');

  // const NewDate = moment(dateOfBirth, 'DD-MM-YYYY');
  const NewDate =  moment(dateOfBirth).format('YYYY-MM-DD');
  
 
  // const dateaa=dateOfBirth.getDate() + "/"+ parseInt(dateOfBirth.getMonth()+1) +"/"+dateOfBirth.getFullYear();
  // setDisable(props.user.permission==1);

  

 
  // console.log(NewDate);
  // const [startDate, setStartDate] = useState(new Date());
  return (
    
	<div className="kt-grid__item kt-grid__item--fluid kt-app__content">
    <div className="row" style={{backgroundColor: "white"}}>
        <div className="col-md-12">
			<div className="kt-portlet">
				<div className="kt-portlet__head">
					<div className="kt-portlet__head-label">
						<h3 className="kt-portlet__head-title">{props.role === 2 ? 'Personal ':'Business '} Information <small>update your {props.role === 2 ? 'personal ':'business '} informaiton</small></h3>
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
                 {/* showImage !== "" ? `url(${showImage})` : */}
								<div className="form-group row">
									<label className="col-xl-3 col-lg-3 col-form-label">Avatar</label>
									<div className="col-lg-9 col-xl-6">
                  {/* style={{backgroundImage: avatar === "" ? `url(${default_img})` : `url(${avatar})`, backgroundSize: "cover"}} */}
										<div className="kt-avatar kt-avatar--outline" id="kt_user_avatar" >
											{/* <div className="kt-avatar__holder"></div> */}
                      <img src={(avatar === "") ? default_img : avatar} className="kt-avatar__holder" id="kt_user_avatar"  />
                							<label className="kt-avatar__upload" data-toggle="kt-tooltip" title="" data-original-title="Change avatar">
												<i className="fa fa-pen"></i>
												<input type="file" name="profile_avatar" accept=".png, .jpg, .jpeg"  onChange={handleFileChange} required={true}/>
											</label>
							                <span className="kt-avatar__cancel" data-toggle="kt-tooltip" title="" data-original-title="Cancel avatar" onClick={cancelAvatar}>
												<i className="fa fa-times"></i>
											</span>
										</div>
										<span className="form-text text-muted">Allowed file types: png, jpg, jpeg.</span>
									</div>
								</div>
								{props.role === 2 ?<>
								<div className="form-group row">
									<label className="col-xl-3 col-lg-3 col-form-label">Nurse Type</label>
									<div className="col-lg-9 col-xl-6">
                  {/* {disable} */}
                  {/* isDisabled={permission} */}
										<select className="form-control" disabled={disable} id="exampleSelectl" value={category} onChange={ (e) => setCategory(e.target.value) }  >
										{categoryarr.map((row,index) => (
											<option key={row._id} value={row._id}>{row.name}</option>
										))}
										</select>
									</div>
								</div>
								<div className="form-group row">
									<label className="col-xl-3 col-lg-3 col-form-label">Title</label>
									<div className="col-lg-9 col-xl-6">
									<input className="form-control" type="text" value={title} onChange={ (e) => setTitle(e.target.value) }/>
									</div>
								</div> </>: <></>}
								<div className="form-group row">
									<label className="col-xl-3 col-lg-3 col-form-label">{props.role === 2 ? 'First Name':'Business Name'}</label>
									<div className="col-lg-9 col-xl-6">
									<input className="form-control" type="text" value={first} onChange={ (e) => setFirst(e.target.value) }/>
									</div>
								</div>
                {props.role ===2 ?
								<div className="form-group row">
								<label className="col-xl-3 col-lg-3 col-form-label">Last Name</label>
								<div className="col-lg-9 col-xl-6">
									<input className="form-control" type="text" value={last} onChange={ (e) => setLast(e.target.value) }/>
								</div>
								</div>: <></>}
								<div className="form-group row">
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
								</div>
               
								
                {props.role === 2 ?
                <div className="form-group  row">
									<label className="col-xl-3 col-lg-3 col-form-label">Date of Birth</label>
									<div className="col-lg-9 col-xl-6">
									<div className="input-group">
										<input type="date" className="form-control" value={NewDate} onChange={ (e) => setDateOfBirth(e.target.value) }/>
                    {/* <DatePicker className="form-control" selected={NewDate} onChange={ (e) => setDateOfBirth(e.target.value) } /> */}
                	</div>
									</div>
								</div>:<></>}
                {props.role === 1 ?<>
                  <div className="form-group row">
								<label className="col-xl-3 col-lg-3 col-form-label">Address</label>
								<div className="col-lg-9 col-xl-6">
									<input className="form-control" type="text" value={address} onChange={ (e) => setAddress(e.target.value) }/>
								</div>
								</div>
                <div className="form-group  row">
									<label className="col-xl-3 col-lg-3 col-form-label">City</label>
									<div className="col-lg-9 col-xl-6">
									<div className="input-group">
										<input type="text" className="form-control"  value={city} onChange={ (e) => setCity(e.target.value) }/>
									</div>
									</div>
								</div>
                <div className="form-group  row">
									<label className="col-xl-3 col-lg-3 col-form-label">State</label>
									<div className="col-lg-9 col-xl-6">
									<div className="input-group">
										<input type="text" className="form-control"  value={state} onChange={ (e) => setState(e.target.value) }/>
									</div>
									</div>
								</div>
                <div className="form-group  row">
									<label className="col-xl-3 col-lg-3 col-form-label">Zip Code</label>
									<div className="col-lg-9 col-xl-6">
									<div className="input-group">
										<input type="text" className="form-control"  value={zipCode} onChange={ (e) => setZipCode(e.target.value) }/>
									</div>
									</div>
								</div>
                </>:<></>}
								<div className="form-group row">
								<label className="col-xl-3 col-lg-3 col-form-label">Summary</label>
								<div className="col-lg-9 col-xl-6">
									<textarea className="form-control"  rows="4"value={summary} onChange={ (e) => setSummary(e.target.value) }></textarea>
								</div>
								</div>
                {props.role === 2 ?
								<div className="form-group  row">
									{/* <label className="col-xl-3 col-lg-3 col-form-label">Salary</label> */}
									<div className="col-lg-9 col-xl-6">
									<div className="input-group">
                  {/* {salary}  type="number" */}
										<input type="hidden" className="form-control" min="1" value="0" onChange={ (e) => setSalary(e.target.value) }/>
										{/* <div className="input-group-append"><span className="input-group-text">$</span></div> */}
									</div>
									</div>
								</div>:<></>}
							</div>
						</div>
					</div>
					<div className="kt-portlet__foot">
						<div className="kt-form__actions">
							<div className="row">
 								<div className="col-lg-3 col-xl-3">
 								</div>
 								<div className="col-lg-9 col-xl-9">
									<Link to="/myprofile/overview"><button className="btn btn-secondary pull-right">Cancel</button></Link>
            						<button className="" style={{marginRight: 10}} onClick={save} className={`btn btn-primary pull-right ${clsx(
											{
												"kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light": loading
											}
											)}`}>
											{id===''?'Add':'Update'}
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
  allcategories:state.category.allcategories
})

export default connect(
    mapStateToProps,
    {...authDuck.actions, ...userDuck.actions,...categoryDuck.actions}
)(PersonalInfo);
