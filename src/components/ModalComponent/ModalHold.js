import React, { Component } from 'react'
import logos from "../../assets";
import { Row, Col , Container, Card,CardBody} from 'reactstrap';
import '../navbar/navbar.css';
import { memoryHistory, browserHistory } from "../../helpers/history";
import TTCEapi from '../../services/API/TTCEapi';
import "./../ModalComponent/Modalcomp.css"
export default class HoldPopup extends React.Component {

    constructor(props) {
    super(props);
    this.state = {
     isLoading:true
    };
  }
  
   refreshPage(){ 
   browserHistory.push('/wishlist')
  }


  render() {
   
    return (
      <React.Fragment>
    
      
      
         
      <div className='popup'>
          
        <div className='popup_inner_hold'>
      <Row noGutters={true}>
          <Col sm={12} className="Modalh1" style={{textAlign:"center",marginTop:"108px"}}>
            <h1>Enquiry is being generated</h1>
            <p className="Holdondots">.........</p>
            <p className="Holdontext">Hold on ! </p>
           
          </Col>

      </Row>
     
          {/* <button onClick={this.props.closePopup} */}
         
        </div>
        
      </div>
    
      </React.Fragment>
    );
  }
}
