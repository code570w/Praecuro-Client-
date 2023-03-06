import React, { useEffect, useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import EditIcon from "@material-ui/icons/Edit";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MySnackbarContentWrapper from "../../pages/home/MySnackBar";
import Avatar from "@material-ui/core/Avatar";
import { connect } from "react-redux";
import * as actions from "../../actions";
import * as userDuck from "../../store/ducks/user.duck";
import { Link } from "react-router-dom";
import default_img from "../../assets/certificationlogo.png";
import Popup_modal_certificate from "../../pages/home/Popup_modal_certificate";
import Modal from "react-modal";
import bacImage from "../../assets/jobset.jpeg";
import Header from "../../nurse/layout/Header";
import Footer from "../../nurse/layout/Footer";
function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const headRows = [
  {
    id: "_id",
    numeric: "left",
    visibility: false,
    disablePadding: true,
    label: "Id",
  },
  {
    id: "avatar",
    numeric: "center",
    visibility: true,
    disablePadding: false,
    label: "Profile",
  },
  {
    id: "nurse",
    numeric: "center",
    visibility: true,
    disablePadding: false,
    label: "Nurse",
  },
  {
    id: "name",
    numeric: "center",
    visibility: true,
    disablePadding: false,
    label: "CertificationName",
  },
  {
    id: "datereceived",
    numeric: "center",
    visibility: true,
    disablePadding: false,
    label: "Date Received (DD/MM/YY)",
  },
  {
    id: "dateexpiry",
    numeric: "center",
    visibility: true,
    disablePadding: false,
    label: "Date Expiry (DD/MM/YY)",
  },
];
const mapStateToProps = (state) => ({
  notifications: state.user.notifications,
  curuser: state.user.curuser,
  curcertification: state.user.curcertification,
});
function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headRows.map((row, index) => (
          <TableCell
            key={row.id}
            align={row.numeric}
            padding={row.disablePadding ? "none" : "default"}
            sortDirection={orderBy === row.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === row.id}
              direction={order}
              onClick={createSortHandler(row.id)}
            >
              {row.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    paddingTop: "0px",
    marginTop: "0px",
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: "1 1 100%",
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: "0 0 auto",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected, selected } = props;
  const [addsnack, setAddsnack] = React.useState(false);
  const [multiremove, setMutliremove] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingButtonStyle, setLoadingButtonStyle] = useState({
    paddingRight: "2.5rem",
  });
  const enableLoading = () => {
    setLoading(true);
    setLoadingButtonStyle({ paddingRight: "3.5rem" });
  };

  const disableLoading = () => {
    setLoading(false);
    setLoadingButtonStyle({ paddingRight: "2.5rem" });
  };
  function handleAddClick() {
    props.setCurClient({});

    // setAdd(true)
  }
  function handleMultiRemoveClick() {
    enableLoading();
    setTimeout(() => {
      actions
        .deleteCertification(selected)
        .then((res) => {
          disableLoading();
          let { data } = res;
          //console.log('===  delete category  == ')
          //console.log(res)
          if (!data.success) {
          } else {
            console.log(data, "this is data");
            props.handleunSelect();
            setMutliremove(true);
            handleMultiRemoveClose();
            actions.getAllNotifications().then((res) => {
              console.log("certnifionca ation");
              let { data } = res;
              if (!data.success) {
                props.allNotifications([]);
              } else {
                props.allNotifications(data.notifications);
              }
            });
          }
        })
        .catch(() => {});
    }, 1000);
  }
  function handleMultiRemoveClose() {
    setMutliremove(false);
  }
  function handleAddsnackClose() {
    setAddsnack(false);
  }
  function handleAddsnackClick() {
    setAddsnack(true);
  }

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete" onClick={handleMultiRemoveClick}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <></>
        )}
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={addsnack}
          autoHideDuration={6000}
          onClose={handleAddsnackClose}
        >
          <MySnackbarContentWrapper
            onClose={handleAddsnackClose}
            variant={"success"}
            message="Added Succesfully!"
          />
        </Snackbar>
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  selected: PropTypes.array,
  allNotifications: PropTypes.func,
  handleunSelect: PropTypes.func,
  setCurUser: PropTypes.func,
};
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(0),
  },
  paper: {
    width: "100%",
    marginTop: theme.spacing(0),

    // marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    overflowX: "auto",
  },
}));

