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
            <Col sm={12}  style={{textAlign:"right"}}>
              <h1 className="closebtn" onClick={() => this.refreshPage()}>X</h1>
            </Col>
  
        </Row>
        <Row noGutters={true}>
            <Col sm={12} className="Modalh2" style={{textAlign:"center"}}>
              <h1 style={{marginTop:"40px"}}>Enquiry is generated successfully!</h1>
              <p> Enquiry Id : <b style={{fontSize:"23px"}}>44444 {this.state.EnquiryCode}</b>  </p>
              <p className="stat1"> Please Refer <b>Ongoing enquiry</b></p>
               <p className="stat2">tab to track your enquiry</p> 
            </Col>
  
        </Row>
        <Row noGutters={true} style={{textAlign:"center"}}>
            <Col sm={6} xs={12}>
            <button  className="cancelmodal" onClick={() => this.refreshPage()}>Close</button>
            </Col>
            <Col sm={6} xs={12}>
            <button  className="ExtEnquirybtn"  >View Enquiry</button>
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
