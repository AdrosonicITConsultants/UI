import React, { Component } from "react";
import { Row, Col , Container} from 'reactstrap';
import "./homepage.css"
import logo from "../../assets/logo.png";
import Roleselect from "./roleselect"
import Buyerpass from "../buyer/buyerpass";
import Buyeruser from "../buyer/buyeruser";
import Artistlogin from "../artist/artistlogin"

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
                         return <Buyeruser handler={this.handler} />;
                         break;
                       case 1:
                         return <Buyerpass handler={this.handler} />;
                         break;
                       case 2:
                         return <Artistlogin handler={this.handler} />;
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
                             ></Col>
                             <Col
                               md={{ size: "12" }}
                               sm={{ size: "7" }}
                               md={{ size: "6" }}
                               md={{ size: "5" }}
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