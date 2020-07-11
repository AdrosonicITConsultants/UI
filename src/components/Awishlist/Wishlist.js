import React, { Component } from 'react'
import logos from "../../assets";
import { Row, Col , Container, Button} from 'reactstrap';
import '../navbar/navbar.css';
import { memoryHistory, browserHistory } from "../../helpers/history";
import NavbarComponent from "../navbar/navbar";
import "./Awishlist.css"

class Wishlist extends Component {
    
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
              
                <Container>
              <Row noGutters={true}>
              <Col md = "1">
                        <img
                                    src={logos.backarrowicon}
                                    className="margin-cparrow cparrowsize glyphicon"
                                     onClick={() => this.backoperation()}
                                ></img>
                       
                       </Col>

                <Col md='10'className="emptyhrwishlist">
                    <h1 > Your Wish list is empty</h1>

                <p>Not added anything yet</p>    
                <Row noGutters={true}>
                   
                        <div className="heartwishlistbg">

                        </div>
                   
                </Row>
                <Row noGutters={true}>
                  <div style={{textAlign:"center"}}>
                        <button className="wishlistblack"><img className="homeiconwishlist" onClick={() => this.backoperation()} src={logos.Iconfeatherhome}/> <span className="spanhome">Go to home page</span></button>
                        </div>
                </Row>
                </Col>
                  </Row> 
                  </Container>
                </React.Fragment>
              
        )
    }
}
export default Wishlist;