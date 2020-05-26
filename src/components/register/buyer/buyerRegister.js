import React, { Component } from 'react';
import { Row, Col, Container } from 'reactstrap';
import "./buyerRegister.css"
// import Buyerlogin from "../../buyer/buyeruser";
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




export default class buyerRegister extends Component {
                 constructor(props) {
                   super(props);

                   this.state = {
                     userpage: 5,
                     emailid: "",
                     password: "",
                     firstname: "",
                     lastname: "",
                     mobileno: "",
                     alternatemobno: "",
                     designation: "",
                     companyname: "",
                     gstno: "",
                     officeno: "",
                     brandLogo: [],
                     cinno: "",
                     panno: "",
                     adl1: "",
                     adl2: "",
                     street: "",
                     city: "",
                     state: "",
                     country: "",
                     pincode: "",
                     landmark: "",
                     weblink: "",
                     sociallink: "",
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
                         />
                       );
                       break;
                     case 2:
                       return (
                         <Buyreg3
                           handler={this.handler}
                           spd={this.storepersonaldetails}
                         />
                       );
                       break;
                     case 3:
                       return (
                         <Buyreg4
                           handler={this.handler}
                           scd={this.storecompanydetails}
                         />
                       );
                       break;
                     case 4:
                       return (
                         <Buyreg5
                           handler={this.handler}
                           sad={this.storeaddressdetails}
                         />
                       );
                       break;
                     case 5:
                       return (
                         <Buyreg6 handler={this.handler} sl={this.storelink} />
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
                       console.log(this.state.weblink, this.state.sociallink);
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
                   landmark
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
                     },
                     () => {
                       console.log(
                         this.state.adl1,
                         this.state.adl2,
                         this.state.street,
                         this.state.city,
                         this.state.state,
                         this.state.country,
                         this.state.pincode,
                         this.state.landmark
                       );
                     }
                   );
                 }
                 storecompanydetails(
                   companyname,
                   gstno,
                   officeno,
                   brandLogo,
                   cinno,
                   panno
                 ) {
                   this.setState(
                     {
                       companyname: companyname,
                       gstno: gstno,
                       officeno: officeno,
                       brandLogo: brandLogo,
                       panno: panno,
                       cinno: cinno,
                     },
                     () => {
                       console.log(
                         this.state.companyname,
                         this.state.gstno,
                         this.state.officeno,
                         this.state.brandLogo,
                         this.state.cinno,
                         this.state.panno
                       );
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
                       console.log(
                         this.state.firstname,
                         this.state.lastname,
                         this.state.mobileno,
                         this.state.alternatemobno,
                         this.state.designation
                       );
                     }
                   );
                 }
                 storepassword(password) {
                   this.setState({ password: password });
                   console.log(password);
                 }
               
                 
                 handler(num) {
                   this.setState({ userpage: num }, () => {
                     console.log(this.state.userpage);
                   });
                 }
                 sendotp(emailid) {                
                   console.log(emailid);               
                   debugger;
                   this.setState({ emailid: emailid }, () => {
                     TTCEapi.sendOtp(emailid).then((response) => {
                       debugger;
                       if (response.data.valid) {
                         customToast.success(response.data.data, {
                           position: toast.POSITION.TOP_RIGHT,
                           autoClose: true,
                         });
                       } else {
                         customToast.error("Error while sending OTP.", {
                           position: toast.POSITION.TOP_RIGHT,
                           autoClose: true,
                         });
                       }
                     });
                   });
                 }

                 verifyOtp(emailid, otppin) {
                   debugger;
                   this.setState({ emailid: emailid }, () => {
                     TTCEapi.verifyOtp(emailid, otppin).then((response) => {
                       debugger;
                       if (response.data.valid) {
                         this.handler(1);
                       } else {
                         customToast.error("please enter valid OTP", {
                           position: toast.POSITION.TOP_RIGHT,
                           autoClose: true,
                         });
                         // alert("please enter valid OTP.");
                       }
                     });
                   });
                 }

                 render() {
                   return (
                     <React.Fragment>
                       <div className="registerimg">
                         <Container>
                           <Row noGutters={true} className="mt-5">
                             {this.renderSection(this.state.userpage)}
                           </Row>
                         </Container>
                       </div>
                     </React.Fragment>
                   );
                 }
               }
