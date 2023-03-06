/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, {useState} from "react";
import { connect } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { Formik } from "formik";
import { Button } from "react-bootstrap";
import swal from 'sweetalert';

import * as actions from '../../../../../app/actions';
import * as shortcutDuck from '../../../../../app/store/ducks/shortcut.duck';

function ButtonGroup(props) {

  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState(props.currentShortCut._id);
  const [key, setKey] = useState(props.currentShortCut.key);
  const [value, setValue] = useState(props.currentShortCut.value);

  const closeModal = () => {
    setOpen(false);
    //Initialize parameters
    setKey("");
    setValue("");
    setCurrentId("");
  }

  const updateLink = () => {
    let shortcutObj = {
      _id: currentId,
      key: key,
      value: value
    }
    actions.updateShortCut(shortcutObj)
      .then(res => {
        let {data} = res;
        if(!data.success) {
          return;
        }
        props.allShortCuts(data.shortcuts);
      })

    setOpen(false);
    //Initialize parameters
    setKey("");
    setValue("");
    setCurrentId("");
  }

  const showEditDialog = () => {
    setOpen(true);
    //Initialize parameters
    setKey(props.currentShortCut.key);
    setValue(props.currentShortCut.value);
    setCurrentId(props.currentShortCut._id);
  }

  const deleteShortCut = () => {
    actions.deleteShortCut(props.currentShortCut._id)
      .then(res => {
        let {data} = res;
        if(!data.success) {
          swal("", data.errMessage, "error");
          return;
        }
        props.allShortCuts(data.shortcuts);
        setOpen(false);
      })

    //Hide dropdown menu
    document.querySelector(".dropdown-menu").classList.remove('show');
  }

  return (
    <Dropdown className="pull-right ShortCutButtonGroup" drop="down" alignRight>
      <Dropdown.Toggle
        // variant="transparent"
        // className="btn btn-label-success btn-sm btn-bold dropdown-toggle"
        // id="dropdown-toggle-top"
      >
        <button type="button" className="btn btn-clean btn-sm btn-icon btn-icon-lg" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i className="flaticon-more-1"></i>
        </button>
      </Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-menu-fit dropdown-menu-right">
        <ul className="kt-nav">
          <li className="kt-nav__item">
            <span className="kt-nav__link" onClick={showEditDialog}>
              <i className="kt-nav__link-icon la la-edit" />
              <span className="kt-nav__link-text">Edit Link</span>
            </span>
          </li>
          <li className="kt-nav__item">
            <span className="kt-nav__link" onClick={deleteShortCut}>
              <i className="kt-nav__link-icon la la-trash" />
              <span className="kt-nav__link-text">Delete Link</span>
            </span>
          </li>
        </ul>
      </Dropdown.Menu>
      <Modal open={open} onClose={closeModal} classNames={{ modal: 'addModal' }} >
        <div className="modal-header">
            <h5 className="modal-title f-w-600" id="exampleModalLabel2">Update Link</h5>
        </div>
        <div className="modal-body">
          <Formik
            initialValues={{
              key: "",
              value: ""
            }}

            onSubmit={(values, { setStatus, setSubmitting }) => {
              updateLink();
            }}
          >
            {({
              values,
              status,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting
            }) => (
              <form>

                  <div className="row" style={{paddingBottom: 0, backgroundColor: "white"}}>
                    
                    <div className="col-xl-12 col-md-12">

                      <div className="form-group row">
                          <label htmlFor="recipient-name" className="col-form-label col-md-3" ><span style={{fontSize: 16}}>Label :</span></label>
                          <input type="text" className="form-control col-md-9" style={{fontSize: 16}} value={key} onChange={ (e) => setKey(e.target.value) } maxLength={40} />
                      </div>

                      <div className="form-group row">
                          <label htmlFor="recipient-name" className="col-form-label col-md-3" ><span style={{fontSize: 16}}>Link :</span></label>
                          <input type="text" className="form-control col-md-9" style={{fontSize: 16}} value={value} onChange={ (e) => setValue(e.target.value) }/>
                      </div>
                      
                      <div className="form-group row">
                        <div className="col-md-12">
                          <Button variant="outline-dark" className="pull-right" onClick={closeModal}>Cancel</Button>
                          <Button variant="outline-primary" className="pull-right" style={{marginRight: 10}} onClick={handleSubmit}>Save</Button>
                        </div>
                      </div>
                      
                    </div>
                  </div>

              </form>
            )}
          </Formik>
        </div>
      </Modal>
    </Dropdown>

  );
}

export default connect(
  null,
  shortcutDuck.actions
)(ButtonGroup);