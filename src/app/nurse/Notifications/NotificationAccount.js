import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import swal from "sweetalert";
import { Alert } from "react-bootstrap";
import clsx from "clsx";
import { useHistory } from "react-router-dom";

import * as actions from "../../../actions";
import * as authDuck from "../../../store/ducks/auth.duck";
import * as activityDuck from "../../../store/ducks/activity.duck";
import * as userDuck from "../../../store/ducks/user.duck";

import { storage } from "../../../firebase";
import default_img from "./../../../assets/certificationlogo.png";
import { Link } from "react-router-dom";

function NotificationAccount(props) {
  const [status, setStatus] = useState("");
  const [id, setId] = useState("");
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [ndate, setDate] = useState(new Date());
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
    setId(props.curcertification.nurseId._id || "");
    setAvatar(props.curcertification.avatar || "");
    setName(props.curcertification.name || "");
    setDate(props.curcertification.date || new Date());
  }, [props]);

  // const cancel = () => {

  // setPassword(getPassword(props.user.password));
  // }

  const save = () => {
    if (file === null || name === "") {
      setStatus("You have to input all the correctly info");
      return;
    }
    var tempData = {
      name: name,
    };
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
              Object.assign(tempData, { avatar: url });
              handleSave(tempData);
            });
        });
    } else {
      handleSave(tempData);
    }
  };
  const handleSave = (result) => {
    enableLoading();
    setTimeout(() => {
      if (id === "") {
        actions
          .addCertification(result)
          .then((res) => {
            disableLoading();
            let { data } = res;
            if (!data.success) {
              setStatus(data.errMessage);
              return;
            } else {
              setStatus("");
              console.log("succesfull");
              props.allNotifications(data.notifications);
              history.push("/admin/certification");
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
          .updateCertification(result)
          .then((res) => {
            disableLoading();
            let { data } = res;
            if (!data.success) {
              setStatus(data.errMessage);
              return;
            } else {
              console.log("succesfull");
              props.allNotifications(data.notifications);
              history.push("/admin/certification");
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
            Certification Information
          </span>
          <div className="col-md-6 col-sm-12 pull-right">
            <Link to="/admin/certification">
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
              {"Update"}
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
              <div
                className="kt-avatar kt-avatar--outline"
                id="kt_user_avatar"
                style={{
                  backgroundImage:
                    showImage !== ""
                      ? `url(${showImage})`
                      : avatar === ""
                      ? `url(${default_img})`
                      : `url(${avatar})`,
                  backgroundSize: "cover",
                }}
              >
                <div className="kt-avatar__holder"></div>
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
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">
              Certificatoin Name
            </label>
            <div className="col-lg-9 col-xl-6">
              <input
                className="form-control"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">
              Received Date
            </label>
            <div className="col-lg-9 col-xl-6">
              <input
                className="form-control"
                type="date"
                value={ndate}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  curuser: state.user.curuser,
  curcertification: state.user.curcertification,
});

export default connect(mapStateToProps, {
  ...authDuck.actions,
  ...activityDuck.actions,
  ...userDuck.actions,
})(NotificationAccount);
