import React, { Component } from 'react'
import ReactDOM from "react-dom";
import ReactToPdf from "react-to-pdf";
import { memoryHistory, browserHistory } from "../../helpers/history";
import { Row, Col , Container, Button} from 'reactstrap';
import { connect } from "react-redux";
import NavbarComponent from "../navbar/navbar";
import logos from "../../assets";
import "./BuyerAdvancePayment.css";
import queryString from 'query-string';
import TTCEapi from '../../services/API/TTCEapi';
import customToast from "../../shared/customToast";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import moment from 'moment';
import Footer from '../footer/footer';

export class BuyerAdvancePayment extends Component {
    constructor() {
        super();
        
        this.select20= this.select20.bind(this);
        this.select30= this.select30.bind(this);
        this.select50= this.select50.bind(this);

        this.state = {
            selected:"select20",
            select20:false,
            select30:true,
            select50:false,

                   }
    }
 
    
    BacktoPreview(){
    this.props.bp();
    }

    select20(){
        this.setState((prevState) => {
            return{
             selected: "select20",
             select20:true,
             select30:false,
             select50:false,
         
            };
        });
    }

    select30(){
        this.setState((prevState) => {
            return{
             selected: "select30",
             select20:false,
             select30:true,
             select50:false,
         
            };
        });
    }

    select50(){
        this.setState((prevState) => {
            return{
             selected: "select50",
             select20:false,
             select30:false,
             select50:true,
         
            };
        });
    }

    componentDidMount() {
     
      }
    
    
    
    render(){
        return(
            
<React.Fragment>
<Container>
<Row noGutters={true} className="">
                           <Col sm = "1" className="col-xs-1">
                           <img
                                       src={logos.backarrowicon}
                                       className="margin-cparrow cparrowsize glyphicon"
                                        onClick={() => this.backoperation()}
                            ></img>
                          
                          </Col>
                          <Col sm = "11" className="col-xs-11 ">
                         <h3><b>Advance Payment for Enquiry id:</b></h3>
                          
                          </Col>
                          </Row>
                          {/* --------------------------------------------- */}
  <Row noGutters={true}>
            <Col className="col-xs-12">
            <div class="Total-square-container">
                <div class="Total-square">
                <p className="orderamthead">Order amount</p>
              <h3 className="totalamtpay"><span > 
                   <i class="fa fa-inr" aria-hidden="true"></i> 1111.00</span>
                    </h3>

                </div>
                </div>
             
            </Col>
  </Row>

  <Row  noGutters={true}>
      <Col className="col-xs-12 selectpercenttext">
          Select the % of the total amount (as per PI) you wish to pay below
      </Col>
  </Row>
  {/* ----------------------BoX--------------------- */}

  <Row  noGutters={true} className="margintoprow aligncenter">
  <Col className="col-xs-3 ">
         
      </Col>
      <Col className="col-xs-12 alignbottom" sm={2}>
      <div class="Select-square-container "  
      className={
               (this.state.selected == "select20"
                 ? "borderbox"
                 : "")
               }
               onClick={this.select20}>
                <div class="Select20-square ">
                20
                </div>
                </div>
      </Col>
      <Col className="col-xs-12 alignbottom" sm={2}>
      <div class="Select-square-container"
      className={
        (this.state.selected == "select30"
          ? "borderbox"
          : "")
        }
        
        onClick={this.select30}
        >
                <div class="Select30-square">
                30
                </div>
                </div>
      </Col>
      <Col className="col-xs-12 " sm={2}>
      <div class="Select-square-container"
      className={
        (this.state.selected == "select50"
          ? "borderbox"
          : "")
        }
        onClick={this.select50}>
                <div class="Select50-square">
                50
                </div>
                </div>
      </Col>
      <Col className="col-xs-3 ">
         
      </Col>
  </Row>
  {/* ----------------------BoX End--------------------- */}

<Row noGutters={true} className="margintoprow">
    <Col className="col-xs-12" style={{textAlign:"center"}}>
      <span className="selectpercenttext">  Calculated amount you pay as a advanceed : <span className="advtotal"><i class="fa fa-inr" style={{color:"rgb(26, 68, 206)"}} aria-hidden="true"></i> 44444444</span>
     
                </span>
    </Col>
</Row>


<Row noGutters={true} className="margintoprow" style={{textAlign:"center"}}>

    <Col className="col-xs-12">
        <button className="proccedwithadvpaybtn">Proceed with 30% advance payment <i class="fa fa-long-arrow-right" style={{marginLeft:"15px"}} aria-hidden="true"></i>
</button>
    </Col>
</Row>

<Row noGutters={true} style={{marginTop:"10px"}}>
    <Col className="col-xs-12" style={{textAlign:"center"}}>
    <p>   <span className="selectpercenttext">  The maximum time limit for completing this transaction is 10 Days <br/>
      after generating this enquiry.
                </span></p>
    </Col>
</Row>

<Row noGutters={true} className="margintoprow">
    <Col className="col-xs-12" style={{textAlign:"center"}}>
      <span className="reporttt">  The following will be notified to Artisan & Administration team at Tata Trusts
     
                </span>
               
    </Col>
</Row>
<br/>
<div className="colorbardiv">      
                          <img src={logos.colorbar} className="colorbarimg"></img>
                </div>
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

const connectedLoginPage = connect(mapStateToProps)(BuyerAdvancePayment);
export default connectedLoginPage;