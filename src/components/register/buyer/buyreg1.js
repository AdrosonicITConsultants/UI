import React, { Component } from "react";
import { Row, Col, Container } from "reactstrap";
import "../../Homepage/homepage.css";
import logos from "../../../assets";
import isEmail from "validator/lib/isEmail";   
import customToast from "../../../shared/customToast";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { memoryHistory, browserHistory } from "../../../helpers/history";
import TTCEapi from '../../../services/API/TTCEapi';

toast.configure()
export default class buyreg1 extends Component {
                 constructor() {
                   super();
                   this.state = {
                     emailid: localStorage.getItem("regEmailId") ? localStorage.getItem("regEmailId") : "",
                     otppin: "",
                     showValidation: false,
                     showValidationpin: false,
                     showUserName: true,
                     isButtonDisabled: false,
                   };
                 }
                 SendOtp() {
                   const emailcheck = isEmail;
                   if (
                     this.state.emailid == "" ||
                     !emailcheck(this.state.emailid)
                   ) {
                     this.setState({
                       showValidation: !this.state.showValidation,
                     });
                   } else {
                     this.props.so(this.state.emailid);
                     this.setState({
                       isButtonDisabled: true,
                     });

                     // **** here's the timeout ****
                     setTimeout(
                       () => this.setState({ isButtonDisabled: false }),
                       10000
                     );
                   }
                 }
                 operation() {
                   
                   const emailcheck = isEmail;
                   if (
                     this.state.emailid == "" ||
                     !emailcheck(this.state.emailid)
                   ) {
                     this.setState({
                       showValidation: !this.state.showValidation,
                     });
                   } else if (this.state.otppin == "") {
                     this.setState({
                       showValidationpin: !this.state.showValidationpin,
                     });
                   } else {
                     this.props.vo(this.state.emailid, this.state.otppin);
                   }
                 }

                 backoperation() {
                   browserHistory.push("/");
                 }

                 handleChange(e) {
                  var name = e.target.name;
                   this.setState({ 
                     [e.target.name]: e.target.value 
                    }, () => {
                      if(name == "emailid") {
                        localStorage.setItem("regEmailId", this.state.emailid);
                      }

                    });
                   this.setState({
                     showValidation: false,
                     showValidationpin: false,
                   });
                 }

                 reachOutToUsModal = () => {
                  document.getElementById('reachOutToUsModal').style.display='block';
                 }

                 reachOutToUsModalClose = () => {
                  document.getElementById('reachOutToUsModal').style.display='none';
                 }

                 componentDidMount() {
                  localStorage.setItem("regCurrentPage", 0);
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
                         <div
                           className="demoa demoabAnimation text-center"
                            
                         >
                           <br></br>
                           <Row   className="">
                             <div className="col-xs-6">
                               <img
                                 src={logos.backarrowicon}
                                 className="col-xs-2 margin-arrow arrowsize glyphicon"
                                 onClick={() => this.backoperation()}
                               ></img>
                               <div>
                                 <h2 className="col-xs-6 margin-registertext">
                                   Register
                                 </h2>
                                 <h4 className="margin-roletext">Buyer</h4>
                               </div>
                             </div>

                             <img
                               src={logos.mainlogoside}
                               className="col-xs-6 tatatrustLogo"
                               alt="TataTrusts logo"
                             ></img>
                           </Row>
                           <br></br>
                           <Row
                              
                             className="text-center line32 font3"
                           >
                             <span className="col-xs-1"></span>

                             <span className="col-xs-10 fontplay">
                               <img
                                 src={logos.emaillogo}
                                 className="locklogo1 glyphicon mr-5"
                               ></img>
                               Enter your email ID
                             </span>
                           </Row>

                           <Row  >
                             <div className="col-xs-1"></div>
                             <div className="form-group col-xs-10 ">
                               <label className="control-label"></label>
                               <div className="inner-addon ">
                                 <input
                                   type="email"
                                   id="emailid"
                                   className="form-control BuyerLogin"
                                   placeholder="emailID"
                                   name="emailid"
                                   onChange={(e) => this.handleChange(e)}
                                   value={this.state.emailid}
                                 />
                                 {this.state.showValidation ? (
                                   <span className="bg-danger">
                                     please enter valid email ID
                                   </span>
                                 ) : (
                                   <br />
                                 )}
                               </div>
                             </div>
                           </Row>

                           <Row  >
                             <div className="col-xs-12 text-center">
                               <button
                                 className="blackButton"
                                 disabled={this.state.isButtonDisabled}
                                 onClick={() => this.SendOtp()}
                               >
                                 Send OTP
                               </button>
                             </div>
                           </Row>

                           <Row  >
                             <div className="col-xs-1"></div>
                             <div className="form-group col-xs-10 ">
                               <label className="control-label"></label>
                               <div className="inner-addon ">
                                 <input
                                   type="number"
                                   id="otppin"
                                   className="form-control BuyerLogin"
                                   placeholder="Enter OTP received in your email id"
                                   name="otppin"
                                   onChange={(e) => this.handleChange(e)}
                                 />
                                 {this.state.showValidationpin ? (
                                   <span className="bg-danger">
                                     please enter OTP
                                   </span>
                                 ) : (
                                   <br />
                                 )}
                               </div>
                             </div>
                           </Row>

                           <Row  >
                             <div className="col-xs-12 text-center">
                               <button
                                 className="blackButton"
                                 style={{
                                   width: "11em",
                                 }}
                                 onClick={() => this.operation()}
                               >
                                 Verify & proceed
                               </button>
                             </div>
                           </Row>
                           <br />
                           <hr className="hrline"></hr>
                           <Row
                              
                             className="text-center line311 font3"
                           >
                             <span className="col-xs-2"></span>
                             <span className="col-xs-8">
                               In case of any help{" "}
                             </span>
                           </Row>

                           <br />
                           <Row  >
                             <div className="col-xs-12 text-center">
                               <button
                                 className="whiteButton"
                                 style={{
                                   width: "10em",
                                 }}
                                 onClick={this.reachOutToUsModal}
                               >
                                 Reach out to us
                               </button>
                             </div>
                           </Row>

                          
                           <br></br>
                         </div>
                       </Col>

                       <div id="reachOutToUsModal" class="w3-modal">
<div class="w3-modal-content w3-animate-top modalBoxSize">
<div class="w3-container chatAttachModalOuter">
    <div className="text-right">
        <img src={logos.closelogo} className="chatAttachCloseIcon" onClick={this.reachOutToUsModalClose}/>
    </div>
    <h4 className="artisanChatModalTitle text-center">For any query reach us @ <br/><br/><a href = "mailto: antaran@tatatrusts.org">
    antaran@tatatrusts.org</a></h4>
</div>
</div>
</div>
                     </React.Fragment>
                   );
                 }
               }
