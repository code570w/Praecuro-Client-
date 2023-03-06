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
import MySnackbarContentWrapper from "./../MySnackBar";
import Avatar from "@material-ui/core/Avatar";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import * as userDuck from "../../../store/ducks/user.duck";
import { Link } from "react-router-dom";
import default_img from "./../../../assets/default_profile.png";

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
    id: "profilePhoto",
    numeric: "center",
    visibility: true,
    disablePadding: false,
    label: "Profile",
  },
  {
    id: "email",
    numeric: "center",
    visibility: true,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "firstName",
    numeric: "center",
    visibility: true,
    disablePadding: false,
    label: "Business Name",
  },
  // { id: 'lastName', numeric: 'center', visibility:true,disablePadding: false, label: 'Last Name' },
  //   { id: 'title', numeric: 'center', visibility:true,disablePadding: false, label: 'Title' },
  {
    id: "address",
    numeric: "center",
    visibility: true,
    disablePadding: false,
    label: "Address",
  },
  // { id: 'location', numeric: 'center', visibility:true,disablePadding: false, label: 'Location' },
  {
    id: "phoneNumber",
    numeric: "center",
    visibility: true,
    disablePadding: false,
    label: "Phone",
  },
  {
    id: "createDate",
    numeric: "center",
    visibility: true,
    disablePadding: false,
    label: "Created",
  },
  {
    id: "modifyDate",
    numeric: "center",
    visibility: true,
    disablePadding: false,
    label: "Modified",
  },
  {
    id: "active",
    numeric: "center",
    visibility: true,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "hide",
    numeric: "center",
    visibility: true,
    disablePadding: false,
    label: "Hide Nurse Data",
  },
  {
    id: "action",
    numeric: "right",
    visibility: true,
    disablePadding: false,
    label: "Actions",
  },
];
const mapStateToProps = (state) => ({
  clients: state.user.clients,
  curuser: state.user.curuser,
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
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "Select all desserts" }}
          />
        </TableCell>
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
    props.setCurUser({});

    // setAdd(true)
  }
  function handleMultiRemoveClick() {
    enableLoading();
    setTimeout(() => {
      actions
        .deleteClients(selected)
        .then((res) => {
          disableLoading();
          let { data } = res;
          //console.log('===  delete category  == ')
          //console.log(res)
          if (!data.success) {
          } else {
            props.handleunSelect();
            setMutliremove(true);
            handleMultiRemoveClose();
            props.allClients(data.clients);
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
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            Client Management
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete" onClick={handleMultiRemoveClick}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Add Client">
            {/* <IconButton aria-label="AddCircleOutlineIcon" onClick={handleAddClick}>
              <AddCircleOutlineIcon />
            </IconButton> */}
            <Link to="/admin/client/create_edit">
              <IconButton
                aria-label="AddCircleOutlineIcon"
                onClick={handleAddClick}
              >
                <AddCircleOutlineIcon />
              </IconButton>
            </Link>
          </Tooltip>
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
  allClients: PropTypes.func,
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

function ClientManagement(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [loadingButtonStyle, setLoadingButtonStyle] = useState({
    paddingRight: "2.5rem",
  });
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [remove, setRemove] = React.useState(false);
  const [removesnack, setRemovesnack] = React.useState(false);
  const [curid, setCurid] = React.useState("");
  //   const [curdescription,setCurdescription]= React.useState("");
  const [allinfo, setAllinfo] = React.useState([]);

  useEffect(() => {
    setAllinfo(props.clients);
  }, [props]);

  const enableLoading = () => {
    setLoading(true);
    setLoadingButtonStyle({ paddingRight: "3.5rem" });
  };

  const disableLoading = () => {
    setLoading(false);
    setLoadingButtonStyle({ paddingRight: "2.5rem" });
  };

  function handleEditClick(row) {
    props.setCurUser(row);
  }

  function handleChangeActive(row) {
    enableLoading();
    setTimeout(() => {
      actions
        .updateClientActive(row._id)
        .then((res) => {
          disableLoading();
          let { data } = res;
          if (!data.success) {
          } else {
            props.allClients(data.clients);
          }
        })
        .catch(() => {});
    }, 1000);
  }

  function handleChangeHide(row) {
    enableLoading();
    setTimeout(() => {
      actions
        .updateClientHide(row._id)
        .then((res) => {
          disableLoading();
          let { data } = res;
          if (!data.success) {
          } else {
            props.allClients(data.clients);
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
        .deleteClient(curid)
        .then((res) => {
          disableLoading();
          let { data } = res;
          //console.log('===  delete category  == ')
          //console.log(res)
          if (!data.success) {
          } else {
            handleRemoveClose();
            setRemovesnack(true);
            props.allClients(data.clients);
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

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          selected={selected}
          allClients={props.allClients}
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

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          onClick={(event) => handleClick(event, row._id)}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
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
                          src={
                            row.profilePhoto === ""
                              ? default_img
                              : row.profilePhoto
                          }
                          className={classes.avatar}
                        />
                      </TableCell>
                      <TableCell align="center">{row.email}</TableCell>
                      <TableCell align="center">{row.firstName}</TableCell>
                      {/* <TableCell align="center">{row.lastName}</TableCell> */}
                      {/* <TableCell align="center">{row.title}</TableCell> */}
                      <TableCell align="center">{row.address}</TableCell>
                      {/* <TableCell align="center">{row.location}</TableCell> */}
                      <TableCell align="center">{row.phoneNumber}</TableCell>
                      <TableCell align="center">{row.createDate}</TableCell>
                      <TableCell align="center">{row.modifyDate}</TableCell>
                      <TableCell align="Center">
                        <Button
                          variant="outlined"
                          onClick={() => handleChangeActive(row)}
                          color={
                            row.active === "Pending" ? "default" : "secondary"
                          }
                          className={`btn btn-elevate  ${clsx({
                            "kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light": loading,
                          })}`}
                        >
                          {row.active}
                        </Button>
                      </TableCell>
                      <TableCell align="Center">
                        <Button
                          variant="outlined"
                          onClick={() => handleChangeHide(row)}
                          color={row.hide === "Hide" ? "default" : "secondary"}
                          className={`btn btn-elevate  ${clsx({
                            "kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light": loading,
                          })}`}
                        >
                          {row.hide}
                        </Button>
                      </TableCell>
                      <TableCell align="right">
                        <Link
                          to="/admin/client/create_edit"
                          onClick={() => handleEditClick(row)}
                        >
                          <IconButton
                            aria-label="EditIcon"
                            style={{ paddingTop: 0, paddingBottom: 0 }}
                          >
                            <EditIcon />
                          </IconButton>{" "}
                        </Link>
                        <IconButton
                          aria-label="DeleteIcon"
                          onClick={() => handleRemoveClick(row._id)}
                          style={{ paddingTop: 0, paddingBottom: 0 }}
                        >
                          <DeleteIcon />
                        </IconButton>
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
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={allinfo.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page",
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page",
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
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
            Do you want to delete this Client member?
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
  );
}

export default connect(mapStateToProps, { ...userDuck.actions })(
  ClientManagement
);
