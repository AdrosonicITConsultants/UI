import React, { Component } from 'react'
import { memoryHistory, browserHistory } from "../../helpers/history";
import { Row, Col , Container, Button} from 'reactstrap';
import { connect } from "react-redux";
import NavbarComponent from "../navbar/navbar";
import logos from "../../assets";



export class AllEnquiryList extends Component {
    constructor(props) {
        super(props);
    
        this.state = {

        }
    }           
    backoperation(){
        browserHistory.push("/home"); 
    } 
    render() {
        return (
            <React.Fragment>
                <NavbarComponent/>
                <Container>
                <Row noGutters={true} className="">
                           <Col sm = "1">
                           <img
                                       src={logos.backarrowicon}
                                       className="margin-cparrow cparrowsize glyphicon"
                                        onClick={() => this.backoperation()}
                                   ></img>
                          
                          </Col>
                          <Col sm="10" >
                               <Row noGutters={true} className ="cp1heading bold fontplay ">
                                   <Col md="12">
                                        All Enquiries
                                       </Col>
                               </Row>
                               <Row noGutters={true}>

                               </Row>
                          </Col>                            
                </Row>
                </Container>
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    // debugger;
    const { user } = state
    return { user };
}

const connectedLoginPage = connect(mapStateToProps)(AllEnquiryList);
export default connectedLoginPage;
