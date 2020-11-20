import React, { Component } from 'react'
import logos from "../../assets";
import { Row, Col , Container, Button} from 'reactstrap';
import '../navbar/navbar.css';
import { memoryHistory, browserHistory } from "../../helpers/history";
import NavbarComponent from "../navbar/navbar";
import "./Customprod.css";
import Footer from "../footer/footer";

class Customprod extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
        
        };
      
    }
    backoperation(){
        browserHistory.push("/home"); 
    }  
    
    custompage(){
        browserHistory.push("/buyer-custom-design"); 
    }

    render() {
        return (
         
            <React.Fragment>
              
                <Container>
              <Row noGutters={true}>
              <Col md = "1">
                        <img
                            src={logos.backarrowicon}
                                    className="margin-cparrow cparrowsize glyphicon"
                                    onClick={() => this.backoperation()}
                                ></img>
                       
                       </Col>

                <Col md='10'className="emptyhrcustom">
                    <h1 > Your unique custom design appears here</h1>

                <p>No custom product added yet</p>    
                <Row noGutters={true} className="emptycustomtbg">
                   
                        <div className="Emptymakeittext fontplay" >
                            Make it & take it!
                            <p>Try adding a new custom product to</p>
                            <p>create your unique design</p>
                        </div>
                        <div style={{textAlign:"center"}}  onClick={() => this.custompage()}>
                        <button className="wishlistblack"><img className="homeiconwishlist" src={logos.whitecustomdesignicon}/> <span className="spanhome">Create my own design</span></button>
                        </div>
                </Row>
               
                </Col>
                  </Row> 
                  </Container>
                  <Footer />
                </React.Fragment>
              
        )
    }
}
export default Customprod;