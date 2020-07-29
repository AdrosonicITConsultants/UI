import axios from "axios";
import isEmail from "validator/lib/isEmail";
import setAuthorizationtoken from "../utils/setAuthorizationtoken";
import jwt from "jsonwebtoken";
import customToast from "../../shared/customToast";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

var env = "dev";
var ApiUrl = "http://101.53.153.96:8090";
if (env == "dev") {
  ApiUrl = "http://101.53.153.96:8090";
} else if (env == "uat") {
  // ApiUrl = "http://63.34.28.175:8090/TEGAPI/services";
} else if (env == "live") {
  // ApiUrl = "https://www.bestforexrate.co.uk/TEGAPI/services";
}

class TTCEapi {
  static ImageUrl =
    " https://f3adac-craft-exchange-resource.objectstore.e2enetworks.net/";
  //#region post methods

  static validatePass(pass) {
    const re = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/g);
    const isOk = re.test(pass);
    // console.log(isOk);
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
        console.log(response);
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
        console.log(response);
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
          localStorage.clear();
          sessionStorage.clear();
          // remove user from local storage to log user out
          localStorage.removeItem("user");
          localStorage.removeItem("jwtToken");
          const token = response.data.data.acctoken;
          const user = response.data.data.user;
          localStorage.setItem("jwtToken", token);
          localStorage.setItem("user", JSON.stringify(user));
          setAuthorizationtoken(token);

          //  console.log(jwt.decode(token));
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
        console.log(response);
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  //#endregion

