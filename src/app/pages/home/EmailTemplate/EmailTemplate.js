import React, { useState, useRef, useEffect } from "react";
import * as actions from "../../../actions";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import { green } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import JoditEditor from "jodit-react";
import Snackbar from "@material-ui/core/Snackbar";
import MySnackbarContentWrapper from "../../../pages/home/MySnackBar";
import axios from "axios";
import { Config } from "../../../config/config";
import PropTypes from "prop-types";
import { AppBar, Tabs, Tab, Box, Typography } from "@material-ui/core";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: "#000",
  },
  buttonSuccess: {
    backgroundColor: green[500],
    marginTop: "30px",
    "&:hover": {
      backgroundColor: green[700],
    },
  },
  tabPanel: {
    width: "100%",
  },
}));

const EmailTemplate = () => {
  const classes = useStyles();

  const editor = useRef(null);
  const [content, setContent] = useState("");
  // const [employeeEmailContent, setEmployeeEmailContent] = useState("");
  const [addsnack, setAddsnack] = React.useState(false);
  const [snackcontent, setSnackcontent] = React.useState("Added Succesfully!");

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function handleAddsnackClose() {
    setAddsnack(false);
  }

  function handleAddsnackClick() {
    setAddsnack(true);
  }

  // useEffect(() => {
  //   console.log("BaseUrl", Config.api_url);
  // }, []);

  const handleSubmitNurseEmailContent = async (event) => {
    if (content === "") {
      setSnackcontent("Please Add Email Content");
      handleAddsnackClick();
    } else {
      try {
        const data = await axios.post(
          `${Config.api_url}save-nurse-email-content`,
          {
            content,
          }
        );
        console.log(data);
        setSnackcontent("Email Content Added Succesfully");
        setContent("");
        handleAddsnackClick();
      } catch (error) {
        console.log(error);
        setSnackcontent("Something Went Wrong");
        handleAddsnackClick();
      }
    }
  };

  const handleSubmitEmployeeEmailContent = async (event) => {
    if (content === "") {
      setSnackcontent("Please Add Email Content");
      handleAddsnackClick();
    } else {
      try {
        const data = await axios.post(
          `${Config.api_url}save-employee-email-content`,
          {
            content,
          }
        );
        alert(data);
        console.log(data);
        setSnackcontent("Email Content Added Succesfully");
        setContent("");
        handleAddsnackClick();
      } catch (error) {
        console.log(error);
        setSnackcontent("Something Went Wrong");
        handleAddsnackClick();
      }
    }
  };

  return (
    <>
      <div
        className="kt-grid__item kt-grid__item--fluid kt-app__content"
        id="emailTemplate"
      >
        <div className="row">
          <div className="col-xl-12">
            <div className="kt-portlet kt-portlet--height-fluid">
              <div className="kt-portlet__head">
                <div className="kt-portlet__head-label">
                  <h3 className="kt-portlet__head-title">Email Template</h3>
                </div>
              </div>
              <div className="kt-form kt-form--label-right">
                <div className="kt-portlet__body">
                  <div className="kt-section kt-section--first">
                    <div className="kt-section__body">
                      <div className="row">
                        {/* TABS */}
                        <AppBar position="static" className={classes.appBar}>
                          <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="simple tabs example"
                          >
                            <Tab label="For Nurse" {...a11yProps(0)} />
                            <Tab label="For Employee" {...a11yProps(1)} />
                          </Tabs>
                        </AppBar>
                        <TabPanel
                          value={value}
                          index={0}
                          className={classes.tabPanel}
                        >
                          <JoditEditor
                            ref={editor}
                            value={content}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={(newContent) => setContent(newContent)}
                            onChange={(newContent) => setContent(newContent)}
                          />
                          <Button
                            variant="contained"
                            className={classes.buttonSuccess}
                            onClick={handleSubmitNurseEmailContent}
                          >
                            Save
                          </Button>
                        </TabPanel>
                        <TabPanel
                          value={value}
                          index={1}
                          className={classes.tabPanel}
                        >
                          <JoditEditor
                            ref={editor}
                            value={content}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={(newContent) => setContent(newContent)}
                            onChange={(newContent) => setContent(newContent)}
                          />
                          <Button
                            variant="contained"
                            className={classes.buttonSuccess}
                            onClick={handleSubmitEmployeeEmailContent}
                          >
                            Save
                          </Button>
                        </TabPanel>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="kt-portlet__foot">
                <div className="kt-form__actions">
                  <div className="row"></div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      {/* TOAST FOR MESSAGES */}
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
          message={snackcontent}
        />
      </Snackbar>
    </>
  );
};

export default EmailTemplate;
