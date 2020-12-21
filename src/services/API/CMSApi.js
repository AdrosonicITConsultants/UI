import axios from "axios";


var env = "live";
var CMSUrl = "";

if (env == "dev") {
    CMSUrl = "http://101.53.158.227/wordpress/index.php/wp-json/wp/v2";
} 
else if (env == "uat") {
    CMSUrl = "";
} 
else if (env == "live") {
    CMSUrl = "https://craftxchange.antaran.in/index.php/wp-json/wp/v2";
}

export default class CMSApi {

    static getPages(id) {
        let url = CMSUrl + "/pages/" + id;
    
        return axios
        .get(url)
        .then((response) => {
        return response;
        })
        .catch((error) => {
        return error.response;
        });
    }

    static getRegions() {
        let url = CMSUrl + "/regions";
    
        return axios
        .get(url)
        .then((response) => {
        return response;
        })
        .catch((error) => {
        return error.response;
        });
    }

    static getCategoriesSelfDesign() {
        let url = CMSUrl + "/categoriesselfdesign";
    
        return axios
        .get(url)
        .then((response) => {
        return response;
        })
        .catch((error) => {
        return error.response;
        });
    }

    static getCategoriesCoDesign() {
        let url = CMSUrl + "/categoriescodesign";
    
        return axios
        .get(url)
        .then((response) => {
        return response;
        })
        .catch((error) => {
        return error.response;
        });
    }

    static getDemoVideos() {
        let url = CMSUrl + "/demo-video";
    
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