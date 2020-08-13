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


export class BuyerAllTransactionList extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            Recent:true,
            enquiryStagesMTO :[],
            stage: 3,
            openEnquiries: [],

        }
        this.completed = this.completed.bind(this);
        this.ongoing = this.ongoing.bind(this);


    }      
    completed(){
        this.setState({Recent:false})
    }  
    ongoing(){
        this.setState({Recent:true})
    }        
    backoperation(){
        browserHistory.push("/home"); 
    }
    
    render() {
        return (
            <React.Fragment>
                <NavbarComponent/>
                <Container>
                {/* <img
                                       src={logos.recent}
                                     className="recenticon"
                                        ></img> */}
                <Row noGutters={true} className="">
                           <Col sm = "1" className="col-xs-2">
                           <img
                                       src={logos.backarrowicon}
                                       className="margin-cparrow cparrowsizetr cparrowsize glyphicon"
                                        onClick={() => this.backoperation()}
                            ></img>
                          
                          </Col>
                          <Col sm="10" className="col-xs-9">
                               <Row noGutters={true} className ="cp1heading cp1headingtr bold fontplay ">
                                   <Col md="12" className="col-xs-12">
                                        My Transactions
                                       </Col>
                               </Row>
                               <Row noGutters={true} className="mt20">
                                   <Col md="1">
                                   <img
                                       src={logos.recent}
                                     className="recenticon recenticonsm"
                                        ></img>
                                   </Col>
                                   {this.state.Recent
                                   ?
                                    <>
                                     <Col md="3" className="navoncontr oncoselected fontsizenav bold">
                                       <span onClick={this.ongoing }>
                                      
                                           Recent Transactions</span> 
                                       <hr className="selctedoptiotransnhr"></hr>
                                    </Col>
                                    <Col md="2" className="navoncontr onconotselected fontsizenav light">
                                       <span onClick={this.completed }>History</span> 
                                    </Col>
                                    </>
                                    :
                                    <>
                                     <Col md="3" className="navoncontr onconotselected fontsizenav light">
                                     <span onClick={this.ongoing }>
                                    
                                         Recent Transactions</span> 
                                    </Col>
                                    <Col md="2" className="navoncontr oncoselected fontsizenav bold">
                                    <span onClick={this.completed }>History</span> 
                                    <hr className="selctedoptiotransnhr2"></hr>

                                    </Col>
                                    </>
                                    }
                                   
                               </Row>
                               
                          </Col>                            
                </Row>
                <Row>
                    {/* <hr className="enquiryoptionhr"></hr> */}
                </Row>
                {
                    this.state.Recent
                    ?
                    <>
                   <BuyerRecentList/>
                    </>
                    :
                    <>
                   
                    </>
                }
                <div>
              <img
                className="notifyFooterBanner internaldiv"
                src={logos.notifyFooterBanner}
              ></img>
            </div>
                </Container>
                <Footer></Footer>
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    // debugger;
    const { user } = state
    return { user };
}

const connectedLoginPage = connect(mapStateToProps)(BuyerAllTransactionList);
export default connectedLoginPage;
