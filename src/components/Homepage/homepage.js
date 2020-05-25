import React, { Component } from "react";
import { Row, Col , Container} from 'reactstrap';
import "./homepage.css"
import logos from "../../assets";
import Roleselect from "./roleselect"
import Loginpass from "../login/loginpass";
import Loginuser from "../login/loginuser";
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
                             handler={this.handler}
                             userpage={this.state.userpage}
                             cub = {this.checkusernameBuyer}
                           />
                         );
                         break;
                       case 2:
                         return (
                           <Loginpass
                             handler={this.handler}
                             userpage={this.state.userpage}
                             cpb = {this.checkpasswordBuyer}
                           />
                         );
                         break;
                       case 3:
                         //artist
                         return (
                           <Loginuser
                             handler={this.handler}
                             userpage={this.state.userpage}
                             cua = {this.checkusernameArtist}
                           />
                         );
                         break;
                       case 4:
                         return (
                           <Loginpass
                             handler={this.handler}
                             userpage={this.state.userpage}
                             cpa = {this.checkpasswordArtist}
                           />
                         );
                         break;
                      //  case 5:
                      //    return (
                      //      <Artreg2
                      //        handler={this.handler}
                      //        userpage={this.state.userpage}
                      //      />
                      //    );
                      //  case 6:
                      //    return (
                      //      <Buyreg1
                      //        handler={this.handler}
                      //        userpage={this.state.userpage}
                      //      />
                      //    );
                      //    break;

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
                  this.setState({ username : userName } );

                }
                checkpasswordArtist(password){
                  console.log("artist :" + this.state.username);
                  console.log("artistpass :" + password);
               }
                 checkusernameBuyer(userName){
                   console.log("buyer :" + userName);
                   this.setState({ username : userName }, () =>{});
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