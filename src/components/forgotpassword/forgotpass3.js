import React, { Component } from 'react';
import { Row, Col, Container } from "reactstrap";
import "../Homepage/homepage.css";
import logos from "../../assets"
import isEmail from "validator/lib/isEmail";
import  customToast  from "../../shared/customToast";
import "react-toastify/dist/ReactToastify.css";
import buyeruser from '../login/loginuser';
import { memoryHistory, browserHistory } from "../../helpers/history";




export default class forgotpass3 extends Component {
                 constructor() {
                   super();
                   this.state = {
                     emailid: "",
                     otppin: "",
                     showValidation: false,
                     showValidationpin: false,
                     
                   };
                 }

               

                 SendOtp() {
                   
                   const emailcheck = isEmail;

                   // validator.isEmail(this.state.emailid);
                   if (
                     this.state.emailid == "" ||
                     !emailcheck(this.state.emailid)
                   ) {
                     this.setState({
                       showValidation: !this.state.showValidation,
                     });
                   }
                   else{
                     this.props.so(this.state.emailid);
                     customToast.success("OTP sent successfully", {autoClose : false});
                   }
                 }
                 operation() {
                   debugger;
                   if (this.state.emailid == "") {
                     this.setState({
                       showValidation: !this.state.showValidation,
                     });
                   } else if (this.state.otppin == "") {
                     this.setState({
                       showValidationpin: !this.state.showValidationpin,
                     });
                   } else {
                     this.props.co(this.state.otppin)
                   //  this.props.handler(1);
                      
                            browserHistory.push("/"); 
                   }
                 }

                 backoperation() {
                    this.props.handler(1);
       

                 }

                 handleChange(e) {
                   this.setState({ [e.target.name]: e.target.value });
                   this.setState({
                     showValidation: false,
                     showValidationpin: false,
                   });
                 }

                 render() {
                   return (
                     <React.Fragment>
                       <Col
                         xs={{ size: "12" }}
                         sm={{ size: "2" }}
                         md={{ size: "3" }}
                         lg={{ size: "3" }}
                         className="vcenter fullscreen"
                       ></Col>
                       <Col
                         xs={{ size: "12" }}
                         sm={{ size: "8" }}
                         md={{ size: "6" }}
                         lg={{ size: "6" }}
                         className="vcenter "
                       >
                         <div className="demoa text-center" noGutters={true}>
                           <br></br>
                           <Row noGutters={true} className="">
                             <div className="col-xs-6">
                               <div>
                                 <h2 className="col-xs-6 margin-registertext">
                                   Reset
                                 </h2>
                                 {/* {window.location.pathname.indexOf(
                                   "passwordA"
                                 ) !== -1 ? (
                                   <h4 className="margin-roletext2">Artist</h4>
                                 ) : (
                                   <h4 className="margin-roletext2">Buyer</h4>
                                 )} */}
                                 <h4 className="margin-roletext2">Password</h4>
                               </div>
                             </div>

                             <img
                               src={logos.mainlogoside}
                               className="tatatrustLogo col-xs-6"
                               alt="TataTrusts logo"
                             ></img>
                           </Row>
                           <br></br>
                           <br />
                           <Row>
                             <div className="col-xs-12 text-center">
                               <i className="circleDivPass">
                                 <img
                                   src={logos.tickLogo}
                                   className="cicrleLogo"
                                   alt="artist TataTrusts logo"
                                 ></img>
                               </i>
                             </div>
                           </Row>
                           <br />
                           <Row>
                             <span className=" resetsuccessfulText col-md-12 col-sm-12 text-center">
                               Your password was
                             </span>
                             <span className="resetsuccessfulText col-md-12 col-sm-12 text-center">
                               successfully reset
                             </span>
                           </Row>

                           <br />

                           <Row>
                             <span className="emailconfirmationText  col-md-12 col-sm-12 text-center">
                               An email confirmation has been sent
                             </span>
                             <span className="emailconfirmationText col-md-12 col-sm-12 text-center">
                               to your registered email id
                             </span>
                           </Row>
                           <br />
                           <br />
                           <Row noGutters={true}>
                             <div className="col-xs-12 text-center">
                               <button
                                 className="greenButton"
                                 onClick={() => 
                                  {  
                                       
                                          {window.location.pathname.indexOf(
                                   "passwordA"
                                 ) !== -1 ? 
                                    localStorage.setItem('homepageredirect', 3)
                                 : 
                                    localStorage.setItem('homepageredirect', 1)
                                 } 
                                                                          
                                   
                                   browserHistory.push("/");}
                                     
                                  }
                               >
                                 Login Now
                               </button>
                             </div>
                           </Row>
                           <br />
                           <br />
                           <br />
                           <br />
                           <br />
                           <br />
                           <br />

                           <Row noGutters={true}>
                             <span
                               style={{ color: "var(--lightFont)" }}
                               className="col-xs-12 text-center"
                             >
                               Privacy policy
                             </span>
                           </Row>
                         </div>
                       </Col>
                     </React.Fragment>
                   );
                 }
               }
