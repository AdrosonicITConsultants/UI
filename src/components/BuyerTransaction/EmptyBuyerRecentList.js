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
import { BuyerRecentList } from './BuyerRecentList';
import { BuyerHistoryList } from './BuyerHistoryList';


export class EmptyBuyerRecentList extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
           

        }
       


    }      
        browseproduct(){
            browserHistory.push("/Artisanself")
        }
 
    
    render() {
        return (
            <React.Fragment>
               
               
               
                <Row noGutters={true} className="redthreadbg playfair">
                           
                          <Col sm="12" className="col-xs-12 forgottoplaceorder" style={{textAlign:"center"}}>
                          Forgot to place <br/> an Order ?
                          <Row noGutters={true}>
                             <Col sm="5"></Col><Col sm="2"><hr className="hrempty"/></Col><Col sm="5"></Col>
                         </Row>   
                         <Row noGutters={true}>
                         <p className="emtytextp">There are no transactions done yet. <br/> Browse products to place an <br/>order.</p>
                         <div style={{textAlign:"center"}} 
                          onClick={() => this.browseproduct()}
                          >
                        <button className="wishlistblack browseproductbtn">
                          Browse Products</button>
                        </div>
                             </Row>         
                         </Col>   
                                                 
                </Row>
              
             
              
              
              
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    // debugger;
    const { user } = state
    return { user };
}

const connectedLoginPage = connect(mapStateToProps)(EmptyBuyerRecentList);
export default connectedLoginPage;
