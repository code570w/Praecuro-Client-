import http from "./http-common";
const configFormData = {
  headers: {
    "content-type": "application/json",
  },
};
export const register = (userData) => {
  return http.post("/auth/registerUser", userData);
};

export const login = (userData) => {
  console.log("---  axios login ---");
  console.log(http.baseURL);
  return http.post("/auth/login", userData);
};
export const userlogin = (userData) => {
  return http.post("/auth/userlogin", userData);
};

export const addCommisionPercentage = (userData) => {
  return http.post("/auth/commision_percentage", userData);
};

export const getPercentageValue = () => {
  return http.post("/auth/getPercentage");
};

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("role");
  localStorage.removeItem("token");
  localStorage.removeItem("isLogin");

  window.location = "/";
};

export const allUsers = () => {
  return http.post("/user/allUsers");
};

export const addUser = (userData) => {
  return http.post("/user/addUser", userData);
};

export const registerUserAdmin = (userData) => {
  return http.post("/auth/registerUserAdmin", userData);
};

export const updateUser = (userData) => {
  return http.post("/user/updateUser", userData);
};

export const updateRealUser = (userData) => {
  return http.post("/user/updateRealUser", userData);
};

export const updateUserOneItem = (userData) => {
  return http.post("/user/updateUserOneItem", userData);
};

export const deleteUser = (id) => {
  return http.delete(`/user/deleteUser/${id}`);
};

export const allActivities = () => {
  return http.post("/activity/allActivities");
};

export const allShortCuts = () => {
  return http.post("/shortcut/allShortCuts");
};

export const addShortCut = (shortcut) => {
  return http.post("/shortcut/addShortCut", shortcut);
};

export const updateShortCut = (shortcut) => {
  return http.post("/shortcut/updateShortCut", shortcut);
};

export const deleteShortCut = (id) => {
  return http.delete(`/shortcut/deleteShortCut/${id}`);
};

export const fileUpload = (files) => {
  return http.post("/upload/fileUpload", files, configFormData);
};

export const updatePageLink = (pageIndex, content) => {
  return http.post("/pageLink/updatePageLink", {
    pageIndex: pageIndex,
    content: content,
  });
};

export const allPageLinks = () => {
  return http.post("/pageLink/allPageLinks");
};

export const updateAdmin = (adminObj) => {
  return http.post("/auth/updateAdmin", adminObj, configFormData);
};

export const updateAdminAvatar = (adminObj) => {
  return http.post("/upload/updateAdminAvatar", adminObj, configFormData);
};

export const updateBannerImage = (bannerObj) => {
  return http.post("/upload/updateBannerImage", bannerObj, configFormData);
};

export const allLedgers = () => {
  return http.post("/ledger/allLedgers");
};

export const addLedger = (ledgerData) => {
  return http.post("/ledger/addLedger", ledgerData);
};

export const updateLedger = (ledgerData) => {
  return http.post("/ledger/updateLedger", ledgerData);
};

export const deleteLedger = (id) => {
  return http.delete(`/ledger/deleteLedger/${id}`);
};

export const confirmPass = (data) => {
  return http.post("/user/confirm-email", data);
};

export const forgotPassword = (email) => {
  return http.post("/user/forgotPassword", { email: email });
};

export const passwordReset = (userData) => {
  return http.post("/user/savepasswordwithverify", userData);
};
// Category
export const addCategory = (userData) => {
  return http.post("/category/add", userData);
};
export const updateCategory = (userData) => {
  return http.post("/category/update", userData);
};
export const deleteCategory = (userData) => {
  return http.post("/category/delete", { id: userData });
};
export const deleteCategories = (userData) => {
  return http.post("/category/deletes", { str: userData });
};
export const getAllCategory = () => {
  return http.post("/category/get", {});
};
// Certification
export const addCertification = (userData) => {
  return http.post("/certification/add", userData);
};
export const updateCertification = (userData) => {
  return http.post("/certification/update", userData);
};
export const deleteCertification = (userData) => {
  return http.post("/certification/delete", { id: userData });
};
export const updateActiveCertification = (userData) => {
  return http.post("/certification/updateActive", { id: userData });
};
export const deleteCertifications = (userData) => {
  return http.post("/certification/deletes", { str: userData });
};
export const getAllCertification = () => {
  console.log("this is calling");
  return http.post("/certification/get", {});
};

export const getsAllCertification_fronted = () => {
  return http.post("/certification/gets", {});
};

export const getAllNotifications = (userid) => {
  // console.log('useridss '+userid);
  return http.post("/notifications/get", { id: userid });
};

// export const getNurseDetails=()=>{
//     return http.post('/nurse/getNurseByid',{});
// }

export const getNurseDetails = (id) => {
  // console.log(id);
  return http.post("/nurse/getNurseByid", { str: id });
};

