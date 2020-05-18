import React, { Component } from "react";
import { Row, Col, Container } from "reactstrap";
import "../Homepage/homepage.css"
import logo from "../../assets/logo.svg";

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
                     this.props.handler(2);
                   }
                    alert("login clicked");
                 }

                 backoperation() {
                  this.props.handler(1);
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
                           <span className="col-sm-2 glyphicon glyphicon-arrow-left" onClick={() => this.backoperation()}></span>
                           <h2 className="col-sm-8">Login</h2>
                           <img
                             src={logo}
                             className="col-sm-2"
                             alt="TataTrusts logo"
                           ></img>
                         </Row>

                         <br />
                         <Row noGutters={true}>
                           <span className="col-sm-4"></span>
                           <img
                             src={logo}
                             className="col-sm-4"
                             alt="TataTrusts logo"
                           ></img>
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
                                 <i className="glyphicon glyphicon-lock"></i>
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
                           <span className="col-sm-3 text-center">Help</span>
                           <span className="col-sm-5"></span>
                           <span className="col-sm-4 text-center">
                             Privacy policy
                           </span>
                         </Row>
                         <br></br>
                       </div>
                     </React.Fragment>
                   );
                 }
               }
