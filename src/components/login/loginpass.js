import React, { Component } from "react";
import { Row, Col, Container } from "reactstrap";
import "../Homepage/homepage.css"
import "./buyer.css"
import logos from "../../assets";

export default class buyerpass extends Component {
                 constructor() {
                   super();
                   this.state = {
                     userName: "",
                     password: "",
                     showValidation: false,
                     showUserName: true,
                   };
                 }

                 Login() {
                   debugger;
                   if (this.state.password == "") {
                     this.setState({
                       showValidation: !this.state.showValidation,
                     });
                   } else {
                    
                      if(this.props.userpage == 2){
                        this.props.cpb(this.state.password);
                        
                      }
                      else{
                        this.props.cpa(this.state.password);
                        
                      }
                        
                        // window.open("./demo-video", "_self");
                        alert("login clicked");
                  
                     //this.props.handler(1);
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
                       <div className="demo" noGutters={true}>
                         <br></br>
                         <Row noGutters={true} className="">
                           <div className="col-xs-6">
                             <img
                               src={logos.backarrowicon}
                               className="col-xs-2 margin-arrow arrowsize glyphicon"
                               onClick={() => this.backoperation()}
                             ></img>
                             <h2 className="col-xs-6 margin-login">Login</h2>
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
                         <Row noGutters={true}>
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
                                 <div className="circleText">Artist</div>
                               </i>
                             </div>
                           )}
                           <span className="col-xs-4"></span>
                         </Row>

                         <br />
                         <br />
                         <br />
                         <div>
                           <Row noGutters={true}>
                             <span className="col-xs-1"></span>
                             <span className="col-xs-10 text-center font2">
                               Enter your password
                             </span>
                           </Row>
                           <Row noGutters={true}>
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
                                   placeholder="password"
                                   name="password"
                                   onChange={(e) => this.handleChange(e)}
                                 />
                                 {this.state.showValidation ? (
                                   <span className="bg-danger">
                                     please enter password
                                   </span>
                                 ) : null}
                               </div>
                             </div>
                           </Row>
                           <Row noGutters={true}>
                             <div className="col-xs-11 text-right">
                               {this.props.userpage == 2 ? (
                                 <a href="./forgot-passwordB">
                                   forgot password?
                                 </a>
                               ) : (
                                 <a href="./forgot-passwordA">
                                   forgot password?
                                 </a>
                               )}
                             </div>
                           </Row>
                         </div>
                         <br></br>
                         <Row noGutters={true}>
                           <div className="col-xs-12 text-center">
                             <button
                               className="blackButton"
                               onClick={() => this.Login()}
                             >
                               Login
                             </button>
                           </div>
                         </Row>

                         <br />
                         {/* <Row noGutters={true}>
                <div className="col-xs-12 text-center">
                  <h2>Or</h2>
                </div>
              </Row>

              <br />

              <Row noGutters={true}>
                <div className="col-xs-12 text-center">
                  <h2>google login</h2>
                </div>
              </Row> */}
                         <hr className="hrline"></hr>
                         <Row noGutters={true}>
                           <div className="col-xs-12 text-center font2">
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

                         <Row noGutters={true} className="mt37">
                           <strong className="col-xs-3 text-center line7 font6">
                             Help?
                           </strong>
                           <span className="col-xs-4"></span>
                           <span
                             style={{ color: "var(--lightFont)" }}
                             className="col-xs-5 text-center line7 font6"
                           >
                             Privacy policy
                           </span>
                         </Row>
                       </div>
                     </React.Fragment>
                   );
                 }
               }
