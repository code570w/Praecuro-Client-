/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import 'react-responsive-modal/styles.css';
// import {PDFDownloadLink } from '@react-pdf/renderer';
// import ExportPDF from "../../../widgets/ExportPDF";
// import { CSVLink, CSVDownload } from "react-csv";

// import * as actions from '../../../../../app/actions';
import * as shortcutDuck from '../../../../app/store/ducks/shortcut.duck';
import {processData} from "../../../services";
import crypto from 'crypto';
import { Config } from "../../../../app/config/config";

let documentStates = ["Please Upload", "Pending", "Approved", "Not Available"];
let userStates = ["Active", "Pending Closure", "Closed"];

function ExportButton(props) {

  let [exportData, setExportData] = useState([]);
  let [exportCSVData, setExportCSVData] = useState([]);

  useEffect(() => {
    let newExportData = processData(props.users, props.currentState.sortStatus);

    //Set pdf data
    setExportData( newExportData );
    setExportCSVData(generateCSVData());
  }, [props]);

  const generateCSVData = () => {
    let newExportData = processData(props.users, props.currentState.sortStatus);
    let tempCSVData = [];
    let csvHeader = [];
    csvHeader.push("Company Name"); 
    csvHeader.push("Full Name");
    csvHeader.push("Address");
    csvHeader.push("Phone Number");
    csvHeader.push("Email");
    csvHeader.push("Password");
    csvHeader.push("Bank Name");
    csvHeader.push("Account Number");
    csvHeader.push("Zelle");
    csvHeader.push("Fico");
    csvHeader.push("Management Fee");
    csvHeader.push("Amount Month");
    csvHeader.push("Referer");
    csvHeader.push("Notes");
    csvHeader.push("State Drivers License or ID State");
    csvHeader.push("State Drivers License or ID FileName");
    csvHeader.push("Social Security Card State");
    csvHeader.push("Social Security Card FileName");
    csvHeader.push("USA Passport State");
    csvHeader.push("USA Passport FileName");
    csvHeader.push("2 year Most Recent Tax Returns State");
    csvHeader.push("2 year Most Recent Tax Returns File List");
    csvHeader.push("3 months Most Recent Bank Statements State");
    csvHeader.push("3 months Most Recent Bank Statements FileList");
    csvHeader.push("Utility Bill State");
    csvHeader.push("Utility Bill FileName");
    csvHeader.push("Mobile Phone Bill State");
    csvHeader.push("Mobile Phone Bill FileName");
    csvHeader.push("Any additional documents State");
    csvHeader.push("Any additional documents FileList");
    csvHeader.push("Company Status");
    tempCSVData.push(csvHeader);

    //Generate csv data
    if(newExportData !== null & newExportData !== undefined) {
      for( let i = 0 ; i < newExportData.length ; i ++ ) {
        let item = newExportData[i];
        let oneCSVItem = [];
        let {companyName, fullName, address, phoneNumber, email, password, bankName, accountNumber, zelle, fico, managementFee, amountMonth, referer, notes, driverLicense, social, passport, tax, statement, utility, phoneBill, additionalDoc, status } = item;
        oneCSVItem.push(companyName);
        oneCSVItem.push(fullName);
        oneCSVItem.push(address);
        oneCSVItem.push(phoneNumber);
        oneCSVItem.push(email);
        oneCSVItem.push(getPassword(password));
        oneCSVItem.push(bankName);
        oneCSVItem.push(accountNumber);
        oneCSVItem.push(zelle);
        oneCSVItem.push(fico);
        oneCSVItem.push(managementFee);
        oneCSVItem.push(amountMonth);
        oneCSVItem.push(referer);
        oneCSVItem.push(notes);
        oneCSVItem.push(documentStates[driverLicense.state]);
        oneCSVItem.push(driverLicense.file);
        oneCSVItem.push(documentStates[social.state]);
        oneCSVItem.push(social.file);
        oneCSVItem.push(documentStates[passport.sate]);
        oneCSVItem.push(passport.file);
        oneCSVItem.push(documentStates[tax.state]);
        oneCSVItem.push(tax.files);
        oneCSVItem.push(documentStates[statement.state]);
        oneCSVItem.push(tax.files);
        oneCSVItem.push(documentStates[utility.state]);
        oneCSVItem.push(utility.file);
        oneCSVItem.push(documentStates[phoneBill.state]);
        oneCSVItem.push(phoneBill.file);
        oneCSVItem.push(documentStates[additionalDoc.state]);
        oneCSVItem.push(additionalDoc.files);
        oneCSVItem.push(userStates[status]);

        tempCSVData.push(oneCSVItem);
      }
    }
    return tempCSVData;
  }

  const getPassword = (str) => {
    let salt = Config.salt;
    let textParts = str.split('g');
    let iv = Buffer.from(textParts.shift(), 'hex');
    let encryptedText = Buffer.from(textParts.join('g'), 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(salt), iv);
    let decrypted = decipher.update(encryptedText);
   
    decrypted = Buffer.concat([decrypted, decipher.final()]);
   
    return decrypted.toString();
  }
  
  const exportPDF = () => {
    hideExportButton();
  }

  const exportCSV = () => {
    // props.onExport();
  }

  const hideExportButton = () => {
    // if(document.querySelector(".ExportButton").classList !== null && document.querySelector(".ExportShowPart").classList !== null) {
    //   document.querySelector(".ExportButton").classList.remove("show");
    //   document.querySelector(".AllCompaniesExportBtn").setAttribute('aria-expanded', 'false');
    //   document.querySelector(".ExportShowPart").classList.remove('show');
    //   document.querySelector(".ExportShowPart").classList.add('dropdown-menu-right');
    // }
  }

  const showExportButton = (e) => {
    // if(document.querySelector(".ExportButton") !== null && document.querySelector(".ExportShowPart") !== null) {
    //   if(document.querySelector(".ExportButton").classList !== null && document.querySelector(".ExportShowPart").classList !== null) {
    //     document.querySelector(".ExportButton").classList.add("show");
    //     document.querySelector(".AllCompaniesExportBtn").setAttribute('aria-expanded', 'true');
    //     document.querySelector(".ExportShowPart").classList.add('show');
    //   }
    // }
  }

  const print = () => {
    var content = document.querySelector(".react-bootstrap-table"); 
    var pri = document.getElementById("ifmcontentstoprint").contentWindow; 
    pri.document.open(); 
    pri.document.write(content.innerHTML); 
    pri.document.close(); 
    pri.focus(); 
    pri.print(); 
  }

  return (
    <>
      <Dropdown className="pull-right ExportButton" drop="down" alignRight onClick={(e) => showExportButton(e)}>

        <Dropdown.Toggle
          variant="transparent"
          className="btn-bold dropdown-toggle AllCompaniesExportBtn"
          id="dropdown-toggle-top"
        >
          <i className="la la-download"></i>Export
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown-menu-fit dropdown-menu-right ExportShowPart">
          <ul className="kt-nav">
            <li className="kt-nav__item" onClick={print}>
              <span className="kt-nav__link">
                <i className="kt-nav__link-icon la la-print" />
                <span className="kt-nav__link-text">Print</span>
              </span>
            </li>
            {/* <li className="kt-nav__item">
              <CSVLink
              filename={"report-csv.csv"} 
              className="kt-nav__link" 
              data={exportCSVData}
              >
                <i className="kt-nav__link-icon la la-file-text-o" />
                <span className="kt-nav__link-text">CSV</span>
              </CSVLink>
            </li> */}
            {/* <li className="kt-nav__item" onClick={exportPDF}>
              <PDFDownloadLink
                document={<ExportPDF selectedLogo={"selectedLogo"} userData={exportData} loading={false}/>}
                variant="outline-success"
                className="kt-nav__link"
                fileName="report.pdf"              
              >
                <i className="kt-nav__link-icon la la-file-pdf-o" />
                <span className="kt-nav__link-text">PDF</span>
              </PDFDownloadLink>
            </li> */}
          </ul>
        </Dropdown.Menu>
      </Dropdown>
      <iframe id="ifmcontentstoprint" style={{height: 0, width: 0, position: "absolute", display: "none"}}></iframe> 
    </>
  );
}

const mapStateToProps = (state) => ({
  users: state.user.users,
  currentState: state.currentState,
})

export default connect(
  mapStateToProps,
  shortcutDuck.actions
)(ExportButton);