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
        return error;
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
        return error;
      });
  }

  //#endregion

  //#region login
  static login(username, password) {
    let url = ApiUrl + "/login/authenticate";
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
          debugger
          const token = response.data.data.acctoken;
          const user = response.data.data.user;
          localStorage.setItem('jwtToken', token);
           localStorage.setItem("user", JSON.stringify(user));
          setAuthorizationtoken(token);
          debugger;
        console.log(jwt.decode(token));
        return response;
      })
      .catch((error) => {
        return error;
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
        return error;
      });
  }

  //#endregion

  //#endregion

  //#region get methods

  //#region login
  static sendOtpForgotpass(emailId) {
    let url = ApiUrl + "/forgotpassword/sendotp?email=" + emailId;

    return axios
      .get(url)
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  static validateUsername(username) {
    let url = ApiUrl + "/login/validateusername?emailOrMobile=" + username;

    return axios
      .get(url)
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((error) => {
        return error;
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
        return error;
      });
  }

  static registerArtist(weaverid,emailid,password,firstname,lastname,pincode,cluster,district,state,mobileno,panno,address1)    {
        
    let url = ApiUrl + "/register/user";
        var data = {
            address : {
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
            productCategoryIds:[1],
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
            return error;
          });
    }

    static registerBuyer(companyname,gstno,officeno,brandLogo,cinno,panno,logoname,adl1,
      adl2,street,city,state,country,pincode,landmark,weblink, sociallink,firstname,
      lastname,mobileno,alternatemobno,designation,password,emailid)    {
        
      let url = ApiUrl + "/register/user";
          var data = {
              address : {
                city: city,
                country: country,
                landmark: landmark,
                line2: adl2,                               
                street: street,
                line1 : adl1,
                pincode :pincode,
                state : state 
              },
              alternateMobile: alternatemobno,
              buyerCompanyDetails : {
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
              console.log(response);
              return response;
            })
            .catch((error) => {
              return error;
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
        return error;
      });
  }
  //#endregion

  //#endregion
}
export default TTCEapi;