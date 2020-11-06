import React, { Component } from "react";
import { Row, Col, Container } from "reactstrap";
import "../Homepage/homepage.css"
import "./buyer.css"
import logos from "../../assets";
import { memoryHistory, browserHistory } from "../../helpers/history";
import TTCEapi from '../../services/API/TTCEapi';
import { useTranslation, withTranslation } from "react-i18next";

class buyerpass extends Component {
                 constructor() {
                   super();
                   this.state = {
                     userName: "",
                     password: "",
                     showValidation: false,
                     showUserName: true,
                     messageData: "",
                   };
                 }

                 showValidationpass(message){
                  this.setState({
                    showValidation: !this.state.showValidation,
                    messageData: message,
                  });
                 }

                 Login = (event) => {
                  event.preventDefault();
                   console.log(this.state);
                   if (this.state.password == "") {
                    this.setState({
                      showValidation: !this.state.showValidation,
                      messageData: "Please enter password",
                    });
                   } else {                  
                      if(this.props.userpage == 2){
                        this.props.cpb(this.state.password);
                          }
                      else{
                        this.props.cpa(this.state.password);
                        
                      }                   
                
                   }
                    
                 }

                 backoperation() {
                   if (this.props.userpage == 2){
                     this.props.handler(1);
                   }
                   else{
                     this.props.handler(3);
                   }
                   
                 }
               

                 handleChange(e) {
                   this.setState({ [e.target.name]: e.target.value });
                   this.setState({
                     showValidation: false,
                   });
                 }

                 render() {
                   return (
                     <React.Fragment>
                       <div className="demo"  >
                         <br></br>
                         <Row   className="">
                           <div className="col-xs-6">
                             <img
                               src={logos.backarrowicon}
                               className="col-xs-2 margin-arrow arrowsize glyphicon"
                               onClick={() => this.backoperation()}
                             ></img>
                             <h2 className="col-xs-6 margin-login">
                             {this.props.userpage == 2 ? "Login" : this.props.t("Pages.object.regLogin")}</h2>
                           </div>

                           <img
                             src={logos.mainlogoside}
                             className="col-xs-6 tatatrustLogo"
                             alt="TataTrusts logo"
                           ></img>
                         </Row>
                         <br />
                         <br />
                         <br />
                         <Row  >
                           <span className="col-xs-4"></span>
                           {this.props.userpage == 2 ? (
                             <div className="col-xs-4 text-center">
                               <i className="circleDiv">
                                 <img
                                   src={logos.buyerlogo}
                                   className="cicrleLogo"
                                   alt="buyer TataTrusts logo"
                                 ></img>
                                 <div className="circleText">Buyer</div>
                               </i>
                             </div>
                           ) : (
                             <div className="col-xs-4 text-center">
                               <i className="circleDiv">
                                 <img
                                   src={logos.buyerlogo}
                                   className="cicrleLogo"
                                   alt="artist TataTrusts logo"
                                 ></img>
                                 <div className="circleText">{this.props.t("Pages.object.artist")}</div>
                               </i>
                             </div>
                           )}
                           <span className="col-xs-4"></span>
                         </Row>

                         <br />

                         <br />
                         <form onSubmit={this.Login}>
                         <div>
                           <Row  >
                             <span className="col-xs-1"></span>
                             <span className="col-xs-10 text-center font13">
                             {this.props.userpage == 2 ? "Enter your password" : this.props.t("Pages.object.regEnterPass")}
                             </span>
                           </Row>
                           <Row  >
                             <div className="col-xs-1"></div>
                             <div className="form-group col-xs-10 ">
                               <label className="control-label"></label>
                               <div className="inner-addon left-addon">
                                 <img
                                   src={logos.locklogo}
                                   className="glyphicon locklogo"
                                 ></img>
                                 <input
                                   id="pass"
                                   type="password"
                                   className="form-control BuyerLogin"
                                   placeholder={this.props.userpage == 2 ? "password" : this.props.t("Pages.object.regPasswordWord")}
                                   name="password"
                                   onChange={(e) => this.handleChange(e)}
                                 />
                               </div>
                             </div>
                           </Row>
                           <Row  >
                             <div className="col-xs-11 text-right">
                               {this.state.showValidation ? (
                                 <div className="bg-danger" style={{float:"left", marginLeft:"35px"}}>
                                   {this.state.messageData === "Your account has been disabled. Please contact admin for more information" ?
                                   <>Your account has been disabled.</>
                                  : this.state.messageData}
                                 </div>
                               ) : null}
                               {this.props.userpage == 2 ? (
                                 <a href="./forgot-passwordB">
                                   forgot password?
                                 </a>
                               ) : (
                                 <a href="./forgot-passwordA">
                                   {this.props.t("Pages.object.regForgotPassword")}
                                 </a>
                               )}
                             </div>
                           </Row>
                         </div>
                         <br></br>
                         <Row  >
                           <div className="col-xs-12 text-center">
                             <button
                               className="blackButton"
                              //  onClick={() => this.Login()}
                             >{this.props.userpage == 2 ?
                               "Login" : 
                               this.props.t("Pages.object.regLogin")
                             }
                             </button>
                           </div>
                         </Row>
                         </form>
<br/>
                         <br />
                         {/* <Row  >
                <div className="col-xs-12 text-center">
                  <h2>Or</h2>
                </div>
              </Row>

              <br />

              <Row  >
                <div className="col-xs-12 text-center">
                  <h2>google login</h2>
                </div>
              </Row> */}
                         <hr className="hrline"></hr>
                         <Row  >
                           <div className="col-xs-12 text-center font13">
                             {this.props.userpage == 2 ? (
                               <div>
                                 new user{" "}
                                 <a href="/buyer-registration">click here</a> to
                                 register.
                               </div>
                             ) : (
                               <div>
                                 new user{" "}
                                 <a href="/artist-registration">click here</a>{" "}
                                 to register.
                               </div>
                             )}
                           </div>
                         </Row>

                         <Row   className="mt50">
                           <strong className="col-xs-4 text-center line7 font6">
                           {this.props.userpage == 2 ?
                           <a style={{color:"black"}} href={TTCEapi.DocumentsURL + "Help.pdf"}
                           target="_blank">Help?</a>
                              :
                              <a style={{color:"black"}} href={TTCEapi.DocumentsURL + "Help.pdf"}
                                    target="_blank">{this.props.t("Pages.object.regHelp")}</a>
                              
                            }
                           </strong>
                           <a 
                            href={TTCEapi.DocumentsURL + "LEGAL%20DISCLAIMER.pdf"}
                            target="_blank">
                            <span
                              style={{ color: "var(--lightFont)"}}
                              className="col-xs-4 text-center line7 font6"
                            >
                              {this.props.userpage == 2 ?
                                "Legal Disclaimer" :
                                this.props.t("Pages.object.legalDisclaimer")
                              } 
                            </span>
                            </a>
                            <a 
                            href={TTCEapi.DocumentsURL + "PRIVACY%20POLICY.pdf"}
                            target="_blank">
                            <span
                              style={{ color: "var(--lightFont)" }}
                              className="col-xs-4 text-center line7 font6"
                            >
                              {this.props.userpage == 2 ?
                                "Privacy policy" :
                                this.props.t("Pages.object.privacyPolicy")
                              } 
                            </span>
                            </a>
                         </Row>
                       </div>
                     </React.Fragment>
                   );
                 }
               }

               export default withTranslation()(buyerpass);