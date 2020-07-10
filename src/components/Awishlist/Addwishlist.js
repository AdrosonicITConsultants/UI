import React, { Component } from 'react'
import logos from "../../assets";
import { Row, Col , Container, Button} from 'reactstrap';
import '../navbar/navbar.css';
import { memoryHistory, browserHistory } from "../../helpers/history";
import NavbarComponent from "../navbar/navbar";
import "./Awishlist.css"

class AddWishlist extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
          

         
        };
      
    }
    backoperation(){
        browserHistory.push("/Home"); 
    }  
    

    render() {
        return (
         
            <React.Fragment>
                <NavbarComponent />
                <Container>
              <Row noGutters={true}>
              <Col md = "1">
                        <img
                                    src={logos.backarrowicon}
                                    className="margin-cparrow cparrowsize glyphicon"
                                     onClick={() => this.backoperation()}
                                ></img>
                       
                       </Col>
                <Col md='10'className="addedwishlist">
                    <h1 > Your Wish list</h1>

                
                </Col>
                  </Row> 
                  </Container>
                </React.Fragment>
              
        )
    }
}
export default AddWishlist;