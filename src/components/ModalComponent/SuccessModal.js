import React, { Component } from 'react'
import logos from "../../assets";
import { Row, Col , Container, Card,CardBody} from 'reactstrap';
import '../navbar/navbar.css';
import { memoryHistory, browserHistory } from "../../helpers/history";
import TTCEapi from '../../services/API/TTCEapi';
import "./Modalcomp.css"
export default class SuccessPopup extends React.Component {

    constructor(props) {
    super(props);
    this.state = {
        EnquiryCode:this.props.EnquiryCode,
        productName:this.props.productName,
        isLoading:true
    };
  }
  
  refreshPage(){ 
    window.location.reload(); 
  }


  render() {
   
    return (
      <React.Fragment>
   
      <> 
       <div className='popup'>
          
          <div className='popup_inner_success'>
        <Row noGutters={true}>
            <Col sm={12} className="Modalh2" style={{textAlign:"center"}}>
              <h1>Enquiry is generated successfully!</h1>
              <p> Enquiry Id : {this.state.EnquiryCode} </p>
              <p> Please Refer <b>Ongoing enquiry</b> tab to track your enquiry</p>
            </Col>
  
        </Row>
        <Row noGutters={true} style={{textAlign:"center"}}>
            <Col sm={6}>
            <button  className="cancelmodal" onClick={() => this.refreshPage()}>Close</button>
            </Col>
            <Col sm={6}>
            <button  className="ExtEnquirymodal"  >View Enquiry</button>
            </Col>
        </Row>
        </div>
          </div>
      </>
      
         {/* <HoldPopup  wait={3500}/> */}

      </React.Fragment>
    );
  }
}
