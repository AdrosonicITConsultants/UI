import React, { Component } from 'react'
import { memoryHistory, browserHistory } from "../../helpers/history";
import { Row, Col , Container, Button} from 'reactstrap';
import { connect } from "react-redux";
import NavbarComponent from "../navbar/navbar";
import logos from "../../assets";
// import "../ArtistEnquiries/AllEnquiryList.css"
import TTCEapi from '../../services/API/TTCEapi';
// import OngoingList from './BuyerOngoingList';
// import CompletedList from './BuyerCompletedList';
import "./BuyerTransaction.css";
import Footer from "../footer/footer";
import Moment from 'react-moment';



export class BuyerRecentList extends Component {
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
                <Container>
                <hr className="enquiryoptionhr" style={{width:"100%"}}></hr>

              <Row noGutters={true}>
                <Col className="col-xs-3 DateandTime" sm="1">
                {/* <Moment format="DD-MM-YYYY">
                13-07-2020
                </Moment> */}
               13-07-2020 
               <p style={{color:"darkgray"}}>12.45 PM</p>
               
                </Col>
                <Col className="col-xs-3" sm="1">
                <img src={logos.finpay} className="iconsize"/>
                </Col>
                <Col className="col-xs-3 paymentreceiptup" sm="2">
                Advance Payment Receipt uploaded
                </Col>
                <Col className="col-xs-3 proformacol" sm="2">
                50% payment received against Invoice for enquiry Id: <b className="colorinv">AS-778</b>
                <br/>
                <span><b className="proformainvId"> Invoice Id</b> <b className="colorinv proformainvIdtext "> AS-778</b></span>
                </Col>
                <Col className="col-xs-3 payack" sm="2">
                Payment Ackn is done by Artisian
                </Col>
                <Col className="col-xs-3 boldrs" sm="1">
                ₹ 11111
                </Col>
                <Col className="col-xs-3 viewreceipt" sm="2">
                <span><img src={logos.viewrec} className="receipticon"/> View Receipt</span>
                </Col>
                <Col className="col-xs-3" sm="1" style={{textAlign:"center"}}>
                <img src={logos.redenquiry} className="gotoiconsize"/>
                <p className="gotoenqu"> Go to this enquiry</p>
                </Col>
              </Row>
              
              <hr className="enquiryoptionhr" style={{width:"100%"}}></hr>

               
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

const connectedLoginPage = connect(mapStateToProps)(BuyerRecentList);
export default connectedLoginPage;
