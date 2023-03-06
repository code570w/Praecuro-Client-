import React from 'react';
// import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';
// import ReactDOM from 'react-dom';
import Modal from 'react-modal';
// import { Redirect } from 'react-router';
import { useHistory} from "react-router-dom";

function Popup_modal(props){
  const history = useHistory();
    // componentDidMount() {
      
    // }
  
    const RedirectPage=()=>{
      history.push("/jobs");
    }


// console.log(props);
    // render() {
        return (
          <div>
          {/* <button onClick={openModal}>Open Modal</button> */}
          <Modal
            isOpen={props.isOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={props.onRequestClose}
            style={props.style}
            contentLabel={props.contentLabel}
            shouldCloseOnOverlayClick={false}
          >
            {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
            {/* <button onClick={props.onRequestClose}>close</button> */}
           

            <div className="modpop">
            <p class="messwelcome">Welcome! Contact us to find out how you can earn up to a $2500 signing bonus!</p>
            </div>

            <button onClick={RedirectPage} class="btn btn-brand btn-sm btn-upper" style={{'float': 'right','background': 'green'}}>OK</button>
          </Modal>
        </div>

)

        // }
    }

    export default Popup_modal;