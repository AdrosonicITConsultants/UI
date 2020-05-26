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

// import Artreg2 from "../register/artist/artreg2";
// import Buyreg1 from "../register/buyer/buyreg1";
// import Artistlogin from "../artist/artistlogin"

export default class HomePage extends Component {
                 constructor(props) {
                   super(props);

                     this.state = {
                       username : "",
                       userpage : 0
                     };
                   this.handler = this.handler.bind(this);
                   this.checkpasswordBuyer = this.checkpasswordBuyer.bind(this);
                   this.checkusernameArtist = this.checkusernameArtist.bind(this);
                   this.checkpasswordArtist = this.checkpasswordArtist.bind(this);
                   this.checkusernameBuyer = this.checkusernameBuyer.bind(this);
                 }

                 renderSection(num){
                     switch (num) {
                       case 0:
                         return (
                           <Roleselect
                             handler={this.handler}
                             userpage={this.state.userpage}
                           />
                         );
                         break;
                       case 1:
                         //buyer
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
                  console.log("artist :" + userName);  
                   this.setState({ userName: userName }, () => {
                     TTCEapi.validateUsername(userName).then((response) => {
                       debugger;
                       if (response.data.valid) {
                       if (this.state.userpage == 1) {                      
                         this.handler(2);
                       } else {                      
                         this.handler(4);
                       }
                       } else {
                         this.refs.childa.showValidation();
                       }
                     });
                   });


                }
                checkpasswordArtist(password){
                  console.log("artist :" + this.state.username);
                  console.log("artistpass :" + password);
               }
                 checkusernameBuyer(userName){
                   console.log("buyer :" + userName);
                        console.log("artist :" + userName);
                        this.setState({ userName: userName }, () => {
                          TTCEapi.validateUsername(userName).then(
                            (response) => {
                              debugger;
                              if (response.data.valid) {
                                if (this.state.userpage == 1) {
                                  this.handler(2);
                                } else {
                                  this.handler(4);
                                }
                              } else {
                                this.refs.childb.showValidation();
                              }
                            }
                          );
                        });


                 }
                 checkpasswordBuyer(password){
                  console.log("buyer :" + this.state.username);
                  console.log("buyerpass :" + password);
                }
                 handler(num) {              
                   this.setState({ userpage : num }, () => {
                     console.log(this.state.userpage);
                   });                    
                 }

                 render() {
                   return (
                     <React.Fragment>
                       <div className="homeimg">
                         <Container>
                           <Row noGutters={true} className="mt-5">
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
                               {/* <Buyerpass handler={this.handler} /> */}
                               {/* <Buyeruser handler={this.handler} /> */}
                               {/* <Artistlogin handler={this.handler} /> */}
                             </Col>
                           </Row>
                                                      
                         </Container>
                       </div>
                     </React.Fragment>
                   );
                 }
               }