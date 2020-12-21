import React, { Component } from "react";
import { Row, Col , Container} from 'reactstrap';
import "./homepage.css"
import logos from "../../assets";
import Roleselect from "./roleselect"
import Loginpass from "../login/loginpass";
import Loginuser from "../login/loginuser";
import TTCEapi from "../../services/API/TTCEapi";
import customToast from "../../shared/customToast";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import * as Actions from "../../redux/action/action"
import {Link} from "react-router-dom"
import { memoryHistory, browserHistory } from "../../helpers/history";
import CMSApi from '../../services/API/CMSApi';
var homeSectionStyle = {};

 class HomePage extends Component {
                 constructor(props) {
                   super(props);

                     this.state = {
                       username : "",
                       userpage : 0,
                       homePageData : "",
                       showHomeBg : false,
                     };
                   this.handler = this.handler.bind(this);
                   this.checkpasswordBuyer = this.checkpasswordBuyer.bind(this);
                   this.checkusernameArtist = this.checkusernameArtist.bind(this);
                   this.checkpasswordArtist = this.checkpasswordArtist.bind(this);
                   this.checkusernameBuyer = this.checkusernameBuyer.bind(this);
                 }

               

                 renderSection(num){             
                   if (
                     localStorage.getItem('homepageredirect') != null
                   ) {
                     num = parseInt(localStorage.getItem("homepageredirect"));
                     this.setState({
                       userpage : num,
                     });
                     
                   }
                     switch (num) {
                       case 0:
                         localStorage.removeItem("homepageredirect");
                       
                         return (
                           <Roleselect
                             handler={this.handler}
                             userpage={this.state.userpage}
                           />
                         );
                         break;
                       case 1:
                         //buyer
                         localStorage.removeItem("homepageredirect");
                         return (
                           <Loginuser
                             ref="childb"
                             handler={this.handler}
                             userpage={this.state.userpage}
                             cub={this.checkusernameBuyer}
                           />
                         );
                         break;
                       case 2:
                         localStorage.removeItem("homepageredirect");

                         return (
                           <Loginpass
                             ref="childb"
                             handler={this.handler}
                             userpage={this.state.userpage}
                             cpb={this.checkpasswordBuyer}
                           />
                         );
                         break;
                       case 3:
                         //artist
                         localStorage.removeItem("homepageredirect");
                         return (
                           <Loginuser
                             ref="childa"
                             handler={this.handler}
                             userpage={this.state.userpage}
                             cua={this.checkusernameArtist}
                           />
                         );
                         break;
                       case 4:
                         localStorage.removeItem("homepageredirect");

                         return (
                           <Loginpass
                             ref="childa"
                             handler={this.handler}
                             userpage={this.state.userpage}
                             cpa={this.checkpasswordArtist}
                           />
                         );
                         break;

                       default:
                         localStorage.removeItem("homepageredirect");

                         return (
                           <Roleselect
                             handler={this.handler}
                             userpage={this.state.userpage}
                           />
                         );
                         break;
                         break;
                     }
                 }
                checkusernameArtist(userName){
                   this.setState({ username: userName }, () => {
                     TTCEapi.validateUsername(userName, 1).then((response) => {
                      if(response) {
                       if (response.data.valid) {
                         if (this.state.userpage == 1) {
                           this.handler(2);
                         } else {
                           this.handler(4);
                         }
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
                checkpasswordArtist(password){
                  debugger
                  this.setState({ username: this.state.username }, () => {
                    TTCEapi.login(this.state.username, password, 1).then(
                      (response) => {
                        if(response) {
                        if (response.data.valid) {
                          debugger
                    
                      let token = response.data.data.acctoken;
                      let user = response.data.data.user;
                      let userTypeId = 2;
                      this.props.dispatch(
                        Actions.loginSuccess(token, user, userTypeId)
                      );  
                        
                            browserHistory.push("/demo-video");
                       
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
                  });
               }
               
                 checkusernameBuyer(userName){
                this.setState({ username: userName }, () => {
                          TTCEapi.validateUsername(userName, 2).then(
                            (response) => {
                              if(response) {
                                if (response.data.valid) {
                                  if (this.state.userpage == 1) {
                                    this.handler(2);
                                  } else {
                                    this.handler(4);
                                  }
                                } else {
                                  customToast.error(response.data.errorMessage, {
                                    position: toast.POSITION.TOP_RIGHT,
                                    autoClose: true,
                                });
                                }
                              }
                              else {
                                customToast.error("This contact number/email does not exists!", {
                                  position: toast.POSITION.TOP_RIGHT,
                                  autoClose: true,
                              });
                              }
                              
                              
                            }
                          );
                        });


                 }
                 checkpasswordBuyer(password){
                     this.setState({ username: this.state.username }, () => {
                       TTCEapi.login(this.state.username, password, 2).then(
                         (response) => {
                          if(response) {
                           if (response.data.valid) {
                           
                             let token = response.data.data.acctoken;
                             let user = response.data.data.user;
                             let userTypeId = 1;
                             this.props.dispatch(
                               Actions.loginSuccess(token, user, userTypeId)
                             );
                            
                              browserHistory.push("/demo-video");
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
                     });

                }
                 handler(num) {              
                   this.setState({ userpage : num }, () => {
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
                  })
                 }

                 setHomeBgImage = () => {
                  homeSectionStyle = {
                    backgroundImage: "url(" + this.state.homePageData.background_image + ")"
                  };
                  this.setState({
                    showHomeBg : true
                  });
                 }

                 render() {
                   
                   return (
                    // id="google_translate_element"
                     <React.Fragment>
                       {this.state.showHomeBg ?
                       <div className="homeimg" style={homeSectionStyle} >
                         <Container>
                           <Row   className="mt-5">
                             <Col
                               xs={{ size: "0" }}
                               sm={{ size: "5" }}
                               md={{ size: "6" }}
                               lg={{ size: "7" }}
                               className="vcenter fullscreen"
                             >
                               <div ></div>
                             </Col>
                             <Col
                               xs={{ size: "12" }}
                               sm={{ size: "7" }}
                               md={{ size: "6" }}
                               lg={{ size: "5" }}
                               className="vcenter "
                             >

                               {this.renderSection(this.state.userpage)}
                             
                             </Col>
                           </Row>
                           
                         </Container>
                       </div> : null }
                     </React.Fragment>
                   );
                 }
               }


                function mapStateToProps(state) {
              
                }

               const connectedLoginPage = connect(mapStateToProps)(HomePage);
               export default  connectedLoginPage ;