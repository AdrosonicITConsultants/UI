import axios from "axios";
import isEmail from "validator/lib/isEmail";
import setAuthorizationtoken from "../utils/setAuthorizationtoken";
import jwt from "jsonwebtoken";
import customToast from "../../shared/customToast";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

var env = "dev";
var ApiUrl = "";
var ImageUrl = "";
var ReceiptUrl = "";
var DeliveryReceiptUrl = "";
var ChatMediaUrl = "";
var DocumentsURL = "";
var BuyerDasboard = "";
var ArtisanDashboard = "";

if (env == "dev") {
  ApiUrl = "http://101.53.153.96:8090/api";
  ImageUrl = "https://f3adac-craft-exchange-resource.objectstore.e2enetworks.net/";
  ReceiptUrl = "https://f3adac-craft-exchange-resource.objectstore.e2enetworks.net/AdvancedPayment/";
  DeliveryReceiptUrl = "https://f3adac-craft-exchange-resource.objectstore.e2enetworks.net/deliveryChallanReceipt/";
  ChatMediaUrl = "https://f3adac-craft-exchange-resource.objectstore.e2enetworks.net/ChatBoxMedia/";
  DocumentsURL = "https://f3adac-craft-exchange-resource.objectstore.e2enetworks.net/documents/";
  BuyerDasboard = "https://datastudio.google.com/embed/reporting/1ebd20db-4ec9-4fa3-b7af-cc57a8dbd318/page/iTZoB?params=";
  ArtisanDashboard = "https://datastudio.google.com/embed/reporting/f0b5c4e2-1e25-43e8-a200-00697598c275/page/imZoB?params=";

} 
else if (env == "uat") {
  ApiUrl = "http://164.52.192.15:8090/api";
  ImageUrl = "https://tatacrftexchangeuat.objectstore.e2enetworks.net/";
  ReceiptUrl = "https://tatacrftexchangeuat.objectstore.e2enetworks.net/AdvancedPayment/";
  DeliveryReceiptUrl = "https://tatacrftexchangeuat.objectstore.e2enetworks.net/deliveryChallanReceipt/";
  ChatMediaUrl = "https://tatacrftexchangeuat.objectstore.e2enetworks.net/ChatBoxMedia/";
  DocumentsURL = "https://tatacrftexchangeuat.objectstore.e2enetworks.net/documents/";
  BuyerDasboard = "https://datastudio.google.com/embed/reporting/0ede1d26-5dbf-4564-a7c4-4f850493a89f/page/i56cB?params=";
  ArtisanDashboard = "https://datastudio.google.com/embed/reporting/cef7a3b2-e37f-48a2-9f28-0c3f45a07585/page/RJ8dB?params=";
} 
else if (env == "live") {
  ApiUrl = "";
}

class TTCEapi {
  
  static ImageUrl = ImageUrl;

  static ReceiptUrl = ReceiptUrl;

  static DeliveryReceiptUrl = DeliveryReceiptUrl;

  static ChatMediaUrl = ChatMediaUrl;

  static DocumentsURL = DocumentsURL;

  static BuyerDasboard = BuyerDasboard;

  static ArtisanDashboard = ArtisanDashboard;

