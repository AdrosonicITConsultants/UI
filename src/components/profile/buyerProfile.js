import React, { Component } from 'react'
import logos from "../../assets";
import { Row, Col , Container} from 'reactstrap';

import '../navbar/navbar.css';
import NavbarComponent from "../navbar/navbar";
import { connect } from "react-redux";
import * as Actions from "../../redux/action/action";
import './buyerProfile.css';


class BuyerProfile extends Component {
    render() {
        return (

            <React.Fragment>
                   <NavbarComponent/>
                <Container>
                <div className="profilebackground">
                    <br></br>
                    
                   <div className="profileheading fontplay">My Profile</div>
                   <Row noGutters={true}>
                   <Col sm = {{size: "1"}}></Col>

                       <Col sm = {{size: "10"}}>
                           <div className= "databackground">
                               <br></br>
                               <br></br>

                               <br></br>

                               <br></br>


                               <br></br>

                               <br></br>

                               <br></br>


                               <br></br>

                               <br></br>


                           </div>
                       </Col>
                   </Row>

                </div>

                </Container>
            </React.Fragment>
            // <div>
            //      {console.log("user data")}
            //      {console.log(this.props.user)}
            //      {"this is my buyerprofile page check console for variable"}
            // </div>
        )
    }
}

function mapStateToProps(state) {
 
    const { user } = state
    return { user };
}

const connectedLoginPage = connect(mapStateToProps)(BuyerProfile);
export default connectedLoginPage;

