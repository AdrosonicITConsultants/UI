import React, { Component } from "react";
import { Row, Col , Container} from 'reactstrap';
import "./homepage.css"
import logos from "../../assets";
import Roleselect from "./roleselect"
import Loginpass from "../login/loginpass";
import Loginuser from "../login/loginuser";
// import Artistlogin from "../artist/artistlogin"

export default class HomePage extends Component {
                 constructor(props) {
                   super(props);

                     this.state = {
                       userpage : 0
                     };
                   this.handler = this.handler.bind(this);
                  
                 }

                 renderSection(num){
                     switch (num) {
                      case 0:
                         return <Roleselect handler={this.handler} userpage={this.state.userpage} />;
                        break;
                       case 1:
                         //buyer
                         return <Loginuser handler={this.handler} userpage={this.state.userpage} />;
                         break;
                       case 2:
                         return <Loginpass handler={this.handler} userpage={this.state.userpage} />;
                         break;
                       case 3:
                         //artist
                         return <Loginuser handler={this.handler} userpage={this.state.userpage}  />;
                        break;
                       case 4:
                         return <Loginpass handler={this.handler} userpage={this.state.userpage} />;
                         break;
                      
                       default:
                         break;
                     }
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
                               xs={{ size: "12" }}
                               sm={{ size: "5" }}
                               md={{ size: "6" }}
                               md={{ size: "7" }}
                               className="vcenter fullscreen"
                             >
                               <div ></div>
                             </Col>
                             <Col
                               md={{ size: "12" }}
                               sm={{ size: "7" }}
                               md={{ size: "6" }}
                               md={{ size: "5" }}
                               className="vcenter"
                             >
                               
                               {this.renderSection(this.state.userpage)}
                               {/* <Buyerpass handler={this.handler} /> */}
                               {/* <Buyeruser handler={this.handler} /> */}
                               {/* <Artistlogin handler={this.handler} /> */}
                             </Col>
                           </Row>
                           <br/>
                           <br/><br/><br/>                           
                         </Container>
                       </div>
                     </React.Fragment>
                   );
                 }
               }