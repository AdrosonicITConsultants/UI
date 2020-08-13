import React, { Component } from 'react'
import logos from "../../assets";
import { Row, Col , Container, Button} from 'reactstrap';
import '../navbar/navbar.css';
import NavbarComponent from "../navbar/navbar";
import { connect } from "react-redux";
import * as Actions from "../../redux/action/action";
import Footer from "../footer/footer";
import { Switch, Route, Router,Link } from "react-router-dom";
import PrivateRoute from "../../services/utils/PrivateRoute";
import { memoryHistory, browserHistory } from "../../helpers/history";
import AntaranCoDesignCategories from './AntaranCoDesign-Categories';
import AntaranCoDesignNavbar from "./AntaranCoDesign-Navbar";
class AntaranCoDesign extends Component {
    constructor(props) {
        super(props);

        this.state = {
          isSelected : false,
         
        };
      
    }
  
    render() {
        return (
            <React.Fragment>
                <NavbarComponent/>
                <Container className="overflownhidden">
                  <Row noGutters="true" className="acdthreadbg">
                    <Col sm={{size:"6"}} className="Col6">
                  <div noGutters="true">
                        <Col sm={{size:12}} className="Asdh1">
                          <h1>  Antaran <br/> Co-Design </h1>
                            <p>Collection</p>
                            <p><img className="BPDAntaranlogo" src={logos.antaranCoDesignLogo}  alt="Card image cap" style={{height:"47px"}}/></p>
                        </Col>
                    </div>
            
            
                  </Col>
                  <Col sm={{size:"6"}} className="headimgposter">
                    
                  <img className="Asdbg" src={logos.Ajrakhpur1}  alt="Card image cap"/>
                  </Col></Row>
                  <Row noGutters="true">
                        <Col sm={{size:12}} className="ViewColtext">
                           <p>View Collection by</p> 
                            </Col>
            </Row>
                  <AntaranCoDesignNavbar/>
              </Container>
              <Footer/>

             
                </React.Fragment>
              
        )
    }
}
export default AntaranCoDesign;