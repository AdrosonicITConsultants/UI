import React, { Component } from "react";
import { Row, Col, Container } from "reactstrap";
import "../register/artist/artistRegister.css";
import Forgotpass1 from "./forgotpass1";
import Forgotpass2 from "./forgotpass2";
import Forgotpass3 from "./forgotpass3";
import TTCEapi from "../../services/API/TTCEapi";
import customToast from "../../shared/customToast";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import CMSApi from '../../services/API/CMSApi';
import { memoryHistory, browserHistory } from "../../helpers/history";

var homeSectionStyle = {};

export default class ForgotpassRouter extends Component {
                 constructor(props) {
                   super(props);

                   this.state = {
                     userpage: 0,
                     emailid: "",
                     password: "",
                     showHomeBg : false,
                   };
                   this.handler = this.handler.bind(this);
                   this.sendotp = this.sendotp.bind(this);
                   this.passwordReset = this.passwordReset.bind(this);
                   this.verifyOtp = this.verifyOtp.bind(this);
                 }

                 sendotp(emailid) {
                   let roleID = 0;
                   (window.location.pathname.indexOf("passwordA") !== -1 ? (roleID = 1) : (roleID = 2));                  
                   this.setState({ emailid: emailid }, () => {
                     TTCEapi.sendOtpForgotpass(emailid, roleID).then((response) => {
                      if(response) {
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
                      }
                      else{
                        browserHistory.push("/404error");
                      }
                     });
                   });
                 }

                 verifyOtp(emailid, otppin) {                   
                   this.setState({ emailid: emailid }, () => {
                     TTCEapi.verifyOtp(emailid, otppin).then((response) => {
                      if(response) {
                       if (response.data.valid) {
                         this.handler(1);
                       } else {                 
                         customToast.error("please enter valid OTP", {
                           position: toast.POSITION.TOP_RIGHT,
                           autoClose: true,
                         });
                        
                       }
                      }
                      else{
                        browserHistory.push("/404error");
                      }
                     });
                   });
                 }

                 passwordReset(password, username = this.state.emailid) {
                   
                   this.setState(
                     { username: username, password: password },
                     () => {
                       TTCEapi.passwordReset(username, password).then(
                         (response) => {
                          if(response) {
                           if (response.data.valid) {
                             this.handler(2);
                           } else {
                             customToast.error(response.data.errorMessage, {
                               position: toast.POSITION.TOP_RIGHT,
                               autoClose: true,
                             });
                           }
                          }
                          else{
                            browserHistory.push("/404error");
                          }
                         }
                       );
                     }
                   );
                 }

                 renderSection(num) {
                   switch (num) {
                     case 0:
                       return (
                         <Forgotpass1
                           handler={this.handler}
                           so={this.sendotp}
                           vo={this.verifyOtp}
                         />
                       );
                       break;
                     case 1:
                       return (
                         <Forgotpass2
                           handler={this.handler}
                           pr={this.passwordReset}
                         />
                       );
                       break;
                     case 2:
                       return (
                         <Forgotpass3
                           handler={this.handler}
                           sp={this.storepassword}
                         />
                       );
                       break;

                     default:
                       break;
                   }
                 }

                 storepassword(password) {
                   this.setState({ password: password });
                 }

                 checkotp(otppin) {
                 }

                 handler(num) {
                   this.setState({ userpage: num }, () => {
                   });
                 }

                 setHomeBgImage = () => {
                  homeSectionStyle = {
                    backgroundImage: "url(" + this.state.homePageData.background_image + ")"
                  };
                  this.setState({
                    showHomeBg : true
                  });
                 }

                 componentDidMount () {
                  var env="live";
                  var id=0;
                  if(env=="test"){
                   id=20
                  }
                  else if(env=="live"){
                    id=58
                  }
                  CMSApi.getPages(id).then((response)=>{
                    if(response)
                    {
                        this.setState({
                          homePageData : response.data.acf
                        })
                        this.setHomeBgImage();
                    }
                    else{
                      browserHistory.push("/404error")
                    }
                  })
                 }

                 render() {
                   return (
                     <React.Fragment>
                       {this.state.showHomeBg ?
                       <div className="registerimg" style={homeSectionStyle}>
                         <Container>
                           <Row noGutters={true} className="mt-5">
                             {this.renderSection(this.state.userpage)}
                           </Row>
                         </Container>
                       </div>
                       : null }
                     </React.Fragment>
                   );
                 }
               }
