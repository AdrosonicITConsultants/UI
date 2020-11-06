import React, { Component } from 'react';
import { Row, Col, Container, ButtonGroup,Button } from "reactstrap";
import "../Homepage/homepage.css";
import logos from "../../assets"
import isEmail from "validator/lib/isEmail";
import  customToast  from "../../shared/customToast";
import "react-toastify/dist/ReactToastify.css";
import { memoryHistory, browserHistory } from "../../helpers/history";
import { useTranslation, withTranslation } from "react-i18next";
import changeLang from "../../services/utils/changeLang";

class forgotpass1 extends Component {
                 constructor() {
                   super();
                   this.state = {
                     emailid: "",
                     otppin: "",
                     showValidation: false,
                     showValidationpin: false,
                     isButtonDisabled: false,
                   };
                 }

                 changeLang = (data) => {
                  localStorage.setItem("i18nextLng", data);
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
                   debugger;
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
                  //  this.props.handler(0);
   
              browserHistory.push("/"); 

                 }

                 handleChange(e) {
                   this.setState({ [e.target.name]: e.target.value });
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
                         <div className="demoa text-center"  >
                           <br></br>
                           <Row   className="">
                             <div className="col-xs-6">
                               <img
                                 src={logos.backarrowicon}
                                 className="col-xs-2 margin-arrow arrowsize glyphicon"
                                 onClick={() => this.backoperation()}
                               ></img>
                               <div>
                               {localStorage.getItem("selectedUserId") == 1 ?
                                 <h2 className="col-xs-6 margin-registertext">
                                  {this.props.t("Pages.object.regResetWord")}
                                 </h2>
                                 :
                                 <h2 className="col-xs-6 margin-registertext">
                                   Reset
                                 </h2>
                                }
                                 {/* {window.location.pathname.indexOf(
                                   "passwordA"
                                 ) !== -1 ? (
                                   <h4 className="margin-roletext">Artist</h4>
                                 ) : (
                                   <h4 className="margin-roletext">Buyer</h4>
                                 )} */}
                                 {localStorage.getItem("selectedUserId") == 1 ?
                                 <h4 className="margin-roletext">{this.props.t("Pages.object.regPasswordWord")}</h4>
                                 :
                                 <h4 className="margin-roletext">Password</h4>
                                }
                               </div>
                             </div>

                             <img
                               src={logos.mainlogoside}
                               className="tatatrustLogo col-xs-6"
                               alt="TataTrusts logo"
                             ></img>
                           </Row>
                           <br></br>
                           <Row
                              
                             className="text-center line32 font3"
                           >
                             <span className="col-xs-1"></span>
                             {localStorage.getItem("selectedUserId") == 1 ? 
                             <span className="col-xs-10 fontplay">
                               {this.props.t("Pages.object.regEnterEmailId")}
                             </span>
                             :
                             <span className="col-xs-10 fontplay">
                               Enter your email ID
                             </span>
                            }
                           </Row>

                           <Row  >
                             <div className="col-xs-1"></div>
                             <div className="form-group col-xs-10 ">
                               <label className="control-label"></label>
                               <div className="inner-addon left-addon">
                                 {/* <i className="glyphicon glyphicon-user"></i> */}
                                 <img
                                   src={logos.emaillogo}
                                   className="maillogo glyphicon"
                                 ></img>
                                 {localStorage.getItem("selectedUserId") == 1 ? 
                                 <input
                                   type="email"
                                   id="emailid"
                                   className="form-control BuyerLogin"
                                   placeholder={this.props.t("Pages.object.regPlaceHolderEmail")}
                                   name="emailid"
                                   onChange={(e) => this.handleChange(e)}
                                 />
                                 :
                                 <input
                                   type="email"
                                   id="emailid"
                                   className="form-control BuyerLogin"
                                   placeholder="emailID"
                                   name="emailid"
                                   onChange={(e) => this.handleChange(e)}
                                 />
                                 }
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
                                 {localStorage.getItem("selectedUserId") == 1 ? 
                                 this.props.t("Pages.object.regSendOTP")
                                 : "Send OTP" }
                               </button>
                             </div>
                           </Row>

                           <Row  >
                             <div className="col-xs-1"></div>
                             <div className="form-group col-xs-10 ">
                               <label className="control-label"></label>
                               <div className="inner-addon left-addon">
                                 {/* <i className="glyphicon glyphicon-user"></i> */}
                                 <img
                                   src={logos.otplogo}
                                   className="otplogo glyphicon"
                                 ></img>
                                 {localStorage.getItem("selectedUserId") == 1 ? 
                                 <input
                                   type="number"
                                   id="otppin"
                                   className="form-control BuyerLogin"
                                   placeholder={this.props.t("Pages.object.regEnterRecOTP")}
                                   name="otppin"
                                   onChange={(e) => this.handleChange(e)}
                                 />
                                 :
                                 <input
                                   type="number"
                                   id="otppin"
                                   className="form-control BuyerLogin"
                                   placeholder="Enter OTP received in your email id"
                                   name="otppin"
                                   onChange={(e) => this.handleChange(e)}
                                 />
                                 }
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
                                  {localStorage.getItem("selectedUserId") == 1 ? 
                                 this.props.t("Pages.object.regVerifyProceed")
                                 : "Verify & proceed" }
                                 
                               </button>
                             </div>
                           </Row>
                           <hr className="hrline"></hr>
                           <Row
                              
                             className="text-center line311 font3"
                           >
                             <span className="col-xs-2"></span>
                             {localStorage.getItem("selectedUserId") == 1 ? 
                             <span className="col-xs-8">
                               {this.props.t("Pages.object.regCaseAnyHelp")}
                             </span>
                             :
                             <span className="col-xs-8">
                               In case of any help{" "}
                             </span>
                             }
                           </Row>

                           <br />
                           {localStorage.getItem("selectedUserId") == 1 ? 
                           <Row  >
                             <div className="col-xs-12 text-center">
                               <button
                                 className="whiteButton"
                                 onClick={this.reachOutToUsModal}
                               >
                                 {this.props.t("Pages.object.regReachOut")}
                               </button>
                             </div>
                           </Row>
                           :
                           <Row  >
                             <div className="col-xs-12 text-center">
                               <button
                                 className="whiteButton"
                                 onClick={this.reachOutToUsModal}
                               >
                                 Reach out to us
                               </button>
                             </div>
                           </Row>
                           }
                           
                           {localStorage.getItem("selectedUserId") == 1 ? 
                           <>
                           <Row style={{marginTop: "10px"}}>
                           <ButtonGroup aria-label="Basic example">
                           <Button
                             onClick={() => changeLang("hi")}
                             className="LangBtn"
                             variant="secondary"
                           >
                             हिन्दी
                           </Button>
                           <Button
                             onClick={() => changeLang("en")}
                             className="LangBtn"
                             variant="secondary"
                           >
                             English
                           </Button>
                         </ButtonGroup>
                         </Row>
                           <Row
                              
                             className="text-center line6 mt10"
                           >
                             {this.props.t("Pages.object.changelanguage")}
                             <img src={logos.language} className="ml-5"></img>
                           </Row>
                           </>
                           : null }

                           {/* <Row  >
            <span className="col-xs-3 text-center">Help</span>
            <span className="col-xs-5"></span>
            <span className="col-xs-4 text-center">Privacy policy</span>
          </Row> */}
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

               export default withTranslation()(forgotpass1);