import React, { useState, useEffect } from "react";
import bacImage from "../../assets/Global-Nursing-Education-Market.jpg";
import Header from "../../nurse/layout/Header";
import Footer from "../../nurse/layout/Footer";
import { MenuItem, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import { Config } from "./../../config/config";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Pagination from "@material-ui/lab/Pagination";

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
  searchBtn: {
    display: "block",
    border: "none",
    color: "#fff",
    backgroundColor: "#11b719",
    borderRadius: "4px",
    transition: "all 300ms linear",
    height: "50px",
    lineHeight: "50px",
    width: "100%",
  },
}));

const SearchNurses = () => {
  const classes = useStyles();

  const [nurses, setNurses] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // useEffect(() => {
  //   async function fetchNurses() {
  //     const { data } = await axios.get(`${Config.api_url}all/nurses`);
  //     console.log("NURSE DATA", data);
  //     setNurses(data);
  //   }
  //   fetchNurses();
  //   console.log("search data", search);
  //   console.log("url", Config.api_url);
  // }, []);

  const handleSearchNurse = async () => {
    // alert("Clicked");
    const { data } = await axios.get(
      `${Config.api_url}search-nurse?search=${search}`
    );
    console.log("SEARCH DATA", data);
    setNurses(data);
  };

  return (
    <>
      <Header />
      <section
        className="apus-breadscrumb"
        style={{ backgroundImage: `url(${bacImage})` }}
      >
        <div className="container">
          <div className="wrapper-breads">
            <div className="left-inner"></div>
            <div className="breadscrumb-inner clearfix">
              <h2 className="bread-title">Search Nurses</h2>
            </div>
          </div>
        </div>
      </section>

      <section className="jobs" style={{ backgroundColor: "white" }}>
        <div className="container my-5">
          <FormGroup row>
            <div className="col-lg-8 col-xs-12">
              <div className="row">
                <div className="col-md-12">
                  <TextField
                    id="standard-bare"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                    placeholder="Search Nurse"
                    inputProps={{ "aria-label": "bare" }}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-xs-12 mt-2">
              <button className={classes.searchBtn} onClick={handleSearchNurse}>
                Search
              </button>
            </div>
          </FormGroup>
        </div>
      </section>

      <section style={{ backgroundColor: "white" }}>
        <div className="container mb-5">
          <div className="row">
            <div className="jobs-wrapper items-wrapper">
              <div className="style-list-jobs">
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                    {search && (
                      <TableHead>
                        <TableRow>
                          <TableCell>Profile Photo</TableCell>
                          <TableCell>First Name</TableCell>
                          <TableCell>Last Name</TableCell>
                          {/* <TableCell>Email</TableCell>
                          <TableCell>Phone Number</TableCell> */}
                          <TableCell>Summary</TableCell>
                          <TableCell>Salary</TableCell>
                          <TableCell>Zipcode</TableCell>
                        </TableRow>
                      </TableHead>
                    )}
                    {nurses
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => {
                        console.log(row);
                        return (
                          <>
                            <TableBody>
                              <TableRow>
                                <TableCell component="th" scope="row">
                                  {row.profilePhoto ? (
                                    <img
                                      src={row.profilePhoto}
                                      alt={row.firstName}
                                      width="50px"
                                      height="50px"
                                    />
                                  ) : (
                                    "No Image"
                                  )}
                                </TableCell>
                                <TableCell scope="row">
                                  {row.firstName}
                                </TableCell>
                                <TableCell>{row.lastName}</TableCell>
                                {/* <TableCell>
                                  {row.permission == 1
                                    ? row.email
                                    : "Can't See Email"}
                                </TableCell>
                                <TableCell>
                                  {row.permission == 1
                                    ? row.phoneNumber
                                    : "Can't See Phone Number"}
                                </TableCell> */}
                                <TableCell>
                                  {row.summary ? row.summary : "No Summary"}
                                </TableCell>
                                <TableCell>
                                  {row.salary ? row.salary : "No Salary"}
                                </TableCell>
                                <TableCell>
                                  {row.zipcode ? row.zipcode : "No Zipcode"}
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </>
                        );
                      })}
                  </Table>
                </TableContainer>
              </div>
            </div>
            {nurses.length > rowsPerPage ? (
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
                  {(page + 1) * rowsPerPage <= nurses.length ? (
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
                  {(page + 1) * rowsPerPage <= nurses.length ? (
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
};

export default SearchNurses;
