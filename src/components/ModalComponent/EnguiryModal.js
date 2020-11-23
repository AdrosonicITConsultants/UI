import React, { Component } from 'react'
import logos from "../../assets";
import { Row, Col , Container, Card,CardBody} from 'reactstrap';
import '../navbar/navbar.css';
import { memoryHistory, browserHistory } from "../../helpers/history";
import TTCEapi from '../../services/API/TTCEapi';
import "./Modalcomp.css"
import HoldPopup from './ModalHold';
import SuccessPopup from './SuccessModal';
export default class Popup extends React.Component {

    constructor(props) {
    super(props);
    this.state = {
     EnquiryCode:this.props.EnquiryCode,
     productName:this.props.productName,
     productId:this.props.productId,
     modalIsOpen: false,
     isCustom:this.props.isCustom,
     enquiryId:this.props.enquiryId
    };
    this.closeModal = this.closeModal.bind(this);
  }
  
  ViewEnquiry(){
    browserHistory.push("/buyerEnquiryDetails?code="+this.state.enquiryId)
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
     
  });
});
}


  render() {
   
    return (    
      <div className='popup'>
          
        <div className='popup_inner'>
        <Row noGutters={true}>
            <Col sm={12}  style={{textAlign:"right"}}>
              <h1 className="closebtn" onClick={() => this.refreshPage()}>X</h1>
            </Col>
  
        </Row>
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
          <button  className="ExtEnquirymodal" onClick={() => this.ViewEnquiry()} >View Existing Enquiry</button>
          </Col>
      </Row>
      <hr></hr>
      <Row noGutters={true} style={{textAlign:"center"}}>
          <Col sm={12}> OR</Col></Row>
      <Row noGutters={true} style={{textAlign:"center"}}>
          <Col>
          <h1 className="Modalnewenq">You want to generate a new enquiry ?</h1>
          <p> 
          <button  className="Generateenqbtn" onClick={() => this.generateEnquiry(this.state.productId)}>
            Generate New Enquiry
            </button>

                           </p>
          </Col>
      </Row>
         
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
                         enquiryId={this.state.generateEnquiry.enquiry.id}
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
