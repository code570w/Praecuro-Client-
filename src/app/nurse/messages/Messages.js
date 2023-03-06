import React, { useState, useEffect } from "react";
// , { useMemo }
import Desktop from "./Home/Desktop";
import Phone from "./Home/Phone";

import { connect } from "react-redux";
// import { useSelector } from "react-redux";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import img1 from "./../../assets/users/100_1.jpg";
import img2 from "./../../assets/users/100_2.jpg";
import img3 from "./../../assets/users/100_3.jpg";
import img4 from "./../../assets/users/100_4.jpg";
import img5 from "./../../assets/users/100_5.jpg";
import img6 from "./../../assets/users/100_6.jpg";
import img7 from "./../../assets/users/100_7.jpg";
import img8 from "./../../assets/users/100_8.jpg";
import img9 from "./../../assets/users/100_9.jpg";
import img10 from "./../../assets/users/100_10.jpg";
import { animateScroll } from "react-scroll";
import "./Messages.scss";
// import socket from './../../config/socket';
import * as messageDuck from "../../../app/store/ducks/message.duck";

// console.log('messages111',messageDuck);

function Messages(props) {
  // const [handle,setHandle] = useState('');
  // const [error,setError] = useState(null);
  const [sendStatus, setSendStatus] = useState([]);
  //   const [messagesEnd,setMessagesEnd] = useState();
  const [flag, setFlag] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const scrollToBottom = () => {
    animateScroll.scrollToBottom({
      containerId: "chatContainer",
    });
  };
  window.onresize = () => {
    console.log(width);
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    if (Math.abs(window.innerWidth - width) > 50) setWidth(window.innerWidth);
    if (Math.abs(window.innerHeight - height) > 50)
      setHeight(window.innerWidth);
  };
  // socket.on('joined', (welcome_gift) => {
  //     props.justJoined(welcome_gift.success);
  // 	// store.dispatch(justJoined(welcome_gift.success));
  // });

  // socket.on('typing',(data) => {
  //     console.log('-- sockert .on : typing ---')
  //     props.isTyping(data);
  // 	// store.dispatch(isTyping(data));
  // });
  // socket.on('addRoom',(data) => {
  //     console.log('-- sockert .on : addRoom ---',data)
  //     props.addRoom(data);
  // 	// store.dispatch(isTyping(data));
  // });
  // socket.on('chat', (data) => {
  //     console.log('-- sockert .on : chat ---')
  //     console.log(data)
  //     props.appendMessage(data);
  // 	// store.dispatch(appendMessage(data));
  // });
  // socket.on('no_typing',(data) => {
  //     console.log('-- sockert .on : no_typing ---')
  //     props.notTyping(data);
  // 	// store.dispatch(notTyping(data));
  // });
  useEffect(() => {
    // alert('hiiii');
    window.onresize = () => {
      console.log(width);
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
      if (Math.abs(window.innerWidth - width) > 50) setWidth(window.innerWidth);
      if (Math.abs(window.innerHeight - height) > 50)
        setHeight(window.innerWidth);
    };
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    // socket.emit('online');
  }, []);

  useEffect(() => {
    // shameful tricks for mobile
    window.onresize = () => {
      console.log(width);
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
      if (Math.abs(window.innerWidth - width) > 50) setWidth(window.innerWidth);
      if (Math.abs(window.innerHeight - height) > 50)
        setHeight(window.innerWidth);
    };
  }, [width]);

  const handleFlag = () => {
    handleSend();
    if (flag === true) setFlag(false);
    else setFlag(true);
    scrollToBottom();
  };

  const handleSend = () => {
    handleSubmit("1", "asdsad");
    var tempStatus = sendStatus;
    console.log("hadnleSend");
    console.log(tempStatus);
    tempStatus.push("1");
    console.log(tempStatus);

    setSendStatus(tempStatus);
  };
  //   const handleTyping = () => {
  // socket.emit('typing',{
  //     'handle':handle,
  // });
  // };

  // const noMoreTyping = () => {
  // socket.emit('no_typing', {
  //     'handle':handle,
  // });
  // };

  const handleSubmit = (handle, message) => {
    if (handle === "" || message === "") {
      // setError('Handle or message should not be null');
      return;
    }
    // setError('');

    // socket.emit('chat',{
    //     'handle':handle,
    //     'message':message,
    // });
  };

  console.log("window", window.innerWidth);

  let View = () => {
    // if (window.innerWidth > 1241) return <Desktop/>;
    // if (window.innerWidth > 991) return <Tablet/>;

    if (window.innerWidth > 991) return <Desktop />;
    else return <Phone />;
  };

  return (
    <>
      <Header />
      <section className="msgSection">
        <View />
        {/* <Desktop/> */}
      </section>
      {/* <section className="msgSection">
        <div className="container" style={{marginTop:'40px',marginBottom:'40px'}}>
        <div className="kt-grid kt-grid--desktop kt-grid--ver kt-grid--ver-desktop kt-app">
<button className="kt-app__aside-close" id="kt_chat_aside_close">
    <i className="la la-close"></i>
</button>
<div className="kt-grid__item kt-app__toggle kt-app__aside kt-app__aside--lg kt-app__aside--fit" id="kt_chat_aside">
    <div className="kt-portlet kt-portlet--last">
        <div className="kt-portlet__body">
            <div className="kt-searchbar">
                <div className="input-group">
                    <div className="input-group-prepend"><span className="input-group-text" id="basic-addon1"></span></div>
                    <input type="text" className="form-control" placeholder="Search" aria-describedby="basic-addon1"/>
                </div>
            </div>
            <div className="kt-widget kt-widget--users kt-mt-20">
                <div className="kt-scroll kt-scroll--pull">
                    <div className="kt-widget__items">
                        <div className="kt-widget__item">
                            <span className="kt-media kt-media--circle">
                                <img src={img1} alt="image"/>
                            </span>
                            <div className="kt-widget__info">
                                <div className="kt-widget__section">
                                    <a href="#" className="kt-widget__username">Matt Pears</a>
                                    <span className="kt-badge kt-badge--success kt-badge--dot"></span>
                                </div>
                                <span className="kt-widget__desc">
                                    Head of Development
                                </span>
                            </div>
                            <div className="kt-widget__action">
                                <span className="kt-widget__date">36 Mines</span>
                                <span className="kt-badge kt-badge--success kt-font-bold">7</span>
                            </div>
                        </div>
                        <div className="kt-widget__item">
                            <span className="kt-media kt-media--circle">
                                <img src={img2} alt="image"/>
                            </span>
                            <div className="kt-widget__info">
                                <div className="kt-widget__section">
                                    <a href="#" className="kt-widget__username">Charlie Stone</a>
                                    <span className="kt-badge kt-badge--success kt-badge--dot"></span>
                                </div>
                                <span className="kt-widget__desc">
                                    Art Director
                                </span>
                            </div>
                            <div className="kt-widget__action">
                                <span className="kt-widget__date">5 Hours</span>
                                <span className="kt-badge kt-badge--success kt-font-bold">2</span>
                            </div>
                        </div>
                        <div className="kt-widget__item">
                            <span className="kt-media kt-media--circle">
                                <img src={img3} alt="image"/>
                            </span>
                            <div className="kt-widget__info">
                                <div className="kt-widget__section">
                                    <a href="#" className="kt-widget__username">Jason Muller</a>
                                    <span className="kt-badge kt-badge--success kt-badge--dot"></span>
                                </div>
                                <span className="kt-widget__desc">
                                    Python Developer
                                </span>
                            </div>
                            <div className="kt-widget__action">
                                <span className="kt-widget__date">2 Days</span>
                            </div>
                        </div>
                        <div className="kt-widget__item">
                            <span className="kt-media kt-media--circle">
                                <img src={img4} alt="image"/>
                            </span>
                            <div className="kt-widget__info">
                                <div className="kt-widget__section">
                                    <a href="#" className="kt-widget__username">Teresa Fox</a>
                                </div>
                                <span className="kt-widget__desc">
                                    PR Executive
                                </span>
                            </div>
                            <div className="kt-widget__action">
                                <span className="kt-widget__date">4 Days</span>
                            </div>
                        </div>
                        <div className="kt-widget__item">
                            <span className="kt-media kt-media--circle">
                                <img src={img5} alt="image"/>
                            </span>
                            <div className="kt-widget__info">
                                <div className="kt-widget__section">
                                    <a href="#" className="kt-widget__username">Giannis Nelson</a>
                                </div>
                                <span className="kt-widget__desc">
                                    Lead Cowboy
                                </span>
                            </div>
                            <div className="kt-widget__action">
                                <span className="kt-widget__date">1 Week</span>
                            </div>
                        </div>
                        <div className="kt-widget__item">
                            <span className="kt-media kt-media--circle">
                                <img src={img6} alt="image"/>
                            </span>
                            <div className="kt-widget__info">
                                <div className="kt-widget__section">
                                    <a href="#" className="kt-widget__username">Lisa Moss</a>
                                </div>
                                <span className="kt-widget__desc">
                                    QA Manager
                                </span>
                            </div>
                            <div className="kt-widget__action">
                                <span className="kt-widget__date">3 Week</span>
                            </div>
                        </div>
                        <div className="kt-widget__item">
                            <span className="kt-media kt-media--circle">
                                <img src={img7} alt="image"/>
                            </span>
                            <div className="kt-widget__info">
                                <div className="kt-widget__section">
                                    <a href="#" className="kt-widget__username">Carles Puyol</a>
                                </div>
                                <span className="kt-widget__desc">
                                    Defence Officer
                                </span>
                            </div>
                            <div className="kt-widget__action">
                                <span className="kt-widget__date">2 Month</span>
                            </div>
                        </div>
                        <div className="kt-widget__item">
                            <span className="kt-media kt-media--circle">
                                <img src={img8} alt="image"/>
                            </span>
                            <div className="kt-widget__info">
                                <div className="kt-widget__section">
                                    <a href="#" className="kt-widget__username">Luka Doncic</a>
                                </div>
                                <span className="kt-widget__desc">
                                    Dose whatever he wants
                                </span>
                            </div>
                            <div className="kt-widget__action">
                                <span className="kt-widget__date">1 Year</span>
                            </div>
                        </div>
                        <div className="kt-widget__item">
                            <span className="kt-media kt-media--circle">
                                <img src={img9} alt="image"/>
                            </span>
                            <div className="kt-widget__info">
                                <div className="kt-widget__section">
                                    <a href="#" className="kt-widget__username">Matt Pears</a>
                                    <span className="kt-badge kt-badge--success kt-badge--dot"></span>
                                </div>
                                <span className="kt-widget__desc">
                                    Head of Development
                                </span>
                            </div>
                            <div className="kt-widget__action">
                                <span className="kt-widget__date">36 Mines</span>
                                <span className="kt-badge kt-badge--success kt-font-bold">7</span>
                            </div>
                        </div>
                        <div className="kt-widget__item">
                            <span className="kt-media kt-media--circle">
                                <img src={img10} alt="image"/>
                            </span>
                            <div className="kt-widget__info">
                                <div className="kt-widget__section">
                                    <a href="#" className="kt-widget__username">Charlie Stone</a>
                                    <span className="kt-badge kt-badge--success kt-badge--dot"></span>
                                </div>
                                <span className="kt-widget__desc">
                                    Art Director
                                </span>
                            </div>
                            <div className="kt-widget__action">
                                <span className="kt-widget__date">5 Hours</span>
                                <span className="kt-badge kt-badge--success kt-font-bold">2</span>
                            </div>
                        </div>
                        <div className="kt-widget__item">
                            <span className="kt-media kt-media--circle">
                                <img src={img1} alt="image"/>
                            </span>
                            <div className="kt-widget__info">
                                <div className="kt-widget__section">
                                    <a href="#" className="kt-widget__username">Jason Muller</a>
                                    <span className="kt-badge kt-badge--success kt-badge--dot"></span>
                                </div>
                                <span className="kt-widget__desc">
                                    Python Developer
                                </span>
                            </div>
                            <div className="kt-widget__action">
                                <span className="kt-widget__date">2 Days</span>
                            </div>
                        </div>
                        <div className="kt-widget__item">
                            <span className="kt-media kt-media--circle">
                                <img src={img2} alt="image"/>
                            </span>
                            <div className="kt-widget__info">
                                <div className="kt-widget__section">
                                    <a href="#" className="kt-widget__username">Teresa Fox</a>
                                </div>
                                <span className="kt-widget__desc">
                                    PR Executive
                                </span>
                            </div>
                            <div className="kt-widget__action">
                                <span className="kt-widget__date">4 Days</span>
                            </div>
                        </div>
                        <div className="kt-widget__item">
                            <span className="kt-media kt-media--circle">
                                <img src={img3} alt="image"/>
                            </span>
                            <div className="kt-widget__info">
                                <div className="kt-widget__section">
                                    <a href="#" className="kt-widget__username">Giannis Nelson</a>
                                </div>
                                <span className="kt-widget__desc">
                                    Lead Cowboy
                                </span>
                            </div>
                            <div className="kt-widget__action">
                                <span className="kt-widget__date">1 Week</span>
                            </div>
                        </div>
                        <div className="kt-widget__item">
                            <span className="kt-media kt-media--circle">
                                <img src={img9} alt="image"/>
                            </span>
                            <div className="kt-widget__info">
                                <div className="kt-widget__section">
                                    <a href="#" className="kt-widget__username">Lisa Moss</a>
                                </div>
                                <span className="kt-widget__desc">
                                    QA Manager
                                </span>
                            </div>
                            <div className="kt-widget__action">
                                <span className="kt-widget__date">3 Week</span>
                            </div>
                        </div>
                        <div className="kt-widget__item">
                            <span className="kt-media kt-media--circle">
                                <img src={img8} alt="image"/>
                            </span>
                            <div className="kt-widget__info">
                                <div className="kt-widget__section">
                                    <a href="#" className="kt-widget__username">Carles Puyol</a>
                                </div>
                                <span className="kt-widget__desc">
                                    Defence Officer
                                </span>
                            </div>
                            <div className="kt-widget__action">
                                <span className="kt-widget__date">2 Month</span>
                            </div>
                        </div>
                        <div className="kt-widget__item">
                            <span className="kt-media kt-media--circle">
                                <img src={img10} alt="image"/>
                            </span>
                            <div className="kt-widget__info">
                                <div className="kt-widget__section">
                                    <a href="#" className="kt-widget__username">Luka Doncic</a>
                                </div>
                                <span className="kt-widget__desc">
                                    Dose whatever he wants
                                </span>
                            </div>
                            <div className="kt-widget__action">
                                <span className="kt-widget__date">1 Year</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>


<div className="kt-grid__item kt-grid__item--fluid kt-app__content" id="kt_chat_content">
    <div className="kt-chat">
        <div className="kt-portlet kt-portlet--head-lg kt-portlet--last">
            <div className="kt-portlet__head">
                <div className="kt-chat__head ">
                    <div className="kt-chat__left">

                        <button type="button" className="btn btn-clean btn-sm btn-icon btn-icon-md kt-hidden-desktop" id="kt_chat_aside_mobile_toggle">
                            <i className="flaticon2-open-text-book"></i>
                        </button>
                        <div className="dropdown dropdown-inline">
                            <button type="button" className="btn btn-clean btn-sm btn-icon btn-icon-md" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="flaticon-more-1"></i>
                            </button>
                            <div className="dropdown-menu dropdown-menu-fit dropdown-menu-left dropdown-menu-md">

                                <ul className="kt-nav">
                                    <li className="kt-nav__item">
                                        <a href="#" className="kt-nav__link">
                                            <i className="kt-nav__link-icon flaticon2-group"></i>
                                            <span className="kt-nav__link-text">New Group</span>
                                        </a>
                                    </li>
                                    <li className="kt-nav__item">
                                        <a href="#" className="kt-nav__link">
                                            <i className="kt-nav__link-icon flaticon2-open-text-book"></i>
                                            <span className="kt-nav__link-text">Contacts</span>
                                        </a>
                                    </li>
                                    <li className="kt-nav__item">
                                        <a href="#" className="kt-nav__link">
                                            <i className="kt-nav__link-icon flaticon2-rocket-1"></i>
                                            <span className="kt-nav__link-text">Groups</span>
                                            <span className="kt-nav__link-badge">
                                                <span className="kt-badge kt-badge--brand kt-badge--inline">new</span>
                                            </span>
                                        </a>
                                    </li>
                                    <li className="kt-nav__item">
                                        <a href="#" className="kt-nav__link">
                                            <i className="kt-nav__link-icon flaticon2-bell-2"></i>
                                            <span className="kt-nav__link-text">Calls</span>
                                        </a>
                                    </li>
                                    <li className="kt-nav__item">
                                        <a href="#" className="kt-nav__link">
                                            <i className="kt-nav__link-icon flaticon2-dashboard"></i>
                                            <span className="kt-nav__link-text">Settings</span>
                                        </a>
                                    </li>
                                    <li className="kt-nav__separator"></li>
                                    <li className="kt-nav__item">
                                        <a href="#" className="kt-nav__link">
                                            <i className="kt-nav__link-icon flaticon2-protected"></i>
                                            <span className="kt-nav__link-text">Help</span>
                                        </a>
                                    </li>
                                    <li className="kt-nav__item">
                                        <a href="#" className="kt-nav__link">
                                            <i className="kt-nav__link-icon flaticon2-bell-2"></i>
                                            <span className="kt-nav__link-text">Privacy</span>
                                        </a>
                                    </li>
                                </ul>

                            </div>
                        </div>
                    </div>
                    <div className="kt-chat__center">
                        <div className="kt-chat__label">
                            <a href="#" className="kt-chat__title">Jason Muller</a>
                            <span className="kt-chat__status">
                                <span className="kt-badge kt-badge--dot kt-badge--success"></span> Active
                            </span>
                        </div>
                        <div className="kt-chat__pic kt-hidden">
                            <span className="kt-media kt-media--sm kt-media--circle" data-toggle="kt-tooltip" data-placement="right" title="Jason Muller" data-original-title="Tooltip title">
                                <img src={img8} alt="image"/>
                            </span>
                            <span className="kt-media kt-media--sm kt-media--circle" data-toggle="kt-tooltip" data-placement="right" title="Nick Bold" data-original-title="Tooltip title">
                                <img src={img7} alt="image"/>
                            </span>
                            <span className="kt-media kt-media--sm kt-media--circle" data-toggle="kt-tooltip" data-placement="right" title="Milano Esco" data-original-title="Tooltip title">
                                <img src={img6} alt="image"/>
                            </span>
                            <span className="kt-media kt-media--sm kt-media--circle" data-toggle="kt-tooltip" data-placement="right" title="Teresa Fox" data-original-title="Tooltip title">
                                <img src={img5} alt="image"/>
                            </span>
                        </div>
                    </div>
                    <div className="kt-chat__right">
                        <div className="dropdown dropdown-inline">
                            <button type="button" className="btn btn-clean btn-sm btn-icon btn-icon-md" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="flaticon2-add-1"></i>
                            </button>
                            <div className="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-md">

                                <ul className="kt-nav">
                                    <li className="kt-nav__head">
                                        Messaging
                                        <i className="flaticon2-information" data-toggle="kt-tooltip" data-placement="right" title="Click to learn more..."></i>
                                    </li>
                                    <li className="kt-nav__separator"></li>
                                    <li className="kt-nav__item">
                                        <a href="#" className="kt-nav__link">
                                            <i className="kt-nav__link-icon flaticon2-group"></i>
                                            <span className="kt-nav__link-text">New Group</span>
                                        </a>
                                    </li>
                                    <li className="kt-nav__item">
                                        <a href="#" className="kt-nav__link">
                                            <i className="kt-nav__link-icon flaticon2-open-text-book"></i>
                                            <span className="kt-nav__link-text">Contacts</span>
                                            <span className="kt-nav__link-badge">
                                                <span className="kt-badge kt-badge--brand  kt-badge--rounded-">5</span>
                                            </span>
                                        </a>
                                    </li>
                                    <li className="kt-nav__item">
                                        <a href="#" className="kt-nav__link">
                                            <i className="kt-nav__link-icon flaticon2-bell-2"></i>
                                            <span className="kt-nav__link-text">Calls</span>
                                        </a>
                                    </li>
                                    <li className="kt-nav__item">
                                        <a href="#" className="kt-nav__link">
                                            <i className="kt-nav__link-icon flaticon2-dashboard"></i>
                                            <span className="kt-nav__link-text">Settings</span>
                                        </a>
                                    </li>
                                    <li className="kt-nav__item">
                                        <a href="#" className="kt-nav__link">
                                            <i className="kt-nav__link-icon flaticon2-protected"></i>
                                            <span className="kt-nav__link-text">Help</span>
                                        </a>
                                    </li>
                                    <li className="kt-nav__separator"></li>
                                    <li className="kt-nav__foot">
                                        <a className="btn btn-label-brand btn-bold btn-sm" href="#">Upgrade plan</a>
                                        <a className="btn btn-clean btn-bold btn-sm" href="#" data-toggle="kt-tooltip" data-placement="right" title="Click to learn more...">Learn more</a>
                                    </li>
                                </ul>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" kt-portlet__body">
                <div id="chatContainer"className="kt-scroll kt-scroll--pull" data-mobile-height="300">
                    <div className="kt-chat__messages">
                        <div className="kt-chat__message">
                            <div className="kt-chat__user">
                                <span className="kt-media kt-media--circle kt-media--sm">
                                    <img src={img3} alt="image"/>
                                </span>
                                <a href="#" className="kt-chat__username">Jason Muller</a>
                                <span className="kt-chat__datetime">2 Hours</span>
                            </div>
                            <div className="kt-chat__text kt-bg-light-success">
                                How likely are you to recommend our company <br/>to your friends and family?
                            </div>
                        </div>
                        <div className="kt-chat__message kt-chat__message--right">
                            <div className="kt-chat__user">
                                <span className="kt-chat__datetime">30 Seconds</span>
                                <a href="#" className="kt-chat__username">You</a>
                                <span className="kt-media kt-media--circle kt-media--sm">
                                    <img src={img5} alt="image"/>
                                </span>
                            </div>
                            <div className="kt-chat__text kt-bg-light-brand">
                                Hey there, we’re just writing to let you know <br/>that you’ve been subscribed to a repository on GitHub.
                            </div>
                        </div>
                        <div className="kt-chat__message">
                            <div className="kt-chat__user">
                                <span className="kt-media kt-media--circle kt-media--sm">
                                    <img src={img3} alt="image"/>
                                </span>
                                <a href="#" className="kt-chat__username">Jason Muller</a>
                                <span className="kt-chat__datetime">30 Seconds</span>
                            </div>
                            <div className="kt-chat__text kt-bg-light-success">
                                Ok, Understood!
                            </div>
                        </div>
                        <div className="kt-chat__message kt-chat__message--right">
                            <div className="kt-chat__user">
                                <span className="kt-chat__datetime">Just Now</span>
                                <a href="#" className="kt-chat__username">You</a>
                                <span className="kt-media kt-media--circle kt-media--sm">
                                    <img src={img5} alt="image"/>
                                </span>
                            </div>
                            <div className="kt-chat__text kt-bg-light-brand">
                                You’ll receive notifications for all issues, pull requests!
                            </div>
                        </div>
                        <div className="kt-chat__message">
                            <div className="kt-chat__user">
                                <span className="kt-media kt-media--circle kt-media--sm">
                                    <img src={img3} alt="image"/>
                                </span>
                                <a href="#" className="kt-chat__username">Jason Muller</a>
                                <span className="kt-chat__datetime">2 Hours</span>
                            </div>
                            <div className="kt-chat__text kt-bg-light-success">
                                You were automatically <b className="kt-font-brand">subscribed</b> <br/>because you’ve been given access to the repository
                            </div>
                        </div>
                        <div className="kt-chat__message kt-chat__message--right">
                            <div className="kt-chat__user">
                                <span className="kt-chat__datetime">30 Seconds</span>
                                <a href="#" className="kt-chat__username">You</a>
                                <span className="kt-media kt-media--circle kt-media--sm">
                                    <img src={img5} alt="image"/>
                                </span>
                            </div>
                            <div className="kt-chat__text kt-bg-light-brand">
                                You can unwatch this repository immediately <br/>by clicking here: <a href="#" className="kt-font-bold kt-link">https://github.com</a>
                            </div>
                        </div>
                        <div className="kt-chat__message">
                            <div className="kt-chat__user">
                                <span className="kt-media kt-media--circle kt-media--sm">
                                    <img src={img3} alt="image"/>
                                </span>
                                <a href="#" className="kt-chat__username">Jason Muller</a>
                                <span className="kt-chat__datetime">30 Seconds</span>
                            </div>
                            <div className="kt-chat__text kt-bg-light-success">
                                Discover what students who viewed Learn Figma - UI/UX Design <br/>Essential Training also viewed
                            </div>
                        </div>
                        <div className="kt-chat__message kt-chat__message--right">
                            <div className="kt-chat__user">
                                <span className="kt-chat__datetime">Just Now</span>
                                <a href="#" className="kt-chat__username">You</a>
                                <span className="kt-media kt-media--circle kt-media--sm">
                                    <img src={img5} alt="image"/>
                                </span>
                            </div>
                            <div className="kt-chat__text kt-bg-light-brand">
                                Most purchased Business courses during this sale!
                            </div>
                        </div>
                        {sendStatus.map(sub=> (
                        <div className="kt-chat__message kt-chat__message--right">
                            <div className="kt-chat__user">
                                <span className="kt-chat__datetime">{sub}</span>
                                <a href="#" className="kt-chat__username">You</a>
                                <span className="kt-media kt-media--circle kt-media--sm">
                                    <img src={img5} alt="image"/>
                                </span>
                            </div>
                            <div className="kt-chat__text kt-bg-light-brand">
                                Most purchased Business courses during this sale!
                            </div>
                        </div>))}
                    </div>
                </div>
            </div>
            <div className="kt-portlet__foot">
                <div className="kt-chat__input">
                    <div className="kt-chat__editor">
                        <textarea style={{height: '50px'}} placeholder="Type here..."></textarea>
                    </div>
                    <div className="kt-chat__toolbar">
                        <div className="kt_chat__tools">
                            {/* <a href="#"><i className="flaticon2-link"></i></a>
                            <a href="#"><i className="flaticon2-photograph"></i></a>
                            <a href="#"><i className="flaticon2-photo-camera"></i></a> 
                        </div>
                        <div className="kt_chat__actions">
                            <button type="button" className="btn btn-brand btn-md btn-upper btn-bold kt-chat__reply" onClick={handleFlag}>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
        
        </div>
    </section> */}

      {/* <Footer/> */}
    </>
  );
}

const mapStateToProps = (state) => {
  const { messages, typist, joined } = state.message;

  // console.log('messages',messages);
  // console.log('typist',typist);
  // console.log('joined',joined);

  return {
    messages,
    typist,
    joined,
  };
};

console.log("stat11", Messages);
export default connect(mapStateToProps, { ...messageDuck.actions })(Messages);
