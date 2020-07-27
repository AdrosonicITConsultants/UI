import React, { Component } from 'react';
import { connect } from "react-redux";
import logos from "../../assets";
import { Row, Col, Container } from 'reactstrap';
import "./ANavEnquiry.css"


export class ANavEnquiry extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          isOngoing: true,
        }
    }
     
    render() {
        return (
            <>
            <div noGutters="true">
                {this.state.isOngoing
                ?
                <>
                 <Col className="col-sm-6 enquirynavselected bold" >
                    Ongoing Enquiries
                </Col>
                <Col className="col-sm-6 enquirynav"  >
                    Completed Enquiries
                </Col>
                </>
                : 
                <>
                 <Col className="col-sm-6 enquirynav" >
                    Ongoing Enquiries
                </Col>
                <Col className="col-sm-6 enquirynavselected bold"  >
                    Completed Enquiries
                </Col>
                </>  
                }
                
                

            </div>
            <div noGutters={true}>


            </div>
            </>
        )
    }
}

function mapStateToProps(state) {
    const {user}  = state
    return { user };
  }

const connectedLoginPage = connect(mapStateToProps)(ANavEnquiry);
export default connectedLoginPage;

