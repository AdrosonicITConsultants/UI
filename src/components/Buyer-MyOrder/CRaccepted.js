import React, { Component } from 'react'
import ReactDOM from "react-dom";
import ReactToPdf from "react-to-pdf";
import { memoryHistory, browserHistory } from "../../helpers/history";
import { Row, Col , Container, Button} from 'reactstrap';
import { connect } from "react-redux";
import NavbarComponent from "../navbar/navbar";
import logos from "../../assets";
import "./Buyermyorder.css";
import queryString from 'query-string';
import TTCEapi from '../../services/API/TTCEapi';
import customToast from "../../shared/customToast";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import moment from 'moment';
import Footer from '../footer/footer';



export class CRaccepted extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accepted:false

        };
      }

      render(){
        return(
            
<React.Fragment>
    <h3 className="CRAcceptedh3">Change Request has been accepted.<br/>
    PI has been revised and is available in section on the left.</h3>
    <p className="crp">
        <span>Change request raised <b style={{color:"lightgrey",marginLeft:"10px"}}>12/12/12</b></span><br/>
        <span>Change request accepted   <b style={{color:"green",marginLeft:"10px"}}>12/12/12</b></span>
  </p>
  <div className="craccbox">
  <h3 className="CRAcceptedh3">Change Request Details</h3>
<Row noGutters={true} className="innerboxcr">
<Col className="col-xs-1"></Col>
    <Col className="col-xs-5">
    <p className="Crh">Motif Size</p>
    <p className="changereqcolor marginminus">Blue</p>
    </Col>
    <Col className="col-xs-3"></Col>
    {this.state.accepted?
    <Col className="col-xs-3">
       <b style={{color:"green"}}>Accepted</b> 
       <p> <img src={logos.acceptgreen} className="acceptrejimh"/></p>
    </Col>
    :
    <>
    <Col className="col-xs-3">
       <b style={{color:"red"}}>Rejected</b> 
       <p> <img src={logos.sadred} className="acceptrejimh"/></p>
    </Col>
    </>
      }
</Row>
<Row noGutters={true} className="innerboxcr">
<Col className="col-xs-1"></Col>
    <Col className="col-xs-5">
    <p className="Crh">Quantity</p>
      <p className="changereqcolor">
     <span><b style={{color:"darkgrey"}}>20 --------------</b><b>26</b></span>
     </p>
    </Col>
    <Col className="col-xs-3"></Col>
    {this.state.accepted?
    <Col className="col-xs-3">
       <b style={{color:"green"}}>Accepted</b> 
       <p> <img src={logos.acceptgreen} className="acceptrejimh"/></p>
    </Col>
    :
    <>
    <Col className="col-xs-3">
       <b style={{color:"red"}}>Rejected</b> 
       <p> <img src={logos.sadred} className="acceptrejimh"/></p>
    </Col>
    </>
      }
</Row>
<p style={{textAlign:"center"}}>Artisan has accepted <b style={{color:"green"}}>2</b> out of <b style={{color:"green"}}>3</b> requests</p>
  </div>

</React.Fragment>
        )
    }
    
}
function mapStateToProps(state) {
    // debugger;
    const { user } = state
    return { user };
}

const connectedLoginPage = connect(mapStateToProps)(CRaccepted);
export default connectedLoginPage;