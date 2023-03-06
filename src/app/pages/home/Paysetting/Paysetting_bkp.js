import React, { useEffect, useState,setState } from 'react';
import { connect,useDispatch} from "react-redux";

import * as actions from '../../../../app/actions';
import clsx from 'clsx';
import { Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { lighten, makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import * as authDuck from "./../../../store/ducks/auth.duck";
import * as userDuck from './../../../store/ducks/user.duck';
import urlserver from '../../../../../src/app/config/urlserver';
const useStyles = makeStyles(theme => ({
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

function Paysetting(props) {
    // const dispatch = useDispatch();
    // console.log('props999',props.user);
   
    const history = useHistory();
    const [status, setStatus] = useState('');
    const [id, setId] = useState('');
    const [flag, setFlag] = useState(0);
    const [country, setCountry] = useState('US');
    const [success, setSuccess] = React.useState(false);
    const [currency, setCurrency] = useState('usd');
    const [routingNumber, setRoutingNumber] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [accountHolderName, setAccountHolderName] = useState('');
    const [accountHolderType, setAccountHolderType] = useState('');
    const [loading, setLoading] = useState(false);
    const [dialogopenDollar,setDialogOpenDollar] = React.useState(false)
    const [paymentAmount, setPaymentAmount]= React.useState(0);
    const classes = useStyles();

//   const [state, setState] = React.useState({
//     user: {}
//   });
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
    const handlePaymentAmount = (event)=>{
        setPaymentAmount(event.target.value);
      }
    const disableLoading = () => {
        setLoading(false);
        setLoadingButtonStyle({ paddingRight: "2.5rem" });
    };
    // var state=setState();
    useEffect(() => {
        
        // console.log('state44',state);
        // console.log('props.userprops.user',props);
        // if(props.user.paymentToken){
        //     setFlag(1)
        // }
        setId(props.user._id || '');
        setCountry('US');
        setCurrency('USD');
        // setRoutingNumber('');
        // setAccountNumber('');
        // setAccountHolderName('');
        // setAccountHolderType('');
    }, [props])
    function handleDialogDollarClose() {
        setDialogOpenDollar(false);
      }


    // function handleDollar(){
    //     if(paymentAmount === 0)
    //         return;
    //     var tempData = {
    //         _id:id,
    //         // role:props.user.role,
    //         customer:props.user.customerSource.id,
    //         user:props.user,
    //         amount:paymentAmount,
    //     };
    //     if (!loading) {
    //         setSuccess(false);
    //         setLoading(true);
    //     setTimeout(() => {
           
    //             actions.paymentCharge(tempData).then(res=>{
    //             disableLoading();
    //             let {data} = res;
    //             if(!data.success){
    //             setStatus(data.errMessage);
    //             return;
    //             }else{
    //             console.log('succesfull')
    //             props.getCharges(data.charges);
    //             setSuccess(true);
    //             setLoading(false);
    //             handleDialogDollarClose();
    //             history.push("/myprofile/overview");
    //             return;
    //             }

    //             }).catch(() => {
    //                 disableLoading();
    //                 setStatus(
    //                 'Error!!! you have to check your Database or Connection'
    //                 );
    //             });
    //     }, 1000);}
    // }


    function handleDialogOpenDollar(row) {
        setDialogOpenDollar(true);
        // setCompleteInfo(row)
      }
    const verify = () =>{
        var tempData = {
            _id:id,
            customer:props.user.customerSource.id,
            bank:props.user.paymentToken.bank_account.id,
        };
        enableLoading();
        // setTimeout(() => {
        //         actions.adminpaymentVerify(tempData).then(res=>{
        //         disableLoading();
        //         let {data} = res;
        //         if(!data.success){
        //         setStatus(data.errMessage);
        //         return;
        //         }else{
        //         console.log('succesfull')
              
        //         history.push("/admin/paysetting");
        //         return;
        //         }
        //         }).catch(() => {
        //             disableLoading();
        //             setStatus(
        //             'Error!!! you have to check your Database or Connection'
        //             );
        //         });
        // }, 1000);
    }
    const save = () => {
        if(country === '' || currency === '' || routingNumber === '' || accountNumber === '' || accountHolderName === '' || accountHolderType === ''){
            setStatus('You have to input all the correctly info')
            return;
        }

        var tempData = {
            _id:id,
            email:props.user.email,
            country:country,
            currency:currency,
            routingNumber:routingNumber,
            accountNumber:accountNumber,
            accountHolderName:accountHolderName,
            accountHolderType:accountHolderType
        };


        enableLoading();
        setTimeout(() => {

            fetch(`${urlserver}createAdminAcount`,{
                method:'POST',
                headers:{'Content-type':'application/json'},
                body:JSON.stringify({
                    tempData:tempData 
                })
            }).then(res=>{
                res.json().then(data=>{
                    console.log('data :',data);
                })
            }).catch(err=>{
                console.log('err : ',err);
            })
  
                // actions.adminpaymentinfoUpdate(tempData).then(res=>{
                // disableLoading();
                // let {data} = res;
                // if(!data.success){
                // setStatus(data.errMessage);
                // return;
                // }else{

                // history.push("/admin/paysetting");
                // return;

                //  }

                // }).catch(() => {
                //     disableLoading();
                //     setStatus(
                //     'Error!!! you have to check your Database or Connection'
                //     );
                // });
        }, 1000);
    }

  

  return (
    <div className="kt-grid__item kt-grid__item--fluid kt-app__content">
    <div className="row">
        <div className="col-xl-12">
            <div className="kt-portlet kt-portlet--height-fluid">
                <div className="kt-portlet__head">
                    <div className="kt-portlet__head-label">
                        <h3 className="kt-portlet__head-title">Payment Setting<small>(Bank Account)</small></h3>
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
                                    </div>:<>
                                </>}
                                </div>
                              
                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">Routing Number</label>
                                    <div className="col-lg-9 col-xl-6">
                                        <input type="text" className="form-control"  placeholder="Routing Number"value={routingNumber} onChange={ (e) => setRoutingNumber(e.target.value) }/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">Account Number</label>
                                    <div className="col-lg-9 col-xl-6">
                                        <input type="text" className="form-control" placeholder="Account Number"value={accountNumber} onChange={ (e) => setAccountNumber(e.target.value) }/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">Account Holder Name</label>
                                    <div className="col-lg-9 col-xl-6">
                                        <input type="text" className="form-control" placeholder="Account Holder Name"value={accountHolderName} onChange={ (e) => setAccountHolderName(e.target.value) }/>
                                    </div>
                                </div>
                                <div className="form-group form-group-last row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">Account Holder Type</label>
                                    <div className="col-lg-9 col-xl-6">
                                    <select className="form-control"  id="exampleSelectl1" value={accountHolderType} onChange={ (e) => setAccountHolderType(e.target.value) }>
                                        <option value=''>Select Type</option>
                                        <option value="individual">Personal</option>
                                        <option value="company">Business</option>
                                    </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="kt-portlet__foot">
                        <div className="kt-form__actions">
                            <div className="row">
                                <div className="col-lg-3 col-xl-3">
                                </div>
                                <div className="col-lg-9 col-xl-9">
                                        <button  className="" style={{marginRight: 10, }} onClick={save} className="btn btn-primary pull-right">
                                         Set Bank Account
                                        </button>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

  )

}

const mapStateToProps = (state) => ({
    user:state.auth.user,
    role:state.auth.role
  })
  
export default connect(
    mapStateToProps,
    {...authDuck.actions, ...userDuck.actions}
)(Paysetting);

