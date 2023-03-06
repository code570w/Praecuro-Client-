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
    // const modalIsClose=props.isOpen;
    const [modalIsClose, setIsclose] = React.useState(false);
    
    const closePops=()=>{

      // props.isOpen=modalIsClose;
      // alert(props.isOpen);
      setIsclose(modalIsClose);

    }
    // console.log('props.isOpe11n',modalIsClose);
    // const [modalIsOpen, setIsOpen] = React.useState(true);
// console.log(props);
// setIsclose(props.isOpen);
    // render() {
        return (
          <div>
          {/* <button onClick={openModal}>Open Modal</button> */}
          <Modal
            keyField={props.keyField}
            isOpen={props.isOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={props.onRequestClose}
            style={props.style}
            contentLabel={props.contentLabel}
            shouldCloseOnOverlayClick={false}
          >
            {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
            {/* <button onClick={props.onRequestClose}>close</button> */}
           
            <div className="modpop">Welcome! Contact us to find out how you can earn an extra $1000 signing bonus!</div>
            <button onClick={closePops} class="btn btn-brand btn-sm btn-upper" style={{'float': 'right','background': 'green'}}>Close</button>
          </Modal>
        </div>
)

        // }
    }

    export default Popup_modal;