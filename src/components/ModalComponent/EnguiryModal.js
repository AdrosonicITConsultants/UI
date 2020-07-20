import React, { Component } from 'react'
import logos from "../../assets";
import { Row, Col , Container, Card,CardBody} from 'reactstrap';
import '../navbar/navbar.css';
import { memoryHistory, browserHistory } from "../../helpers/history";
import TTCEapi from '../../services/API/TTCEapi';
import "./Modalcomp.css"
import HoldPopup from './ModalHold';
import SuccessPopup from './SuccessModal';
// import SuccessPopup from './SuccessModal';
export default class Popup extends React.Component {

    constructor(props) {
    super(props);
    this.state = {
     EnquiryCode:this.props.EnquiryCode,
     productName:this.props.productName,
     productId:this.props.productId,
     modalIsOpen: false,
     isCustom:this.props.isCustom,
    };
    this.closeModal = this.closeModal.bind(this);
  }
  
  refreshPage(){ 
    window.location.reload(); 
  }
  closeModal() {
    this.setState({ modalIsOpen: false });
  }
  refreshPage(){ 
    window.location.reload(); 
  }
  generateEnquiry(item){
    this.setState({ modalIsOpen: true });
    TTCEapi.generateEnquiry(item,this.state.isCustom).then((response)=>{
  this.setState({generateEnquiry : response.data.data},()=>{
    this.setState({ modalIsOpen: false });
      console.log(this.state.generateEnquiry);
      
  });
});
}


  render() {
   
    return (
      
      
         
      <div className='popup'>
          
        <div className='popup_inner'>
      <Row noGutters={true}>
          <Col sm={12} className="Modalh1" style={{textAlign:"center"}}>
            <h1>Enquiry for this product has been already generated</h1>
            <p>{this.state.productName} </p>
            <p>with Enquiry Id : {this.state.EnquiryCode} </p>
          </Col>

      </Row>
      <Row noGutters={true} style={{textAlign:"center"}}>
          <Col sm={6}>
          <button  className="cancelmodal" onClick={() => this.refreshPage()}>Cancel</button>
          </Col>
          <Col sm={6}>
          <button  className="ExtEnquirymodal"  >View Existing Enquiry</button>
          </Col>
      </Row>
      <hr></hr>
      <Row noGutters={true} style={{textAlign:"center"}}>
          <Col sm={12}> OR</Col></Row>
      <Row noGutters={true} style={{textAlign:"center"}}>
          <Col>
          <h1 className="Modalnewenq">You want to generate a new enquiry ?</h1>
          <p> <div class="buttons">
                        <button class="bpdbutton -bg-yellow" style={{marginTop:"10px",height:"43px",width:"195px"}}
                        onClick={() => this.generateEnquiry(this.state.productId)} >
                            <span>Enquiry Now</span>
                                <div class="arrowPacman">
                            <div class="arrowPacman-clip">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.10081 0L5.88245 1.23617L10.7016 6.12576H0V7.87423H10.7016L5.88245 12.7638L7.10081 14L14 7L7.10081 0Z" fill="white"/>
                                </svg>
                                
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.10081 0L5.88245 1.23617L10.7016 6.12576H0V7.87423H10.7016L5.88245 12.7638L7.10081 14L14 7L7.10081 0Z" fill="white"/>
                                </svg>
                            </div>
                            </div>
                        </button>

                            </div></p>
          </Col>
      </Row>
          {/* <button onClick={this.props.closePopup} */}
         
        </div>
        {this.state.generateEnquiry ?<></> :null
         } 

          {this.state.modalIsOpen?
                  <HoldPopup isOpen={this.state.modalIsOpen}/>
                :null}
              
                { this.state.generateEnquiry ?
               
                  <>
                     { this.state.generateEnquiry.ifExists== true ? 
                         <SuccessPopup
                         EnquiryCode={this.state.generateEnquiry.enquiry.code}
                         productName={this.state.generateEnquiry.productName}
                       
                         />
                     :
                         null } </>
               
                 
                  :
                null
                  } 
      </div>
     
    );
  }
}
