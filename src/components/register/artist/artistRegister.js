import React, { Component } from 'react';
import { Row, Col , Container} from 'reactstrap';
import "./artistRegister.css"
// import Buyerlogin from "../../buyer/buyeruser";
import Artreg1 from "./artreg1";
import Artreg2 from "./artreg2";
import Artreg3 from "./artreg3";
import Artreg4 from "./artreg4";
import Artreg5 from "./artreg5";
import TTCEapi from '../../../services/API/TTCEapi';
import customToast from "../../../shared/customToast";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";



export default class artistRegister extends Component {
                 constructor(props) {
                   super(props);

                   this.state = {
                     userpage: 0,
                     weaverid: "",
                     emailid: "",
                     password: "",
                     firstname: "",
                     lastname: "",
                     pincode: "",
                     cluster: "",
                     district: "",
                     state: "",
                     mobileno: "",
                     panno: "",
                     address: "",
                   };
                   this.handler = this.handler.bind(this);
                   this.checkweaverid = this.checkweaverid.bind(this);
                   this.sendotp = this.sendotp.bind(this);
                   this.storepassword = this.storepassword.bind(this);
                   this.storedetails1 = this.storedetails1.bind(this);
                   this.verifyOtp = this.verifyOtp.bind(this);
                 }

                 renderSection(num) {
                   switch (num) {
                     case 0:
                       return (
                         <Artreg1
                           handler={this.handler}
                           cwi={this.checkweaverid}
                         />
                       );
                       break;
                     case 1:
                       return (
                         <Artreg2
                           handler={this.handler}
                           so={this.sendotp}
                           vo={this.verifyOtp}
                         />
                       );
                       break;
                     case 2:
                       return (
                         <Artreg3
                           handler={this.handler}
                           sp={this.storepassword}
                         />
                       );
                       break;
                     case 3:
                       return (
                         <Artreg4
                           handler={this.handler}
                           sd1={this.storedetails1}
                           weaverid={this.state.weaverid}
                         />
                       );
                       break;
                     case 4:
                       return <Artreg5 handler={this.handler} />;
                       break;
                     default:
                       break;
                   }
                 }
                 storedetails1(
                   firstname,
                   lastname,
                   pincode,
                   cluster,
                   district,
                   state,
                   mobileno,
                   panno,
                   address
                 ) {
                   this.setState({
                     firstname: firstname,
                     lastname: lastname,
                     pincode: pincode,
                     cluster: cluster,
                     district: district,
                     state: state,
                     mobileno: mobileno,
                     panno: panno,
                     address: address,
                   });
                   console.log(
                     firstname,
                     lastname,
                     pincode,
                     cluster,
                     district,
                     state,
                     mobileno,
                     panno,
                     address
                   );
                 }
                 storepassword(password) {
                   this.setState({ password: password });
                   console.log(password);
                 }
                 sendotp(emailid) {
                   console.log(emailid);
                   this.setState({ emailid: emailid });
                 }
                 checkotp(otppin) {
                   console.log(otppin);
                 }
                 checkweaverid(weaverid, weaverpin) {
                   // console.log(weaverid , weaverpin);
                   this.setState({ weaverid: weaverid }, () => {
                     TTCEapi.checkWeaverId(this.state.weaverid, weaverpin).then(
                       (response) => {
                         if (response.data.valid) {
                           this.handler(1);
                         } else {
                          // alert("Wrong credentials");
                            customToast.error("Wrong credentials", {
                              position: toast.POSITION.TOP_RIGHT,
                              autoClose: true,
                            });
                         }
                       }
                     );
                   });
                 }

                 verifyOtp(emailid, otppin){
                   debugger;
                    this.setState({ emailid: otppin }, () => {
                      TTCEapi.verifyOtp(emailid, otppin).then((response) => {
                        debugger;
                        if (response.data.valid) {
                          this.handler(2);
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

                 handler(num) {
                   this.setState({ userpage: num }, () => {
                     console.log(this.state.userpage);
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
