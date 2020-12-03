import React, { Component } from 'react';
import { Row, Col, Container } from 'reactstrap';
import "./buyerRegister.css"
import Buyreg1 from "./buyreg1";
import Buyreg2 from "./buyreg2";
import Buyreg3 from "./buyreg3";
import Buyreg4 from "./buyreg4";
import Buyreg5 from "./buyreg5";
import Buyreg6 from "./buyreg6";
import TTCEapi from "../../../services/API/TTCEapi";
import customToast from "../../../shared/customToast";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { memoryHistory, browserHistory } from "../../../helpers/history";




export default class buyerRegister extends Component {
                 constructor(props) {
                   super(props);

                   this.state = {
                     userpage: localStorage.getItem("regCurrentPage") ? parseInt(localStorage.getItem("regCurrentPage")) : 0,
                     emailid: localStorage.getItem("regEmailId") ? localStorage.getItem("regEmailId") : "",
                     password: "",
                     firstname: localStorage.getItem("regFirstName") ? localStorage.getItem("regFirstName") : "",
                     lastname: localStorage.getItem("regLastName") ? localStorage.getItem("regLastName") : "",
                     mobileno: localStorage.getItem("regMobile") ? localStorage.getItem("regMobile") : "",
                     alternatemobno: localStorage.getItem("regAlternateMobile") ? localStorage.getItem("regAlternateMobile") : "",
                     designation: localStorage.getItem("regDesignation") ? localStorage.getItem("regDesignation") : "",
                     companyname: localStorage.getItem("regCompany") ? localStorage.getItem("regCompany") : "",
                     gstno: localStorage.getItem("regGST") ? localStorage.getItem("regGST") : "",
                     officeno: "",
                     brandLogo: [],
                     logoname : "",
                     cinno: localStorage.getItem("regCIN") ? localStorage.getItem("regCIN") : "",
                     panno: localStorage.getItem("regPanNo") ? localStorage.getItem("regPanNo") : "",
                     adl1: localStorage.getItem("regAddress1") ? localStorage.getItem("regAddress1") : "",
                     adl2: localStorage.getItem("regAddress2") ? localStorage.getItem("regAddress2") : "",
                     street: localStorage.getItem("regStreet") ? localStorage.getItem("regStreet") : "",
                     city: localStorage.getItem("regCity") ? localStorage.getItem("regCity") : "",
                     state: localStorage.getItem("regState") ? localStorage.getItem("regState") : "",
                     country: localStorage.getItem("regCountry") ? localStorage.getItem("regCountry") : "",
                     pincode: localStorage.getItem("regPincode") ? localStorage.getItem("regPincode") : "",
                     landmark: localStorage.getItem("regLandmark") ? localStorage.getItem("regLandmark") : "",
                     weblink: localStorage.getItem("regWebLink") ? localStorage.getItem("regWebLink") : "",
                     sociallink: localStorage.getItem("regSocialLink") ? localStorage.getItem("regSocialLink") : "",
                     pocname : localStorage.getItem("regPOCName") ? localStorage.getItem("regPOCName") : "",
                    pocemail : localStorage.getItem("regPOCEmail") ? localStorage.getItem("regPOCEmail") : "",
                    pocmobile : localStorage.getItem("regPOCMobile") ? localStorage.getItem("regPOCMobile") : "",
                    countryid : localStorage.getItem("regCountryId") ? localStorage.getItem("regCountryId") : "",
                    passwordSend : localStorage.getItem("regPassword") ? localStorage.getItem("regPassword") : "",

                     
                   };
                   this.handler = this.handler.bind(this);
                   this.sendotp = this.sendotp.bind(this);
                   this.verifyOtp = this.verifyOtp.bind(this);
                   this.storepassword = this.storepassword.bind(this);
                   this.storepersonaldetails = this.storepersonaldetails.bind(
                     this
                   );
                   this.storecompanydetails = this.storecompanydetails.bind(
                     this
                   );
                   this.storeaddressdetails = this.storeaddressdetails.bind(
                     this
                   );
                   this.storelink = this.storelink.bind(this);
                 }


