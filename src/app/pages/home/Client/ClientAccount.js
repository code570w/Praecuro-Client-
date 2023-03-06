import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import swal from "sweetalert";
import { Alert } from "react-bootstrap";
import clsx from "clsx";
import { useHistory } from "react-router-dom";

import * as actions from "../../../../app/actions";
import * as authDuck from "../../../../app/store/ducks/auth.duck";
import * as activityDuck from "../../../../app/store/ducks/activity.duck";
import * as userDuck from "../../../../app/store/ducks/user.duck";

import { storage } from "./../../../../app/firebase";
import default_img from "./../../../assets/default_profile.png";
import { Link } from "react-router-dom";

function ClientAccount(props) {
  const [status, setStatus] = useState("");
  const [id, setId] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  // const [location, setLocation] = useState('US');
  // const [title, setTitle] = useState('');
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [EINNumber, setEINNumber] = useState("");
  // const [location, setLocation] = useState('');
  const [phone, setPhone] = useState("");
  const [salary, setSalary] = useState(10);
  const [summary, setSummary] = useState("");
  const [password, setPassword] = useState("");
  // const [uploadInput, setUploadInput] = useState(null);
  const [showImage, setShowImage] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingButtonStyle, setLoadingButtonStyle] = useState({
    paddingRight: "2.5rem",
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
    console.log("props.cursur");
    console.log(props.curuser);
    setId(props.curuser._id || "");
    setAvatar(props.curuser.profilePhoto || "");
    // setTitle(props.curuser.title || '')
    setEmail(props.curuser.email || "");
    setFirst(props.curuser.firstName || "");
    setLast(props.curuser.lastName || "");
    setAddress(props.curuser.address || "");
    setPhone(props.curuser.phoneNumber || "");
    setSalary(props.curuser.salary || 1);
    setSummary(props.curuser.summary || "");
    setCity(props.curuser.city || "");
    setState(props.curuser.state || "");
    setZipCode(props.curuser.zipCode || "");
    setEINNumber(props.curuser.EINNumber || "");
  }, [props]);

  // const cancel = () => {

  // setPassword(getPassword(props.user.password));
  // }

  const save = () => {
    if (email === "" || first === "" || phone === "") {
      setStatus("You have to input all the correctly info");
      return;
    }
    if (id === "" && password === "") {
      setStatus("You have to input all the correctly info");
      return;
    }
    var tempData = {
      // title: title,
      email: email,
      firstName: first,
      // lastName: last,
      address: address,
      state: state,
      zipCode: zipCode,
      city: city,
      EINNumber: EINNumber,
      phoneNumber: phone,
      // salary:salary,
      summary: summary,
      password: password,
    };
    if (password === "") delete tempData.password;
    if (id != "") Object.assign(tempData, { _id: id });
    if (file !== null) {
      const uploadTask = storage
        .ref(`images/${file.name}`)
        .put(file)
        .then((url) => {
          storage
            .ref(`images/${file.name}`)
            .getDownloadURL()
            .then((url) => {
              console.log("-- file --");
              console.log(url);
              Object.assign(tempData, { profilePhoto: url });
              handleSave(tempData);
            });
        });
      // uploadTask.on(
      //   ()=>{

      //   }
      // )
    } else {
      handleSave(tempData);
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
  };
  const handleSave = (result) => {
    enableLoading();
    setTimeout(() => {
      if (id === "") {
        actions
          .addClient(result)
          .then((res) => {
            disableLoading();
            let { data } = res;
            if (!data.success) {
              setStatus(data.errMessage);
              return;
            } else {
              setStatus("");
              console.log("succesfull");
              props.allClients(data.clients);
              history.push("/admin/client");
              return;
            }
          })
          .catch(() => {
            //console.log('===  data2  == ')
            disableLoading();
            setStatus("Error!!! you have to check your Database or Connection");
          });
      } else {
        actions
          .updateClient(result)
          .then((res) => {
            disableLoading();
            let { data } = res;
            if (!data.success) {
              setStatus(data.errMessage);
              return;
            } else {
              console.log("succesfull");
              props.allClients(data.clients);
              history.push("/admin/client");
              return;
            }
          })
          .catch(() => {
            //console.log('===  data2  == ')
            disableLoading();
            setStatus("Error!!! you have to check your Database or Connection");
          });
      }
    }, 1000);
  };
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    event.target.files[0] !== undefined
      ? setShowImage(URL.createObjectURL(event.target.files[0]))
      : setShowImage("");
  };

  const cancelAvatar = (event) => {
    console.log(showImage);
    setShowImage("");
    setFile(null);
    setAvatar("");
  };

  return (
    <div
      className="row"
      style={{ backgroundColor: "white", padding: "40px 20px 40px 20px" }}
    >
      <div className="col-md-2"></div>
      <div className="col-md-8">
        <div className="col-md-12">
          <span
            className="col-md-6 cold-sm-12"
            style={{ fontSize: "1.275rem", fontWeight: 600 }}
          >
            Client Information
          </span>
          <div className="col-md-6 col-sm-12 pull-right">
            <Link to="/admin/client">
              <button className="btn btn-secondary pull-right">Cancel</button>
            </Link>
            <button
              style={{ marginRight: 10 }}
              onClick={save}
              className={`btn btn-primary pull-right ${clsx({
                "kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light": loading,
              })}`}
            >
              {id === "" ? "Add" : "Update"}
            </button>
          </div>
        </div>
        <div className="col-md-12" style={{ marginTop: 60 }}>
          {status !== "" ? (
            <div className="col-md-12">
              <Alert variant="danger">{status}</Alert>
            </div>
          ) : (
            <div></div>
          )}
          <div className="row">
            <label
              className="col-xl-3 col-lg-3 col-form-label"
              style={{ paddingLeft: "0.825rem" }}
            >
              Avatar
            </label>
            <div className="col-lg-9 col-xl-6">
              <div className="kt-avatar kt-avatar--outline">
                {/* <div className="kt-avatar__holder"></div> */}
                <img
                  src={
                    showImage !== ""
                      ? showImage
                      : avatar === ""
                      ? default_img
                      : avatar
                  }
                  id="kt_user_avatar"
                  className="kt-avatar--outline kt-avatar__holder"
                />
                <label
                  className="kt-avatar__upload"
                  data-toggle="kt-tooltip"
                  title=""
                  data-original-title="Change avatar"
                >
                  <i className="fa fa-pen"></i>
                  <input
                    type="file"
                    name="profile_avatar"
                    accept=".png, .jpg, .jpeg"
                    onChange={handleFileChange}
                    required={true}
                  />
                </label>
                <span
                  className="kt-avatar__cancel"
                  data-toggle="kt-tooltip"
                  title=""
                  data-original-title="Cancel avatar"
                  onClick={cancelAvatar}
                >
                  <i className="fa fa-times"></i>
                </span>
              </div>
              <span className="form-text text-muted">
                Allowed file types: png, jpg, jpeg.
              </span>
            </div>
          </div>
          {/* <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">Title</label>
            <div className="col-lg-9 col-xl-6">
              <input className="form-control" type="text" value={title} onChange={ (e) => setTitle(e.target.value) }/>
            </div>
          </div> */}
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">
              Business Name
            </label>
            <div className="col-lg-9 col-xl-6">
              <input
                className="form-control"
                type="text"
                value={first}
                onChange={(e) => setFirst(e.target.value)}
              />
            </div>
          </div>
          {/* <div className="form-group row">
              <label className="col-xl-3 col-lg-3 col-form-label">Last Name</label>
              <div className="col-lg-9 col-xl-6">
                <input className="form-control" type="text" value={last} onChange={ (e) => setLast(e.target.value) }/>
              </div>
            </div> */}
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">Phone</label>
            <div className="col-lg-9 col-xl-6">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="la la-phone"></i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Phone"
                  aria-describedby="basic-addon1"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <span className="form-text text-muted">
                We'll never share your email with anyone else.
              </span>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">
              Email Address
            </label>
            <div className="col-lg-9 col-xl-6">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="la la-at"></i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  aria-describedby="basic-addon1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">Address</label>
            <div className="col-lg-9 col-xl-6">
              <input
                className="form-control"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">City</label>
            <div className="col-lg-9 col-xl-6">
              <input
                className="form-control"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">State</label>
            <div className="col-lg-9 col-xl-6">
              <input
                className="form-control"
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">Zip Code</label>
            <div className="col-lg-9 col-xl-6">
              <input
                className="form-control"
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">
              EIN Number
            </label>
            <div className="col-lg-9 col-xl-6">
              <input
                className="form-control"
                type="text"
                value={EINNumber}
                onChange={(e) => setEINNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">Summary</label>
            <div className="col-lg-9 col-xl-6">
              <textarea
                className="form-control"
                rows="4"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              ></textarea>
            </div>
          </div>
          {/* <div className="form-group  row">
                <label className="col-xl-3 col-lg-3 col-form-label">Salary</label>
                <div className="col-lg-9 col-xl-6">
                  <div className="input-group">
                    <input type="number" className="form-control" min="1" value={salary} onChange={ (e) => setSalary(e.target.value) }/>
                    <div className="input-group-append"><span className="input-group-text">$</span></div>
                  </div>
                </div>
              </div> */}
          <div className="form-group form-group-last row">
            <label className="col-xl-3 col-lg-3 col-form-label">Password</label>
            <div className="col-lg-9 col-xl-6">
              <input
                className="form-control"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
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
  );
}

const mapStateToProps = (state) => ({
  curuser: state.user.curuser,
});

export default connect(mapStateToProps, {
  ...authDuck.actions,
  ...activityDuck.actions,
  ...userDuck.actions,
})(ClientAccount);
