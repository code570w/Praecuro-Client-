import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import swal from "sweetalert";
import { Alert } from "react-bootstrap";
import clsx from "clsx";
import { useHistory } from "react-router-dom";

import * as actions from "../../../../app/actions";
import * as authDuck from "../../../../app/store/ducks/auth.duck";
import * as activityDuck from "../../../../app/store/ducks/activity.duck";
import * as categoryDuck from "../../../../app/store/ducks/category.duck";
import * as userDuck from "../../../../app/store/ducks/user.duck";

import { storage } from "./../../../../app/firebase";
import { TextField } from "@material-ui/core";
// import {Config} from "../../../../app/config/config";
import default_img from "../../../assets/default_profile.png";
import { Link } from "react-router-dom";

function Account(props) {
  const [status, setStatus] = useState("");
  const [id, setId] = useState("");
  const [avatar, setAvatar] = useState("");
  // const [uploadFile, setUploadFile] = useState([]);
  const [urls, setUrls] = useState([]);
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [location, setLocation] = useState("US");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [salary, setSalary] = useState(10);
  const [category, setCategory] = useState("");
  const [summary, setSummary] = useState("");
  const [password, setPassword] = useState("");
  // const [uploadInput, setUploadInput] = useState(null);
  const [showImage, setShowImage] = useState("");
  const [file, setFile] = useState(null);
  const [uploadFile, setUploadFile] = useState(null);
  const [categoryarr, setCategoryarr] = useState([]);
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
    console.log("PROPS", props);
    setId(props.curuser._id || "");
    setAvatar(props.curuser.profilePhoto || "");
    // setUploadFile(props.curuser.uploadCertificates || "");
    setTitle(props.curuser.title || "");
    setEmail(props.curuser.email || "");
    setFirst(props.curuser.firstName || "");
    setLast(props.curuser.lastName || "");
    setAddress(props.curuser.address || "");
    setLocation(props.curuser.location || "");
    setPhone(props.curuser.phoneNumber || "");
    setSalary(props.curuser.salary || 1);
    setCategoryarr(props.allcategories);

    if (props.curuser.category) setCategory(props.curuser.category || "");
    else setCategory(props.allcategories[0]._id);

    setSummary(props.curuser.summary || "");
    // setEmail(props.user.email);
    // setPassword(getPassword(props.user.password));
    // console.log("dddddddd");
    console.log(props.allcategories);
  }, [props]);

  // const cancel = () => {
  // setPassword(getPassword(props.user.password));
  // }

  const save = () => {
    if (
      email === "" ||
      category === "" ||
      first === "" ||
      last === "" ||
      phone === ""
    ) {
      setStatus("You have to input all the correctly info");
      return;
    }

    if (id === "" && password === "") {
      setStatus("You have to input all the correctly info");
      return;
    }

    var tempData = {
      title: title,
      email: email,
      category: category,
      location: location,
      firstName: first,
      lastName: last,
      address: address,
      phoneNumber: phone,
      salary: salary,
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
          .addNurse(result)
          .then((res) => {
            disableLoading();
            let { data } = res;
            if (!data.success) {
              setStatus(data.errMessage);
              return;
            } else {
              setStatus("");
              console.log("succesfull");
              props.allNurses(data.nurses);
              history.push("/admin/nurse");
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
          .updateNurse(result)
          .then((res) => {
            disableLoading();
            // debugger;
            let { data } = res;
            if (!data.success) {
              setStatus(data.errMessage);
              return;
            } else {
              console.log("succesfull");
              props.allNurses(data.nurses);
              debugger;
              history.push("/admin/nurse");
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

  // UPLOAD FILE WHEN UPDATING NURSE
  // const handleChange = (e) => {
  //   for (let i = 0; i < e.target.files.length; i++) {
  //     const newImage = e.target.files[i];
  //     // newImage["id"] = Math.random();
  //     setUploadFile((prevState) => [...prevState, newImage]);
  //   }
  //   // setFile(event.target.files[0]);
  //   // event.target.files[0] !== undefined
  //   //   ? setShowImage(URL.createObjectURL(event.target.files[0]))
  //   //   : setShowImage("");
  // };

  // const handleUpload = (e) => {
  //   const promises = [];
  //   uploadFile.map((file) => {
  //     console.log({ file });
  //     // const blob = new Blob([file], { type: "mime" });
  //     const fileData = new File([file], file.name, { type: file.type });
  //     const uploadTask = storage.ref(`uploads/${file.name}`).put(fileData);
  //     promises.push(uploadTask);
  //     uploadTask.on(
  //       "state_changed",
  //       (snapshot) => {
  //         const progress = Math.round(
  //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //         );
  //         alert(progress);
  //       },
  //       (error) => {
  //         console.log(error);
  //       },
  //       async () => {
  //         await storage
  //           .ref(`uploads/${file.name}`)
  //           .getDownloadURL()
  //           .then((urls) => {
  //             // Object.assign(tempData, { uploadCertificates: urls });
  //             // handleSave(tempData);
  //             setUrls((prevState) => [...prevState, urls]);
  //           });
  //       }
  //     );
  //   });

  //   Promise.all(promises)
  //     .then(() => alert("All images uploaded"))
  //     .catch((err) => console.log(err));
  // };

  // const handleUpload = () => {
  //   alert("clicked");

  //   const promises = [];
  //   debugger;
  //   uploadFile.map((file) => {
  //     // console.log("file", file);
  //     const uploadTask = storage.ref(`uploads/${file.name}`).put(file);
  //     promises.push(uploadTask);
  //     uploadTask.on(
  //       "state_changed",
  //       (snapshot) => {
  //         const progress = Math.round(
  //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //         );

  //         alert(progress);
  //       },
  //       (error) => {
  //         console.log(error);
  //       },
  //       async () => {
  //         await storage
  //           .ref(`uploads/${file.name}`)
  //           .getDownloadURL()
  //           .then((urls) => {
  //             setUrls((prevState) => [...prevState, urls]);
  //           });
  //       }
  //     );
  //   });

  //   Promise.all(promises)
  //     .then(() => alert("All images uploaded"))
  //     .catch((err) => console.log(err));
  // };

  // const handleUpload = (e) => {
  //   const promises = [];
  //   uploadFile.map((file) => {
  //     const fileData = new File([file], file.name, { type: file.type });
  //     const uploadTask = storage.ref(`uploads/${file.name}`).put(fileData);
  //     promises.push(uploadTask);
  //     uploadTask.on(
  //       "state_changed",
  //       (snapshot) => {
  //         const progress = Math.round(
  //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //         );
  //         alert(progress);
  //       },
  //       (error) => {
  //         console.log(error);
  //       },
  //       async () => {
  //         await storage
  //           .ref(`uploads/${file.name}`)
  //           .getDownloadURL()
  //           .then((url) => {
  //             console.log();
  //             // if (url) { // check if url is truthy before adding to array
  //             setUrls((prevState) => [...prevState, url]);
  //             // }
  //           });
  //       }
  //     );
  //   });

  //   Promise.all(promises)
  //     .then(() => alert("All images uploaded"))
  //     .catch((err) => console.log(err));
  // };

  // console.log("upload Files: ", uploadFile);
  // console.log("urls", urls);

  // const handleUpload = (e) => {
  //   const files = Array.from(e.target.files);
  //   const promises = [];
  //   files.forEach((file) => {
  //     const uploadTask = storage.ref(`uploads/${file.name}`).put(file);
  //     promises.push(uploadTask);
  //     uploadTask.on(
  //       "state_changed",
  //       (snapshot) => {
  //         const progress =
  //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //         console.log(`Upload is ${progress}% done`);
  //       },
  //       (error) => {
  //         console.log(error);
  //       },
  //       async () => {
  //         await uploadTask.snapshot.ref.getDownloadURL().then((url) => {
  //           console.log("URL", url);
  //           console.log(setUrls((prevState) => [...prevState, url]));
  //           setUrls((prevState) => [...prevState, url]);
  //         });
  //       }
  //     );
  //   });
  //   Promise.all(promises)
  //     .then(() => alert("All images uploaded"))
  //     .catch((err) => console.log(err));
  // };

  const handleUpload = (e) => {
    let tempData = {
      title: title,
      email: email,
      category: category,
      location: location,
      firstName: first,
      lastName: last,
      address: address,
      phoneNumber: phone,
      salary: salary,
      summary: summary,
      password: password,
    };

    if (password === "") delete tempData.password;

    if (id != "") Object.assign(tempData, { _id: id });

    const files = Array.from(e.target.files);
    console.log("FILES", files);
    const promises = [];
    const downloadUrls = [];

    files.forEach((file) => {
      console.log({ file });
      const uploadTask = storage.ref(`uploads/${file.name}`).put(file);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.log(error);
        },
        async () => {
          const downloadUrl = await uploadTask.snapshot.ref.getDownloadURL();
          downloadUrls.push(downloadUrl);
        }
      );
    });

    Promise.all(promises)
      .then(() => {
        // All files have been uploaded, update the data and save it to MongoDB
        const updatedData = { ...tempData, uploadCertificates: downloadUrls };
        handleSave(updatedData);
      })
      .catch((err) => console.log(err));
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
            Nurse Information
          </span>
          <div className="col-md-6 col-sm-12 pull-right">
            <Link to="/admin/nurse">
              <button className="btn btn-secondary pull-right">Cancel</button>
            </Link>
            <button
              className=""
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

          {/* <div className="row ProfileOneRow">
            <div className="col-md-12">
              <label htmlFor="recipient-name" className="col-md-3 ProfileLeftLabel" >Email</label>
              <input type="text" className="col-md-5 ProfileRightLabel" value={email} onChange={ (e) => setEmail(e.target.value) } maxLength={40} />
              <input type="text" className="col-md-5 ProfileRightLabel" value={email} onChange={ (e) => setEmail(e.target.value) } maxLength={40} />
              <div className="col-md-5">
                <TextField
                      id="nurseName"
                      label="New Nurse Name"
                      variant="outlined"
                      inputProps={{ "aria-label": "bare" }}
                      name="email"
                  />
              </div>
            </div>
          </div> */}

          {/* <div className="row ProfileOneRow">
            <div className="col-md-12">
              <label htmlFor="recipient-name" className="col-md-3 ProfileLeftLabel" >Password</label>
              <input type="text" className="col-md-5 ProfileRightLabel" value={password} onChange={ (e) => setPassword(e.target.value) } maxLength={40} />
            </div>
          </div> */}
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">Category</label>
            <div className="col-lg-9 col-xl-6">
              <select
                className="form-control"
                id="exampleSelectl"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categoryarr.map((row, index) => (
                  <option key={row._id} value={row._id}>
                    {row.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">Title</label>
            <div className="col-lg-9 col-xl-6">
              <input
                className="form-control"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">
              First Name
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
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">
              Last Name
            </label>
            <div className="col-lg-9 col-xl-6">
              <input
                className="form-control"
                type="text"
                value={last}
                onChange={(e) => setLast(e.target.value)}
              />
            </div>
          </div>
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
            <label className="col-xl-3 col-lg-3 col-form-label">Location</label>
            <div className="col-lg-9 col-xl-6">
              <select
                className="form-control"
                id="exampleSelectl1"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="">Select Location</option>
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
                <option value="CD">
                  Congo, the Democratic Republic of the
                </option>
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
                <option value="KP">
                  Korea, Democratic People's Republic of
                </option>
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
                <option value="MK">
                  Macedonia, the former Yugoslav Republic of
                </option>
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
                <option value="SH">
                  Saint Helena, Ascension and Tristan da Cunha
                </option>
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
                <option value="GS">
                  South Georgia and the South Sandwich Islands
                </option>
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
              <input
                className="form-control"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
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
          <div className="form-group  row">
            <label className="col-xl-3 col-lg-3 col-form-label">Salary</label>
            <div className="col-lg-9 col-xl-6">
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  min="1"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                />
                <div className="input-group-append">
                  <span className="input-group-text">$</span>
                </div>
              </div>
            </div>
          </div>
          {id === "" ? (
            ""
          ) : (
            <>
              <div className="form-group row">
                <label className="col-xl-3 col-lg-3 col-form-label">
                  Upload File
                </label>
                <div className="col-lg-9 col-xl-6">
                  <div className="input-group">
                    <input
                      type="file"
                      className="form-control"
                      // accept=".pdf,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      multiple
                      // onChange={handleChange}
                      onChange={handleUpload}
                    />
                  </div>
                </div>
              </div>
            </>
          )}

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
  allcategories: state.category.allcategories,
  curuser: state.user.curuser,
});

export default connect(mapStateToProps, {
  ...authDuck.actions,
  ...activityDuck.actions,
  ...userDuck.actions,
  ...categoryDuck.actions,
})(Account);