  static validatePass(pass) {
    const re = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/g);
    const isOk = re.test(pass);
    if (!isOk) {
      customToast.error(
        "Please enter valid password with 8 characters.It should contain at least 1 Capital alphabet, number and special character.",
        {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: true,
        }
      );
      return false;
    }
    return true;
  }
  static getReceipt(receiptId,challanId) {
    if(receiptId!=null){
      let url = ApiUrl + "/enquiry/getReceipt?receiptId="+receiptId;
    
    return axios
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
    }
    else{
      let url = ApiUrl + "/enquiry/getReceipt?challanId="+challanId;
    
    return axios
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
    }
    
  }
  //#region registration
  static checkWeaverId(weaverId) {
    let url = ApiUrl + "/register/verifyWeaverDetails";
    var data = {
      weaverId: weaverId,
      // pin: weaverPin,
    };
    var config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    return axios
      .post(url, data, config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  static verifyOtp(emailId, Otp) {
    let url = ApiUrl + "/register/verifyEmailOtp";
    var data = {
      email: emailId,
      otp: Otp,
    };
    var config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    return axios
      .post(url, data, config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  //#endregion

  //#region login
  static login(username, password, roleID) {
    let url = ApiUrl + "/login/authenticate";
    var data = {
      emailOrMobile: username,
      password: password,
      roleId: roleID,
    };
    var config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    return axios
      .post(url, data, config)
      .then((response) => {
        if (response.data.valid) {
          var language = localStorage.getItem("i18nextLng");
          var skipVideo = localStorage.getItem("skipVideo");
          localStorage.clear();
          sessionStorage.clear();
          // remove user from local storage to log user out
          localStorage.removeItem("user");
          localStorage.removeItem("jwtToken");
          const token = response.data.data.acctoken;
          const user = response.data.data.user;
          localStorage.setItem("jwtToken", token);
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("i18nextLng", language);
          localStorage.setItem("skipVideo", skipVideo);
          setAuthorizationtoken(token);

        }
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  static passwordReset(username, password) {
    let url = ApiUrl + "/forgotpassword/resetpassword";
    var data = {
      emailOrMobile: username,
      password: password,
    };
    var config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    return axios
      .post(url, data, config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  //#endregion

  static uploadProduct(file1, file2 = null, file3 = null, productData) {
    
    let url = ApiUrl + "/product/uploadProduct";
    var data = new FormData();
    data.append("file1", file1);
    data.append("file2", file2);
    data.append("file3", file3);
    data.append("productData", JSON.stringify(productData));

    var config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };
    return axios
      .post(url, data, config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  static buyerpUploadDesign(file1, file2 = null, file3 = null , productData) {
    
   let url = ApiUrl + "/buyerCustomProduct/uploadProduct";
   var data = new FormData();
   data.append("file1", file1);
   data.append("file2", file2);
   data.append("file3", file3);
   data.append("productData", JSON.stringify(productData));

   var config = {
     headers: {
        "Content-type": "multipart/form-data",
     },
   };
   return axios
     .post(url, data, config)
     .then((response) => {
       return response;
     })
     .catch((error) => {
       return error.response;

     });
 }
  static editProduct(file1, file2 = null, file3 = null, productData) {
    
    let url = ApiUrl + "/product/edit/product";
    var data = new FormData();
    data.append("file1", file1);
    data.append("file2", file2);
    data.append("file3", file3);
    data.append("productData", JSON.stringify(productData));
    var config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };
    return axios
      .put(url, data, config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }


  static editCustomProduct(file1, file2 = null, file3 = null, productData) {
    
    let url = ApiUrl + "/buyerCustomProduct/edit/product";
    var data = new FormData();
    data.append("file1", file1);
    data.append("file2", file2);
    data.append("file3", file3);
    data.append("productData", JSON.stringify(productData));
    var config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };
   
    return axios
      .put(url, data, config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
  //#endregion

  //#region get methods

  static getProduct(id) {
    let url = ApiUrl + "/product/getProduct/" + id;

    return axios
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

    static getHistoryProduct(id) {
    let url = ApiUrl + "/product/getProductHistoryBuyer/" + id;

    return axios
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  static getSimpleProduct(id) {
    let url = ApiUrl + "/product/getSimpleProduct/" + id;

    return axios
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  static getSimpleHistoryProduct(id) {
    let url = ApiUrl + "/product/getProductHistory/" + id;

    return axios
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  static getbuyerSimpleProduct(id) {
    let url = ApiUrl + "/buyerCustomProduct/getSimpleProduct/" + id;

    return axios
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  static getbuyerSimpleHistoryProduct(id) {
    let url = ApiUrl + "/buyerCustomProduct/getProductHistory/" + id;

    return axios
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }



  static deleteProduct(id) {
    let url = ApiUrl + "/product/deleteProduct/" + id;

    return axios
      .delete(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  // /enquiry/deleteMoq/710
  static deleteMoq(id) {
    let url = ApiUrl + "/enquiry/deleteMoq/" + id;

    return axios
      .delete(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  static deleteCustomProduct(id) {
    let url = ApiUrl + "/buyerCustomProduct/deleteProduct/" + id;

    return axios
      .delete(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
  static getProductCategoryProducts(id) {
    let url = ApiUrl + "/product/getProductCategoryProducts/" + id;

    return axios
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  static getClusterProducts(id) {
    let url = ApiUrl + "/product/getClusterProducts/" + id;

    return axios
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  static getArtisianProducts(id) {
    let url = ApiUrl + "/product/getProductByArtisan/" + id;

    return axios
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
  static getArtisianProductCategory(userid, categoryid) {
    let url =
      ApiUrl +
      "/product/getProductCategoryAndArtisanProducts/" +
      categoryid +
      "/" +
      userid;

    return axios
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  static getProducts() {
    let url = ApiUrl + "/product/getAllProducts";

    return axios
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  static getMoqDeliveryTimes() {
    let url = ApiUrl + "/enquiry/getMoqDeliveryTimes";

    return axios
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

 

  static initializePartialRefund(enquiryId) {
    let url = ApiUrl + "/order/initializePartialRefund?orderId="+enquiryId;
    return axios
      .post(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  } 

  static getMoq(enquiryId) {
    let url = ApiUrl + "/enquiry/getMoq/"+enquiryId;

    return axios
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  } 
 
  static getPi(enquiryId) {
    let url = ApiUrl + "/enquiry/getPi/"+enquiryId;
    return axios
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  } 
 
  // /enquiry/getEnquiry/1696
  static getEnquiryMoq(enquiryId) {
    let url = ApiUrl + "/enquiry/getEnquiry/"+ enquiryId;

    return axios
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  } 
  

  static getSingleOrder(enquiryId) {
    let url = ApiUrl + "/order/getOrder/{enquiryId}?enquiryId="+ enquiryId;

    return axios
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  } 
  static getAllRefBuyerReview() {
    let url = ApiUrl + "/enquiry/getAllRefBuyerReview";

    return axios
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  } 

  static getCompletedEnquiry(enquiryId) {
    let url = ApiUrl + "/enquiry/getClosedEnquiry/"+ enquiryId;

    return axios
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  } 


  static getCountries() {
    let url = ApiUrl + "/register/getAllCountries";

    return axios
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
  static sendFaultyOrder(id,desc,select) {
    let url = ApiUrl + "/enquiry/faultyOrderBuyer/"+id+"/"+desc+"/"+select;
    var config = {
      headers: {
        "Content-type": "application/json",      },
    };
    return axios
      .post(url,config)
      .then((response) => {
        return response;
      })
      
      .catch((error) => {
        return error.response;
      });
  }
  static isResolved(id) {
    let url = ApiUrl + "/enquiry/isResolved/"+id;
    var config = {
      headers: {
        "Content-type": "application/json",      },
    };
    return axios
      .post(url,config)
      .then((response) => {
        return response;
      })
      
      .catch((error) => {
        return error.response;
      });
  }
  static getProductsInWishlist() {
    let url = ApiUrl + "/product/getProductsInWishlist";

    return axios
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
  static sendFaultyOrderArtisan(id,desc,select) {
    let url = ApiUrl + "/enquiry/faultyOrderArisan/"+id+"/"+desc+"/"+select;
    var config = {
      headers: {
        "Content-type": "application/json",      },
    };
    return axios
      .post(url,config)
      .then((response) => {
        return response;
      })
      
      .catch((error) => {
        return error.response;
      });
  }
  static getProductsInWishlist() {
    let url = ApiUrl + "/product/getProductsInWishlist";

    return axios
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
  static getProductIdsInWishlist() {
    let url = ApiUrl + "/product/getProductIdsInWishlist";

    return axios
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  static deleteAllProductsInWishlist() {
    let url = ApiUrl + "/product/deleteAllProductsInWishlist";

    return axios
      .delete(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

    static deleteAllProductsInbuyerCustom(){
      let url = ApiUrl + "/buyerCustomProduct/deleteAllProducts";

    return axios
      .delete(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;

      });
    }

    static deleteProductsInWishlist(productId){
      let url = ApiUrl + "/product/deleteProductsInWishlist/"+productId;

    return axios
      .delete(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
  
  static addToWishlist(productId) {
    let url = ApiUrl + "/product/addToWishlist/" + productId;
    return axios
      .post(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  static MoqSelected(enquiryId,moqId,artisanId) {
    let url = ApiUrl + "/enquiry/MoqSelected/"+enquiryId+"/"+moqId +"/"+artisanId;
    return axios
      .post(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  static getCurrencySigns() {
    let url = ApiUrl + "/enquiry/getCurrencySigns";
    return axios
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  static MoqSimpleProductSelected(enquiryId,moqId) {
    let url = ApiUrl + "/enquiry/MoqSimpleProductSelected/"+enquiryId+"/"+moqId;
    return axios
      .post(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  static previewPI(enquiryId) {
    let url = ApiUrl + "/enquiry/previewPI/" +enquiryId;
    return axios
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
  static fetchEnquiryAndPaymentDetails(enquiryId) {
    let url = ApiUrl + "/enquiry/fetchEnquiryAndPaymentDetails?enquiryId=" +enquiryId;
    return axios
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
  static getMoqs(enquiryId) {
    let url = ApiUrl + "/enquiry/getMoqs/" +enquiryId;
    return axios
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  static getTransactionStatus() {
    let url = ApiUrl + "/transaction/getTransactionStatus";
    return axios
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  static getTransactionActions() {
    let url = ApiUrl + "/transaction/getTransactionActions";
    return axios
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  static getOngoingTransaction(searchString,paymentType) {
    let url = ApiUrl + "/transaction/getOngoingTransaction/{searchString}/{paymentType}?paymentType="+ paymentType;
    return axios
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
  static getTransactions(enquiryId) {
    let url = ApiUrl + "/transaction/getTransactions/"+enquiryId;
    return axios
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
  static notifyAgain(actionId,respectiveActionId) {
    let url = ApiUrl + "/transaction/notifyAgain/"+actionId+"/"+respectiveActionId;
    return axios
      .post(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
  static getCompletedTransaction(searchString,paymentType) {
    let url = ApiUrl + "/transaction/getCompletedTransaction/{searchString}/{paymentType}?paymentType="+paymentType;
    return axios
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
 
  static validateAdvancePaymentFromArtisan(enquiryId,status) {
    let url = ApiUrl + "/enquiry/validateAdvancePaymentFromArtisan?enquiryId="+enquiryId+"&status="+status;
    return axios
      .put(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  static validateFinalPaymentFromArtisan(enquiryId,status) {
    let url = ApiUrl + "/enquiry/validateFinalPaymentFromArtisan?enquiryId="+enquiryId+"&status="+status;
    return axios
      .put(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
  
    static getOrder(enquiryId) {
      let url = ApiUrl + "/order/getOrder/{enquiryId}?enquiryId="+enquiryId;
      return axios
        .get(url)
        .then((response) => {
          return response;
        })
        .catch((error) => {
          return error.response;
        });
    }
  static getChangeRequestItemTable() {
    let url = ApiUrl + "/enquiry/getChangeRequestItemTable";
    return axios
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
  static generateEnquiry(productId,isCustom) {
    let url = ApiUrl + "/enquiry/generateEnquiry/" + productId + "/" + isCustom + "/Website";
    return axios
      .post(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
  static ifEnquiryExists(productId,isCustom) {
    let url = ApiUrl + "/enquiry/ifEnquiryExists/" +productId +"/"+isCustom;
    return axios
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  static generateEnquiryTrue(productId,isCustom) {
    let url = ApiUrl + "/enquiry/generateEnquiry/" + productId + "/" + isCustom ;
    return axios
      .post(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
  //#region login
  static sendOtpForgotpass(emailId, roleID) {
    let url =
      ApiUrl + "/forgotpassword/sendotp?email=" + emailId + "&roleId=" + roleID;

    return axios
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  static getProductCategoryAndClusterProducts(
    productCategoryId,
    clusterId,
    productId
  ) {
    let url =
      ApiUrl +
      "/product/getProductCategoryAndClusterProducts/" +
      productCategoryId +
      "/" +
      clusterId +
      "/" +
      productId;

    return axios
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  static validateUsername(username, roleID) {
    let url =
      ApiUrl +
      "/login/validateusername?emailOrMobile=" +
      username +
      "&roleId=" +
      roleID;

    return axios
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }


  static buyergetAllProducts() {
    let url = ApiUrl + "/buyerCustomProduct/getAllProducts";

    return axios
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;

      });
  }
  static markOrderAsRecieved(enquiryId,date) {
    let url = ApiUrl + "/enquiry/markOrderAsRecieved/"+enquiryId+"/"+date + "/0";

    return axios
      .post(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;

      });
  }

  //#region registration
  static sendOtp(emailId) {
    let url = ApiUrl + "/register/sendVerifyEmailOtp?email=" + emailId;

    return axios
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
  static registerArtist(
    weaverid,
    emailid,
    password,
    firstname,
    lastname,
    pincode,
    cluster,
    district,
    state,
    mobileno,
    panno,
    address1,
    selectedProducts,
    selectedFile
  ) {
    
    var bodyFormData = new FormData();

    let url = ApiUrl + "/register/user";

    var data1 = {
      address: {
        country: {
          id: 1,
          name: "india",
        },
        district: district,
        line1: address1,
        pincode: pincode,
        state: state,
      },
      clusterId: parseInt(cluster),
      email: emailid,
      firstName: firstname,
      lastName: lastname,
      mobile: mobileno,
      pancard: panno,
      password: password,
      refRoleId: 1,
      productCategoryIds: selectedProducts,
      weaverId: weaverid,
    };

    bodyFormData.append("registerRequest", JSON.stringify(data1));
    bodyFormData.append("profilePic", selectedFile);

    var config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };
    return axios
      .post(url, bodyFormData, config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }


  static advancedPayment(
    formData,
    enquiryId,
    paidAmount,
    percentage,
    pid,
    totalAmount

  ) {
    
    var bodyFormData = new FormData();

    let url = ApiUrl + "/enquiry/Payment";

    var payment = {
      enquiryId:enquiryId,
      type:parseInt(1),
      paidAmount:paidAmount,
      percentage:parseInt(percentage),
      pid:pid,
      totalAmount:parseInt(totalAmount),
    };
    
    bodyFormData.append("payment",JSON.stringify(payment));
    bodyFormData.append("file", formData);

    var config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };
    return axios
      .post(url, bodyFormData, config)
      .then((response) => {
  
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  static FinalPayment(
    formData,
    enquiryId,
    pid,
    invoiceid,
    paidAmount,
    totalAmount

  ) {
    
    var bodyFormData = new FormData();

    let url = ApiUrl + "/enquiry/Payment";

    var payment = {
      // formData,
      enquiryId:enquiryId,
      type:parseInt(2),
      pid:parseInt(pid),
      invoiceId:parseInt(invoiceid),
      paidAmount:parseInt(paidAmount),
      totalAmount:parseInt(totalAmount),
    };
 
    bodyFormData.append("payment",JSON.stringify(payment));
    bodyFormData.append("file", formData);

    var config = {
      headers: {
        "Content-type": "multipart/form-data",

      },
    };
    return axios
      .post(url, bodyFormData, config)
      .then((response) => {
       
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  static submitDeliveryChallan(
    enquiryId,
    formData,
    orderDispatchDate,
    ETA,
  ) {
    
    var bodyFormData = new FormData();

    let url = ApiUrl + "/enquiry/submitDeliveryChallan?enquiryId="+enquiryId+"&orderDispatchDate="+orderDispatchDate+"%2000%3A00%3A00&ETA="+ETA;

    bodyFormData.append("file", formData);

    var config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };
    return axios
      .post(url, bodyFormData, config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }




  static registerBuyer(
    companyname,
    gstno,
    officeno,
    brandLogo,
    cinno,
    panno,
    logoname,
    adl1,
    adl2,
    street,
    city,
    state,
    country1,
    pincode,
    landmark,
    weblink,
    sociallink,
    firstname,
    lastname,
    mobileno,
    alternatemobno,
    designation,
    password,
    emailid,
    pocmobile,
    pocemail,
    pocname,
    countryid
  ) {
    let url = ApiUrl + "/register/user";
    var bodyFormData = new FormData();

    var data = {
      address: {
        city: city,
        country: {
          id: parseInt(countryid),
          name: country1,
        },
        landmark: landmark,
        line2: adl2,
        street: street,
        line1: adl1,
        pincode: pincode,
        state: state,
      },
      buyerPointOfContact: {
        contactNo: pocmobile,
        email: pocemail,
        firstName: pocname,
      },
      alternateMobile: alternatemobno,
      companyDetails: {
        cin: cinno,
        companyName: companyname,
        contact: officeno,
        gstNo: gstno,
      },
      designation: designation,
      email: emailid,
      firstName: firstname,
      lastName: lastname,
      mobile: mobileno,
      pancard: panno,
      password: password,
      refRoleId: 2,
      socialMediaLink: sociallink,
      websiteLink: weblink,
    };
   
    bodyFormData.append("registerRequest", JSON.stringify(data));
    bodyFormData.append("brandLogo", brandLogo);

    var config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };
    return axios
      .post(url, bodyFormData, config)
      .then((response) => {
       
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  static updateBuyerProfile(
    companyname,
    gstno,
    cinno,
    panno,
    line11,
    line22,
    street,
    city1,
    state,
    country1,
    pincode,
    landmark1,
    alternatemobno,
    designation,
    pocmobile,
    pocemail,
    pocname,
    countryid,
    selectedBrandFile,
    removedlogo
  ) {
    var bodyFormData = new FormData();

    let url = ApiUrl + "/user/edit/buyerProfile";
    var data = {
      address: {
        city: city1,
        country: {
          id: parseInt(countryid),
          name: country1,
        },
        line1: line11,
        line2: line22,
        landmark: landmark1,
        street: street,
        pincode: pincode,
        state: state,
      },
      buyerPointOfContact: {
        contactNo: pocmobile,
        email: pocemail,
        firstName: pocname,
      },
      alternateMobile: alternatemobno,
      buyerCompanyDetails: {
        cin: cinno,
        companyName: companyname,
        gstNo: gstno,
      },
      designation: designation,
      pancard: panno,
    };
    
    bodyFormData.append("profileDetails", JSON.stringify(data));
    if (removedlogo == 1) {
      var f = new File([""], "");
      bodyFormData.append("logo", f);
      
    }
    if (removedlogo == 2) {
      bodyFormData.append("logo", selectedBrandFile);
    }
   
    var config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };

    return axios
      .put(url, bodyFormData, config)
      .then((response) => {
        if (response.data.valid) {
          localStorage.removeItem("user");
          const user = response.data.data;
          localStorage.setItem("user", JSON.stringify(user));
        }
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
  static updatePersonalDetails(
    line1,
    district,
    pincode,
    state,
    selectedFile,
    removedprofile
  ) {
    let url = ApiUrl + "/user/edit/artistProfile";
    var bodyFormData = new FormData();
    var data = {
      country: {
        id: 1,
        name: "INDIA",
      },
      district: district,
      line1: line1,
      pincode: pincode,
      state: state,
    };
  
    bodyFormData.append("address", JSON.stringify(data));
    if (removedprofile == 1) {
      var f = new File([""], "");
      bodyFormData.append("profilePic", f);
    }
    if (removedprofile == 2) {
      bodyFormData.append("profilePic", selectedFile);
    }

    var config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };

    return axios
      .put(url, bodyFormData, config)
      .then((response) => {
        if (response.data.valid) {
        }
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  static updateBrandDetails(
    brandname,
    branddesc,
    selectedprods,
    selectedBrandFile,
    removedlogo
  ) {
    let url = ApiUrl + "/user/edit/artistBrandDetails";
    var bodyFormData = new FormData();
    var data = {
      companyDetails: {
        companyName: brandname,
        desc: branddesc
      },
      productCategories: selectedprods,
    };
  
    bodyFormData.append("editBrandDetails", JSON.stringify(data));
    if (removedlogo == 1) {
      var f = new File([""], "");
      bodyFormData.append("logo", f);
    }
    if (removedlogo == 2) {
      bodyFormData.append("logo", selectedBrandFile);
    }

    var config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };

    return axios
      .put(url, bodyFormData, config)
      .then((response) => {
        if (response.data.valid) {
        }
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  static updateBankDetails(
    accountno,
    bankname,
    branch,
    ifsccode,
    benificiaryname,
    gpayupi,
    paytmupi,
    phonepeupi
  ) {
    let url = ApiUrl + "/user/edit/bankDetails";
    var data = [
      {
        accNo_UPI_Mobile: accountno,
        accountType: {
          id: 1,
        },
        bankName: bankname,
        branch: branch,
        ifsc: ifsccode,
        name: benificiaryname,
      },
      {
        accNo_UPI_Mobile: gpayupi,
        accountType: {
          id: 2,
        },
      },
      {
        accNo_UPI_Mobile: phonepeupi,
        accountType: {
          id: 3,
        },
      },
      {
        accNo_UPI_Mobile: paytmupi,
        accountType: {
          id: 4,
        },
      },
    ];

    var config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    return axios
      .put(url, data, config)
      .then((response) => {
        if (response.data.valid) {
        }
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
  

  static saveMoq(
    enquiryId,
    additionalInfo,
    deliveryDesc,
    moq,
    ppu,
   
    ) {
    let url = ApiUrl + "/enquiry/saveMoq/"+ enquiryId;
   var data =
    {
      additionalInfo: additionalInfo,
      deliveryTimeId: deliveryDesc,
      moq: moq,
      ppu: ppu
    }
   var config = {
    headers: {
      "Content-type": "application/json",
    },
  };
    return axios
      .post(url,data,config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  } 


  static revisedPI(
    enquiryId,
     cgst,
     dod,
     hsncode,
     rpu,
     quantity,
     sgst,
     
      ) {
      let url = ApiUrl + "/enquiry/revisedPI?enquiryId=%20"+ enquiryId;
     var data =
      {
        cgst: 0,
        expectedDateOfDelivery: dod,
        hsn: hsncode,
        ppu: rpu,
        quantity:quantity,
        sgst:0
      }
     var config = {
      headers: {
        "Content-type": "application/json",
      },
    };
      return axios
        .post(url,data,config)
        .then((response) => {
          return response;
        })
        .catch((error) => {
          return error.response;
        });
    }


  static savePi(
  enquiryId,
   cgst,
   dod,
   hsncode,
   rpu,
   quantity,
   sgst,
   
    ) {
    let url = ApiUrl + "/enquiry/savePi/"+ enquiryId;
   var data =
    {
      cgst: 0,
      expectedDateOfDelivery: dod,
      hsn: hsncode,
      ppu: rpu,
      quantity:quantity,
      sgst:0
    }
   var config = {
    headers: {
      "Content-type": "application/json",
    },
  };
    return axios
      .post(url,data,config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
  

static sendPI(
  enquiryId,
  cgst,
  expectedDateOfDelivery,
  hsn,
  ppu,
  quantity,
  sgst
 
  ) {
  let url = ApiUrl + "/enquiry/sendPi/"+ enquiryId;
 var data =
  {
 cgst:0,
  expectedDateOfDelivery:expectedDateOfDelivery,
  hsn:hsn,
  ppu:ppu,
  quantity:quantity,
  sgst:0
 
  }
 var config = {
  headers: {
    "Content-type": "application/json",
  },
};
  return axios
    .post(url,data,config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
} 
static sendTaxInvoice(
  apr,
  cgst,
  deliverycharge,
  enquiryId,
  finalamt,
  rpu,
  quantity,
  sgst,
 
  ) {
  let url = ApiUrl + "/enquiry/generateTaxInvoice";
 var data =
  {
  advancePaidAmt:apr,
  cgst:cgst,
  deliveryCharges:deliverycharge,
  enquiryId:parseInt(enquiryId),
  finalTotalAmt:finalamt,
  ppu:rpu,
  quantity:quantity,
  sgst:sgst
 
  }
 var config = {
  headers: {
    "Content-type": "application/json",
  },
};
  return axios
    .post(url,data,config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
} 

  static sendMoq(
    enquiryId,
    additionalInfo,
    deliveryDesc,
    moq,
    ppu,
   
    ) {
    let url = ApiUrl + "/enquiry/sendMoq/"+ enquiryId;
   var data =
    {
      additionalInfo: additionalInfo,
      deliveryTimeId: deliveryDesc,
      moq: moq,
      ppu: ppu
    }
   var config = {
    headers: {
      "Content-type": "application/json",
    },
  };
    return axios
      .post(url,data,config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  } 

  static getArtitionProducts() {
    let url = ApiUrl + "/product/getArtitionProducts";

    return axios
      .get(url)
      .then((response) => {

        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  static getProductUploadData() {
    
    let url = ApiUrl + "/product/getProductUploadData";

    return axios
      .get(url)
      .then((response) => {
        
        localStorage.removeItem("ProductUploadData");
        localStorage.setItem(
          "ProductUploadData",
          JSON.stringify(response.data.data)
        );

        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }


  static getOldPIData(enquiryId) {
    let url = ApiUrl + "/enquiry/getOldPIData?enquiryId="+enquiryId;

    return axios
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  static getClusters() {
    let url = ApiUrl + "/cluster/getAllClusters";

    return axios
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  static getFilteredArtisans() {
    let url = ApiUrl + "/filter/getFilteredArtisans";

    return axios
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  static getAllProducts() {
    let url = ApiUrl + "/product/getAllProducts";

    return axios
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
  static getProfile() {
    let url = ApiUrl + "/user/myprofile";
    return axios
      .get(url)
      .then((response) => {
        localStorage.removeItem("user");
        const user = response.data.data.user;
        localStorage.setItem("user", JSON.stringify(user));
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

 
  static async getBuyerSuggestions(value) {
    let config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        Accept: "application/json",
      },

      params: {
        str: value,
      },
    };
    const response = await axios.get(
      ApiUrl + "/search/getSuggestions",
      config
    );
    return response;
  }

  static showBuyerSearchSuggestion(searchQuery,searchTypes,pageno,boolAntaran){
     let url = ApiUrl + "/search/searchProducts";
    var data = {
      madeWithAntaran:boolAntaran ,
      pageNo: parseInt(pageno),
      searchString: searchQuery,
      searchType : parseInt(searchTypes)
    };
    var config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    return axios
      .post(url, data, config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }


  static searchProductCount(searchQuery,searchTypes,pageno,boolAntaran){
    let url = ApiUrl + "/search/searchProductCount";
   var data = {
     madeWithAntaran:boolAntaran ,
     pageNo: parseInt(pageno),
     searchString: searchQuery,
     searchType : parseInt(searchTypes)
   };
   var config = {
     headers: {
       "Content-type": "application/json",
     },
   };
   return axios
     .post(url, data, config)
     .then((response) => {
       return response;
     })
     .catch((error) => {
       return error.response;
     });
 }

 static searchArtisanProductCount(searchQuery,searchTypes,pageno,boolAntaran){
  let url = ApiUrl + "/search/searchArtisanProductCount";
 var data = {
   madeWithAntaran:boolAntaran ,
   pageNo: parseInt(pageno),
   searchString: searchQuery,
   searchType : parseInt(searchTypes)
 };
 var config = {
   headers: {
     "Content-type": "application/json",
   },
 };
 return axios
   .post(url, data, config)
   .then((response) => {
     return response;
   })
   .catch((error) => {
     return error.response;
   });
}

  static async getArtistSuggestions(value) {
    let config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        Accept: "application/json",
      },

      params: {
        str: value,
      },
    };
    const response = await axios.get(
      ApiUrl + "/search/getArtisanSuggestions",
      config
    );
    return response;
  }


  static showArtistSearchSuggestion(searchQuery,searchTypes,pageno,boolAntaran){
    let url = ApiUrl + "/search/searchArtisanProducts";
   var data = {
     madeWithAntaran: boolAntaran ,
     pageNo: pageno,
     searchString: searchQuery,
     searchType : parseInt(searchTypes)
   };
   var config = {
     headers: {
       "Content-type": "application/json",
     },
   };
   return axios
     .post(url, data, config)
     .then((response) => {
       return response;
     })
     .catch((error) => {
       return error.response;
     });
 }
  //#endregion

  static getEnquirStages() {
    let url = ApiUrl + "/enquiry/getAllEnquiryStages";

    return axios
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
 
  static getEnquirStagesforAvailable() {
    let url = ApiUrl + "/enquiry/getEnquiryStagesForAvailableProduct";

    return axios
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  static getInnerEnquirStages() {
    let url = ApiUrl + "/enquiry/getAllInnerEnquiryStages";

    return axios
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  static getAllNotifications() {
    let url = ApiUrl + "/notification/getAllNotifications";
    return axios
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  static getAllNotificationTypes() {
    let url = ApiUrl + "/notification/getAllNotificationTypes";
    return axios
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  static getOpenEnquiries() {
    let url = ApiUrl + "/enquiry/getOpenEnquiries";

    return axios
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  static getOpenOrders() {
    let url = ApiUrl + "/order/getOpenOrders";

    return axios
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  static getClosedOrders() {
    let url = ApiUrl + "/order/getClosedOrders";

    return axios
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

 
  static getClosedEnquiries() {
    let url = ApiUrl + "/enquiry/getClosedEnquiries";

    return axios
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }


  static getAdvancedPaymentReceipt(enquiryId) {
    let url = ApiUrl + "/enquiry/getAdvancedPaymentReceipt/{enquiryId}?enquiryId="+enquiryId;

    return axios
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  static getAdvancedPaymentStatus(enquiryId) {
    let url = ApiUrl + "/enquiry/getAdvancedPaymentStatus?enquiryId="+enquiryId;

    return axios
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  static progressUpdate(stageid, id,innerid) {
    let url = "";
    if(innerid == 0){
      url = ApiUrl + "/enquiry/setEnquiryOrderStages/" + stageid + "/" + id +"/{innerStageId}"  ;

    }else{
      url = ApiUrl + "/enquiry/setEnquiryOrderStages/" + stageid + "/" + id +  "/{innerStageId}?innerStageId=" + innerid  ;

    }
    var data = {
      
    };
    var config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    return axios
      .post(url, data, config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  static toggleChangeRequest(id){
    let url = ApiUrl + "/enquiry/toggleChangeRequestFromArtisan?enquiryId=" + id + "&status=0";
    var config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    return axios
      .post(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  static updateNotificationSeen(id){
   let url = ApiUrl + "/notification/markAsRead/" + id;
   var config = {
     headers: {
       "Content-type": "application/json",
     },
   };
   return axios
     .post(url)
     .then((response) => {
       return response;
     })
     .catch((error) => {
       return error.response;
     });
 }

 static markAllReadNotification(){
  let url = ApiUrl + "/notification/markAllAsRead";

  var config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  return axios
    .post(url)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}


static markEnquiryClosed(id){
  let url = ApiUrl + "/enquiry/markEnquiryCompleted/" + id;

  var config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  return axios
    .post(url)
    .then((response) => {
      return response;
      
    })
    .catch((error) => {
      return error.response;
    });
}

static getBuyerPreviewPI(code){
  let url = ApiUrl + "/enquiry/previewPI/" + code;

  var config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  return axios
    .get(url)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

static getChangeRequestItemTable(){
  let url = ApiUrl + "/enquiry/getChangeRequestItemTable";

  var config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  return axios
    .get(url)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

static buyerRaiseChangeRequest(enquiryCode, arrayData){
  let url = ApiUrl + "/enquiry/changeRequest";

  var config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  var data = {
    "enquiryId": enquiryCode,
    "itemList": arrayData
  }
  return axios
    .post(url, data, config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}
static changeRequestStatusUpdate(enquiryCode,arrayData,status){
  let url = ApiUrl + "/enquiry/changeRequestStatusUpdate?status="+status;
  var config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  var parameters = {
    "enquiryId": enquiryCode,
    "itemList": arrayData
  }
  return axios
    .post(url, parameters, config)
    .then((response) => {
     
      return response;
    })
    .catch((error) => {
      return error.response;
    });
} 

static getChangeRequestForArtisan(enquiryId) {
  let url = ApiUrl + "/enquiry/getChangeRequestForArtisan?enquiryId=" + enquiryId;
  return axios
    .get(url)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

static getArtisanQcResponse(enquiryId) {
  let url = ApiUrl + "/qc/getArtisanQcResponse?enquiryId=" + enquiryId;
  return axios
    .get(url)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

static getQCStages() {
  let url = ApiUrl + "/qc/getStages";
  return axios
    .get(url)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

static getAllQCQuestions() {
  let url = ApiUrl + "/qc/getAllQuestions";
  return axios
    .get(url)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

static  getPaymentDetailsForFinalPayment(enquiryId)  {
  let url = ApiUrl + "/enquiry/getPaymentDetailsForFinalPayment?enquiryId="+enquiryId;
  return axios
    .get(url)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}
static  getClosedOrder(enquiryId)  {
  let url = ApiUrl + "/order/getClosedOrder/{enquiryId}?enquiryId="+enquiryId;
  return axios
    .get(url)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}
 static  getOrderProgress(enquiryId)  {
  let url = ApiUrl + "/enquiry/getOrderProgress/"+enquiryId;
  return axios
    .get(url)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}
static  getAllRefArtisanReview()  {
  let url = ApiUrl + "/enquiry/getAllRefArtisanReview/";
  return axios
    .get(url)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}
static sendOrSaveQcForm(data){
  let url = ApiUrl + "/qc/sendOrSaveQcForm";

  var config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  return axios
    .post(url, data, config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

static  getRatingQuestions()  {
  let url = ApiUrl + "/user/getRatingQuestions";
  return axios
    .get(url)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

static submitRatingToUser(data){
  let url = ApiUrl + "/user/submitRatingToUser";

  var config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  return axios
    .post(url, data, config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

static  getRatingsForUser(enquiryId, userId)  {
  let url = ApiUrl + "/user/getRatingsForUser?enquiryId=" + enquiryId + "&userId=" + userId;
  return axios
    .get(url)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

static getEnquiryMessageChatList(searchedString)  {
  let url = ApiUrl + "/enquiry/getEnquiryMessageChatList?searchedString=" + searchedString;
  return axios
    .get(url)
    .then((response) => {
     return response;
    })
    .catch((error) => {
      return error.response;
    });
}

static getNewEnquiryMessageChatList(searchedString)  {
  let url = ApiUrl + "/enquiry/getNewEnquiryMessageChatList?searchedString=" + searchedString;
  return axios
    .get(url)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

static getAndReadChatMessageForEnquiry(enquiryId)  {
  let url = ApiUrl + "/enquiry/getAndReadChatMessageForEnquiry?enquiryId=" + enquiryId + "&isAdmin=0";
  return axios
    .get(url)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

static sendChatboxMessage(data){
  let url = ApiUrl + "/enquiry/sendChatboxMessage";

  var config = {
    headers: {
      "Content-type": "multipart/form-data",
    },
  };
  return axios
    .post(url, data, config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

static getEscalations()  {
  let url = ApiUrl + "/enquiry/getEscalations";
  return axios
    .get(url)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

static raiseEscalaton(data){
  let url = ApiUrl + "/enquiry/raiseEscalaton";

  var config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  return axios
    .post(url, data, config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

static getEscalationSummaryForEnquiry(enquiryId)  {
  let url = ApiUrl + "/enquiry/getEscalationSummaryForEnquiry?enquiryId=" + enquiryId;
  return axios
    .get(url)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

static resolveEscalation(id){
  let url = ApiUrl + "/enquiry/resolveEscalation?escalationId=" + id;

  var config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  return axios
    .post(url, config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

static goToEnquiryChat(enquiryId){
  let url = ApiUrl + "/enquiry/goToEnquiryChat?enquiryId=" + enquiryId;

  var config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  return axios
    .post(url, config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

static updateFaultyOrderStatusArtisan(enquiryId, status) {
  let url = ApiUrl + "/enquiry/updateFaultyOrderStatus?enquiryId=" + enquiryId + "&isOrderReturned=" + status;
  return axios
    .put(url)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

static updateFaultyOrderStatusBuyer(enquiryId, status) {
  let url = ApiUrl + "/enquiry/updateFaultyOrderStatus?enquiryId=" + enquiryId + "&isRefundReceived=" + status;
  return axios
    .put(url)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

static recreateOrder(enquiryId){
  let url = ApiUrl + "/order/recreateOrder?orderId=" + enquiryId;

  var config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  return axios
    .post(url, config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

static orderDispatchAfterRecreation(enquiryId){
  let url = ApiUrl + "/order/orderDispatchAfterRecreation?orderId=" + enquiryId;

  var config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  return axios
    .post(url, config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

static getOldQc(enquiryId) {
  let url = ApiUrl + "/qc/getOldQc?enquiryId=" + enquiryId;
  return axios
    .get(url)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

static socialLogin(type, token) {
  let url = ApiUrl + "/login/authenticate?socialTokenType=" + type + "&socialToken=" + token + "&deviceType=Website";

  var config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  return axios
    .post(url, config)
    .then((response) => {
      if (response.data.valid) {
        var language = localStorage.getItem("i18nextLng");
        localStorage.clear();
        sessionStorage.clear();
        // remove user from local storage to log user out
        localStorage.removeItem("user");
        localStorage.removeItem("jwtToken");
        const token = response.data.data.acctoken;
        const user = response.data.data.user;
        localStorage.setItem("jwtToken", token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("i18nextLng", language);
        setAuthorizationtoken(token);

      }
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}
  //#endregion
}
export default TTCEapi;
