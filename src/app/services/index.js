//Admin side services
export const processData = (items, sortObj) => {

  if(items.length === 0) {
    return;
  }
  var searchResult = [], sortResult = [];

  //At first, search
  searchResult = items;

  //And then, sort.
  sortResult = searchResult;
  if(sortObj !== null && sortObj !== undefined) {
    let sortColumnIndex = sortObj.columnIndex, sortStatus = sortObj.status;   //sortStatus -> true: asc, false: desc

    let sortItem = "";
    let sortType = sortStatus ? "desc": "asc";

    //Get sortItem from sortColumnIndex
    switch(sortColumnIndex) {
      case 0:   // Created Date
        sortItem = "registeredTime";
        break;
      case 1:   // Company Name
        sortItem = "companyName";
        break;
      case 2:   // Full Name
        sortItem = "fullName";
        break;
      case 3:   // Phone Number
        sortItem = "phoneNumber";
        break;
      case 4:   // Email
        sortItem = "email";
        break;
      case 5:   // Owner Fee
        sortItem = "amountMonth";
        break;
      case 6:   // Management Fee
        sortItem = "managementFee";
        break;
      case 7:   // Referer
        sortItem = "referer";
        break;
      case 8:   // Company Status
        sortItem = "status";
        break;

      default:
        sortItem = "registeredTime";
        break;
    }

    switch(sortItem) {
      case "registeredTime":
      case "companyName":
      case "fullName":
      case "phoneNumber":
      case "email":
      case "referer":
        if(sortType === "asc") {
          sortResult = searchResult.slice().sort((a, b) => b[sortItem].localeCompare(a[sortItem]) );
        } else {
          sortResult = searchResult.slice().sort((a, b) => a[sortItem].localeCompare(b[sortItem]) );
        }
        break;

      case "amountMonth":
      case "managementFee":
      case "status":
        if(sortType === "asc") {
          sortResult = searchResult.slice().sort((a, b) => b[sortItem] - a[sortItem] );
        } else {
          sortResult = searchResult.slice().sort((a, b) => a[sortItem] - b[sortItem] );
        }
        break;

      default:
        sortResult = searchResult;
        break;
    }
  }
  return sortResult;
}