  static uploadProduct(file1, file2 = null, file3 = null, productData) {
    debugger;
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
        console.log(response);
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  static buyerpUploadDesign(file1, file2 = null, file3 = null , productData) {
    debugger;
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
      console.log("efjjfi");
       console.log(response);
       return response;
     })
     .catch((error) => {
      console.log("efwdwdwdjjfi");
       return error.response;

     });
 }
  static editProduct(file1, file2 = null, file3 = null, productData) {
    debugger;
    console.log(productData);
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
        console.log(response);
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }


  static editCustomProduct(file1, file2 = null, file3 = null, productData) {
    debugger;
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
    console.log(data);
    console.log(productData);
    return axios
      .put(url, data, config)
      .then((response) => {
        console.log(response);
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
        console.log(response);
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
        console.log(response);
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
        console.log(response);
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
        console.log(response);
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
        console.log(response);
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
  static getProductCategoryProducts(id) {
    console.log(id);
    let url = ApiUrl + "/product/getProductCategoryProducts/" + id;

    return axios
      .get(url)
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  static getClusterProducts(id) {
    console.log(id);
    let url = ApiUrl + "/product/getClusterProducts/" + id;

    return axios
      .get(url)
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  static getArtisianProducts(id) {
    console.log(id);
    let url = ApiUrl + "/product/getProductByArtisan/" + id;

    return axios
      .get(url)
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
  static getArtisianProductCategory(userid, categoryid) {
    console.log(userid, categoryid);
    let url =
      ApiUrl +
      "/product/getProductCategoryAndArtisanProducts/" +
      categoryid +
      "/" +
      userid;

    return axios
      .get(url)
      .then((response) => {
        console.log(response);
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
        console.log(response);
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
        console.log(response);
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

 

  static getMoq(enquiryId) {
    let url = ApiUrl + "/enquiry/getMoq/{enquiryId}?enquiryId="+ enquiryId;

    return axios
      .get(url)
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  } 
 
  static getPi(enquiryId) {
    let url = ApiUrl + "/enquiry/getPi/{enquiryId}?enquiryId="+ enquiryId;

    return axios
      .get(url)
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  } 
 

  static getEnquiryMoq(enquiryId) {
    let url = ApiUrl + "/enquiry/getEnquiry/{enquiryId}?enquiryId="+ enquiryId;

    return axios
      .get(url)
      .then((response) => {
        console.log(response);
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
        console.log(response);
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
        console.log(response);
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
        console.log(response);
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
        console.log(response);
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
        console.log(response);
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
        console.log(response);
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  static addToWishlist(productId) {
    let url = ApiUrl + "/product/addToWishlist/" + productId;
    console.log(url);
    return axios
      .post(url)
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  static generateEnquiry(productId,isCustom) {
    let url = ApiUrl + "/enquiry/generateEnquiry/" + productId + "/" + isCustom ;
    console.log(url);
    return axios
      .post(url)
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  static generateEnquiryTrue(productId,isCustom) {
    let url = ApiUrl + "/enquiry/generateEnquiry/" + productId + "/" + isCustom ;
    console.log(url);
    return axios
      .post(url)
      .then((response) => {
        console.log(response);
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
        console.log(response);
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
        console.log(response);
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
        console.log(response);
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
        console.log(response);
        return response;
      })
      .catch((error) => {
        return error.response;

      });
  }
  //#endregion

  //#region registration
  static sendOtp(emailId) {
    let url = ApiUrl + "/register/sendVerifyEmailOtp?email=" + emailId;

    return axios
      .get(url)
      .then((response) => {
        console.log(response);
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
    debugger;
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
    console.log(data1);
    console.log(selectedFile);
    debugger;
    bodyFormData.append("registerRequest", JSON.stringify(data1));
    bodyFormData.append("profilePic", selectedFile);

    // console.log(data);
    var config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };
    return axios
      .post(url, bodyFormData, config)
      .then((response) => {
        console.log(response);
        debugger;
        return response;
      })
      .catch((error) => {
        debugger;
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
    console.log(data);
    console.log(brandLogo);
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
        debugger;
        console.log(response);
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
    console.log(data);
    console.log(selectedBrandFile);
    console.log(removedlogo);

    bodyFormData.append("profileDetails", JSON.stringify(data));
    if (removedlogo == 1) {
      // bodyFormData.append('', selectedBrandFile);
      var f = new File([""], "");
      bodyFormData.append("logo", f);
      debugger;
    }
    if (removedlogo == 2) {
      bodyFormData.append("logo", selectedBrandFile);
    }
    // bodyFormData.append('logo', selectedBrandFile);

    // console.log(data);
    var config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };

    return axios
      .put(url, bodyFormData, config)
      .then((response) => {
        console.log(response);
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
    console.log(data);
    console.log(selectedFile);
    bodyFormData.append("address", JSON.stringify(data));
    console.log(removedprofile);
    if (removedprofile == 1) {
      var f = new File([""], "");
      bodyFormData.append("profilePic", f);
      debugger;
    }
    if (removedprofile == 2) {
      bodyFormData.append("profilePic", selectedFile);
    }

    // console.log(data);
    var config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };

    return axios
      .put(url, bodyFormData, config)
      .then((response) => {
        console.log(response);
        if (response.data.valid) {
          console.log("Personal details updated");
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
    console.log(data);
    console.log(selectedBrandFile);
    console.log(removedlogo);

    bodyFormData.append("editBrandDetails", JSON.stringify(data));
    if (removedlogo == 1) {
      // bodyFormData.append('', selectedBrandFile);
      var f = new File([""], "");
      bodyFormData.append("logo", f);
      debugger;
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
        console.log(response);
        if (response.data.valid) {
          console.log("Brand details updated");
        }
        return response;
      })
      .catch((error) => {
        console.log(error.response);
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
    console.log(data);
    // debugger;

    var config = {
      headers: {
        "Content-type": "application/json",
        // "Authorization" : axios.defaults.headers.common['Authorization']
      },
    };
    return axios
      .put(url, data, config)
      .then((response) => {
        console.log(response);
        if (response.data.valid) {
          console.log("details updated");
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
    let url = ApiUrl + "/enquiry/saveMoq/{enquiryId}?enquiryId="+ enquiryId;
   var data =
    {
      additionalInfo: additionalInfo,
      deliveryTimeId: deliveryDesc,
      moq: moq,
      ppu: ppu
    }
   console.log(data)
   var config = {
    headers: {
      "Content-type": "application/json",
    },
  };
    return axios
      .post(url,data,config)
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  } 
  // enquiry/savePi/{enquiryId}?enquiryId=698
  static savePi(
    enquiryId,
   cgst,
   dod,
   hsncode,
   rpu,
   quantity,
   sgst,
   
    ) {
    let url = ApiUrl + "/enquiry/savePi/{enquiryId}?enquiryId="+ enquiryId;
   var data =
    {
      cgst: cgst,
      expectedDateOfDelivery: dod,
      hsn: hsncode,
      ppu: rpu,
      quantity:quantity,
      sgst:sgst
    }
   console.log(data)
   var config = {
    headers: {
      "Content-type": "application/json",
    },
  };
    return axios
      .post(url,data,config)
      .then((response) => {
        console.log(response);
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
    let url = ApiUrl + "/enquiry/sendMoq/{enquiryId}?enquiryId="+ enquiryId;
   var data =
    {
      additionalInfo: additionalInfo,
      deliveryTimeId: deliveryDesc,
      moq: moq,
      ppu: ppu
    }
   console.log(data)
   var config = {
    headers: {
      "Content-type": "application/json",
    },
  };
    return axios
      .post(url,data,config)
      .then((response) => {
        console.log(response);
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
        console.log(response);

        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  static getProductUploadData() {
    debugger;
    let url = ApiUrl + "/product/getProductUploadData";

    return axios
      .get(url)
      .then((response) => {
        debugger;
        console.log(response);
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

  static getClusters() {
    let url = ApiUrl + "/cluster/getAllClusters";

    return axios
      .get(url)
      .then((response) => {
        console.log(response);
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
        console.log(response);
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
        console.log(response);
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
        console.log("profiledata");
        localStorage.removeItem("user");
        const user = response.data.data.user;
        localStorage.setItem("user", JSON.stringify(user));

        console.log(response);
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
    console.log(config);
    const response = await axios.get(
      "http://101.53.153.96:8090/search/getSuggestions",
      config
    );
    return response;
  }

  static showBuyerSearchSuggestion(searchQuery,searchTypes){
     let url = ApiUrl + "/search/searchProducts";
    var data = {
      pageNo: 1,
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
        console.log(response);
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
    console.log(config);
    const response = await axios.get(
      "http://101.53.153.96:8090/search/getArtisanSuggestions",
      config
    );
    return response;
  }


  static showArtistSearchSuggestion(searchQuery,searchTypes){
    let url = ApiUrl + "/search/searchArtisanProducts";
   var data = {
     pageNo: 1,
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
       console.log(response);
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
        console.log(response);

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
        console.log(response);

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
        console.log(response);

        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  //#endregion
}
export default TTCEapi;
