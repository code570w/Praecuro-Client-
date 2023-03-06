import React, { useEffect, useState } from 'react';



import * as actions from '../../../../app/actions';


function Commision_charges(props) {

    const [pcahge,getPercentage] = useState(0);
    const [pcahge_id,getPercentageId] = useState('');
    
    function setPercentage(){

        const getDta={
            id:pcahge_id,
            pcahge:pcahge
        };
        actions.addCommisionPercentage(getDta)
       .then(res=>{
           if(res.data.success){
               alert("Successfully updated.");
           }
        console.log(res.data);
       }).catch((err)=>{
           alert('Something went wrong.');
       })
    }

function getPerceValue(){   
actions.getPercentageValue().then(res=>{
    if(res.data.success){
        getPercentage(res.data.percen[0].percentage);
        getPercentageId(res.data.percen[0]._id);
    }
}).catch((err)=>{
   alert('Not Found..');
});

}

useEffect(() => {
getPerceValue();
}, [props])


    return (
        <div className="row" style={{backgroundColor: "white", padding: "40px 20px 40px 20px"}}>
        <div className="col-md-2">
        </div>
        <div className="col-md-8">
          <div className="col-md-12">
            <span className="col-md-6 cold-sm-12" style={{fontSize: "1.275rem", fontWeight: 600 }}>Charges Percentage</span>
            <div className="col-md-6 col-sm-12 pull-right">
                 <button className="" style={{marginRight: 10, }}  className="btn btn-primary pull-right" onClick={setPercentage}>
                Set Percentage
                </button>
            </div>
          </div>
          <div className="col-md-12" style={{marginTop: 60}}>
            <div className="form-group row">
              <label className="col-xl-3 col-lg-3 col-form-label">Percentage (%)</label>
              <div className="col-lg-9 col-xl-6">
              
                <input className="form-control" type="hidden" value={pcahge_id}/>
                <input className="form-control" type="number" value={pcahge} min="0" max="999" onChange={(e)=>getPercentage(e.target.value)}/>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    );

}

export default Commision_charges;