// Nurse
export const addNurse = (userData) => {
  console.log("values_file", userData);
  return http.post("/nurse/add", userData);
};
export const updateNurse = (userData) => {
  return http.post("/nurse/update", userData);
};
export const deleteNurse = (userData) => {
  return http.post("/nurse/delete", { id: userData });
};
export const updateActive = (userData) => {
  return http.post("/nurse/updateActive", { id: userData });
};
export const deleteNurses = (userData) => {
  return http.post("/nurse/deletes", { str: userData });
};
export const ginveNursesPermission = (userData) => {
  return http.post("/nurse/permission", { str: userData });
};

export const getAllNurse = () => {
  return http.post("/nurse/get", {});
};

// Client
export const addClient = (userData) => {
  console.log("---  axios add client ---", userData);

  return http.post("/client/add", userData);
};
export const updateClient = (userData) => {
  console.log("---  axios updateclient ---");
  return http.post("/client/update", userData);
};
export const deleteClient = (userData) => {
  console.log("---  axios deleteclient ---");
  return http.post("/client/delete", { id: userData });
};
export const deleteClients = (userData) => {
  return http.post("/client/deletes", { str: userData });
};
export const getAllClient = () => {
  console.log("---  axios getAllclient ---");
  return http.post("/client/get", {});
};
export const updateClientActive = (userData) => {
  return http.post("/client/updateActive", { id: userData });
};

export const updateClientHide = (userData) => {
  return http.post("/client/updateHide", { id: userData });
};
// Password
export const passUpdate = (userData) => {
  return http.post("/auth/pass", userData);
};

// Job
export const addJob = (userData) => {
  // console.log('nnnnnnmm',userData);
  return http.post("/job/add", userData);
};
export const updateJob = (userData) => {
  return http.post("/job/update", userData);
};
export const updateJobStatus = (userData) => {
  return http.post("/job/update-status", userData);
};
export const deleteJob = (userData) => {
  return http.post("/job/delete", { id: userData });
};
export const deleteJobs = (userData) => {
  return http.post("/job/deletes", { str: userData });
};
export const getAllJob = () => {
  console.log("---  axios getAllclient ---");
  return http.post("/job/get", {});
};
export const completeJob = (id) => {
  console.log("---  axios getAllclient ---");
  return http.post("/job/complete", { jobID: id });
};
export const getAllJobShow = () => {
  return http.post("/job/getshow", {});
};
export const getSelJob = () => {
  console.log("---  axios getSelJob ---");
  return http.post("/job/getsel", {});
};
export const setAward = (userData) => {
  return http.post("/job/award", userData);
};
// Bid
export const addBid = (userData) => {
  return http.post("/bid/add", userData);
};
export const updateBid = (userData) => {
  return http.post("/bid/update", userData);
};
export const deleteBid = (userData) => {
  return http.post("/bid/delete", { id: userData });
};
export const deleteBids = (userData) => {
  return http.post("/bid/deletes", { str: userData });
};
export const getAllBid = () => {
  return http.post("/bid/getAll", {});
};
export const getBid = () => {
  return http.post("/bid/get", {});
};
// History
export const addHistory = (userData) => {
  return http.post("/history/add", userData);
};
export const updateHistory = (userData) => {
  return http.post("/history/update", userData);
};
export const deleteHistory = (userData) => {
  return http.post("/history/delete", { id: userData });
};
export const deleteHistorys = (userData) => {
  return http.post("/history/deletes", { str: userData });
};
export const getAllHistory = () => {
  console.log("---  axios getAllclient ---");
  return http.post("/history/get", {});
};
// Chat
export const addRoom = (userData) => {
  return http.post("/room/add", userData);
};
// review
export const giveReview = (userData) => {
  return http.post("/review/set", userData);
};
export const getAllReview = () => {
  console.log("---  axios getAllReview ---");
  return http.post("/review/get", {});
};

export const addPayment = () => {
  console.log(" -- action - addPayment --");
  return http.post("/payment/add", {});
};
export const addPaymentCustomer = () => {
  return http.post("/payment/customer", {
    source: "src_1HodNNFTAf3LpiDyklSWjiKT",
    email: "emp@emp.com",
  });
};
export const paymentinfoUpdate = (userData) => {
  // console.log(userData);
  return http.post("/payment/setinfo", userData);
};

export const adminpaymentinfoUpdate = (userData) => {
  return http.post("/payment/adminsetinfo", userData);
};

export const paymentVerify = (userData) => {
  return http.post("/payment/verify", userData);
};
export const adminpaymentVerify = (userData) => {
  return http.post("/payment/adminverify", userData);
};

export const paymentCharge = (userData) => {
  return http.post("/payment/charge", userData);
};
export const getAllCharges = () => {
  return http.post("/payment/getcharge", {});
};
export const sendContent = (userdata) => {
  return http.post("/sendcontext", userdata);
};
export const getNewPassword = (userdata) => {
  return http.post("/getNewPassword", userdata);
};

// EMAIL CONTENT
export const sendEmailContent = (data) => {
  console.log(http.baseURL);
  console.log("emailContent", data);
  return http.post("/save-email-content", data);
};
