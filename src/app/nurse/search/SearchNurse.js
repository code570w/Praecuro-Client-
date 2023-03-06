import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../nurse/layout/Header";
import Footer from "../../nurse/layout/Footer";
import { connect } from "react-redux";
import "./SearchNurse.scss";
import BreadCrumb from "../layout/BreadCrumb";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import * as actions from "../../../app/actions";
import * as authDuck from "../../../app/store/ducks/auth.duck";
import * as activityDuck from "../../../app/store/ducks/activity.duck";
import * as categoryDuck from "../../../app/store/ducks/category.duck";
import * as userDuck from "../../../app/store/ducks/user.duck";
import * as bidDuck from "../../../app/store/ducks/bid.duck";

import default_img from "./../../assets/default_profile.png";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

import urlserver from "../../../../src/app/config/urlserver";
import api_key from "../../../../src/app/config/api_key";
import bacImage from "../../assets/Global-Nursing-Education-Market.jpg";
import { Config } from "../../config/config";
// import io from 'socket.io-client';
// window.socket = socket;
// let token = localStorage.getItem('token')
// const socket = io('http://localhost:4000');
// console.log('tokrn',socket);
// socket.on('connect', () => {
//     console.log('connect_aa');
//     socket.emit('authenticate', {token});
// })

const marks1 = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 100,
    label: "5",
  },
];

const marks = [
  {
    value: 0,
    label: "0 $",
  },
  {
    value: 100,
    label: "10000 $",
  },
];

function valuetext(value) {
  return `${value} $`;
}

function valueLabelFormat(value) {
  return value * 100;
}

function valueLabelFormat1(value) {
  //   console.log('value',value / 20);
  return value / 20;
}

