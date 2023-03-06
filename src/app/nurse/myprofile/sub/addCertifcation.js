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
import default_img from './../../../assets/certificationlogo.png';
import { Link } from "react-router-dom";

function AddCertification(props) {
  const [status, setStatus] = useState('');
  const [id, setId] = useState('');
  const [avatar, setAvatar] = useState('');
  const [title, setTitle] = useState('');
  const [dateOfBirth, setDateOfBirth]=useState(new Date());
  const [dateExpiry, setDateExpiry]=useState(new Date());
  const [showImage, setShowImage] = useState("");
  const [showCerImage, setShowCerImage] = useState("");

  const [file, setFile] = useState(null);
  const [certi_file, setCertifiactionFile] = useState(null);

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
    setId(props.user._id || '');
    // setAvatar(props.user.profilePhoto || '');
    // setTitle(props.user.title || '')
    // setDateOfBirth(props.user.dateOfBirth || new Date());
  }, [props])
  const save = () => {
     if(file == null || title == ''){
      setStatus('You have to input all the correctly info')
      return;
    }
    var tempData = {
	   name: title,
     date: dateOfBirth,
     date_expiry: dateExpiry,
    };
    // console.log(certi_file.name);

    if(id !== '')
	  Object.assign(tempData, {'nurseId':id});

    if(certi_file !== null){
      const uploadTask  = storage.ref(`images/${certi_file.name}`).put(certi_file).then(
        url=>{
          storage.ref(`images/${certi_file.name}`)
          .getDownloadURL()
          .then(url=>{
            console.log('-- Certificate file --')
            Object.assign(tempData,{'certificate_avatar':url});
            // Object.assign(tempData,{'certificate_file':url});
            // handleSave(tempData)
          })
        }
      );
    }
 
    if(file !== null){

        const uploadTask  = storage.ref(`images/${file.name}`).put(file).then(
          url=>{
            storage.ref(`images/${file.name}`)
            .getDownloadURL()
            .then(url=>{
              console.log('-- file --')
              console.log(url)
              Object.assign(tempData,{'avatar':url});
              // Object.assign(tempData,{'certificate_file':url});
              handleSave(tempData)
            })
          }
        );
      }else{
        handleSave(tempData)
      }

    // console.log(tempData);
    



  }




  const handleSave=(result)=>{

     enableLoading();
    setTimeout(() => {
			actions.addCertification(result).then(res=>{
				disableLoading();
				let {data} = res;
				if(!data.success){
				setStatus(data.errMessage);
				return;
				}else{
				console.log('succesfull')
				props.allCertifications(data.certifications);
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
    }, 1000);

   
  }



  const handleFileChange = (event) => {
    console.log(event.target.files[0]);
    setFile(event.target.files[0])
    event.target.files[0] !== undefined
      ? setShowImage(URL.createObjectURL(event.target.files[0]))
      : setShowImage("")

      // setCertifiactionFile
  }

  const cancelAvatar = (event) => {
    console.log(showImage)
    setShowImage("");
    setFile(null);
    setAvatar("");
  }

const handleCertification=(event)=>{
  // console.log('handleCertification',event.target.files[0]);
  setCertifiactionFile(event.target.files[0]);

}


  return (
	<div className="kt-grid__item kt-grid__item--fluid kt-app__content">
    <div className="row" style={{backgroundColor: "white"}}>
        <div className="col-md-12">
			<div className="kt-portlet">
				<div className="kt-portlet__head">
					<div className="kt-portlet__head-label">
						<h3 className="kt-portlet__head-title">Add Documents</h3>
					</div>
				</div>
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
									<label className="col-xl-3 col-lg-3 col-form-label">Photo</label>
									<div className="col-lg-9 col-xl-6">
										<div className="kt-avatar kt-avatar--outline" id="kt_user_avatar" style={{backgroundImage: showImage !== "" ? `url(${showImage})` : ( avatar === "" ? `url(${default_img})` : `url(${avatar})` ), backgroundSize: "cover"}}>
											<div className="kt-avatar__holder"></div>
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
								<div className="form-group row">
									<label className="col-xl-3 col-lg-3 col-form-label">Certification Name</label>
									<div className="col-lg-9 col-xl-6">
									<input className="form-control" type="text" value={title} onChange={ (e) => setTitle(e.target.value) }/>
									</div>
								</div>
                <div className="form-group  row">
									<label className="col-xl-3 col-lg-3 col-form-label">Received Date</label>
									<div className="col-lg-9 col-xl-6">
									<div className="input-group">
										<input type="date" className="form-control"  value={dateOfBirth} onChange={ (e) => setDateOfBirth(e.target.value) }/>
									</div>
									</div>
								</div>
                <div className="form-group  row">
									<label className="col-xl-3 col-lg-3 col-form-label">Expiry Date</label>
									<div className="col-lg-9 col-xl-6">
									<div className="input-group">
										<input type="date" className="form-control" onChange={ (e) => setDateExpiry(e.target.value) }/>
									</div>
									</div>
								</div>
                <div className="form-group row">
									<label className="col-xl-3 col-lg-3 col-form-label">Certificate Upload</label>
									<div className="col-lg-9 col-xl-6">
                 
									<input type="file" className="form-control"  accept=".png, .jpg, .jpeg" onChange={handleCertification} required={true}/>
									Allowed file png, jpg, jpeg Certificate.
                  </div>
								</div>
                {/* onChange={(e)=>handleCertification(e.target.value)} */}
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
											Add
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
)(AddCertification);
