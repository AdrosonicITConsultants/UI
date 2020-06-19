import axios from "axios";
import isEmail from "validator/lib/isEmail";
import setAuthorizationtoken from "../utils/setAuthorizationtoken";
import jwt from  "jsonwebtoken";

var env = "dev";
var ApiUrl = "http://101.53.156.143:8090";
if (env == "dev") {
  ApiUrl = "http://101.53.156.143:8090";
} else if (env == "uat") {
 // ApiUrl = "http://63.34.28.175:8090/TEGAPI/services";
} else if (env == "live") {
 // ApiUrl = "https://www.bestforexrate.co.uk/TEGAPI/services";
}

class TTCEapi {
  //#region post methods

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
      roleId: roleID
    };
    var config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    return axios
      .post(url, data, config)
      .then((response) => {
           if (response.data.valid)
           { localStorage.clear();
          sessionStorage.clear();
          // remove user from local storage to log user out
          localStorage.removeItem("user");
          localStorage.removeItem("jwtToken");
          const token = response.data.data.acctoken;
          const user = response.data.data.user;
          localStorage.setItem('jwtToken', token);
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



  


   static uploadProduct(file1, file2 = null, file3 = null , productData) {
     debugger;
    let url = ApiUrl + "/product/uploadProduct";
    var data = new FormData();
    data.append("file1", file1);
    data.append("file2", file2);
    data.append("file3", file3);
    data.append("productData", JSON.stringify(productData));


    // var data = {
    //   file1: file1,
    //   file2: file2,
    //   file3: file3,
    //   productData: productData,
    //   // pin: weaverPin,
    // };
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
  //#endregion

  //#region get methods
    static getProducts(){
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


    static getCountries(){
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

  //#region login
  static sendOtpForgotpass(emailId, roleID) {
    let url = ApiUrl + "/forgotpassword/sendotp?email=" + emailId + "&roleId=" + roleID;

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
    let url = ApiUrl + "/login/validateusername?emailOrMobile=" + username + "&roleId=" + roleID;

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
  static registerArtist(weaverid,emailid,password,firstname,lastname,pincode,cluster,district,state,mobileno,panno,address1,selectedProducts)    {
        
    let url = ApiUrl + "/register/user";
        var data = {
            address : {
                country :{
                  id: 1,
                  name : "india"
                },
                district : district,
                line1 : address1,
                pincode :pincode,
                state : state 
            },
            clusterId : parseInt(cluster),
            email : emailid,
            firstName : firstname,
            lastName : lastname,
            mobile : mobileno,
            pancard : panno,
            password: password,
            refRoleId : 1,
            productCategoryIds : selectedProducts,
            weaverId:weaverid
        };
        console.log(data);
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

    static registerBuyer(companyname,gstno,officeno,brandLogo,cinno,panno,logoname,adl1,
      adl2,street,city,state,country1,pincode,landmark,weblink, sociallink,firstname,
      lastname,mobileno,alternatemobno,designation,password,emailid,pocmobile,pocemail,pocname,countryid)    {
        
      let url = ApiUrl + "/register/user";
          var data = {
              address : {
                city: city,
                country: {
                  id : parseInt(countryid),
                  name : country1

                },
                landmark: landmark,
                line2: adl2,                               
                street: street,
                line1 : adl1,
                pincode :pincode,
                state : state 
              },
              buyerPointOfContact: {
                contactNo: pocmobile,
                email: pocemail,
                firstName : pocname
              },
              alternateMobile: alternatemobno,
              companyDetails : {
                  cin : cinno,
                  companyName : companyname,
                  contact : officeno,
                  gstNo: gstno,
                  logo: logoname
              },
              designation: designation,
              email : emailid,
              firstName : firstname,
              lastName : lastname,
              mobile : mobileno,
              pancard : panno,
              password: password,
              refRoleId : 2,
              socialMediaLink: sociallink,  
              websiteLink: weblink
          };
          console.log(data);
          var config = {
            headers: {
              "Content-type": "application/json",
            },
          };
          return axios
            .post(url, data, config)
            .then((response) => {
              debugger
              console.log(response);
              return response;
            })
            .catch((error) => {
              
              return error.response;
            });
      }


  static updateBuyerProfile(companyname, gstno, 
    cinno, panno,line11, line22, street, city1,state, 
    country1,pincode,landmark1, alternatemobno,
    designation,pocmobile, pocemail,pocname,
    countryid)   {

    let url = ApiUrl + "/user/edit/buyerProfile";
    var data = {
      address: {
        city: city1,
        country: {
          id: parseInt(countryid),
          name: country1
        },
        line1: line11,
        line2: line22,
        landmark: landmark1,      
        street: street,        
        pincode: pincode,
        state: state
      },
      buyerPointOfContact: {
        contactNo: pocmobile,
        email: pocemail,
        firstName: pocname
      },
      alternateMobile: alternatemobno,
      buyerCompanyDetails: {
        cin: cinno,
        companyName: companyname,
        gstNo: gstno
      },
      designation: designation,    
      pancard: panno,
    
    };
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
        if (response.data.valid)
           { 
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
 static updatePersonalDetails(line1,district,pincode,state){
  let url = ApiUrl + "/user/edit/artistProfile";
  var data = {
    country :{
      id: 1,
      name : "INDIA"
    },
    district : district,
    line1 : line1,
    pincode :pincode,
    state : state 

  }
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
        if (response.data.valid)
           { 
              console.log("Personal details updated");
           }
        return response;
      })
      .catch((error) => {
        return error.response;

      });
  


 }

 static updateBrandDetails(brandname,branddesc,selectedprods){
  let url = ApiUrl + "/user/edit/artistBrandDetails";
  var data = {
    companyDetails : {
      companyName : brandname,
      desc : branddesc
    },
    productCategories : selectedprods
   
  }
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
        if (response.data.valid)
           { 
              console.log("Brand details updated");
           }
        return response;
      })
      .catch((error) => {
        return error.response;

      });
  


 }

  static updateBankDetails(accountno,bankname,branch,ifsccode,benificiaryname,gpayupi,paytmupi,phonepeupi){
    let url = ApiUrl + "/user/edit/bankDetails";
    var data = [
      {
        accNo_UPI_Mobile : accountno,
        accountType : {
          id : 1
        },
        bankName : bankname,
        branch  : branch,
        ifsc : ifsccode,
        name : benificiaryname

      },
      {
        accNo_UPI_Mobile : gpayupi,
        accountType : {
          id : 2
        }

      },
      {
        accNo_UPI_Mobile : phonepeupi,
        accountType : {
          id : 3
        }

      },
      {
        accNo_UPI_Mobile : paytmupi,
        accountType : {
          id : 4
        }

      }

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
        if (response.data.valid)
           { 
              console.log("details updated");
           }
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
        localStorage.setItem('ProductUploadData', JSON.stringify(response.data.data));

        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

    static getClusters(){
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

  static getProfile(){
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
  //#endregion

  //#endregion
}
export default TTCEapi;