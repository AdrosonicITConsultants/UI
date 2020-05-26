import axios from "axios";


const ApiUrl = "http://101.53.156.143:8090";
class TTCEapi {

    static checkWeaverId(weaverId, weaverPin){
        let url = ApiUrl + "/register/verifyWeaverDetails";
        var data = {
            weaverId : weaverId,
            pin : weaverPin
        }
        var config= {
            headers : {
                "Content-type" : "application/json"
            }
        }
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

    static verifyOtp(emailId, Otp){
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
             .catch((error) => {return error});
    }
}
export default TTCEapi;