function NotiificationManagement(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [loadingButtonStyle, setLoadingButtonStyle] = useState({
    paddingRight: "2.5rem",
  });
  const enableLoading = () => {
    setLoading(true);
    setLoadingButtonStyle({ paddingRight: "3.5rem" });
  };

  const disableLoading = () => {
    setLoading(false);
    setLoadingButtonStyle({ paddingRight: "2.5rem" });
  };
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(-1);
  const [remove, setRemove] = React.useState(false);
  const [removesnack, setRemovesnack] = React.useState(false);
  const [curid, setCurid] = React.useState("");
  //   const [curdescription,setCurdescription]= React.useState("");
  const [allinfo, setAllinfo] = React.useState([]);

  console.log("aaa_allCertifications" + allinfo);
  // setAllinfo(props.certifications);
  useEffect(() => {
    // console.log('admin_allCertifications'+props.certificationsss)
    setAllinfo(props.notifications);
  }, [props]);

  function handleEditClick(row) {
    props.setCurCertification(row);
  }
  function handleChangeActive(row) {
    enableLoading();
    setTimeout(() => {
      actions
        .updateActiveCertification(row._id)
        .then((res) => {
          disableLoading();
          let { data } = res;
          if (!data.success) {
          } else {
            props.allNotifications(data.notifications);
          }
        })
        .catch(() => {});
    }, 1000);
  }
  function handleRemoveClose() {
    setRemove(false);
  }
  function handleRemoveClick(id) {
    setRemove(true);
    setCurid(id);
  }
  function handleRemoveSnackClick() {
    enableLoading();
    setTimeout(() => {
      actions
        .deleteCertification(curid)
        .then((res) => {
          disableLoading();
          let { data } = res;
          //console.log('===  delete category  == ')
          //console.log(res)
          if (!data.success) {
          } else {
            console.log(data, "this is data");
            handleRemoveClose();
            setRemovesnack(true);
            actions.getAllNotifications().then((res) => {
              console.log("certnifionca ation");
              let { data } = res;
              if (!data.success) {
                props.allNotifications([]);
              } else {
                props.allNotifications(data.notifications);
              }
            });
          }
        })
        .catch(() => {});
    }, 1000);
  }
  function handleRemoveSnackClose() {
    setRemovesnack(false);
  }
  function handleRequestSort(event, property) {
    const isDesc = orderBy === property && order === "desc";
    setOrder(isDesc ? "asc" : "desc");
    setOrderBy(property);
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      const newSelecteds = allinfo.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }
  function handleunSelect() {
    setSelected([]);
  }

  function handleClick(event, name) {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  }

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
  }

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, allinfo.length - page * rowsPerPage);

  const [modalIsOpen, setIsOpen] = React.useState({
    key: "",
    bool: false,
    img: "",
    received_date: "",
    date_expiry: "",
  });

  console.log(modalIsOpen);

  return (
    <>
      <div className="table__notification">
        <Header />
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
                <h2 className="bread-title">Notifications</h2>
              </div>
            </div>
          </div>
        </section>
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <EnhancedTableToolbar
              numSelected={selected.length}
              selected={selected}
              allNotifications={props.allNotifications}
              handleunSelect={handleunSelect}
              setCurUser={props.setCurUser}
            />
            <div className={classes.tableWrapper}>
              <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                size={"medium"}
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={allinfo.length}
                />
                <TableBody>
                  {stableSort(allinfo, getSorting(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row._id);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      const customStyles = {
                        content: {
                          top: "50%",
                          left: "50%",
                          right: "auto",
                          bottom: "auto",
                          marginRight: "-50%",
                          transform: "translate(-50%, -50%)",
                          width: "60%",
                        },
                      };

                      var received_date = row.date;
                      var objectDate = new Date(received_date);
                      var objectDate1Arr = objectDate
                        .toLocaleDateString()
                        .split("/");
                      received_date =
                        objectDate1Arr[0] +
                        "/" +
                        objectDate1Arr[1] +
                        "/" +
                        objectDate1Arr[2];

                      var date_expiry = row.date_expiry;
                      if (typeof date_expiry !== "undefined") {
                        var objectDate2 = new Date(date_expiry);
                        var objectDate2Arr = objectDate2
                          .toLocaleDateString()
                          .split("/");

                        date_expiry =
                          objectDate2Arr[0] +
                          "/" +
                          objectDate2Arr[1] +
                          "/" +
                          objectDate2Arr[2];
                      } else {
                        date_expiry = "";
                      }

                      // function closeModal() {
                      //   setIsOpen(false);
                      // }

                      // const closePops=()=>{
                      //       setIsOpen({'key':row._id,'bool':false});
                      //     }

                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row._id}
                          selected={isItemSelected}
                        >
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            {index + 1}
                          </TableCell>
                          <TableCell>
                            <Avatar
                              alt="avatar"
                              src={row.avatar === "" ? default_img : row.avatar}
                              className={classes.avatar}
                            />
                          </TableCell>
                          <TableCell align="center">
                            {row.nurseId ? row.nurseId.email : "None"}
                            {row.nurseId.email}
                          </TableCell>
                          <TableCell align="center">{row.name}</TableCell>
                          <TableCell align="center">{received_date}</TableCell>
                          <TableCell
                            align="center"
                            class="text-danger MuiTableCell-root MuiTableCell-body MuiTableCell-alignCenter"
                          >
                            {date_expiry}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 49 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </Paper>
          {/* Delete Dialog */}
          <Dialog
            open={remove}
            onClose={handleRemoveClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Delete Alert?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Do you want to delete this Certification member?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleRemoveClose} color="primary">
                Disagree
              </Button>
              <Button
                onClick={handleRemoveSnackClick}
                color="primary"
                autoFocus
                className={`btn btn-primary btn-elevate kt-login__btn-primary ${clsx(
                  {
                    "kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light": loading,
                  }
                )}`}
              >
                Agree
              </Button>
            </DialogActions>
          </Dialog>
          <Snackbar
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={removesnack}
            autoHideDuration={6000}
            onClose={handleRemoveSnackClose}
          >
            <MySnackbarContentWrapper
              onClose={handleRemoveSnackClose}
              variant={"success"}
              message="Removed Successfully!"
            />
          </Snackbar>
        </div>
        <Footer />
      </div>
    </>
  );
}

// console.log('gh',{...userDuck.actions.allCertifications})
export default connect(mapStateToProps, { ...userDuck.actions })(
  NotiificationManagement
);
