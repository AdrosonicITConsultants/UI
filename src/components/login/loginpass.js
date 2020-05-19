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
                     debugger;
                     //this.props.handler(1);
                   }
                    alert("login clicked");
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
                           <div className="col-sm-8">
                             <img src={logos.backarrowicon} className="col-sm-2 margin-arrow glyphicon" onClick={() => this.backoperation()}></img>
                             <h2 className="col-sm-6 margin-login">Login</h2>
                           </div>
                           <img
                             src={logos.mainlogoside}
                             className="col-sm-4"
                             alt="TataTrusts logo"
                           ></img>
                         </Row>

                         <br />
                         <Row noGutters={true}>
                           <span className="col-sm-4"></span>
                           {(this.props.userpage == 2) ?
                             <img src={logos.mainlogo} className="col-sm-4" alt="buyer TataTrusts logo"></img>
                             :
                             <img src={logos.mainlogo} className="col-sm-4" alt="artist TataTrusts logo"></img>

                           }
                           <span className="col-sm-4"></span>
                         </Row>

                         <br />
                         <div>
                           <Row noGutters={true}>
                             <span className="col-sm-1"></span>
                             <span className="col-sm-10">
                               Enter your password
                             </span>
                           </Row>
                           <Row noGutters={true}>
                             <div className="col-sm-1"></div>
                             <div className="form-group col-sm-10 col-xs-6">
                               <label className="control-label"></label>
                               <div className="inner-addon left-addon">
                                 <img src={logos.locklogo} className="glyphicon"></img>
                                 <input
                                   id="pass"
                                   type="text"
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
                             <div className="col-sm-11 text-right">
                               <a href="./">forgot password?</a>
                             </div>
                           </Row>
                         </div>

                         <br />
                         <Row noGutters={true}>
                           <div className="col-sm-12 text-center">
                             <button
                               style={{
                                 background: "#000000",
                                 color: "white",
                                 borderRadius: "2em",
                                 width: "8em",
                                 height: "3em",
                               }}
                               onClick={() => this.Login()}
                             >
                               Login
                             </button>
                           </div>
                         </Row>

                         <br />
                         {/* <Row noGutters={true}>
                <div className="col-sm-12 text-center">
                  <h2>Or</h2>
                </div>
              </Row>

              <br />

              <Row noGutters={true}>
                <div className="col-sm-12 text-center">
                  <h2>google login</h2>
                </div>
              </Row> */}
                         <hr className="hrline"></hr>
                         <Row noGutters={true}>
                           <div className="col-sm-12 text-center">
                             <div>
                               new user <a href="./">click here</a> to register.
                             </div>
                           </div>
                         </Row>

                         <Row noGutters={true}>
                           <strong className="col-sm-3 text-center">Help?</strong>
                           <span className="col-sm-5"></span>
                           <span style={{ color: "var(--lightFont)" }} className="col-sm-4 text-center">Privacy policy</span>
                         </Row>
                         <br></br>
                       </div>
                     </React.Fragment>
                   );
                 }
               }
