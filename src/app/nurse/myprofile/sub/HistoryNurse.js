import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { green } from '@material-ui/core/colors';
import PropTypes from 'prop-types';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MySnackbarContentWrapper from './../../../pages/home/MySnackBar';
import Avatar from '@material-ui/core/Avatar';
import { connect} from "react-redux";
import * as jobDuck from "../../../store/ducks/job.duck";
import * as authDuck from "../../../store/ducks/auth.duck";
import { Link } from 'react-router-dom';
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
    if (order !== 0){
       return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const headRows = [
  { id: '_id', numeric: 'left', visibility:false,disablePadding: true, label: 'Id' },
  { id: 'Name', numeric: 'center', visibility:true,disablePadding: false, label: 'Name(Sender)' },
  { id: 'Amount', numeric: 'center', visibility:true,disablePadding: false, label: 'Amount' },
  { id: 'Date', numeric: 'center', visibility:true,disablePadding: false, label: 'Date' },
  { id: 'status', numeric: 'center', visibility:true,disablePadding: false, label: 'Status' },
];
const mapStateToProps = (state) => ({
  jobs: state.job.jobs,
  user:state.auth.user,
  charges:state.auth.charges,
  curjob:state.job.curjob
})
function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = property => event => {
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
            inputProps={{ 'aria-label': 'Select all desserts' }}
          />
        </TableCell>
        {headRows.map((row,index) => (
          <TableCell
            key={row.id}
            align={row.numeric}
            padding={row.disablePadding ? 'none' : 'default'}
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

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    paddingTop:'0px',
    marginTop:'0px'
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { numSelected,selected } = props;
  const [loading, setLoading] = useState(false);
  const [loadingButtonStyle, setLoadingButtonStyle] = useState({
    paddingRight: "2.5rem"
  });
  const enableLoading = () => {
    setLoading(true);
    setLoadingButtonStyle({ paddingRight: "3.5rem" });
  };

  const disableLoading = () => {
    setLoading(false);
    setLoadingButtonStyle({ paddingRight: "2.5rem" });
  };
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
            Payment History
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {/* {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete" onClick={handleMultiRemoveClick}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
             <Link to="/myprofile/create-edit-job"><IconButton aria-label="AddCircleOutlineIcon" onClick={handleAddClick}>
              <AddCircleOutlineIcon />
            </IconButton></Link>
          </Tooltip>
        )}
          <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
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
        </Snackbar> */}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  selected:PropTypes.array,
  allJobs:PropTypes.func,
  handleunSelect:PropTypes.func,
  setCurJob:PropTypes.func
};
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(0),
    marginLeft: theme.spacing(1),
  },
  paper: {
    width: '100%',
    marginTop: theme.spacing(0),

    // marginBottom: theme.spacing(2),
  },
  
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
}));


function HistoryNurse(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [allinfo,setAllinfo] = React.useState([]);
  useEffect(() => {
    console.log('888')
    // console.log(props.user.email)
    // setAllinfo(props.jobs.filter(ele => ele['client']['_id'] === props.user['_id']));
    // setAllinfo(props.jobs);
    var tempArr = props.charges;
    if(!tempArr)
    {
     tempArr = [];
    tempArr = tempArr.filter(sub=>{
        if(sub.nurse && sub.nurse._id === props.user._id){
          return true;
        }
          return false;
      });
        setAllinfo(tempArr);
    }
  }, [props])
  // function handleEditClick(row){
  //   props.setCurJob(row)
  // }
  // function handleRemoveClose() {
  //   setRemove(false);
  // }
  function handleRequestSort(event, property) {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      const newSelecteds = allinfo.map(n => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }
  function handleunSelect(){
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
        selected.slice(selectedIndex + 1),
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
  const isSelected = name => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, allinfo.length - page * rowsPerPage);
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length}
        selected={selected} 
        allJobs={props.allJobs}
        handleunSelect={handleunSelect}
        setCurJob={props.setCurJob}
        />
        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'medium'}
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
                          onClick={event => handleClick(event, row._id)}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {index+1}
                      </TableCell>
                      <TableCell align="center">{row.client?row.client.firstName+ ' '+ row.client.lastName:'None'}</TableCell>
                      <TableCell align="center">{row.amount/100 + ' $'}</TableCell>
                      <TableCell align="center">{row.createdDate}</TableCell>
                      <TableCell align="center">
                      <Button variant="contained" color={(row.charge.status === 'pending')?'secondary':'default'}>{row.charge.status}</Button>
                      </TableCell>
                      {/* <TableCell align="center">
                        <Link to='/myprofile/bid-list'onClick={()=>handleEditClick(row)}>
                            <IconButton aria-label="VisibilityIcon"  style={{paddingTop:0,paddingBottom:0}}>
                              <VisibilityIcon />
                            </IconButton> 
                          </Link>
                      </TableCell>  */}
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
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default connect(
  mapStateToProps,
  {...authDuck.actions, ...jobDuck.actions}
)(HistoryNurse)