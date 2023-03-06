import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import clsx from 'clsx';
import {
  TextField
} from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';
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
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ChatIcon from '@material-ui/icons/Chat';
import CheckIcon from '@material-ui/icons/Check';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MySnackbarContentWrapper from './../../../../pages/home/MySnackBar';
import Avatar from '@material-ui/core/Avatar';
import { connect} from "react-redux";
import * as actions from '../../../../actions';
import * as jobDuck from "../../../../store/ducks/job.duck";
import * as bidDuck from "../../../../store/ducks/bid.duck";
import * as authDuck from "../../../../store/ducks/auth.duck";
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import { Link } from 'react-router-dom';
import default_img from './../../../../assets/default_profile.png';
// import socket from './../../../../config/socket'
import * as messageDuck from '../../../../store/ducks/message.duck';
import RateReviewIcon from '@material-ui/icons/RateReview';
import Rating from '@material-ui/lab/Rating';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import Box from '@material-ui/core/Box';

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
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const headRows = [
  { id: '_id', numeric: 'left', visibility:false,disablePadding: true, label: 'Id' },
  { id: 'bidBudget', numeric: 'center', visibility:true,disablePadding: false, label: 'Budget' },
  { id: 'content', numeric: 'center', visibility:true,disablePadding: false, label: 'Content' },
  { id: 'status', numeric: 'center', visibility:true,disablePadding: false, label: 'Job Status' },
  { id: 'award_status', numeric: 'center', visibility:true,disablePadding: false, label: 'Award' },
  { id: 'action', numeric: 'center', visibility:true,disablePadding: false, label: 'Actions' },
];
const mapStateToProps = (state) => ({
  bids: state.bid.bids,
  user:state.auth.user,
  curjob:state.job.curjob,
  rooms:state.message.rooms
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
  const [addsnack, setAddsnack] = React.useState(false);
  const [multiremove,setMutliremove] = React.useState(false);
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
  function handleAddClick(){
    props.setCurBid({})

    // setAdd(true)
    
  }
  function handleMultiRemoveClick(){
    enableLoading();
    setTimeout(() => {
      actions.deleteBids(selected)
        .then(res => {
          disableLoading();
          let {data} = res;
          //console.log('===  delete category  == ')
          //console.log(res)
          if(!data.success) {
          }
          else{
            props.handleunSelect();
            setMutliremove(true);
            handleMultiRemoveClose();
            props.allBids(data.bids);
          }
        })
        .catch(() => {
        });
    }, 1000);
  }
  function handleMultiRemoveClose() {
    setMutliremove(false);
  }
  function handleAddsnackClose() {
    setAddsnack(false);

  }
  function handleAddsnackClick(){
    setAddsnack(true)
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
            Bided List
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
          <Link to="/myprofile/overview"><IconButton aria-label="ArrowBackIcon" onClick={handleAddClick}>
              <ArrowBackIcon />
          </IconButton></Link>
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  selected:PropTypes.array,
  allBids:PropTypes.func,
  handleunSelect:PropTypes.func,
  setCurBid:PropTypes.func
};
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(0),
  },
  paper: {
    width: '100%',
    marginTop: theme.spacing(0),

    // marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
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

function CurrentNurseWorking(props) {
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [reviewSubject, setReviewSubject]= React.useState('');
  const [reviewWrite, setReviewWrite]= React.useState('');
  const [reviewvalueResponsiveness, setValueResponsiveness] = React.useState(0);
  const [reviewvalueProfessionalism, setValueProfessionalism] = React.useState(0);
  const [reviewvalueValue, setValueValue] = React.useState(0);
  const [reviewvalueFlexibility, setValueFlexibility] = React.useState(0);
  const [reviewvalueBehaviour, setValueBehaviour] = React.useState(0);
  const [state, setState] = React.useState({
    openState: false,
    vertical: 'bottom',
    horizontal: 'center',
    content:'successfully bid'
  });
  const history = useHistory();
  const [reviewdialogopen,setReviewDialogOpen] = React.useState(false)
  const [completeinfo, setCompleteInfo] = React.useState({});
  const { vertical, horizontal, openState,content } = state;

  const classes = useStyles();
  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });
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
  const [allBidinfo,setAllBidinfo] = React.useState([]);

  useEffect(() => {
    var arr = props.bids;
    arr = arr.filter(item => item.nurse._id === props.user._id)
    console.log('1',arr)
    console.log('2',props.user._id)
    setAllBidinfo(arr);
  }, [props])
  
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [remove, setRemove] = React.useState(false);
  const [removesnack, setRemovesnack] = React.useState(false);
  const [curid,setCurid]= React.useState("");
  const [dialogopen,setDialogOpen] = React.useState(false)
//   const [curdescription,setCurdescription]= React.useState("");
  // const [allinfo,setAllinfo] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [awardinfo, setAwardInfo] = React.useState({});
  function handleApplyClick(row) {
    setDialogOpen(true);
    setAwardInfo(row)
  }
  function handleStateClose() {
    setState({ ...state, openState: false });
  }
  function handleDialogClose() {
    setDialogOpen(false);
  }
  function handleChatClick(row){
  //   socket.emit('addRoom',{
  //     'client':props.user._id,
  //     'job':props.curjob._id,
  //     'nurse':row.nurse._id
  // });


    // actions.setAward(tempData).then(res=>{
    //   let {data} = res;
    //   if(!data.success){
    //       setState({ ...state, openState: true, content:data.errMessage });
    //       handleDialogClose();
    //       return;
    //   }else{
    //   setState({ ...state, openState: true, content:'Successfully Awarded !!!' });
    //   props.allJobs(data.jobs);
    //   handleDialogClose();
    //   history.push("/myprofile/current-working");
    //   return;
    //   }
    // }).catch(() => {
    //     setState({ ...state, openState: true, content: 'Error!!! you have to check your Database or Connection'});
    //     handleDialogClose();
    // });
  }
  function handleAward(){
    var tempData = {
      nurse: awardinfo.nurse._id,
      job:props.curjob._id
    }
    actions.setAward(tempData).then(res=>{
      let {data} = res;
      if(!data.success){
          setState({ ...state, openState: true, content:data.errMessage });
          handleDialogClose();
          return;
      }else{
      setState({ ...state, openState: true, content:'Successfully Awarded !!!' });
      props.allJobs(data.jobs);
      handleDialogClose();
      history.push("/myprofile/current-working");
      return;
      }
  }).catch(() => {
      setState({ ...state, openState: true, content: 'Error!!! you have to check your Database or Connection'});
      handleDialogClose();
  });
  }
  // useEffect(() => {
  //   var tempArr = props.bids;
  //   tempArr = tempArr.filter(sub=>{
  //     if(sub.job._id !== props.curjob._id)
  //         return false;
  //     return true;
  //     });
  //     console.log('setAllinfo')
  //     console.log(tempArr)
  //   setAllinfo(tempArr);
  // }, [props])
  function handleEditClick(row){
    props.setCurBid(row)
  }
  function handleRemoveClose() {
    setRemove(false);
  }
  function handleRemoveClick(id){
    setRemove(true);
    setCurid(id);
  }
  function handleRemoveSnackClick(){
    enableLoading();
    setTimeout(() => {
      actions.deleteBid(curid)
        .then(res => {
          disableLoading();
          let {data} = res;
          //console.log('===  delete category  == ')
          //console.log(res)
          if(!data.success) {
          }
          else{
            handleRemoveClose();
            setRemovesnack(true);
            props.allBids(data.bids);
          }
        })
        .catch(() => {
        });
    }, 1000);
  }
  function handleRemoveSnackClose(){
    setRemovesnack(false);
  }
  function handleRequestSort(event, property) {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      const newSelecteds = allBidinfo.map(n => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }
  function handleReviewSubject(event) {
    setReviewSubject(event.target.value);
  }
  function handleReviewWrite(event) {
    setReviewWrite(event.target.value);
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
  function handleReviewDialogClose() {
    setReviewDialogOpen(false);
  }
  const isSelected = name => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, allBidinfo.length - page * rowsPerPage);
  function handleApplyReviewClick(row) {
    setReviewDialogOpen(true);
    setCompleteInfo(row)
    console.log('handleApplyReviewClick', row)
  }
  function handleReview(){
    if(reviewSubject === '' || reviewWrite === ''){
      alert('Please input Review Subject & Write')
      return;
    }
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      setTimeout(() => {
        var tempData ={
          Responsiveness: reviewvalueResponsiveness,  
            Professionalism: reviewvalueProfessionalism,
            Value: reviewvalueValue,
            Flexibility: reviewvalueFlexibility,
            Behaviour: reviewvalueBehaviour,
            reviewSubject: reviewSubject,
            reviewWrite: reviewWrite,
            reviewOverallRating: (reviewvalueResponsiveness + reviewvalueProfessionalism +reviewvalueValue + reviewvalueFlexibility + reviewvalueBehaviour) / 5,
            fromClient: null,
            fromNurse:props.user._id,
            toClient:completeinfo.job.client || completeinfo.job.client._id,
            toNurse:null,
            job:completeinfo.job._id
        }
        actions.giveReview(tempData).then(res =>{
          let {data} = res;
          if(!data.success){
            alert('Error!!!')
          }else{
          props.allJobs(data.jobs);
          props.allReviews(data.reviews);
          props.allBids(data.bids);
            alert('Successfully')
          }
          setSuccess(true);
          setLoading(false);
          setReviewDialogOpen(false);
        })
    

      }, 1000);
    }
  }
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length}
        selected={selected} 
        allBids={props.allBids}
        handleunSelect={handleunSelect}
        setCurBid={props.setCurBid}
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
              rowCount={allBidinfo.length}
            />
            <TableBody>
              {stableSort(allBidinfo, getSorting(order, orderBy))
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
                      {/* <TableCell >
                        <Avatar alt="avatar" src={row.profilePhoto ===''?default_img:row.profilePhoto} className={classes.avatar} />
                      </TableCell> */}
                      <TableCell align="center">{row.bidBudget}</TableCell>
                      {/* <TableCell align="center">{row.client}</TableCell> */}
                      <TableCell align="center">{row.content}</TableCell>
                      <TableCell align="center">
                      {/* <Button variant="outlined" color={(row.status==='Pending' || row.status==='In Progress')?'primary':(row.status === 'Completed'?'secondary':'default')}>{row.status}</Button> */}
                        <Button variant="outlined" color={(row.job.status==='Pending' || row.status==='In Progress')?'primary':(row.job.status==='Completed'?'secondary':'default')}>{row.job.status}</Button>
                      </TableCell>
                      <TableCell align="center">
                        <Button variant="contained" color={(row.job.nurse && row.job.nurse === props.user._id)?'secondary':'default'}>{(row.job.nurse && row.job.nurse === props.user._id)?'Awarded':'Not Awarded'}</Button>
                      </TableCell>
                      <TableCell align="center">
                          {/* <Link to='/myprofile/bid-detail'onClick={()=>handleEditClick(row)}>
                            <IconButton aria-label="VisibilityIcon"  style={{paddingTop:0,paddingBottom:0}}>
                              <VisibilityIcon />
                            </IconButton> 
                          </Link> */}
                          {row.job.status !=='Completed' ? <>X</>:row.job.review.indexOf("Nurse")!== -1 ?'Completed & Finished':<>
                             <IconButton aria-label="RateReviewIcon" onClick={()=>handleApplyReviewClick(row)}style={{paddingTop:0,paddingBottom:0}}>
                              <RateReviewIcon />
                              </IconButton>
                              <Dialog
                            open={reviewdialogopen}
                            onClose={handleReviewDialogClose}
                            fullWidth={true}
                            maxWidth={'sm'}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <DialogTitle id="alert-dialog-title">{"Review"}</DialogTitle>
                            <DialogContent>
                              <div className="row">
                                <div className= "col-5">
                                  <Box component="fieldset" mb={2} borderColor="transparent">
                                    <Typography component="legend">Responsiveness</Typography>
                                    <Rating 
                                      name="simple-controlled1"
                                      value={reviewvalueResponsiveness}
                                      onChange={(event1, newValue1) => {
                                        setValueResponsiveness(newValue1);
                                      }}
                                    />
                                  </Box>
                                  <Box component="fieldset" mb={2} borderColor="transparent">
                                    <Typography component="legend">Professionalism</Typography>
                                    <Rating
                                      name="simple-controlled2"
                                      value={reviewvalueProfessionalism}
                                      onChange={(event2, newValue2) => {
                                        setValueProfessionalism(newValue2);
                                      }}
                                    />
                                  </Box>
                                  <Box component="fieldset" mb={2} borderColor="transparent">
                                    <Typography component="legend">Value</Typography>
                                    <Rating
                                      name="simple-controlled3"
                                      value={reviewvalueValue}
                                      onChange={(event3, newValue3) => {
                                        setValueValue(newValue3);
                                      }}
                                    />
                                  </Box>
                                  <Box component="fieldset" mb={2} borderColor="transparent">
                                    <Typography component="legend">Flexibility</Typography>
                                    <Rating
                                      name="simple-controlled4"
                                      value={reviewvalueFlexibility}
                                      onChange={(event4, newValue4) => {
                                        setValueFlexibility(newValue4);
                                      }}
                                    />
                                  </Box>
                                  <Box component="fieldset" mb={2} borderColor="transparent">
                                    <Typography component="legend">Behaviour</Typography>
                                    <Rating
                                      name="simple-controlled5"
                                      value={reviewvalueBehaviour}
                                      onChange={(event5, newValue5) => {
                                        setValueBehaviour(newValue5);
                                      }}
                                    />
                                </Box>
                                </div>
                                <div className="col-7">
                                  <FormGroup row>
                                              <TextField
                                        id="reviewSubject"
                                        label="Review Subject"
                                        margin="normal"
                                        variant="outlined"
                                        value={reviewSubject}
                                        onChange={handleReviewSubject}
                                    />
                                    <TextField
                                      id="reviewWrite"
                                      label="Review Text"
                                      multiline
                                      rows="5"
                                      margin="normal"
                                      variant="outlined"
                                      onChange={handleReviewWrite}
                                      />
                                  </FormGroup>
                                </div>
                              </div>
                              
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handleReviewDialogClose} color="primary">
                                Cancel
                              </Button>
                              <div className={classes.wrapper}>
                                <Button  variant="contained"  className={buttonClassname}color="primary" onClick={handleReview} autoFocus disabled={loading}>
                                  Send
                                </Button>
                                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                               </div>
                                 
                              </DialogActions>
                          </Dialog>
                             </>}
                          {/* <Link to='/messages'onClick={()=>handleChatClick(row)}>
                            <IconButton aria-label="ChatIcon"  style={{paddingTop:0,paddingBottom:0}}>
                              <ChatIcon />
                            </IconButton> 
                          </Link>
                          <IconButton aria-label="CheckIcon"  onClick={()=>handleApplyClick(row)} style={{paddingTop:0,paddingBottom:0}}>
                            <CheckIcon />
                          </IconButton> 
                          <Dialog
                            open={dialogopen}
                            onClose={handleDialogClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <DialogTitle id="alert-dialog-title">{"Award"}</DialogTitle>
                            <DialogContent>
                              <DialogContentText id="alert-dialog-description">
                                Will you exactly hire him? You can hire with Award button. 
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handleDialogClose} color="primary">
                                Cancel
                              </Button>
                              <Button onClick={handleAward} color="primary" autoFocus>
                                Award
                              </Button>
                            </DialogActions>
                          </Dialog>
                          <Snackbar
                              anchorOrigin={{ vertical, horizontal }}
                              key={`${vertical},${horizontal}`}
                              open={openState}
                              onClose={handleStateClose}
                              ContentProps={{
                              'aria-describedby': 'message-id',
                              }}
                              message={<span id="message-id">{content}</span>}
                          /> */}
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
          count={allBidinfo.length}
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
            Do you want to delete this Bid?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRemoveClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleRemoveSnackClick} color="primary" autoFocus className={`btn btn-primary btn-elevate kt-login__btn-primary ${clsx(
                      {
                        "kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light": loading
                      }
                    )}`}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
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

export default connect(
  mapStateToProps,
  {...authDuck.actions, ...jobDuck.actions, ...bidDuck.actions, ...messageDuck.actions}
)(CurrentNurseWorking)