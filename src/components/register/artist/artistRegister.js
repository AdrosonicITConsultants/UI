import React, { Component } from 'react';
import { Row, Col , Container} from 'reactstrap';
import "./artistRegister.css"
// import Buyerlogin from "../../buyer/buyeruser";
import Artreg1 from "./artreg1";
import Artreg2 from "./artreg2";
import Artreg3 from "./artreg3";
import Artreg4 from "./artreg4";
import Artreg5 from "./artreg5";
export default class artistRegister extends Component {
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
              return <Artreg1 handler={this.handler} />;
              break;
            case 1:
              return <Artreg2 handler={this.handler} />;
              break;
            case 2:
              return <Artreg3 handler={this.handler} />;
              break;
            case 3:
              return <Artreg4 handler={this.handler} />;
              break;
            case 4:
              return <Artreg5 handler={this.handler} />;
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
                       <div className="registerimg">
                         <Container>
                           <Row noGutters={true} className="mt-5">
                             
                           {this.renderSection(this.state.userpage)}
                            
                           </Row>
                                                  
                         </Container>
                       </div>
                     </React.Fragment>
        )
    }
}
