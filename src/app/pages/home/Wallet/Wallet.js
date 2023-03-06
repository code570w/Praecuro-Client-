
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
function Wallet(props) {

    // console.log('propsmmmm',props.user.wallet_amount);

    const [totalAmount,getTotalAount] = useState(0);
    const [withdrawalamount,addwithdrawalamount] = useState('');
    
    // function setPercentage(){

        // const getDta={
        //     id:pcahge_id,
        //     pcahge:pcahge
        // };
    //     actions.addCommisionPercentage(getDta)
    //    .then(res=>{
    //        if(res.data.success){
    //            alert("Successfully updated.");
    //        }
    //     console.log(res.data);
    //    }).catch((err)=>{
    //        alert('Something went wrong.');
    //    })
    // }

// function getPerceValue(){   
// actions.getPercentageValue().then(res=>{
//     if(res.data.success){
//         getPercentage(res.data.percen[0].percentage);
//         getPercentageId(res.data.percen[0]._id);
//     }
// }).catch((err)=>{
//    alert('Not Found..');
// });

// }

function withdrawAmount(){


  fetch(`${urlserver}withdrawpayout`,{
    method:'POST',
    headers: { 'Content-Type': 'application/json' },
    body:JSON.stringify({
      amount:withdrawalamount
    })
  }
  ).then(res=>{

      res.json().then(data=>{
        console.log('data :',data);
      })

  }).catch(err=>{
    console.log('err :',err);
  })
  
}

useEffect(() => {
    getTotalAount(props.user.wallet_amount);
}, [props])


    return (
        <div className="row" style={{backgroundColor: "white", padding: "40px 20px 40px 20px"}}>
        <div className="col-md-2">
        </div>
        <div className="col-md-8">
          <div className="col-md-12">
            <span className="col-md-6 cold-sm-12" style={{fontSize: "1.275rem", fontWeight: 600 }}>Wallet</span>
            <div className="col-md-6 col-sm-12 pull-right">
                 
            </div>
          </div>
          <div className="col-md-12" style={{marginTop: 60}}>
          <div className="form-group row">
              <label className="col-xl-3 col-lg-3 col-form-label">Total amount ($)</label>
              <div className="col-lg-9 col-xl-6">
                  <div className="input-group">
                <input className="form-control" type="number" value={totalAmount} disabled /> 
                {/* <>$</div> */}
                </div>
              </div>
            </div>
                 {/* <input className="form-control" type="hidden" value={pcahge_id}/> */}
            {/* <div className="form-group row">
              <label className="col-xl-3 col-lg-3 col-form-label">Withdraw Amount ($)</label>
              <div className="col-lg-9 col-xl-6">
           
                <input className="form-control" type="number" value={withdrawalamount} onChange={(e)=>addwithdrawalamount(e.target.value)}/>
              </div>
            </div> */}
            
            {/* <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label"></label>
            <button className="btn btn-primary pull-right" onClick={withdrawAmount}>
                 Withdraw
            </button>
            </div> */}
            
          </div>
        </div>
      </div>
    );

}

const mapStateToProps = (state) => ({
    user:state.auth.user,
    role:state.auth.role
  })
  
export default connect(
    mapStateToProps,
    {...authDuck.actions, ...userDuck.actions}
)(Wallet);