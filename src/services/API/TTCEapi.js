import axios from "axios";



class TTCEapi {
    
    static checkWeaverId(weaverId, weaverPin){
        let url = "http://101.53.156.143:8090/register/verifyWeaverDetails";
        var data = {
            weaverId : weaverId,
            pin : weaverPin
        }
        var config= {
            headers : {
                "Content-type" : "application/json"
            }
        }
        return axios.post(url , data ,config)
        .then((response)=>{
            console.log(response);
            return response;
        })

    }
}
export default TTCEapi;