                 renderSection(num) {
                   switch (num) {
                     case 0:
                       return (
                         <Buyreg1
                           handler={this.handler}
                           so={this.sendotp}
                           vo={this.verifyOtp}
                         />
                       );
                       break;
                     case 1:
                       return (
                         <Buyreg2
                           handler={this.handler}
                           sp={this.storepassword}
                           password = {this.state.password}
                         />
                       );
                       break;
                     case 2:
                       return (
                         <Buyreg3
                           handler={this.handler}
                           spd={this.storepersonaldetails}
                           firstname = {this.state.firstname}
                           lastname = {this.state.lastname}
                           mobileno = {this.state.mobileno}
                           alternatemobno = {this.state.alternatemobno}
                           designation = {this.state.designation}
                         />
                       );
                       break;
                     case 3:
                       return (
                         <Buyreg4
                           handler={this.handler}
                           scd={this.storecompanydetails}
                           companyname = {this.state.companyname}
                           gstno = {this.state.gstno}
                           officeno = {this.state.officeno}
                           brandLogo = {this.state.brandLogo}
                           cinno = {this.state.cinno}
                           panno = {this.state.panno}
                           logoname = {this.state.logoname}
                           pocname = {this.state.pocname}
                           pocemail = {this.state.pocemail}
                           pocmobile = {this.state.pocmobile}
                          

                         />
                       );
                       break;
                     case 4:
                       return (
                         <Buyreg5
                           handler={this.handler}
                           sad={this.storeaddressdetails}
                           adl1 = {this.state.adl1}
                           adl2 = {this.state.adl2}
                           street = {this.state.street}
                           city = {this.state.city}
                           state = {this.state.state}
                           country = {this.state.country}
                           pincode = {this.state.pincode}
                           landmark = {this.state.landmark}
                           countryid = {this.state.countryid}
                           
                         />
                       );
                       break;
                     case 5:
                       return (
                         <Buyreg6 
                            handler={this.handler} 
                            sl={this.storelink} 
                            sociallink = {this.state.sociallink}
                            weblink = {this.state.weblink}/>
                       );
                       break;
                     default:
                       break;
                   }
                 }
                 storelink(weblink, sociallink) {
                   this.setState(
                     { weblink: weblink, sociallink: sociallink },
                     () => {
                          TTCEapi.registerBuyer(this.state.companyname,this.state.gstno,this.state.officeno,
                            this.state.brandLogo,this.state.cinno,this.state.panno,this.state.logoname,
                            this.state.adl1,this.state.adl2,this.state.street,this.state.city,
                            this.state.state,this.state.country,this.state.pincode,this.state.landmark,
                            this.state.weblink, this.state.sociallink,this.state.firstname,
                            this.state.lastname,this.state.mobileno,this.state.alternatemobno,
                            this.state.designation,this.state.passwordSend ? this.state.passwordSend : this.state.password,this.state.emailid,
                            this.state.pocmobile,this.state.pocemail,this.state.pocname,
                            this.state.countryid).then(
                              (response) => {
                                if (response.data.valid) {
                                  customToast.success("Registration is successful ", {
                                    position: toast.POSITION.TOP_RIGHT,
                                    autoClose: true,
                                  });
                                  localStorage.setItem("homepageredirect", 1);
                                    setTimeout(() => {
                                      browserHistory.push("/");
                                    }, 2000);
                                  
                                 } else {
                                     customToast.error(response.data.errorMessage, {
                                       position: toast.POSITION.TOP_RIGHT,
                                       autoClose: true,
                                     });
                                 }
                              }
                            );
                      }
                   );
                 }
                 storeaddressdetails(
                   adl1,
                   adl2,
                   street,
                   city,
                   state,
                   country,
                   pincode,
                   landmark,
                   countryid
                 ) {
                   this.setState(
                     {
                       adl1: adl1,
                       adl2: adl2,
                       street: street,
                       city: city,
                       state: state,
                       country: country,
                       pincode: pincode,
                       landmark: landmark,
                       countryid: countryid,
                     },
                     () => {
                      
                     }
                   );
                 }
                 storecompanydetails(
                   companyname,
                   gstno,
                   officeno,
                   brandLogo,
                   cinno,
                   panno,
                   logoname,pocmobile,pocemail,pocname
                 ) {
                   this.setState(
                     {
                       companyname: companyname,
                       gstno: gstno,
                       officeno: officeno,
                       brandLogo: brandLogo,
                       panno: panno,
                       cinno: cinno,
                       logoname : logoname,
                       pocmobile: pocmobile,
                       pocemail: pocemail,
                       pocname : pocname
                     },
                     () => {
                      
                     }
                   );
                 }
                 storepersonaldetails(
                   firstname,
                   lastname,
                   mobileno,
                   alternatemobno,
                   designation
                 ) {
                   this.setState(
                     {
                       firstname: firstname,
                       lastname: lastname,
                       mobileno: mobileno,
                       alternatemobno: alternatemobno,
                       designation: designation,
                     },
                     () => {
                     
                     }
                   );
                 }
                 storepassword(password) {
                   this.setState({ password: password },() =>{ 
                   });
                 }
               
                 
                 handler(num) {
                   this.setState({ userpage: num }, () => {
                   });
                 }
                 sendotp(emailid) {                
                 
                   this.setState({ emailid: emailid }, () => {
                     TTCEapi.sendOtp(emailid).then((response) => {
                       if (response.data.valid) {
                         customToast.success(response.data.data, {
                           position: toast.POSITION.TOP_RIGHT,
                           autoClose: true,
                         });
                       } else {
                         customToast.error(response.data.errorMessage, {
                           position: toast.POSITION.TOP_RIGHT,
                           autoClose: true,
                         });
                       }
                     });
                   });
                 }

                 verifyOtp(emailid, otppin) {
                   this.setState({ emailid: emailid }, () => {
                     TTCEapi.verifyOtp(emailid, otppin).then((response) => {
                       if (response.data.valid) {
                         this.handler(1);
                       } else {
                          customToast.error(response.data.errorMessage, {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: true,
                          });
                       }
                     });
                   });
                 }

                 render() {
                   return (
                     <React.Fragment>
                       <div className="registerimg">
                         <Container>
                           <Row   className="mt-5">
                             {this.renderSection(this.state.userpage)}
                           </Row>
                         </Container>
                       </div>
                     </React.Fragment>
                   );
                 }
               }
