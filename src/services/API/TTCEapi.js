import axios from "axios";
import isEmail from "validator/lib/isEmail";


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
  static checkWeaverId(weaverId, weaverPin) {
    let url = ApiUrl + "/register/verifyWeaverDetails";
    var data = {
      weaverId: weaverId,
      pin: weaverPin,
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

  //#endregion

  //#endregion
}
export default TTCEapi;