function SearchNurse(props) {
  console.log("SEARCH NURSE PROPS", props);
  console.log("ALLNURSE PROPS", props.allNurses);
  const dispatch = useDispatch();
  const [addsnack, setAddsnack] = React.useState(false);
  const [minValue, setMinValue] = React.useState(0);
  const [subText, setSubText] = React.useState("");
  const [advanceflag, setAdvanceflag] = React.useState(false);
  const [allcategory, setAllcategory] = React.useState([]);
  const [filterCategory, setFilterCategory] = React.useState("All Category");
  const [filterMiles, setFilterMiles] = React.useState("Miles");
  // const [filterLocation, setFilterLocation] = React.useState('All Locations');
  const [filterRangeBudget, setFilterRangeBudget] = React.useState([0, 100]);
  const [filterReview, setFilterReview] = React.useState([0, 0]);
  const [allnurses, setAllnurses] = React.useState([]);
  const [selected, setSelected] = React.useState();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const history = useHistory();
  const [values, setValues] = React.useState({
    name: "Cat in the Hat",
    age: "",
    multiline: "Controlled",
    currency: "EUR",
  });

  //   const filterBtn = () => {
  //     var obj = {};
  //     if (subText !== "") Object.assign(obj, { subText: subText });
  //     Object.assign(obj, { category: filterCategory });
  //     // Object.assign(obj, {'location':filterLocation});
  //     Object.assign(obj, { review: 1 });
  //     Object.assign(obj, { budget: 1 });
  //     console.log("obj", obj);
  //     setSelected(obj);
  //     var tempArr = props.nurses;
  //     //   allnurses

  //     tempArr = tempArr.filter((sub) => {
  //       console.log("sub", sub);

  //       //   console.log(filterCategory)
  //       // && sub.title.indexOf(obj['subText'])=== -1
  //       if (obj["subText"]) return false;
  //       if (
  //         filterCategory !== "All Category" &&
  //         sub.category &&
  //         sub.category._id !== filterCategory
  //       )
  //         return false;
  //       if (
  //         filterRangeBudget[1] * 100 < sub.salary &&
  //         filterRangeBudget[0] * 100 > sub.salary
  //       )
  //         return false;
  //       return true;
  //     });
  //     // console.log('2)')
  //     // console.log(tempArr)

  //     setAllnurses(tempArr);
  //     console.log("-- filter --");
  //     //   console.log(props.nurses)
  //     // console.log(alljobs)
  //   };

  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField1: {
      marginLeft: "5px",
      marginRight: "5px",
    },
    textField: {
      marginLeft: theme.spacing(0),
      marginRight: theme.spacing(0),
      marginTop: "8px",
      marginBottom: "8px",
    },
    dense: {
      marginTop: theme.spacing(2),
    },
    menu: {
      width: 200,
    },
    termps_check: {
      marginRight: "3px",
    },
  }));

  const removeOneSelect = (key) => {
    var obj = selected;
    delete obj[key];
    handleClearAll();
    //   setSelected(obj);
  };

  function handleAddsnackClose() {
    setAddsnack(false);
  }

  const chatNow = (row) => {
    console.log("--- Chat Now Button --", row);
    dispatch({ type: "CREATE_ROOM", counterpart: `${row._id}_nurse` });
    // alert('hiii1');
  };

  // const chatNow = (row) => {
  //     return {
  //       onTodoClick: (row) => {
  //         dispatch({type: 'CREATE_ROOM', counterpart: row._id})
  //       }
  //     }
  //   }

  const handleClearAll = () => {
    setSelected(null);
    setFilterCategory("All Category");
    setFilterMiles("Miles");
    // setFilterLocation('All Locations')
    setFilterRangeBudget([0, 100]);
    setFilterReview([0, 100]);
    setSubText("");
    setAllnurses(props.nurses || []);
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
  }

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, allnurses.length - page * rowsPerPage);

  const classes = useStyles();

  const filterNurse = () => {
    const filReview = [0, filterReview[1] / 20];
    const filRangeBudge = [0, filterRangeBudget[1] * 100];
    const zipcode = props.user.zipCode;
    console.log("ZIPCODE", zipcode);

    fetch(
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        zipcode +
        "&key=" +
        api_key,
      {
        method: "POST",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        debugger;
        getNurses(
          data,
          subText,
          filterCategory,
          filReview,
          filRangeBudge,
          filterMiles
        );
      });
  };

  function getlocations(zipcode) {
    // var zipcode = 695564;
    //   const address="421306";
    fetch(
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        zipcode +
        "&key=" +
        api_key,
      {
        method: "POST",
        // headers:{'Content-type':'application/json'}
      }
    )
      .then((response) => response.json())
      .then((data) => {
        debugger;
        // console.log(data);
        getNurses(data);
        //   const latitude = data.results.geometry.location.lat;
        //   const longitude = data.results.geometry.location.lng;
        //   console.log({latitude, longitude})
      });
  }

  function getNurses(
    data,
    subText,
    filterCategory,
    filReview,
    filRangeBudge,
    filterMiles
  ) {
    fetch(`${Config.api_url}getNursesLat_lon`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        data: data,
        subText: subText,
        filterCategory: filterCategory,
        filReview: filReview,
        filRangeBudge: filRangeBudge,
        filterMiles: filterMiles,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        debugger;
        console.log("GET NURSES", data);
        if (data.success) {
          console.log(data.nurses);
          setAllnurses(data.nurses || []);
        } else {
          setAllnurses([]);
        }
      });
  }

  // function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  //     var R = 6371; // Radius of the earth in km
  //     var dLat = deg2rad(lat2-lat1);  // deg2rad below
  //     var dLon = deg2rad(lon2-lon1);
  //     var a =
  //       Math.sin(dLat/2) * Math.sin(dLat/2) +
  //       Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
  //       Math.sin(dLon/2) * Math.sin(dLon/2)
  //       ;
  //     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  //     var d = R * c; // Distance in km
  //     return d;
  //   }

  //   function deg2rad(deg) {
  //     return deg * (Math.PI/180)
  //   }

  useEffect(() => {
    console.log("fv", props.user.zipCode);
    getlocations(props.user.zipCode);
    setAllcategory(props.allcategories || []);
    // setAllnurses(props.nurses || []);
  }, [props]);

  function redirectNursesProfile(id) {
    actions
      .getNurseDetails(id)
      .then((res) => {
        //   let {data} = res;
        if (res.data) {
          dispatch({
            type: "GET_NURSES_DETAILS",
            nurses_details: res.data.nurses,
          });
          window.open("/nurses-details", "_blank");
        } else {
          alert("Something went wrong.");
        }
      })
      .catch((err) => {});
  }

  //    const address="421306";
  //     fetch("https://maps.googleapis.com/maps/api/geocode/json?address="+address+'&key=AIzaSyDodGrKWomGNUKvOKMhRF2iXetiTHBMDHU')
  //     .then(response => response.json())
  //     .then(data => {
  //         console.log(data);
  //   const latitude = data.results.geometry.location.lat;
  //   const longitude = data.results.geometry.location.lng;
  //   console.log({latitude, longitude})
  // })

  // console.log('props',allnurses);
  // var lat = '';
  // var lng = '';
  // var address = {zipcode} or {city and state};
  // var address = '421306';
  // const google = window.google;
  // var geocoder = new google.maps.Geocoder();
  // geocoder.geocode( { 'address': address}, function(results, status) {
  //   if (status == google.maps.GeocoderStatus.OK) {
  //  lat = results[0].geometry.location.lat();
  //  lng = results[0].geometry.location.lng();
  // } else {
  //     alert("Geocode was not successful for the following reason: " + status);
  //   }
  // });
  // alert('Latitude: ' + lat + ' Logitude: ' + lng);

  //   const zipcode = 695564;
  //   fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,
  //   +Mountain+View,+CA&key=AIzaSyDodGrKWomGNUKvOKMhRF2iXetiTHBMDHU`,{
  //     method: "GET",
  //     headers: {
  //         "Content-Type": "application/json" // request content type
  //       },
  //   }).then(response=>{
  //     let json = response.json();
  //     console.log('json',json);
  //   })

  return (
    <>
      <Header />
      {/* <BreadCrumb title="Nurse Directory" base="Home"/> */}

      <section
        className="apus-breadscrumb"
        style={{ backgroundImage: `url(${bacImage})` }}
      >
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
              <h2 className="bread-title">Nurse Directory</h2>
            </div>
          </div>
        </div>
      </section>

      <section
        className="jobs widget-filter-top"
        style={{ backgroundColor: "white" }}
      >
        <div className="container">
          <FormGroup row>
            <div className="col-lg-9 col-xs-12">
              <div className="row">
                <div className="col-md-4">
                  <TextField
                    id="standard-bare"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    value={subText}
                    onChange={(e) => {
                      setSubText(e.target.value);
                    }}
                    placeholder="e.g. talented job"
                    inputProps={{ "aria-label": "bare" }}
                  />
                </div>
                <div className="col-md-4">
                  <TextField
                    id="outlined-select-currency"
                    select
                    placeholder="Category"
                    className={classes.textField}
                    value={filterCategory}
                    onChange={(e) => {
                      setFilterCategory(e.target.value);
                    }}
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu,
                      },
                    }}
                    margin="normal"
                    variant="outlined"
                  >
                    <MenuItem key="All Category" value="All Category">
                      Filter by Category
                    </MenuItem>
                    {allcategory.map((option) => (
                      <MenuItem key={option._id} value={option._id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                {/* ----------------- */}

                <div className="col-md-4">
                  <TextField
                    id="outlined-select-currency"
                    select
                    placeholder="Miles"
                    className={classes.textField}
                    value={filterMiles}
                    onChange={(e) => {
                      setFilterMiles(e.target.value);
                    }}
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu,
                      },
                    }}
                    margin="normal"
                    variant="outlined"
                  >
                    <MenuItem key="Miles" value="Miles">
                      {" "}
                      Select Miles
                    </MenuItem>
                    <MenuItem key="1" value="25">
                      25 Miles
                    </MenuItem>
                    <MenuItem key="2" value="50">
                      50 Miles
                    </MenuItem>
                    <MenuItem key="3" value="75">
                      75 Miles
                    </MenuItem>
                    <MenuItem key="4" value="100">
                      100 Miles
                    </MenuItem>
                    <MenuItem key="5" value="150">
                      150 Miles
                    </MenuItem>
                    <MenuItem key="6" value="200">
                      200 Miles
                    </MenuItem>
                    <MenuItem key="7" value="250">
                      250 Miles
                    </MenuItem>
                    <MenuItem key="8" value="500">
                      500 Miles
                    </MenuItem>
                  </TextField>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-xs-12 margin-auto">
              <div className="flex-middle space-bottom-15">
                <div className="visiable-line">
                  {/* filterBtn */}
                  <button
                    className="button btn btn-theme-second"
                    onClick={filterNurse}
                  >
                    Filter
                  </button>
                </div>
                <a
                  href="#"
                  className="toggle-adv visiable-line btn button"
                  onClick={() => {
                    advanceflag ? setAdvanceflag(false) : setAdvanceflag(true);
                  }}
                >
                  <i className="fas fa-cog"></i>
                  Advance
                </a>
              </div>
            </div>
            {advanceflag ? (
              <div className="row" style={{ width: "100%" }}>
                <div className="col-lg-4 col-xs-12 margin-auto">
                  <Typography id="track-inverted-range-slider" gutterBottom>
                    Review Rating
                  </Typography>
                  <Slider
                    // track="inverted"
                    aria-labelledby="track-inverted-range-slider"
                    valueLabelFormat={valueLabelFormat1}
                    valueLabelDisplay="auto"
                    step={20}
                    value={filterReview}
                    onChange={(event, value) => {
                      setFilterReview(value);
                    }}
                    marks={marks1}
                  />
                </div>
                <div className="col-lg-4 col-xs-12 margin-auto">
                  <Typography id="track-inverted-range-slider" gutterBottom>
                    Budget Range
                  </Typography>
                  <Slider
                    // track="inverted"
                    aria-labelledby="track-inverted-range-slider"
                    valueLabelFormat={valueLabelFormat}
                    getAriaValueText={valuetext}
                    valueLabelDisplay="auto"
                    value={filterRangeBudget}
                    onChange={(event, value) => {
                      setFilterRangeBudget(value);
                    }}
                    marks={marks}
                  />
                </div>
              </div>
            ) : (
              <div />
            )}
          </FormGroup>
        </div>
      </section>
      <section style={{ backgroundColor: "white" }}>
        <div className="container jobSecond">
          {selected ? (
            <div className="row">
              <div className="results-filter-wrapper" style={{ width: "100%" }}>
                <h3 className="title">Your Selected</h3>
                <div className="inner">
                  <ul className="results-filter">
                    {Object.keys(selected).map((key) =>
                      key !== "review" && key !== "budget" ? (
                        <li>
                          <a
                            onClick={(e) => {
                              removeOneSelect(key);
                            }}
                          >
                            <span className="close-value">x</span>
                            {selected[key]}
                          </a>
                        </li>
                      ) : key === "review" ? (
                        <li>
                          <a
                            onClick={(e) => {
                              removeOneSelect("review");
                            }}
                          >
                            <span className="close-value">x</span>Review:{" "}
                            {filterReview[0] / 20} ~ {filterReview[1] / 20}
                          </a>
                        </li>
                      ) : (
                        <li>
                          <a
                            onClick={(e) => {
                              removeOneSelect("budget");
                            }}
                          >
                            <span className="close-value">x</span>Budget:{" "}
                            {filterRangeBudget[0] * 100}$ ~{" "}
                            {filterRangeBudget[1] * 100}$
                          </a>
                        </li>
                      )
                    )}
                    {/* <li><a><span className="close-value">x</span>All</a></li> */}
                  </ul>
                  <a onClick={handleClearAll}>
                    <i className="fas fa-trash-alt"></i>
                    Clear all
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
          <div className="row">
            <div
              className="jobs-alert-ordering-wrapper"
              style={{ width: "100%" }}
            >
              <div className="results-count">
                Showing {page * rowsPerPage + 1} –{" "}
                {allnurses.length >= (page + 1) * rowsPerPage
                  ? (page + 1) * rowsPerPage
                  : allnurses.length}{" "}
                of {allnurses.length} results
              </div>
              <div
                className="jobs-ordering-wrapper"
                style={{ display: "flex" }}
              >
                <TextField
                  id="outlined-select-currency"
                  select
                  placeholder="Category"
                  className={classes.textField1}
                  value={rowsPerPage}
                  onChange={(e) => {
                    setRowsPerPage(e.target.value);
                    setPage(0);
                  }}
                  margin="normal"
                  variant="outlined"
                >
                  <MenuItem key="5 Per Pages" value={5}>
                    5 Per Pages
                  </MenuItem>
                  <MenuItem key="10 Per Pages" value={10}>
                    10 Per Pages
                  </MenuItem>
                </TextField>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="jobs-wrapper items-wrapper">
              {allnurses
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  console.log(row);
                  return (
                    <div key={index} className="style-list-jobs">
                      <article
                        id="post-549"
                        className="job-list map-item job-style-inner post-549 job_listing type-job_listing status-publish has-post-thumbnail hentry job_listing_type-internship job_listing_category-retail job_listing_location-new-york job_listing_tag-digital job_listing_tag-interviews job_listing_tag-jobs job_listing_tag-media"
                        data-latitude="40.776629"
                        data-longitude="-73.952531"
                      >
                        {/* <div className="featured-urgent-label">
                                <span className="featured label-no-icon">Featured</span>
                                    <span className="urgent">Urgent</span>
                                </div> */}
                        {/* https://www.demoapus-wp1.com/workio/candidate/meg-cabot/ */}
                        {/* myprofile/overview  */}
                        <div className="flex-middle-sm job-list-container">
                          <div className="candidate-logo candidate-thumbnail">
                            <a onClick={() => redirectNursesProfile(row._id)}>
                              <div className="image-wrapper image-loaded">
                                <img
                                  width="180"
                                  height="180"
                                  src={
                                    row.profilePhoto === ""
                                      ? default_img
                                      : row.profilePhoto
                                  }
                                  className="attachment-workio-logo-size size-workio-logo-size unveil-image"
                                  alt=""
                                  sizes="(max-width: 180px) 100vw, 180px"
                                />
                              </div>
                            </a>
                          </div>
                          <div className="job-information">
                            <div className="title-wrapper">
                              <h2 className="job-title">
                                <a href="#" rel="bookmark">
                                  {row.firstName + " " + row.lastName}
                                </a>
                              </h2>
                            </div>
                            <div className="job-employer-info-wrapper">
                              <h3 className="employer-title">
                                <a href="#">{row.title}</a>
                              </h3>
                              <div className="job-salary">
                                $
                                <span className="price-text">{row.salary}</span>{" "}
                                / month
                              </div>
                              <div className="job-types">
                                <div className="job-type with-title">
                                  <a
                                    className="type-job"
                                    href="https://www.demoapus-wp1.com/workio/job-type/internship/"
                                    style={{ color: "#63ace5" }}
                                  >
                                    {row.summary}
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* <div className="job-location with-icon">
                                        <i className="ti-location-pin"></i>
                                        <a href="#">
                                            {row.address}
                                        </a>
                                    </div>             */}
                          <div className="deadline-time">
                            Application ends: <strong>October 1, 2025</strong>
                          </div>
                          {/* if(window.confirm('Do you want to chat ?')){
                                            chatNow(row);
                                            window.location="/messages";
                                            }; */}
                          {/* <Link to="/messages" onClick={()=>chatNow(row)} className="btn btn-apply btn-apply-job-internal-required">Chat Now<i className="next flaticon-right-arrow"></i></Link> */}

                          <a
                            href="/messages"
                            onClick={() => chatNow(row)}
                            className="btn btn-apply btn-apply-job-internal-required"
                          >
                            Chat Now
                            <i className="next flaticon-right-arrow"></i>
                          </a>

                          {/* <a href="#" className="btn btn-apply btn-apply-job-internal-required">Apply Now<i className="next flaticon-right-arrow"></i></a> */}
                          <Snackbar
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "center",
                            }}
                            open={addsnack}
                            autoHideDuration={2000}
                            onClose={handleAddsnackClose}
                            ContentProps={{
                              "aria-describedby": "message-id",
                            }}
                            message={
                              <span id="message-id">Please login firstly!</span>
                            }
                          />
                          <div
                            className="job-apply-internal-required-wrapper"
                            style={{ display: "none" }}
                          >
                            <div className="msg-inner">
                              Please login with "Candidate" to apply
                            </div>
                          </div>
                        </div>
                      </article>
                    </div>
                  );
                })}
            </div>
            {allnurses.length > rowsPerPage ? (
              <div
                className="jobs-pagination-wrapper main-pagination-wrapper"
                style={{ margin: "auto" }}
              >
                <ul className="pagination">
                  {page >= 1 ? (
                    <li>
                      <a
                        className="prev page-numbers"
                        onClick={() => {
                          setPage(page - 1);
                        }}
                      >
                        <i className="fas fa-chevron-left"></i>
                      </a>
                    </li>
                  ) : (
                    <></>
                  )}
                  {page >= 1 ? (
                    <li>
                      <a
                        className="page-numbers"
                        onClick={() => {
                          setPage(page - 1);
                        }}
                      >
                        {page}
                      </a>
                    </li>
                  ) : (
                    <></>
                  )}
                  <li>
                    <span className="page-numbers current">{page + 1}</span>
                  </li>
                  {(page + 1) * rowsPerPage <= allnurses.length ? (
                    <li>
                      <a
                        className="page-numbers"
                        onClick={() => {
                          setPage(page + 1);
                        }}
                      >
                        {page + 2}
                      </a>
                    </li>
                  ) : (
                    <></>
                  )}
                  {(page + 1) * rowsPerPage <= allnurses.length ? (
                    <li>
                      <a
                        className="next page-numbers"
                        onClick={() => {
                          setPage(page + 1);
                        }}
                      >
                        <i className="fas fa-chevron-right"></i>
                      </a>
                    </li>
                  ) : (
                    <></>
                  )}
                </ul>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
// console.log(state);
const mapStateToProps = (state) => ({
  nurses: state.user.nurses,
  allcategories: state.category.allcategories,
  user: state.auth.user,
  bids: state.bid.bids,
});

export default connect(mapStateToProps, {
  ...authDuck.actions,
  ...activityDuck.actions,
  ...userDuck.actions,
  ...categoryDuck.actions,
})(SearchNurse);
