import React, { Component } from "react";
import { Row, Col , Container} from 'reactstrap';
import "./homepage.css"
import logo from "../../assets/logo.png";
import Roleselect from "./roleselect"

export default class HomePage extends Component {
    render() {

        return(
            <React.Fragment> 
                <div className ="homeimg"  >
                    <Container>
                    <Row noGutters={true} className="mt-5">
                        <Col xs={{size:'12'}} sm={{size:'5'}} md={{size:'6'}} md={{size:'7'}}>
                            
                        </Col>
                        <Col md={{size:'12'}} sm={{size:'7'}} md={{size:'6'}} md={{size:'5'}}>
                            <Roleselect/>
                        </Col>
                    </Row>

                    </Container>
                </div>
            </React.Fragment> 
        )
    }

}